/*
  The donation platform's own submit call, and the body it expects.

  One call starts the payment and answers with the key and the secret for it. The order is the
  point: the platform chooses the gateway when it starts the payment, so the key that comes back
  belongs to the account that will be charged. A key read before that can belong to another
  account, and a card confirmed against it fails on the last press.

  The body is the platform's shape (POST /api/v1/donations/submit). The popup builds it, because
  the popup is what knows the donor's choices. NEXT_PUBLIC_ because the browser makes the call.
*/

const DONATION_API_URL = (process.env.NEXT_PUBLIC_DONATION_API_URL ?? "").replace(/\/+$/, "");

/* Long, because the platform is creating a payment at Stripe when this call is made. */
const REQUEST_TIMEOUT_MS = 20000;

type DonationInfo = {
  /* Sent only when the donor says they are giving for an organization. */
  organization?: string;
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  streetName: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type DonationAllocation = {
  causeId: string;
  amount: number;
};

export type DonationUtm = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
};

export type SplitInstallment = {
  date: string;
  amount: number;
  causeAllocations: DonationAllocation[];
};

type PaymentBase = {
  amount: number;
  currency: string;
  platformTipAmount?: number;
  /*
    The gateway whose key drew the card fields. A card confirmed in the browser can only be charged
    on that account, so sending this is what keeps the key and the charge on the same one.
  */
  gatewayConfigurationId?: string;
};

export type DonationSubmitBody = {
  formId: string;
  /* Which site this is. The platform records it, so its admin can tell a hcusa gift apart. */
  source: string;
  info: DonationInfo;
  paymentMethod: "stripe";
  payment:
    | (PaymentBase & {
        paymentMode: "one_time";
        causeAllocations: DonationAllocation[];
      })
    | (PaymentBase & {
        paymentMode: "split";
        howToSplit: "each";
        scheduleType: "specific_dates";
        scheduleConfig: { dates: SplitInstallment[] };
      });
  utm?: DonationUtm;
};

export type StartedDonation = {
  donationId: string;
  /* Belongs to the account the payment was started on, which is why the card uses it. */
  publishableKey: string;
  clientSecret: string;
  /* A monthly gift answers with these: the saved card, and the session that holds the plan. */
  setupIntentId?: string;
  pendingSessionId?: string;
};

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/* One key per attempt, so a second press asks for the same payment instead of a new one. */
export function newPaymentKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `hcusa-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/*
  Splits the donation across the chosen causes, to the cent. The platform refuses a payment whose
  allocations do not sum exactly to the amount, so the odd cents all go on the first cause.
*/
export function allocateAmount(total: number, causeIds: string[]): DonationAllocation[] {
  const cents = Math.round(total * 100);

  if (causeIds.length === 0 || cents <= 0) return [];

  const each = Math.floor(cents / causeIds.length);
  const odd = cents - each * causeIds.length;

  return causeIds.map((causeId, index) => ({
    causeId,
    amount: (each + (index === 0 ? odd : 0)) / 100,
  }));
}

/*
  How many monthly payments a gift runs for. The platform bills a fixed list of dates rather than an
  open-ended subscription, so the popup fixes the term and says so on the card screen.
*/
export const MONTHLY_TERM = 12;

function daysInUtcMonth(year: number, monthIndex: number): number {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

/*
  The monthly dates for a gift. The first lands an hour from now, so it is safely past the platform's
  ten-minute lead time, and the rest follow a month apart on the same day, clamped to shorter months.
  Every date carries the same split across the causes, so each payment books the same way.
*/
export function monthlySchedule(
  amount: number,
  causeIds: string[],
  term = MONTHLY_TERM,
): SplitInstallment[] {
  const first = new Date(Date.now() + 60 * 60 * 1000);

  return Array.from({ length: term }, (_, index) => {
    const targetMonth = first.getUTCMonth() + index;
    const year = first.getUTCFullYear() + Math.floor(targetMonth / 12);
    const month = ((targetMonth % 12) + 12) % 12;
    const day = Math.min(first.getUTCDate(), daysInUtcMonth(year, month));

    return {
      date: new Date(
        Date.UTC(year, month, day, first.getUTCHours(), first.getUTCMinutes()),
      ).toISOString(),
      amount,
      causeAllocations: allocateAmount(amount, causeIds),
    };
  });
}

/*
  Starts the payment and returns what the card step needs. A refusal from the platform is shown
  to the donor as it came, because those messages say what to fix.
*/
export async function submitDonation(
  body: DonationSubmitBody,
  idempotencyKey: string,
): Promise<StartedDonation> {
  if (DONATION_API_URL.length === 0) {
    throw new Error("The donation platform address is not set for this build.");
  }

  const response = await fetch(`${DONATION_API_URL}/api/v1/donations/submit`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "x-idempotency-key": idempotencyKey,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  const payload = (await response.json().catch(() => null)) as {
    data?: {
      donationId?: unknown;
      payment?: { publishableKey?: unknown; clientSecret?: unknown; setupIntentId?: unknown };
      pendingSessionId?: unknown;
    };
    error?: { message?: unknown };
  } | null;

  if (!response.ok) {
    throw new Error(text(payload?.error?.message) || "The payment could not be started.");
  }

  const publishableKey = text(payload?.data?.payment?.publishableKey);
  const clientSecret = text(payload?.data?.payment?.clientSecret);

  /* Both are needed: the key draws the card fields, the secret confirms the payment. */
  if (publishableKey.length === 0 || clientSecret.length === 0) {
    throw new Error("Card payments are not available right now. Please try again.");
  }

  const setupIntentId = text(payload?.data?.payment?.setupIntentId);
  const pendingSessionId = text(payload?.data?.pendingSessionId);

  return {
    donationId: text(payload?.data?.donationId),
    publishableKey,
    clientSecret,
    ...(setupIntentId.length > 0 ? { setupIntentId } : {}),
    ...(pendingSessionId.length > 0 ? { pendingSessionId } : {}),
  };
}

/*
  Confirms a monthly gift with the platform, once Stripe has saved the card. Until this runs the plan
  is not recorded anywhere, so it is the second half of the monthly step. The key is reused on a
  retry, so a second press cannot set up a second plan.
*/
export async function finalizeDonation(
  body: { paymentMode: "split"; pendingSessionId: string; setupIntentId: string },
  idempotencyKey: string,
): Promise<void> {
  if (DONATION_API_URL.length === 0) {
    throw new Error("The donation platform address is not set for this build.");
  }

  const response = await fetch(`${DONATION_API_URL}/api/v1/donations/finalize`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "x-idempotency-key": idempotencyKey,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (response.ok) return;

  const payload = (await response.json().catch(() => null)) as {
    error?: { message?: unknown };
  } | null;

  throw new Error(text(payload?.error?.message) || "The monthly gift could not be saved.");
}

/*
  The donor's receipt, as a PDF.

  A receipt proves money changed hands, so the platform only issues one after the charge settles.
  Stripe's webhook can land a few seconds after the card is confirmed, so a "not ready yet" answer
  is retried a few times before the donor is told it will be emailed instead.

  The email is the proof of ownership: the platform compares it with the donation's donor email.
*/
const RECEIPT_RETRIES = 4;
const RECEIPT_RETRY_DELAY_MS = 2000;

export async function fetchReceiptPdf({
  donationId,
  email,
}: {
  donationId: string;
  email: string;
}): Promise<Blob> {
  if (DONATION_API_URL.length === 0) {
    throw new Error("The donation platform address is not set for this build.");
  }

  for (let attempt = 1; attempt <= RECEIPT_RETRIES; attempt += 1) {
    const response = await fetch(`${DONATION_API_URL}/api/v1/receipt/download`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/pdf" },
      body: JSON.stringify({ donationId, email }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (response.ok) return response.blob();

    const payload = (await response.json().catch(() => null)) as {
      error?: { code?: unknown; message?: unknown };
    } | null;

    const code = text(payload?.error?.code);
    const notReady = code === "RECEIPT_NOT_COMPLETED" || code === "RECEIPT_NOT_AVAILABLE";

    if (notReady && attempt < RECEIPT_RETRIES) {
      await new Promise((resolve) => setTimeout(resolve, RECEIPT_RETRY_DELAY_MS));
      continue;
    }

    if (notReady) {
      throw new Error("Your receipt is being prepared. It will also arrive by email.");
    }

    throw new Error(text(payload?.error?.message) || "The receipt could not be downloaded.");
  }

  throw new Error("The receipt could not be downloaded.");
}

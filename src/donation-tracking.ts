/*
  Track a guest donation.

  The donor asks for a link by email. The platform mails a short-lived token, and that token is the
  only way to read the donations. Nothing is stored in the browser.

  Only this site's donations are listed: the request carries `source=hcusa`.
*/

const DONATION_API_URL = (process.env.NEXT_PUBLIC_DONATION_API_URL ?? "").replace(/\/+$/, "");

const REQUEST_TIMEOUT_MS = 10000;

/* The source value the custom site sends with every donation it submits. */
const SOURCE = "hcusa";

export type TrackedInstallment = {
  dueDate: string;
  amount: number;
  status: string;
  installmentIndex: number;
};

export type TrackedDonation = {
  donationId: string;
  date: string;
  campaign: { formId: string | null; name: string; slug: string };
  causeTag: { key: string; label: string } | null;
  amount: number;
  currency: string;
  source: string;
  paymentMode: string;
  scheduleType: string | null;
  scheduleState: string | null;
  tipAmount: number;
  status: { key: string; label: string };
  scheduleSummary: {
    total: number;
    paidCount: number;
    paidTotal: number;
    remainingCount: number;
    upcoming: TrackedInstallment[];
  };
  /* Only the single-donation answer carries every payment date. */
  installments?: TrackedInstallment[];
};

export type TrackedDonationsPage = {
  email: string;
  hasAccount: boolean;
  items: TrackedDonation[];
};

export type TrackLinkResult = { registered: boolean; message: string };

/* A platform refusal that the page can tell apart, e.g. an expired link. */
export class TrackError extends Error {
  code: string;

  constructor(message: string, code = "") {
    super(message);
    this.name = "TrackError";
    this.code = code;
  }
}

async function readError(response: Response): Promise<TrackError> {
  const payload = (await response.json().catch(() => null)) as {
    error?: { code?: unknown; message?: unknown };
  } | null;

  const code = typeof payload?.error?.code === "string" ? payload.error.code : "";
  const message =
    typeof payload?.error?.message === "string" ? payload.error.message : "";

  return new TrackError(message || "That did not work. Please try again.", code);
}

export async function requestTrackLink(email: string): Promise<TrackLinkResult> {
  if (DONATION_API_URL.length === 0) {
    throw new TrackError("The donation platform address is not set for this build.");
  }

  const response = await fetch(`${DONATION_API_URL}/api/v1/track-donation/request`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      /* The API uses this only for the emailed link, and only if it is a known origin. */
      origin: window.location.origin,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) throw await readError(response);

  const payload = (await response.json().catch(() => null)) as {
    data?: { registered?: unknown; message?: unknown };
  } | null;

  return {
    registered: payload?.data?.registered === true,
    message: typeof payload?.data?.message === "string" ? payload.data.message : "",
  };
}

export async function fetchTrackedDonations(token: string): Promise<TrackedDonationsPage> {
  if (DONATION_API_URL.length === 0) {
    throw new TrackError("The donation platform address is not set for this build.");
  }

  const params = new URLSearchParams({ token, source: SOURCE });

  const response = await fetch(
    `${DONATION_API_URL}/api/v1/track-donation/donations?${params.toString()}`,
    {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    },
  );

  if (!response.ok) throw await readError(response);

  const payload = (await response.json().catch(() => null)) as {
    data?: { email?: unknown; hasAccount?: unknown; items?: unknown };
  } | null;

  return {
    email: typeof payload?.data?.email === "string" ? payload.data.email : "",
    hasAccount: payload?.data?.hasAccount === true,
    items: Array.isArray(payload?.data?.items)
      ? (payload.data.items as TrackedDonation[])
      : [],
  };
}

export async function fetchTrackedDonation(
  token: string,
  donationId: string,
): Promise<TrackedDonation> {
  if (DONATION_API_URL.length === 0) {
    throw new TrackError("The donation platform address is not set for this build.");
  }

  const params = new URLSearchParams({ token, donationId });

  const response = await fetch(
    `${DONATION_API_URL}/api/v1/track-donation/donation?${params.toString()}`,
    {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    },
  );

  if (!response.ok) throw await readError(response);

  const payload = (await response.json().catch(() => null)) as {
    data?: { item?: unknown };
  } | null;

  if (!payload?.data?.item) {
    throw new TrackError("That donation could not be found.");
  }

  return payload.data.item as TrackedDonation;
}

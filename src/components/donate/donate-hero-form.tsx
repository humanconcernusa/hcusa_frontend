"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { extraPercent, presetsFor, type DonateForm } from "@/content/donate";
import type { UtmData } from "@/content/utm";
import {
  MONTHLY_TERM,
  allocateAmount,
  fetchReceiptPdf,
  monthlySchedule,
  newPaymentKey,
  submitDonation,
  type DonationSubmitBody,
  type DonationUtm,
  type SplitInstallment,
  type StartedDonation,
} from "@/donation-payments";
import { loadDefaultGateway, type CardGateway } from "@/stripe-key";
import { AmountStep } from "./hero-amount-step";
import { CardStep } from "./hero-card-step";
import { DetailsStep } from "./hero-details-step";
import { Tick, throwScreenConfetti, type Billing } from "./hero-parts";
import { readUtms } from "./utm";

/*
  The donation popup's form: the amount, the details, then the card fields.

  This file holds the state and the rules: what is required, what the total comes to, and what
  each step does. The three steps are drawn by their own components, which take the state as
  props so nothing here is duplicated.

  The card route is the part that matters. The card fields are drawn from the platform's default
  gateway key, and the payment is then pinned to that same gateway when Pay is pressed. So the
  account the donor is looking at is the account that charges, and the key the platform answers
  with is the one already on the page. Drawing on one account and charging on another is what used
  to fail on the last press.
*/

/* The platform's own five campaign names, taken from what the browser captured on arrival. */
function campaignFrom(utms: UtmData): DonationUtm {
  const mapped: DonationUtm = {};

  if (utms.utm_source) mapped.source = utms.utm_source;
  if (utms.utm_medium) mapped.medium = utms.utm_medium;
  if (utms.utm_campaign) mapped.campaign = utms.utm_campaign;
  if (utms.utm_term) mapped.term = utms.utm_term;
  if (utms.utm_content) mapped.content = utms.utm_content;

  return mapped;
}

/* One line of the thank-you receipt: the label on the left, the value on the right. */
function ReceiptRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <dt className="shrink-0 text-body">{label}</dt>
      <dd className={`break-words text-right text-ink ${strong ? "font-semibold" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

function money2(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function HeroForm({
  form,
  onClose,
  confettiCanvas,
  preview = false,
  embedded = false,
}: {
  form: DonateForm;
  onClose: () => void;
  /* Owned by the popup's overlay, so the burst covers the screen above the blurred wash. */
  confettiCanvas: RefObject<HTMLCanvasElement | null>;
  /* Drawn in an admin preview tab: everything works up to Pay, and Pay takes nothing. */
  preview?: boolean;
  /* Drawn inside another site's page: there is nothing to close, so no Done button. */
  embedded?: boolean;
}) {
  /* Nothing is picked to begin with; a tier or the custom row turns red only once it is chosen. */
  const [amount, setAmount] = useState("");
  /* True while the custom row is the one in use, so no tier reads as selected. */
  const [isCustom, setIsCustom] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  /* The slider starts on the figure the admin set for this popup. */
  const [feePercent, setFeePercent] = useState(form.feePercent ?? 0);
  /* The purposes are a multi-choice list, so two or more can be picked at once. Kept by id. */
  const [purposes, setPurposes] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  /* A donor may give on behalf of an organization; the name field shows only when they say so. */
  const [isOrganization, setIsOrganization] = useState(false);
  const [organization, setOrganization] = useState("");
  /* The amount and the details are required, so each carries its own message. */
  const [amountError, setAmountError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [purposeError, setPurposeError] = useState("");

  /* Which screen the popup is showing: the form, the card fields, or the done state. */
  const [step, setStep] = useState<"form" | "card" | "success">("form");
  /* A card can come back "processing", which settles later rather than right away. */
  const [paidStatus, setPaidStatus] = useState<"succeeded" | "processing">("succeeded");
  /* What the thank-you screen repeats back: the platform's reference and when it happened. */
  const [receipt, setReceipt] = useState<{ donationId: string; at: string } | null>(null);
  /* The PDF download: its own busy flag, so it never disables Done. */
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadNote, setDownloadNote] = useState("");
  const [cardError, setCardError] = useState("");
  /* Kept here rather than in a step, so going back and forward does not clear it. */
  const [billing, setBilling] = useState<Billing | null>(null);
  /*
    The gateway the card fields are drawn with, and the one the payment is pinned to. Read once,
    when the popup opens.
  */
  const [gateway, setGateway] = useState<CardGateway | null>(null);

  /*
    One key per attempt. Pressing continue again without changing anything reaches the same
    payment instead of starting a second one, and a changed amount starts a fresh one.
  */
  const paymentAttempt = useRef<{ key: string; body: string }>({ key: "", body: "" });

  /*
    The monthly dates, kept until the gift or the causes change. They are built once and reused,
    because the idempotency key is worked out from the whole body: dates made afresh on every render
    would look like a different gift and could set up a second plan.
  */
  const schedule = useRef<{ fingerprint: string; dates: SplitInstallment[] }>({
    fingerprint: "",
    dates: [],
  });

  /* The card fields are drawn from the platform's default gateway, read as the popup opens. */
  useEffect(() => {
    let active = true;

    void loadDefaultGateway().then((loaded) => {
      if (active) setGateway(loaded);
    });

    return () => {
      active = false;
    };
  }, []);

  const value = Number.parseFloat(amount) || 0;
  /* Stripe and the server each take a single name, so the two fields are joined for them. */
  const fullName = [firstName, lastName]
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .join(" ");
  /* The type decides which amounts are offered: a form may keep a monthly list of its own. */
  const amounts = presetsFor(form, isMonthly);
  /* The same total the server works out, so the button and the charge agree. */
  const extra = extraPercent(value, feePercent);
  const total = value + extra;
  const totalLabel = `$${total.toFixed(2)}`;
  /* The pay button names what it does, and the cadence on a monthly gift. */
  const payLabel = isMonthly ? `Donate ${totalLabel}/Month` : `Donate ${totalLabel}`;
  /* The chosen purposes by name, for the summary and for the monthly route. */
  const chosenPurposes = (form.purposes ?? []).filter((purpose) => purposes.includes(purpose.id));

  /* The billing address as the receipt reads it back, one line per part. */
  const billingAddress = billing?.value.address;
  const billingLines = [
    billingAddress?.line1,
    billingAddress?.line2,
    [billingAddress?.city, billingAddress?.state, billingAddress?.postal_code]
      .filter((part) => Boolean(part && part.trim()))
      .join(", "),
    billingAddress?.country,
  ]
    .map((line) => (typeof line === "string" ? line.trim() : ""))
    .filter((line) => line.length > 0);

  const receiptDate = receipt
    ? new Date(receipt.at).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  /*
    A receipt is issued only for a settled charge. A monthly gift's first payment is scheduled for
    later, and a card that came back "processing" has not settled yet, so the button is shown but
    disabled with the reason underneath.
  */
  const receiptReady = !isMonthly && paidStatus === "succeeded";
  const canDownloadReceipt =
    receiptReady && Boolean(receipt?.donationId) && email.trim().length > 0;
  const receiptNote = canDownloadReceipt
    ? ""
    : isMonthly
      ? "Your receipt is emailed after the first payment."
      : paidStatus === "processing"
        ? "Your receipt is emailed once the card payment completes."
        : "Your receipt is on its way to your inbox.";

  function togglePurpose(id: string) {
    setPurposes((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    setPurposeError("");
  }

  /* Switching cadence throws the screen burst on the way into Monthly, not on every click. */
  function pickCadence(monthly: boolean) {
    if (monthly && !isMonthly && confettiCanvas.current) {
      throwScreenConfetti(confettiCanvas.current);
    }

    setIsMonthly(monthly);
    /* Each type has its own amounts, so the picked one is let go. */
    setAmount("");
    setIsCustom(false);
    setAmountError("");
  }

  /* The platform's own body. The tip is a figure of its own, so the causes sum to the gift. */
  function buildBody(): DonationSubmitBody {
    const address = billing?.value.address;
    const trimmedOrganization = organization.trim();
    const campaign = campaignFrom(readUtms());

    /*
      The tip is a figure of its own, so the cause split covers the gift only. A monthly gift sends
      the whole plan as the amount, because the platform checks that the dates add up to it.
    */
    const paymentBase = {
      amount: isMonthly ? Number((value * MONTHLY_TERM).toFixed(2)) : value,
      currency: "USD",
      ...(extra > 0 ? { platformTipAmount: extra } : {}),
      /* The gateway the card fields were drawn with: the platform charges on that account. */
      ...(gateway ? { gatewayConfigurationId: gateway.configurationId } : {}),
    };

    return {
      formId: form.apiId,
      source: "hcusa",
      info: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        ...(isOrganization && trimmedOrganization.length > 0
          ? { organization: trimmedOrganization }
          : {}),
        addressLine1: address?.line1 ?? "",
        /* Stripe splits the street over two lines and the platform keeps one, so line 2 wins. */
        streetName: address?.line2 || address?.line1 || "",
        city: address?.city ?? "",
        state: address?.state ?? "",
        postalCode: address?.postal_code ?? "",
        country: address?.country ?? "",
      },
      paymentMethod: "stripe",
      payment: {
        ...paymentBase,
        ...(isMonthly
          ? {
              paymentMode: "split" as const,
              howToSplit: "each" as const,
              scheduleType: "specific_dates" as const,
              scheduleConfig: { dates: monthlyDates() },
            }
          : {
              paymentMode: "one_time" as const,
              causeAllocations: allocateAmount(value, purposes),
            }),
      },
      ...(Object.keys(campaign).length > 0 ? { utm: campaign } : {}),
    };
  }

  function keyFor(body: DonationSubmitBody): string {
    const fingerprint = JSON.stringify(body);

    if (paymentAttempt.current.body !== fingerprint) {
      paymentAttempt.current = { key: newPaymentKey(), body: fingerprint };
    }

    return paymentAttempt.current.key;
  }

  /* The monthly dates for this gift and the causes it is split across, built once and reused. */
  function monthlyDates(): SplitInstallment[] {
    const fingerprint = `${value}|${purposes.join(",")}`;

    if (schedule.current.fingerprint !== fingerprint) {
      schedule.current = { fingerprint, dates: monthlySchedule(value, purposes) };
    }

    return schedule.current.dates;
  }

  /*
    Checks the amount and the details, then opens the card step. Nothing is created here: the
    payment is started from the card step, once the billing address is typed there.
  */
  function openCard() {
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim();

    /* An amount, a full name and an email are all required before the card step opens. */
    const nextAmountError = value > 0 ? "" : "Choose or enter an amount to continue.";
    const nextNameError =
      trimmedFirst.length === 0 || trimmedLast.length === 0
        ? "Enter your first and last name to continue."
        : "";
    const nextEmailError =
      trimmedEmail.length === 0
        ? "Enter your email to continue."
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
          ? ""
          : "Enter a valid email address.";
    /* A purpose is required too, but only on a popup the admin has given purposes to. */
    const nextPurposeError =
      (form.purposes?.length ?? 0) > 0 && purposes.length === 0
        ? "Choose at least one purpose to continue."
        : "";

    setAmountError(nextAmountError);
    setNameError(nextNameError);
    setEmailError(nextEmailError);
    setPurposeError(nextPurposeError);
    setCardError("");

    if (
      nextAmountError.length > 0 ||
      nextNameError.length > 0 ||
      nextEmailError.length > 0 ||
      nextPurposeError.length > 0
    ) {
      return;
    }

    /* A payment has to name the causes it is for, so a popup with no purposes cannot be paid. */
    if ((form.purposes?.length ?? 0) === 0) {
      setCardError("This form is not taking donations right now. Please try again later.");
      return;
    }

    setStep("card");
  }

  /*
    Starts the gift, one-time and monthly alike, at the moment Pay is pressed. The request carries
    the gateway the card fields were drawn with, so the platform charges on that account, and the
    key it answers with is the one already on the page.

    If it ever answers with a different key, the card could not be confirmed against it, so the
    donor is told plainly rather than shown Stripe's own complaint about an unknown payment.
  */
  async function startPayment(turnstileToken: string): Promise<StartedDonation> {
    if (preview) {
      throw new Error("This is a preview. No payment was taken.");
    }

    if (!gateway) {
      throw new Error("Card payments are not available right now. Please try again.");
    }

    const body = buildBody();
    const started = await submitDonation(body, keyFor(body), turnstileToken);

    if (started.publishableKey !== gateway.key) {
      throw new Error("The payment could not be completed. Please try again.");
    }

    return started;
  }

  /*
    The platform issues the PDF only after the charge settles, so the request itself waits and
    retries. The download is handed to the browser as a blob, which is the only way to keep the
    file name ours across a cross-origin request.
  */
  async function downloadReceipt() {
    if (!receipt || !canDownloadReceipt) return;

    setIsDownloading(true);
    setDownloadNote("");

    try {
      const blob = await fetchReceiptPdf({
        donationId: receipt.donationId,
        email: email.trim(),
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `receipt-${receipt.donationId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      /* Revoking straight away can cancel the save in some browsers, so let the click land first. */
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (caught) {
      setDownloadNote(
        caught instanceof Error ? caught.message : "The receipt could not be downloaded.",
      );
    } finally {
      setIsDownloading(false);
    }
  }

  /* The heading changes with the step, so the popup always names where the donor is. */
  const heading = step === "success" ? "Thank you" : step === "card" ? "Card details" : form.label;

  return (
    /* The whole popup body is set in Poppins, so the fields, their labels and the headings match.
       The Stripe fields are a separate document and keep their own font. */
    <div className="font-display">
      {/* The heading is centred on the done state, because everything under it is. */}
      <h2
        id="donate-title"
        className={`text-[1.25rem] font-semibold text-ink ${step === "success" ? "text-center" : ""}`}
      >
        {heading}
      </h2>

      {step === "success" ? (
        /*
          The done state is the only one without the sticky button bar at the foot, so it carries
          its own bottom padding rather than ending flush with the panel's edge.
        */
        <div className="mt-5 flex flex-col items-center pb-6 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-leaf">
            <Tick />
          </span>
          <p className="mt-4 text-[1rem] text-body">
            {isMonthly ? "Your monthly gift of " : "Your donation of "}
            <span className="font-semibold text-ink">{totalLabel}</span>
            {paidStatus === "processing"
              ? " is being processed. Stripe emails you once it completes."
              : isMonthly
                ? " has started. Thank you."
                : " was received. Thank you."}
          </p>
          <p className="mt-1 text-[0.8125rem] text-body">
            A receipt is on its way to your inbox.
          </p>

          {/* The same information, on screen, so nothing has to be looked up later. */}
          {receipt ? (
            <div className="mt-5 w-full rounded-xl border border-line bg-page px-4 py-3 text-left">
              <p className="text-[0.7rem] font-semibold tracking-[0.1em] text-body uppercase">
                Receipt
              </p>

              <dl className="mt-2 divide-y divide-divider text-[0.8125rem]">
                <ReceiptRow label="Campaign" value={form.label} />
                <ReceiptRow
                  label={isMonthly ? "Monthly gift" : "Donation amount"}
                  value={money2(value)}
                />
                {extra > 0 ? (
                  <ReceiptRow label="Platform fee" value={money2(extra)} />
                ) : null}
                <ReceiptRow
                  label={isMonthly ? "Charged each month" : "Total charged"}
                  value={totalLabel}
                  strong
                />
                <ReceiptRow
                  label="Frequency"
                  value={
                    isMonthly
                      ? `Monthly · ${MONTHLY_TERM} payments · first payment today`
                      : "One-time"
                  }
                />
                {chosenPurposes.length > 0 ? (
                  <ReceiptRow
                    label="Purpose"
                    value={chosenPurposes.map((purpose) => purpose.name).join(", ")}
                  />
                ) : null}
                <ReceiptRow label="Donor" value={fullName} />
                <ReceiptRow label="Email" value={email} />
                {isOrganization && organization.trim().length > 0 ? (
                  <ReceiptRow label="Organization" value={organization.trim()} />
                ) : null}
                {billingLines.length > 0 ? (
                  <ReceiptRow label="Billing address" value={billingLines.join(", ")} />
                ) : null}
                <ReceiptRow label="Date" value={receiptDate} />
                {receipt.donationId.length > 0 ? (
                  <ReceiptRow label="Reference" value={receipt.donationId} />
                ) : null}
              </dl>
            </div>
          ) : null}

          {/* The receipt and Done sit together; an embedded form has no Done to show. */}
          <div className="mt-6 flex w-full flex-col items-center gap-2">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => void downloadReceipt()}
                disabled={!canDownloadReceipt || isDownloading}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-6 font-medium text-ink transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDownloading ? "Preparing receipt…" : "Download Your Receipt"}
              </button>

              {embedded ? null : (
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-action px-8 font-medium text-white transition-colors hover:bg-action-hover"
                >
                  Done
                </button>
              )}
            </div>

            {canDownloadReceipt ? null : (
              <p className="text-[0.75rem] text-body">{receiptNote}</p>
            )}
            {downloadNote.length > 0 ? (
              <p className="text-[0.75rem] text-body">{downloadNote}</p>
            ) : null}
          </div>
        </div>
      ) : step === "card" ? (
        <CardStep
          label={form.label}
          value={value}
          feePercent={feePercent}
          extra={extra}
          causeLabels={chosenPurposes.map((purpose) => purpose.name)}
          isMonthly={isMonthly}
          totalLabel={totalLabel}
          stripe={gateway ? gateway.stripe : null}
          billing={billing}
          name={fullName}
          email={email}
          payLabel={payLabel}
          preview={preview}
          resolvePayment={startPayment}
          onBillingChange={setBilling}
          onPaid={(status, reference) => {
            setPaidStatus(status);
            setReceipt({
              donationId: reference?.donationId ?? "",
              at: new Date().toISOString(),
            });
            setStep("success");
          }}
          onBack={() => {
            setCardError("");
            setStep("form");
          }}
        />
      ) : (
        <>
          <AmountStep
            amounts={amounts}
            amount={amount}
            value={value}
            isMonthly={isMonthly}
            showMonthly={form.allowMonthly === true}
            isCustom={isCustom}
            feePercent={feePercent}
            extra={extra}
            amountError={amountError}
            showFee={form.feePercent !== undefined && value > 0}
            onPickCadence={pickCadence}
            onPickAmount={(picked) => {
              setAmount(String(picked));
              setIsCustom(false);
              setAmountError("");
            }}
            onCustomFocus={() => {
              /*
                Reaching for a custom amount lets go of the tier that was picked, so the box
                opens empty rather than showing the tier's figure as if it were typed there.
              */
              if (!isCustom) {
                setIsCustom(true);
                setAmount("");
                setAmountError("");
              }
            }}
            onCustomChange={(raw) => {
              setIsCustom(true);
              setAmount(raw.replace(/[^0-9.]/g, ""));
              setAmountError("");
            }}
            onFeeChange={setFeePercent}
          />

          <DetailsStep
            purposes={form.purposes ?? []}
            chosen={purposes}
            purposeError={purposeError}
            onTogglePurpose={togglePurpose}
            firstName={firstName}
            lastName={lastName}
            email={email}
            organization={organization}
            isOrganization={isOrganization}
            onFirstName={(next) => {
              setFirstName(next);
              setNameError("");
            }}
            onLastName={(next) => {
              setLastName(next);
              setNameError("");
            }}
            onEmail={(next) => {
              setEmail(next);
              setEmailError("");
            }}
            onOrganization={setOrganization}
            onToggleOrganization={setIsOrganization}
            nameError={nameError}
            emailError={emailError}
            totalLabel={totalLabel}
            showTotal={value > 0}
            cardError={cardError}
            onOpenCard={openCard}
          />
        </>
      )}
    </div>
  );
}

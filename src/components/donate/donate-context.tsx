"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DonateModal } from "./donate-modal";
import { DonatePending } from "./donate-pending";
import { RecentDonationToast } from "./recent-donation-toast";
import { useDonateFallback } from "./fallback-context";
import { captureUtms } from "./utm";
import { fetchDonationForms } from "@/donation-forms";
import { loadStripeOnce } from "@/stripe-key";
import type { DonateForm } from "@/content/donate";

type DonateContextValue = {
  isOpen: boolean;
  open: (formId?: string) => void;
  close: () => void;
};

const DonateContext = createContext<DonateContextValue | null>(null);

export function useDonate(): DonateContextValue {
  const value = useContext(DonateContext);

  if (!value) {
    throw new Error("useDonate must be used inside <DonateProvider>");
  }

  return value;
}

export function DonateProvider({ children }: { children: ReactNode }) {
  /*
    The popups come from the donation API at runtime, not from a file baked in at build time, so
    this provider owns loading them. Nothing is shown from a stale list while that is happening.
  */
  const [forms, setForms] = useState<DonateForm[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [activeFormId, setActiveFormId] = useState<string | undefined>(undefined);
  const lastTrigger = useRef<HTMLElement | null>(null);
  /* One setting for the whole site, read in the root layout from the published content file. */
  const fallback = useDonateFallback();

  /* This provider wraps every page, so the campaign is captured the moment the donor lands. */
  useEffect(() => {
    captureUtms();
  }, []);

  /*
    Stripe's key is asked for while the popups load, so a donor who reaches the card step does not
    wait on the request there. A failure here costs nothing: the card step asks for it again.
  */
  useEffect(() => {
    void loadStripeOnce();
  }, []);

  useEffect(() => {
    let active = true;

    void fetchDonationForms()
      .then((loaded) => {
        if (!active) return;
        setForms(loaded);
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        /* The popup's own words come from the admin, so the technical reason is not shown. */
        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  const open = useCallback((formId?: string) => {
    /* An empty choice means this button opens nothing. No argument opens the first popup. */
    if (formId !== undefined && formId.length === 0) return;

    lastTrigger.current = document.activeElement as HTMLElement | null;
    setActiveFormId(formId);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    lastTrigger.current?.focus();
    lastTrigger.current = null;
  }, []);

  /* A retry starts the wait again. Kept out of the effect so the effect only fetches. */
  const retry = useCallback(() => {
    setStatus("loading");
    setAttempt((current) => current + 1);
  }, []);

  /*
    No id means the first popup. An id the donation platform no longer serves resolves to
    nothing, so a stale button opens nothing rather than quietly showing a different form's
    amounts.
  */
  const activeForm = useMemo(() => {
    if (status !== "ready" || forms.length === 0) return null;
    if (activeFormId === undefined) return forms[0];
    return forms.find((form) => form.id === activeFormId) ?? null;
  }, [activeFormId, forms, status]);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <DonateContext.Provider value={value}>
      {children}

      {activeForm ? (
        /* Keyed by form, so the amount resets when a different trigger opens it. */
        <DonateModal key={activeForm.id} open={isOpen} form={activeForm} onClose={close} />
      ) : (
        <DonatePending
          open={isOpen}
          /* A form the API does not serve, and an API that did not answer, look the same here. */
          status={status === "loading" ? "loading" : "unavailable"}
          fallback={fallback}
          onClose={close}
          onRetry={retry}
        />
      )}

      {/* The latest gifts, in the corner. It hides itself while the popup is open. */}
      <RecentDonationToast />
    </DonateContext.Provider>
  );
}

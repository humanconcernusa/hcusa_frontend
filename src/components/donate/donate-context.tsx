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
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [activeFormId, setActiveFormId] = useState<string | undefined>(undefined);
  const lastTrigger = useRef<HTMLElement | null>(null);

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

    setStatus("loading");
    setError("");

    void fetchDonationForms()
      .then((loaded) => {
        if (!active) return;
        setForms(loaded);
        setStatus("ready");
      })
      .catch((caught: unknown) => {
        if (!active) return;
        setError(
          caught instanceof Error ? caught.message : "The donation form could not be loaded.",
        );
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
          /* Ready but nothing to show means this button's id is not one the API serves. */
          status={status === "error" ? "error" : status === "ready" ? "missing" : "loading"}
          message={error}
          onClose={close}
          onRetry={() => setAttempt((current) => current + 1)}
        />
      )}
    </DonateContext.Provider>
  );
}

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
  /*
    `fallbackToFirst` is for the site's main Donate Now button: if the form it points at was
    renamed or unpublished, the first available one still opens, so the button never dead-ends.
    A campaign button keeps the strict rule, because another form's amounts could mislead.
  */
  open: (formId?: string, options?: { fallbackToFirst?: boolean }) => void;
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

  const [isOpen, setIsOpen] = useState(false);
  const [activeFormId, setActiveFormId] = useState<string | undefined>(undefined);
  const [fallbackToFirst, setFallbackToFirst] = useState(false);
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
  }, []);

  const open = useCallback((formId?: string, options?: { fallbackToFirst?: boolean }) => {
    /* An empty choice means this button opens nothing. No argument opens the first popup. */
    if (formId !== undefined && formId.length === 0) return;

    lastTrigger.current = document.activeElement as HTMLElement | null;
    setActiveFormId(formId);
    setFallbackToFirst(options?.fallbackToFirst === true);
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

    const match = forms.find((form) => form.id === activeFormId);
    if (match) return match;

    /* Only the main Donate Now button asks for this; a stale campaign button still opens nothing. */
    return fallbackToFirst ? forms[0] : null;
  }, [activeFormId, fallbackToFirst, forms, status]);

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
        />
      )}

      {/* The latest gifts, in the corner. It hides itself while the popup is open. */}
      <RecentDonationToast />
    </DonateContext.Provider>
  );
}

"use client";

import { createContext, useContext, type ReactNode } from "react";
import { quickDonateDefaults, type QuickDonateContent } from "@/content/quick-donate";

/*
  The Quick Donate tab's one setting, handed down from the root layout.

  The layout reads it from the published content file, so a page never passes it and there is
  nothing to wait for. The context is given the shipped defaults, which is what the tab falls back
  to if it is ever rendered outside the provider.
*/

const QuickDonateContext = createContext<QuickDonateContent>(quickDonateDefaults);

/* The setting the tab renders: its words and the popup it opens. */
export function useQuickDonate(): QuickDonateContent {
  return useContext(QuickDonateContext);
}

export function QuickDonateProvider({
  value,
  children,
}: {
  value: QuickDonateContent;
  children: ReactNode;
}) {
  return <QuickDonateContext.Provider value={value}>{children}</QuickDonateContext.Provider>;
}

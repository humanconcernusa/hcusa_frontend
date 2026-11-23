"use client";

import { createContext, useContext, type ReactNode } from "react";

import {
  donateFallbackDefaults,
  type DonateFallbackContent,
} from "@/content/donate-fallback";

/*
  The fallback popup's words, read once in the root layout and shared with every page.

  The default is the shipped text, so a page rendered without the provider still shows a complete
  popup instead of an empty one.
*/

const DonateFallbackContext = createContext<DonateFallbackContent>(donateFallbackDefaults);

export function DonateFallbackProvider({
  value,
  children,
}: {
  value: DonateFallbackContent;
  children: ReactNode;
}) {
  return (
    <DonateFallbackContext.Provider value={value}>{children}</DonateFallbackContext.Provider>
  );
}

export function useDonateFallback(): DonateFallbackContent {
  return useContext(DonateFallbackContext);
}

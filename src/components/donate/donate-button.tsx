"use client";

import type { ComponentPropsWithoutRef } from "react";
import { Button } from "@/components/ui";
import { useDonate } from "./donate-context";

export function DonateButton({
  children = "Donate Now",
  formId = "general",
  onClick,
  ...props
}: ComponentPropsWithoutRef<typeof Button> & { formId?: string }) {
  const { open } = useDonate();

  return (
    <Button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        /* An empty choice in the admin means this button opens no popup at all. */
        if (formId.length > 0) open(formId);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

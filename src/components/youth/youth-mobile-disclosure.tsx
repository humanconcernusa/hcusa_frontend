"use client";

import { useState, type ReactNode } from "react";

export function YouthReadMore({ preview, children }: { preview: ReactNode; children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="md:hidden">
        {preview}
        {expanded ? children : null}
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 text-sm font-semibold text-action underline underline-offset-4"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      </div>
      <div className="hidden md:block">{preview}{children}</div>
    </>
  );
}

export function YouthBenefitAccordion({ children }: { children: ReactNode }) {
  return <div className="space-y-3 md:hidden">{children}</div>;
}

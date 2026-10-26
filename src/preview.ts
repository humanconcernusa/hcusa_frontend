/*
  The draft the admin is previewing.

  The admin saves the draft, freezes one copy of it in the CMS, and opens this site with the token.
  The token is the only thing that grants access and it dies after 30 minutes, so an old link shows
  the expiry message rather than an empty page.
*/

import type { FooterContent } from "@/content/footer";
import type { HeaderContent } from "@/content/header";
import type { QuickDonateContent } from "@/content/quick-donate";

const CMS_URL = (process.env.NEXT_PUBLIC_CMS_URL ?? "").replace(/\/+$/, "");

const REQUEST_TIMEOUT_MS = 10000;

export type SitePreview = {
  page: string;
  payload: {
    content: unknown;
    header: HeaderContent;
    footer: FooterContent;
    quickDonate: QuickDonateContent;
  };
};

export async function fetchPreview(token: string): Promise<SitePreview> {
  if (CMS_URL.length === 0) {
    throw new Error("The preview address is not configured, so the draft cannot be loaded.");
  }

  const response = await fetch(`${CMS_URL}/api/preview/${encodeURIComponent(token)}`, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  const payload = (await response.json().catch(() => null)) as
    | { success: true; data: SitePreview }
    | { success: false; error: { message: string } }
    | null;

  if (!response.ok || !payload || !payload.success) {
    throw new Error(
      payload && !payload.success
        ? payload.error.message
        : "The preview could not be loaded.",
    );
  }

  return payload.data;
}

/*
  The parameters a donation can carry from the link the donor arrived on. Kept in one place so
  the browser capture and the server's check read the same list.
*/
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "fbclid",
  "msclkid",
  "ttclid",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

/* What we keep: any of the keys above, plus where they landed and where they came from. */
export type UtmData = Partial<Record<UtmKey, string>> & {
  landingPage?: string;
  referrer?: string;
};

/* The longest value kept, so a stuffed URL cannot bloat the record or the Stripe metadata. */
export const UTM_VALUE_LIMIT = 200;

import { UTM_KEYS, UTM_VALUE_LIMIT, type UtmData } from "@/content/utm";

/*
  UTM parameters only live on the URL the donor landed on, and this site's internal links drop
  the query string, so they are captured on arrival and kept for the tab session. Without this,
  only a donor who gives on the exact page they landed on would carry their campaign.

  First-touch: the first tagged arrival in the session wins and later ones are ignored, so the
  campaign that brought the donor is the one credited.
*/
const STORAGE_KEY = "hcu:utm";

function clean(value: string | null): string {
  return (value ?? "").trim().slice(0, UTM_VALUE_LIMIT);
}

export function readUtms(): UtmData {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as unknown;

    return parsed && typeof parsed === "object" ? (parsed as UtmData) : {};
  } catch {
    return {};
  }
}

export function captureUtms(): UtmData {
  if (typeof window === "undefined") return {};

  /* First-touch: once something is stored, later arrivals do not overwrite it. */
  const already = readUtms();
  if (Object.keys(already).length > 0) return already;

  const params = new URLSearchParams(window.location.search);
  const data: UtmData = {};

  for (const key of UTM_KEYS) {
    const value = clean(params.get(key));
    if (value.length > 0) data[key] = value;
  }

  /* Nothing tagged on this page; a later tagged arrival in this tab can still be the first. */
  if (Object.keys(data).length === 0) return {};

  data.landingPage = clean(window.location.pathname);
  if (document.referrer.length > 0) data.referrer = clean(document.referrer);

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* Storage can be blocked. The donation then simply carries no campaign data. */
  }

  return data;
}

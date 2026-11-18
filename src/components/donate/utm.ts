import { UTM_KEYS, UTM_VALUE_LIMIT, type UtmData } from "@/content/utm";

/*
  UTM parameters only live on the URL the donor landed on, and this site's internal links drop
  the query string, so they are captured on arrival.

  Two records are kept, like the complex form:
  - last touch: the latest tagged arrival, in sessionStorage;
  - first touch: the first tagged arrival, in a long-lived cookie.
*/
const STORAGE_KEY = "hcu:utm";
const FIRST_TOUCH_COOKIE = "hcu_first_touch";
const FIRST_TOUCH_DAYS = 365;

function clean(value: string | null): string {
  return (value ?? "").trim().slice(0, UTM_VALUE_LIMIT);
}

function parseStored(raw: string | null): UtmData {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as UtmData) : {};
  } catch {
    return {};
  }
}

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const prefix = `${name}=`;

  for (const part of document.cookie.split(";")) {
    const item = part.trim();
    if (!item.startsWith(prefix)) continue;
    try {
      return decodeURIComponent(item.slice(prefix.length));
    } catch {
      return "";
    }
  }

  return "";
}

function writeCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return;
  const maxAge = Math.max(0, Math.floor(days * 24 * 60 * 60));
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

export function readUtms(): UtmData {
  if (typeof window === "undefined") return {};
  return parseStored(window.sessionStorage.getItem(STORAGE_KEY));
}

export function readFirstTouch(): UtmData {
  return parseStored(readCookie(FIRST_TOUCH_COOKIE));
}

export function captureUtms(): UtmData {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const data: UtmData = {};

  for (const key of UTM_KEYS) {
    const value = clean(params.get(key));
    if (value.length > 0) data[key] = value;
  }

  /* Nothing tagged on this page; keep the last touch that was already captured. */
  if (Object.keys(data).length === 0) return readUtms();

  data.landingPage = clean(window.location.pathname);
  if (document.referrer.length > 0) data.referrer = clean(document.referrer);

  /* First touch wins. A later tagged arrival only updates the last touch. */
  if (Object.keys(readFirstTouch()).length === 0) {
    writeCookie(FIRST_TOUCH_COOKIE, JSON.stringify(data), FIRST_TOUCH_DAYS);
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* Storage can be blocked. The donation then simply carries no campaign data. */
  }

  return data;
}

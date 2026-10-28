/*
  Cloudflare Turnstile: the bot check in front of the donate and track forms.

  The script is fetched once per page. Each form draws its own widget, and the widget answers with
  a short token. The platform checks that token before it takes a donation or sends a link.
*/

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export const TURNSTILE_SITE_KEY = (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim();

/* Empty key (local work) leaves the widget out and the platform lets the form through. */
export const TURNSTILE_ENABLED = TURNSTILE_SITE_KEY.length > 0;

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string | undefined;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<boolean> | null = null;

export function loadTurnstile(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.turnstile) return Promise.resolve(true);

  if (!scriptPromise) {
    scriptPromise = new Promise<boolean>((resolve) => {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);

      if (existing) {
        existing.addEventListener("load", () => resolve(Boolean(window.turnstile)));
        existing.addEventListener("error", () => resolve(false));
        return;
      }

      const script = document.createElement("script");
      script.src = SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(Boolean(window.turnstile));
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  return scriptPromise;
}

export function renderTurnstile(
  container: HTMLElement,
  handlers: {
    onToken: (token: string) => void;
    onExpire?: () => void;
    onError?: () => void;
    size?: "normal" | "compact" | "flexible";
  },
): string | null {
  if (!window.turnstile) return null;

  try {
    return window.turnstile.render(container, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "light",
      size: handlers.size ?? "flexible",
      callback: (token: string) => handlers.onToken(token),
      "expired-callback": () => handlers.onExpire?.(),
      "error-callback": () => handlers.onError?.(),
    });
  } catch {
    return null;
  }
}

export function resetTurnstile(widgetId: string | null): void {
  if (!widgetId || !window.turnstile) return;

  try {
    window.turnstile.reset(widgetId);
  } catch {
    // The widget may already be gone; a reset is never worth failing the page for.
  }
}

export function removeTurnstile(widgetId: string | null): void {
  if (!widgetId || !window.turnstile) return;

  try {
    window.turnstile.remove(widgetId);
  } catch {
    // ignore
  }
}

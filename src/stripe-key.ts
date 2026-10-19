/*
  Where the browser's Stripe instance comes from.

  It is asked for at runtime instead of being baked into the bundle. The donation platform owns
  the key and the Stripe account, so it can rotate the key without a site rebuild, and a key
  compiled into shipped JavaScript is a key that is public the moment it is wrong.

  The read gives three things: the key, the instance drawn from it, and the configuration that key
  belongs to. That configuration id is what the payment is pinned to when it is submitted, so the
  platform charges on the very account the card fields were drawn on. That is what stops the card
  failing on the last press: the key the platform answers with is the one already on the page.

  No secret ever reaches the browser. This is the platform's own frontend-safe payment settings.
*/

import { loadStripe, type Stripe } from "@stripe/stripe-js";

/*
  Stripe draws its own fields, so they are given the popup's font and colours to sit in rather than
  the browser's defaults. The address fields and the card fields share it, so they match.
*/
export const stripeLook = {
  appearance: {
    variables: {
      fontFamily: "Poppins, ui-sans-serif, sans-serif",
      fontSizeBase: "15px",
      colorText: "#0a0a0a",
    },
  },
};

const DONATION_API_URL = (process.env.NEXT_PUBLIC_DONATION_API_URL ?? "").replace(/\/+$/, "");

const REQUEST_TIMEOUT_MS = 10000;

/* The gateway a card payment is drawn with, and pinned to. */
export type DefaultGateway = {
  key: string;
  configurationId: string;
};

/* The same gateway with its Stripe instance loaded, which is what the card step needs. */
export type CardGateway = DefaultGateway & {
  stripe: Stripe;
};

/*
  Only a publishable key may reach the browser. A secret key is refused here rather than handed to
  Stripe.js, which would refuse it anyway and leave the card fields blank with nothing said.
*/
function isPublishableKey(value: string): boolean {
  return /^pk_(test|live)_[A-Za-z0-9]+$/.test(value);
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

async function fetchDefaultGateway(): Promise<DefaultGateway | null> {
  if (DONATION_API_URL.length === 0) return null;

  const response = await fetch(`${DONATION_API_URL}/api/v1/payment/settings`, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as {
    data?: {
      gateways?: {
        stripe?: {
          configurations?: { publishableKey?: unknown; configurationId?: unknown }[];
        };
      };
    };
  };

  /*
    The first configuration is the one the platform's own routing starts from, so it is the one a
    card payment is pinned to. Its key is also the one the settings read reports at the top level.
  */
  const first = payload?.data?.gateways?.stripe?.configurations?.[0];
  const key = text(first?.publishableKey);
  const configurationId = text(first?.configurationId);

  if (!isPublishableKey(key) || configurationId.length === 0) return null;

  return { key, configurationId };
}

/* One read per page, however many popups are opened. A failure is not kept, so the next attempt
   asks again instead of the card step staying broken until a reload. */
let cached: Promise<DefaultGateway | null> | null = null;

function readDefaultGateway(): Promise<DefaultGateway | null> {
  if (cached) return cached;

  const attempt = fetchDefaultGateway()
    .catch(() => null)
    .then((gateway) => {
      if (!gateway) cached = null;
      return gateway;
    });

  cached = attempt;

  return attempt;
}

/* The default gateway with its instance ready, which is what the card step draws from. */
export function loadDefaultGateway(): Promise<CardGateway | null> {
  return readDefaultGateway()
    .then(async (gateway) => {
      if (!gateway) return null;

      const stripe = await loadStripe(gateway.key);

      return stripe ? { ...gateway, stripe } : null;
    })
    .catch(() => null);
}

/* The instance alone, for the popup's warm-up when a page opens. */
export function loadStripeOnce(): Promise<Stripe | null> {
  return loadDefaultGateway().then((gateway) => (gateway ? gateway.stripe : null));
}

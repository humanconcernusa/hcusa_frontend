/*
  The latest gifts, for the small notice in the corner.

  The platform does the masking: a name arrives as "First L.", never the full one, and an
  anonymous gift carries no name and no place. Only this site's donations are asked for.
*/

const DONATION_API_URL = (process.env.NEXT_PUBLIC_DONATION_API_URL ?? "").replace(/\/+$/, "");

const REQUEST_TIMEOUT_MS = 10000;

/* The source value this site's donations are recorded with. */
const SOURCE = "hcusa";

export type RecentDonation = {
  id: string;
  name: string;
  amount: number;
  currency: string;
  place: string;
  at: string | null;
};

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function readItem(value: unknown): RecentDonation | null {
  const row = (value ?? {}) as Record<string, unknown>;
  const name = asText(row.name);
  const amount = asNumber(row.amount);

  if (name.length === 0 || amount <= 0) return null;

  return {
    id: asText(row.id) || `${name}-${amount}`,
    name,
    amount,
    currency: asText(row.currency) || "USD",
    place: asText(row.place),
    at: asText(row.at) || null,
  };
}

export async function fetchRecentDonations(limit = 8): Promise<RecentDonation[]> {
  if (DONATION_API_URL.length === 0) return [];

  const params = new URLSearchParams({ source: SOURCE, limit: String(limit) });

  const response = await fetch(
    `${DONATION_API_URL}/api/v1/donations/recent?${params.toString()}`,
    { headers: { accept: "application/json" }, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) },
  );

  if (!response.ok) return [];

  const payload = (await response.json().catch(() => null)) as {
    data?: { items?: unknown };
  } | null;

  const items = Array.isArray(payload?.data?.items) ? payload.data.items : [];

  return items.map(readItem).filter((item): item is RecentDonation => item !== null);
}

/*
  The donation popups the live site shows.

  These amounts used to be read from content/forms.json at build time. They now come from the
  donation platform's own API instead, so changing a form shows up here without rebuilding the
  site. The public read only ever returns PUBLISHED forms that have at least one amount, so a
  half-finished form cannot reach a donor.

  NEXT_PUBLIC_ because the browser makes the call; the value is inlined at build time.
*/

import type { DonateForm, DonatePreset, DonatePurpose } from "@/content/donate";

const DONATION_API_URL = (process.env.NEXT_PUBLIC_DONATION_API_URL ?? "").replace(/\/+$/, "");

const REQUEST_TIMEOUT_MS = 10000;

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function readPresets(value: unknown): DonatePreset[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      const row = (entry ?? {}) as { amount?: unknown; description?: unknown };
      return { amount: asNumber(row.amount), blurb: asText(row.description) };
    })
    .filter((preset) => preset.amount > 0);
}

/*
  The purposes arrive as causes. Both the id and the name are kept: the name is what the donor
  reads, and the id is what a payment books the money to.
*/
function readPurposes(value: unknown): DonatePurpose[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      const row = (entry ?? {}) as { id?: unknown; name?: unknown };
      return { id: asText(row.id), name: asText(row.name) };
    })
    .filter((purpose) => purpose.id.length > 0 && purpose.name.length > 0);
}

function readForm(value: unknown): DonateForm | null {
  const row = (value ?? {}) as Record<string, unknown>;

  const id = asText(row.slug);
  const apiId = asText(row.id);
  const presets = readPresets(row.presets);

  /*
    A form with no amounts cannot be drawn, and one with no platform id cannot be paid for, so
    both are dropped rather than half-rendered or shown as a popup that fails at the end.
  */
  if (id.length === 0 || apiId.length === 0 || presets.length === 0) return null;

  const label = asText(row.displayName);
  const form: DonateForm = { id, apiId, label: label || id, presets };

  const monthlyPresets = readPresets(row.monthlyPresets);
  if (monthlyPresets.length > 0) form.monthlyPresets = monthlyPresets;

  const purposes = readPurposes(row.purposes);
  if (purposes.length > 0) form.purposes = purposes;

  /* Monthly is offered only when the form's admin allowed it. */
  if (row.allowRecurringDonations === true) form.allowMonthly = true;

  if (row.feePercent !== null && row.feePercent !== undefined) {
    form.feePercent = asNumber(row.feePercent);
  }

  return form;
}

export async function fetchDonationForms(): Promise<DonateForm[]> {
  if (DONATION_API_URL.length === 0) {
    throw new Error("The donation API address is not set for this build.");
  }

  const response = await fetch(`${DONATION_API_URL}/api/v1/simple-forms`, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`The donation API answered ${response.status}.`);
  }

  const payload = (await response.json()) as { data?: { items?: unknown } };
  const items = Array.isArray(payload?.data?.items) ? payload.data.items : [];

  return items.map(readForm).filter((form): form is DonateForm => form !== null);
}

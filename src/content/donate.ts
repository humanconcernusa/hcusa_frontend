/*
  The shape of a donation popup, and the rules the popup shares with the server.

  There is no list of popups here. Every popup now comes from the donation platform's API at
  runtime, so adding one or changing its amounts is done in that admin and shows up on the site
  without a rebuild. See src/donation-forms.ts for the read.
*/

export type DonatePreset = {
  amount: number;
  blurb: string;
};

/*
  A purpose the popup offers: the label the donor reads, and the cause id the platform books the
  money to. Both are needed, because a payment has to say which causes it is for.
*/
export type DonatePurpose = {
  id: string;
  name: string;
};

/*
  One input a formula add-on asks for. `select` carries its choices; the others are numbers.
*/
export type DonateAddOnInput = {
  key: string;
  label: string;
  type: "int" | "number" | "select";
  required: boolean;
  min: number | null;
  max: number | null;
  step: number | null;
  defaultValue: string | number | null;
  options: { value: string; label: string }[];
};

/*
  One extra the form offers. The price and the fund code live on the platform's add-on, never on
  the form, so the popup only shows what the platform already decided.
*/
export type DonateAddOn = {
  id: string;
  name: string;
  iconEmoji: string;
  shortDescription: string;
  amountFieldLabel: string;
  amount: number;
  labelUnderAmount: string;
  pricing: {
    type: "fixed" | "formula";
    baseUnitAmount: number | null;
    formula: string;
    inputs: DonateAddOnInput[];
  };
};

export type DonateForm = {
  /*
    The slug. The site's own content points at a popup by slug (`form: "palestine"`), so this is
    the name a button uses.
  */
  id: string;
  /* The platform's own form id, which is what a payment is submitted against. */
  apiId: string;
  label: string;
  /* The amounts offered for a one-time gift. */
  presets: DonatePreset[];
  /*
    The amounts offered for a monthly gift, when they differ from the one-time ones. Left out, the
    popup offers the one-time list for both.
  */
  monthlyPresets?: DonatePreset[];
  /*
    Whether this form offers a monthly gift. The admin turns it on for the form, and monthly only
    appears when it is on: the platform refuses a monthly gift for a form that has not allowed one.
  */
  allowMonthly?: boolean;
  /*
    Which purposes this form offers. Empty or absent means the form shows no pills, and a form
    with none asks for no purpose before it will take a card.
  */
  purposes?: DonatePurpose[];
  /*
    The extra the popup asks the donor to add, as a percentage of their gift, between 0 and
    MAX_FEE_PERCENT. Left out, the popup shows no slider at all.
  */
  feePercent?: number;
  /* The extras this form offers. Empty or absent means no add-on section is drawn. */
  addons?: DonateAddOn[];
};

/*
  The price of an add-on for the values typed. The platform multiplies the base by each input, and
  it recomputes the same figure when the donation is submitted.
*/
export function addOnAmount(addOn: DonateAddOn, values: Record<string, string>): number {
  const pricing = addOn.pricing;

  if (!pricing || pricing.type !== "formula") return addOn.amount;

  const base =
    typeof pricing.baseUnitAmount === "number" ? pricing.baseUnitAmount : addOn.amount;

  return pricing.inputs.reduce((total, input) => {
    const raw = values[input.key] ?? input.defaultValue ?? 1;
    const n = Number(raw);
    return total * (Number.isFinite(n) ? n : 1);
  }, base);
}

/* The most a donor can add on top through the slider, as a percentage of their gift. */
export const MAX_FEE_PERCENT = 20;

/* The extra for a percentage of a gift, to the cent. The popup shows it and the server charges it. */
export function extraPercent(amount: number, percent: number): number {
  return Math.round(amount * percent) / 100;
}

/*
  The amounts a popup offers for the type the donor has picked. A monthly list of its own wins when
  there is one; otherwise both types offer the same amounts.
*/
export function presetsFor(form: DonateForm, monthly: boolean): DonatePreset[] {
  if (monthly && form.monthlyPresets && form.monthlyPresets.length > 0) {
    return form.monthlyPresets;
  }

  return form.presets;
}

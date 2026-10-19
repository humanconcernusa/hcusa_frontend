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
};

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

/*
  The popup every donate button shows when its form cannot be opened: the form was unpublished,
  or the donation platform did not answer.

  One setting for the whole site, edited on the admin's "Donation fallback" screen. The button
  sends the donor to a fixed payment page, so a gift is still possible during an outage.
*/

export type DonateFallbackContent = {
  title: string;
  description: string;
  extraText: string;
  buttonLabel: string;
  buttonUrl: string;
};

export const donateFallbackDefaults: DonateFallbackContent = {
  title: "This donation form is not available right now",
  description:
    "We could not open the form for this campaign. You can still give through our secure donation page.",
  extraText: "Your gift still reaches the families who need it.",
  buttonLabel: "Donate securely",
  /* Replaced from the admin with the site's Stripe Payment Link. */
  buttonUrl: "https://humanconcernusa.org/donate",
};

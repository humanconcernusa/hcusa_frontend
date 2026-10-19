/*
  The Quick Donate tab, which appears on every page. Its setting lives on its own rather than
  inside any one page's content, and the admin edits it on the Quick Donate screen.

  A `label` beside a `form` becomes one row on that screen, with a chooser for the popup it opens.
*/

export type QuickDonateContent = {
  /* The tab's words, and which popup it opens. */
  label: string;
  form: string;
};

export const quickDonateDefaults: QuickDonateContent = {
  label: "Quick Donate",
  form: "general",
};

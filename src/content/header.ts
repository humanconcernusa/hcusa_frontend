/*
  The header, which appears on every page. Its settings live on their own rather than inside any
  one page's content, and the admin edits them on the Header screen.

  The shape is nested so the editor can group it: one card per object.
*/

export type HeaderContent = {
  /* Each key is a switch on the Header screen. */
  visible: {
    logo: boolean;
    nav: boolean;
    cta: boolean;
  };
  brand: {
    image: string;
    imageAlt: string;
  };
  /* The donate button's words, and which popup it opens. */
  donate: {
    cta: string;
    form: string;
  };
};

export const headerDefaults: HeaderContent = {
  visible: {
    logo: true,
    nav: true,
    cta: true,
  },

  brand: {
    image: "/hcu-logo.png",
    imageAlt: "Human Concern USA",
  },

  donate: {
    cta: "Donate Now",
    form: "general-donation",
  },
};

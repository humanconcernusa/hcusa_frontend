/*
  The footer, which appears on every page. Its settings live on their own rather than inside any
  one page's content, and the admin edits them on the Footer screen.

  The admin edits words, not plumbing. The contact lines and the social links keep their names,
  icons and link rules here in code and pair with the values by position, so the lists stay the
  length they are and nothing has to be typed twice.
*/

const EMAIL = "info@humanconcernusa.org";
const PHONE = "1-800-583-5841";

/*
  The contact lines, in order. `link` says how a line becomes a link, so a mailto: or a tel: is
  never typed by hand. One value belongs to each row, in this order.
*/
export const FOOTER_CONTACT_ROWS = [
  { label: "Email", icon: "mail", link: "email" },
  { label: "Phone", icon: "phone", link: "phone" },
  { label: "Address", icon: "pin", link: "none" },
  { label: "Tax", icon: "doc", link: "none" },
] as const;

export type FooterContactIcon = (typeof FOOTER_CONTACT_ROWS)[number]["icon"];

/* The social marks, in order. One address belongs to each, in this order. */
export const FOOTER_SOCIAL_MARKS = [
  {
    name: "Facebook",
    path: "M13.5 21v-7.5H16l.5-3h-3V9c0-.9.3-1.5 1.6-1.5H17V4.8C16.6 4.7 15.6 4.6 14.4 4.6c-2.3 0-3.9 1.4-3.9 4v1.9H8v3h2.5V21h3z",
  },
  {
    name: "X",
    path: "M3.5 3h4.2l4.3 5.8L17.3 3h3.2l-6.6 7.7L21 21h-4.2l-4.7-6.3L6.5 21H3.3l7.1-8.2L3.5 3z",
  },
  {
    name: "Instagram",
    path: "M12 4.7c2.4 0 2.7 0 3.6.1 2.3.1 3.5 1.3 3.6 3.6 0 .9.1 1.2.1 3.6s0 2.7-.1 3.6c-.1 2.3-1.3 3.5-3.6 3.6-.9 0-1.2.1-3.6.1s-2.7 0-3.6-.1c-2.3-.1-3.5-1.3-3.6-3.6 0-.9-.1-1.2-.1-3.6s0-2.7.1-3.6c.1-2.3 1.3-3.5 3.6-3.6.9 0 1.2-.1 3.6-.1zM12 3c-2.4 0-2.8 0-3.7.1C5.2 3.2 3.2 5.2 3.1 8.3 3 9.2 3 9.6 3 12s0 2.8.1 3.7c.1 3.1 2.1 5.1 5.2 5.2.9.1 1.3.1 3.7.1s2.8 0 3.7-.1c3.1-.1 5.1-2.1 5.2-5.2.1-.9.1-1.3.1-3.7s0-2.8-.1-3.7c-.1-3.1-2.1-5.1-5.2-5.2C14.8 3 14.4 3 12 3zm0 4.4a4.6 4.6 0 100 9.2 4.6 4.6 0 000-9.2zm0 7.6a3 3 0 110-6 3 3 0 010 6zm4.8-8.9a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z",
  },
  {
    name: "LinkedIn",
    path: "M6.9 8.4H3.9V21h3V8.4zM5.4 3a1.7 1.7 0 100 3.5 1.7 1.7 0 000-3.5zM20.1 21h-3v-6.6c0-1.6-.6-2.7-2-2.7-1.1 0-1.7.7-2 1.4-.1.3-.1.6-.1 1V21h-3V8.4h3v1.2c.4-.7 1.3-1.5 3-1.5 2.1 0 3.6 1.4 3.6 4.4V21h.5z",
  },
  {
    name: "YouTube",
    path: "M21.6 7.2c-.2-1.1-.9-1.9-2-2.1C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.6.3c-1.1.2-1.8 1-2 2.1C2.1 8.9 2.1 12 2.1 12s0 3.1.3 4.8c.2 1.1.9 1.9 2 2.1 1.7.3 7.6.3 7.6.3s5.9 0 7.6-.3c1.1-.2 1.8-1 2-2.1.3-1.7.3-4.8.3-4.8s0-3.1-.3-4.8zM10.1 15.3V8.7l5.7 3.3-5.7 3.3z",
  },
];

export type FooterContent = {
  /* Each key is a switch on the Footer screen. */
  visible: {
    logo: boolean;
    blurb: boolean;
    contact: boolean;
    newsletter: boolean;
    socials: boolean;
    copyright: boolean;
  };
  brand: {
    image: string;
    imageAlt: string;
    blurb: string;
  };
  /* One line per row of FOOTER_CONTACT_ROWS, in the same order. */
  contact: {
    heading: string;
    values: string[];
  };
  newsletter: {
    heading: string;
    placeholder: string;
    joinLabel: string;
  };
  /* One address per mark in FOOTER_SOCIAL_MARKS, in the same order. */
  socials: {
    links: string[];
  };
  copyright: string;
};

export const footerDefaults: FooterContent = {
  visible: {
    logo: true,
    blurb: true,
    contact: true,
    newsletter: true,
    socials: true,
    copyright: true,
  },

  brand: {
    image: "/hcu-logo.png",
    imageAlt: "Human Concern USA",
    blurb:
      "Fighting poverty for over 46 years, HUMAN CONCERN USA is a 50l(C)(3) Tax Exempt Nonprofit.",
  },

  contact: {
    heading: "Contact Us",
    values: [
      EMAIL,
      PHONE,
      "600 E Carmel Drive Suite 147 Carmel, IN 46032",
      "Tax Exempt ID: 92-2388570",
    ],
  },

  newsletter: {
    heading: "Stay Connected",
    placeholder: "Enter your email",
    joinLabel: "Join",
  },

  socials: {
    links: [
      "https://www.facebook.com/HumanConcernUSA/",
      "https://x.com/HumanConcernUSA/",
      "https://www.instagram.com/humanconcernusa/",
      "https://www.linkedin.com/company/hcusa",
      "https://www.youtube.com/@HumanconcernUSA",
    ],
  },

  copyright: "Copyright © 2026 HC USA. All rights reserved.",
};

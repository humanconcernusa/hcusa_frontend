/*
  The Reports page wording. Plain data and types, imported by the page, the admin editor and
  the server, so the shape lives exactly once. The values below are the shipped defaults:
  with nothing published the page falls back to these.

  Lists are fixed length and matched by position, so the admin can change a row but cannot
  invent or lose one. The map pins are owned by the code, not the admin.

  The Give Hope band has a section toggle, but its words are owned by the page, as on About Us.
*/

export type ReportsSectionKey = "hero" | "intro" | "list" | "choose" | "global" | "ctaBand";

export const REPORTS_SECTION_LABELS: Record<ReportsSectionKey, string> = {
  hero: "Hero",
  intro: "About Our Reports",
  list: "Reports list",
  choose: "Why Choose Human Concern USA",
  global: "Our Global Presence",
  ctaBand: "Give Hope. Inspire Change",
};

export const REPORTS_SECTION_KEYS = Object.keys(REPORTS_SECTION_LABELS) as ReportsSectionKey[];

export type ReportCard = {
  /* The small red line above the title, such as "Annual Report". */
  label: string;
  title: string;
  body: string;
  /* Where "View Report" goes. Empty hides the button. */
  href: string;
  image: string;
  imageAlt: string;
};

export type ReportsPageContent = {
  visible: Record<ReportsSectionKey, boolean>;

  hero: {
    headingStart: string;
    headingAccent: string;
    body: string;
    cta: string;
    image: string;
    imageAlt: string;
  };

  intro: {
    headingStart: string;
    headingAccent: string;
    line1: string;
    line2: string;
    line3: string;
  };

  list: {
    groups: {
      title: string;
      intro: string;
      report: ReportCard;
    }[];
  };

  choose: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    /*
      Which donation popup this band's button opens, the way every other page that shares the
      band stores it. The Reports page shows no button here yet, so nothing reads it today;
      it is wired so the band is not the one place the popup is still written in the code.
    */
    form: string;
    image: string;
    imageAlt: string;
    /* The first point is the green pill; the rest are the four boxes. */
    points: string[];
  };

  /*
    The map itself is a Leaflet map: its base tiles and the country pins are owned by the
    code, so this section only carries its heading.
  */
  global: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
  };
};

/*
  Stand-in artwork, borrowed from the About Us images, until the real files are uploaded from
  the admin. This page has no image folder of its own yet.
*/
const ASSETS = "/images/about-us";

export const reportsDefaults: ReportsPageContent = {
  visible: {
    hero: true,
    intro: true,
    list: true,
    choose: true,
    global: true,
    ctaBand: true,
  },

  hero: {
    headingStart: "Reports &",
    headingAccent: "Transparency",
    body: "Explore our annual reports, financial audits, emergency response updates, and impact summaries. We are committed to accountability and clear reporting for our donors, partners, and communities.",
    cta: "Annual Reports",
    image: `${ASSETS}/why-choose.jpg`,
    imageAlt: "A Human Concern USA field worker sitting with a family",
  },

  intro: {
    headingStart: "About Our",
    headingAccent: "Reports",
    line1: "We believe that every donation is a trust.",
    line2: "Our reports are designed to show where funds are allocated, how programs are implemented, and what measurable outcomes are achieved.",
    line3: "Thank you for standing with us in service to those in need.",
  },

  list: {
    groups: [
      {
        title: "Strategic Plan 2023-2026",
        intro: "This plan provides a comprehensive roadmap for moving families from crisis to sustainability.",
        report: {
          label: "Annual Report",
          title: "Strategic Plan 2023-2026",
          body: "Details of our commitment to five key pillars: emergency response, child sponsorship, hunger alleviation, clean water access, and local USA programming.",
          href: "",
          image: `${ASSETS}/approach-2.png`,
          imageAlt: "The cover of the Human Concern USA Strategic Plan 2023-2026",
        },
      },
      {
        title: "Annual Report 2025",
        intro: "",
        report: {
          label: "Annual Report",
          title: "HC_USA Annual Report 2025",
          body: "",
          href: "",
          image: `${ASSETS}/approach-3.png`,
          imageAlt: "The cover of the Human Concern USA Annual Report 2025",
        },
      },
    ],
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    form: "general",
    image: `${ASSETS}/story-rifat.webp`,
    imageAlt: "Children supported by Human Concern USA",
    points: [
      "45+ years of trusted humanitarian service",
      "Transparent & Accountable",
      "Partnered with certified medical organizations",
      "Rapid crisis response teams",
      "Serving globally & locally",
    ],
  },

  global: {
    headingStart: "Our",
    headingAccent: "Global",
    headingEnd: "Presence",
  },
};

export const REPORTS_LIMIT_LONG = 2000;
export const REPORTS_LIMIT_SHORT = 200;
export const REPORTS_LONG_FIELDS = new Set(["body", "line2", "imageAlt", "intro", "href"]);

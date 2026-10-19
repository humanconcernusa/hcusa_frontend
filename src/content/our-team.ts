/*
  The Our Team page wording. Plain data and types, imported by the page, the admin editor
  and the server. The values below are the shipped defaults.

  Lists are fixed length and matched by position, so the admin can change a row but cannot
  invent or lose one.

  This page has no donation popup. Its two hero buttons are links, so their destinations are
  owned by the code rather than being a field.
*/

export type OurTeamSectionKey =
  | "hero"
  | "integrity"
  | "team"
  | "board"
  | "standFor"
  | "join";

export const OUR_TEAM_SECTION_LABELS: Record<OurTeamSectionKey, string> = {
  hero: "Hero",
  integrity: "Leading With Integrity",
  team: "Our Team",
  board: "Board Of Directors",
  standFor: "What We Stand For",
  join: "Join the HC USA team",
};

export const OUR_TEAM_SECTION_KEYS = Object.keys(
  OUR_TEAM_SECTION_LABELS,
) as OurTeamSectionKey[];

export type OurTeamPageContent = {
  visible: Record<OurTeamSectionKey, boolean>;

  hero: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    body: string;
    /*
      The words inside the paragraph that carry a red underline, as the live page has on
      "46 years". Leave it empty for no underline, or change it if the wording changes.
    */
    bodyHighlight: string;
    primaryCta: string;
    secondaryCta: string;
    image: string;
    imageAlt: string;
  };

  integrity: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    body: string;
    points: string[];
    cta: string;
    image: string;
    imageAlt: string;
  };

  team: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    subtitle: string;
    members: { name: string; role: string; image: string; imageAlt: string }[];
  };

  board: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    subtitle: string;
    members: { name: string; role: string; image: string; imageAlt: string }[];
  };

  standFor: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    items: { title: string }[];
    image: string;
    imageAlt: string;
  };

  join: {
    heading: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const ASSETS = "/images/our-team";

/* The grey avatar, which is what a member with no photo saved shows. */
const AVATAR = `${ASSETS}/avatar.png`;

export const ourTeamDefaults: OurTeamPageContent = {
  visible: {
    hero: true,
    integrity: true,
    team: true,
    board: true,
    standFor: true,
    join: true,
  },

  hero: {
    eyebrow: "Meet the team",
    headingStart: "Behind the",
    headingAccent: "Mission",
    body: "Dedicated, compassionate, and committed to serving humanity for over 46 years. Together, we work to uplift vulnerable communities and deliver hope where it's needed most.",
    bodyHighlight: "46 years",
    primaryCta: "Contact Our Team",
    secondaryCta: "Join Us / Become a Volunteer",
    /* The original file, not a resized copy: a full-width hero needs every pixel. */
    image: `${ASSETS}/hero.webp`,
    imageAlt: "Children holding food bags at a Human Concern USA school distribution",
  },

  integrity: {
    headingStart: "Leading With Integrity,",
    headingAccent: "Transparency",
    headingEnd: "& Compassion",
    body: "Human Concern USA is powered by a community of passionate leaders, staff, and volunteers who believe in responsibility, service, and impact. Our team brings diverse expertise and shares a unified mission to help those in need with dignity and accountability.",
    points: [
      "Transparent and ethical leadership practices",
      "Experience in humanitarian relief and development",
      "Community-first and donor-trust centered",
      "Guided by faith-driven values and responsibility",
    ],
    cta: "Help Save Lives",
    image: `${ASSETS}/integrity.png`,
    imageAlt: "Human Concern USA volunteers and staff with Ramadan food baskets",
  },

  team: {
    eyebrow: "Guiding strategy",
    headingStart: "Our",
    headingAccent: "Team",
    subtitle: "Vision and Growth",
    members: [
      {
        name: "Masum Mahbub",
        role: "Chief Executive Officer",
        image: `${ASSETS}/member-masum.png`,
        imageAlt: "Masum Mahbub",
      },
      {
        name: "Zaynab Abdi",
        role: "Programs Officer",
        image: `${ASSETS}/member-zaynab.png`,
        imageAlt: "Zaynab Abdi",
      },
      {
        name: "Mahdi Rahman",
        role: "Data Service Officer",
        image: `${ASSETS}/member-mahdi.png`,
        imageAlt: "Mahdi Rahman",
      },
      {
        name: "Miriam Motaweh",
        role: "Marketing Lead",
        image: AVATAR,
        imageAlt: "Miriam Motaweh",
      },
      {
        name: "Yasmin Elmakkawey",
        role: "Executive Assistant",
        image: AVATAR,
        imageAlt: "Yasmin Elmakkawey",
      },
      {
        name: "Sumeya Mohamednur",
        role: "Donor Care Officer",
        image: AVATAR,
        imageAlt: "Sumeya Mohamednur",
      },
    ],
  },

  board: {
    eyebrow: "Accountability",
    headingStart: "Board Of",
    headingAccent: "Directors",
    subtitle: "Governance and Vision",
    members: [
      {
        name: "Dr. Sohel Anwar",
        role: "Chair of the Board",
        image: AVATAR,
        imageAlt: "Dr. Sohel Anwar",
      },
      { name: "Sharmila Usmani", role: "Secretary", image: AVATAR, imageAlt: "Sharmila Usmani" },
      {
        name: "Tanweer Ebrahim",
        role: "Board Member",
        image: AVATAR,
        imageAlt: "Tanweer Ebrahim",
      },
    ],
  },

  standFor: {
    headingStart: "What We",
    headingAccent: "Stand",
    headingEnd: "For",
    items: [
      { title: "Accountability & Transparency" },
      { title: "Compassion in Action" },
      { title: "Community Empowerment" },
      { title: "Faith-Driven Responsibility" },
      { title: "Respect & Dignity for All" },
      { title: "Inclusive and Empowering" },
    ],
    image: `${ASSETS}/stand-for.jpg`,
    imageAlt: "Volunteers packing food boxes in a Human Concern USA warehouse",
  },

  join: {
    heading: "Join the HC USA team",
    primaryCta: "Volunteer",
    secondaryCta: "Careers",
  },
};

export const OUR_TEAM_LIMIT_LONG = 1200;
export const OUR_TEAM_LIMIT_SHORT = 200;
export const OUR_TEAM_LONG_FIELDS = new Set(["body", "imageAlt", "headingStart"]);

/*
  Links owned by the code, not the admin. The volunteer address is the real one from the live
  site; the other two point at the join band until those pages exist, so nothing 404s.
*/
export const OUR_TEAM_LINKS = {
  contact: "#join",
  volunteer: "https://volunteer.bloomerang.co/volunteer/#/join-party?k=7tzvzeb38wawsx",
  careers: "#join",
};

/*
  One source of truth for the home page wording and which sections show.

  This file is plain data and types. It is imported by the public page, by the admin
  editor and by the server, so the shape lives in exactly one place.

  The values below are the built-in defaults. The database starts empty and the site
  falls back to these, so it can never render blank.
*/

export type SectionKey =
  | "hero"
  | "videoBanner"
  | "impact"
  | "programs"
  | "testimonial"
  | "ceoMessage"
  | "ctaBand";

export const SECTION_LABELS: Record<SectionKey, string> = {
  hero: "Hero",
  videoBanner: "Video banner",
  impact: "Our Global Impact",
  programs: "Our Work Across the Globe",
  testimonial: "What People Say",
  ceoMessage: "CEO's Message",
  ctaBand: "Give Hope. Inspire Change",
};

export const SECTION_KEYS = Object.keys(SECTION_LABELS) as SectionKey[];

export type HomeContent = {
  hero: {
    badge: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    callout: string;
    primaryCta: string;
    secondaryCta: string;
    /* Which donation popup the main button opens. */
    form: string;
    tags: string[];
    image: string;
    imageAlt: string;
  };
  videoBanner: {
    image: string;
    imageAlt: string;
    videoId: string;
  };
  impact: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    intro: string;
    headline: string;
    headlineLabel: string;
    headlineNote: string;
    stats: { value: string; label: string }[];
  };
  programs: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    subtitle: string;
    /*
      Always three cards. The image, the two figures and the wording are edited in the
      admin. `form` and `href` are owned by the code and only carried through a save.
    */
    cards: {
      image: string;
      imageAlt: string;
      raised: number;
      goal: number;
      title: string;
      text: string;
      cta: string;
      form: string;
      href: string;
    }[];
  };
  testimonial: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    quote: string;
    author: string;
    supporter: string;
    cta: string;
    /* Which donation popup this button opens. */
    form: string;
    image: string;
    imageAlt: string;
  };
  ceoMessage: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    subtitle: string;
    title: string;
    quote: string;
    name: string;
    role: string;
    org: string;
    cta: string;
    image: string;
    imageAlt: string;
  };
  ctaBand: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

export type HomePageContent = HomeContent & {
  visible: Record<SectionKey, boolean>;
};

export const homeDefaults: HomePageContent = {
  hero: {
    badge: "46 Years of Hope",
    headingStart: "Your",
    headingAccent: "Compassion",
    headingEnd: "Their Lifeline",
    callout: "Your donation provides life-saving water, food, and care to families in need",
    primaryCta: "Donate Now",
    secondaryCta: "Learn More",
    form: "general",
    tags: ["Clean Water", "Orphan Care", "Food Aid"],
    image: "/images/hero.webp",
    imageAlt: "Children outside their school",
  },
  videoBanner: {
    image: "/images/celebration.png",
    imageAlt: "Children celebrating with their school books",
    videoId: "ztjMTIg_YDI",
  },
  impact: {
    headingStart: "Our",
    headingAccent: "Global",
    headingEnd: "Impact",
    intro: "Together, we reached millions through lifesaving aid, education, and empowerment.",
    headline: "1.4M",
    headlineLabel: "Total Lives Impacted",
    headlineNote:
      "Cumulative number of people reached through Human Concern USA programs, trainings, and partner interventions.",
    stats: [
      { value: "690K", label: "Individuals served" },
      { value: "1.8K", label: "Professionals trained" },
      { value: "298", label: "Programs delivered" },
    ],
  },
  programs: {
    eyebrow: "Restoring dignity",
    headingStart: "Our Work Across",
    headingAccent: "the Globe",
    subtitle: "One Community at a Time",
    cards: [
      {
        image: "/images/campaign-1.webp",
        imageAlt: "Healthcare workers with a family in a remote community",
        raised: 7938,
        goal: 10000,
        title: "Healthcare for Vulnerable Communities",
        text: "Lifesaving care to remote communities",
        cta: "Donate Now",
        form: "healthcare",
        href: "/improving-healthcare",
      },
      {
        image: "/images/campaign-2.png",
        imageAlt: "Children in a village supported by the West Africa appeal",
        raised: 8376,
        goal: 10000,
        title: "Africa's Forgotten Ummah",
        text: "Water, food, and care for West Africa",
        cta: "Donate Now",
        form: "africa",
        href: "#programs",
      },
      {
        image: "/images/campaign-3.png",
        imageAlt: "Medical students studying with scholarship support",
        raised: 26201,
        goal: 30000,
        title: "Gaza Scholarship",
        text: "Fund Gaza's future doctors. Give hope with scholarships.",
        cta: "Donate Now",
        form: "gaza",
        href: "#programs",
      },
    ],
  },
  testimonial: {
    eyebrow: "Trusted by donors globally",
    headingStart: "What",
    headingAccent: "People",
    headingEnd: "Say",
    quote:
      "I truly believe your efforts make a great difference in supporting people in need, and your work is indispensable. I always recommend your organisation, and I will continue to support you so that you can keep providing help to others in need.",
    author: "Jazak Allahu Khair",
    supporter: "Jasmina",
    cta: "Donate Now",
    form: "general",
    image: "/images/testimonial-jasmina.webp",
    imageAlt: "Jasmina, a supporter of Human Concern USA",
  },
  ceoMessage: {
    eyebrow: "Guided by compassion, committed to impact",
    headingStart: "CEO's",
    headingAccent: "Message",
    subtitle: "Inspired by You",
    title: "Rooted in Compassion",
    quote:
      "As an international humanitarian organization, Human Concern USA's work is guided by the values of compassion, integrity, transparency, and human dignity. We believe that every person deserves the opportunity to live a life of hope, health, and opportunity regardless of geography or circumstance.",
    name: "Masum Mahbub",
    role: "Chief Executive Officer",
    org: "Human Concern USA",
    cta: "Learn More",
    image: "/images/ceo-masum-mahbub.webp",
    imageAlt: "Masum Mahbub, Chief Executive Officer",
  },
  ctaBand: {
    headingStart: "Give Hope.",
    headingAccent: "Inspire",
    headingEnd: "Change",
    subtitle: "We'd love to hear from you.",
    primaryCta: "Become a Volunteer",
    secondaryCta: "Travel with Us",
  },
  visible: {
    hero: true,
    videoBanner: true,
    impact: true,
    programs: true,
    testimonial: true,
    ceoMessage: true,
    ctaBand: true,
  },
};

/* Field length limits. Long prose gets more room than a label. */
export const LIMIT_LONG = 800;
export const LIMIT_SHORT = 200;

export const LONG_FIELDS = new Set(["quote", "callout", "intro", "headlineNote", "imageAlt"]);

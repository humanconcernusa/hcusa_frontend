/*
  The Healthcare page wording, in one place.

  Plain data and types, imported by the page, the admin editor and the server, so the shape
  lives exactly once. The values below are the shipped defaults: with nothing published the
  page falls back to these, so it can never render blank.

  Only text lives here. The icon for each card is owned by the code, because an icon picker
  is not worth a field.
*/

export type WhyCard = {
  title: string;
};

export type GivingLevel = {
  amount: string;
  text: string;
  /* Each card has its own button label, and its own donation popup. */
  cta: string;
  form: string;
};

export type HealthcareSectionKey =
  | "hero"
  | "why"
  | "stories"
  | "counters"
  | "giving"
  | "choose"
  | "ctaBand";

export const HEALTHCARE_SECTION_LABELS: Record<HealthcareSectionKey, string> = {
  hero: "Hero",
  why: "Why Healthcare Access Is Critical",
  stories: "Real Stories video",
  counters: "The counters band",
  giving: "Giving Levels",
  choose: "Why Choose Human Concern USA",
  ctaBand: "Give Hope. Inspire Change",
};

export const HEALTHCARE_SECTION_KEYS = Object.keys(
  HEALTHCARE_SECTION_LABELS,
) as HealthcareSectionKey[];

export type HealthcarePageContent = {
  /* Turn a section off and it leaves the page completely. */
  visible: Record<HealthcareSectionKey, boolean>;
  hero: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    body: string;
    cta: string;
    /* Which donation popup this button opens. */
    form: string;
    image: string;
    imageAlt: string;
  };
  why: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    /* The short line the live page puts between the heading and the paragraph. */
    lead: string;
    body: string;
    cta: string;
    cards: WhyCard[];
  };
  stories: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    videoId: string;
  };
  counters: {
    firstLabel: string;
    firstCaption: string;
    firstValue: number;
    secondLabel: string;
    secondCaption: string;
    secondValue: number;
  };
  giving: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    levels: GivingLevel[];
  };
  choose: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    cta: string;
    /* Which donation popup this button opens. */
    form: string;
    image: string;
    imageAlt: string;
    /* The first one is the pill above the grid; the rest are the four boxes. */
    points: string[];
  };
};

export const healthcareDefaults: HealthcarePageContent = {
  visible: {
    hero: true,
    why: true,
    stories: true,
    counters: true,
    giving: true,
    choose: true,
    ctaBand: true,
  },
  hero: {
    eyebrow: "Healthcare Access",
    headingStart: "Saving Lives",
    headingAccent: "Restoring Dignity",
    body: "Your support provides medical care, essential treatments, emergency response, and long-term health solutions to vulnerable communities.",
    cta: "Make A Donation",
    form: "healthcare-1",
    /*
      The page's own asset folder. This one is 1920x1080 with the left side left dark for
      the card, which is why it frames correctly and a tighter crop of the same scene does not.
    */
    image: "/images/healthcare/hero.png",
    imageAlt: "A Human Concern USA health worker at a clinic desk",
  },
  why: {
    eyebrow: "Millions lack medical support",
    headingStart: "Why",
    headingAccent: "Healthcare",
    headingEnd: "Access Is Critical",
    lead: "They face preventable illness.",
    body: "In underserved communities, families struggle to access basic medical care, medication, surgeries, maternal services, and emergency treatment. Lack of healthcare affects education, ability to work, and community stability. With your support, Human Concern USA provides life-saving care and improves long-term well-being.",
    cta: "Help Save Lives",
    cards: [
      { title: "Medical Treatments" },
      { title: "Child Healthcare" },
      { title: "Medication" },
      { title: "Medical Aid" },
    ],
  },
  stories: {
    eyebrow: "Meet those whose lives changed",
    headingStart: "Real",
    headingAccent: "Stories",
    headingEnd: "of Healing & Hope",
    videoId: "3279slWUlwA",
  },
  counters: {
    firstLabel: "Patients",
    firstCaption: "Served",
    firstValue: 44826,
    secondLabel: "Projects",
    secondCaption: "Delivered",
    secondValue: 9,
  },
  giving: {
    eyebrow: "Provide life-saving care",
    headingStart: "Giving",
    headingAccent: "Levels",
    levels: [
      {
        amount: "60",
        text: "Emergency meals for a family",
        cta: "Donate Now",
        form: "healthcare-1",
      },
      {
        amount: "100",
        text: "Clean water for multiple families",
        cta: "Donate Now",
        form: "healthcare-2",
      },
      {
        amount: "250",
        text: "Medical aid & critical care support",
        cta: "Donate Now",
        form: "healthcare-3",
      },
      {
        amount: "500",
        text: "Emergency shelter & survival kit",
        cta: "Donate Now",
        form: "healthcare-4",
      },
    ],
  },
  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "healthcare-4",
    image: "/images/healthcare/why-choose.jpg",
    imageAlt: "Human Concern USA volunteers distributing medical supplies",
    points: [
      "46 years of trusted humanitarian service",
      "Transparent & Accountable",
      "Partnered with certified medical organizations",
      "Rapid crisis response teams",
      "Serving globally & locally",
    ],
  },
};

/* Field length limits, matching the home page rules. */
export const HEALTHCARE_LIMIT_LONG = 800;
export const HEALTHCARE_LIMIT_SHORT = 200;

export const HEALTHCARE_LONG_FIELDS = new Set(["body", "imageAlt"]);

export const MAX_POINTS = 8;
export const MAX_LEVELS = 8;
export const MAX_WHY_CARDS = 6;

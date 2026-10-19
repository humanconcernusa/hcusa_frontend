/*
  The Emergency Flood Relief page wording.

  The page follows the same shape as the other appeals, so it reads and is edited the same way.
  The wording is this page's own wherever it had some — the hero, the three country cards, the
  giving amounts and the figures. The aid grid and the three response steps carry the shared
  wording, because this page never had its own.

  Every button on this page carries a `form`: the donation popup it opens. The admin picks it from
  a dropdown, which appears automatically beside any `cta` that has a `form` next to it.
*/

import type { HealthcarePageContent } from "./healthcare";

export type FloodCard = {
  title: string;
  body: string;
};

export type FloodReliefItem = {
  line1: string;
  line2: string;
  /* The saved icon for this tile. Empty on the last two, which keep the drawn one. */
  icon: string;
};

export type FloodStep = {
  number: string;
  title: string;
  text: string;
  image: string;
};

export type FloodStat = {
  value: number;
  label: string;
};

export type FloodGivingLevel = {
  amount: string;
  text: string;
};

export type FloodReliefPageContent = {
  hero: {
    badge: string;
    headingAccent: string;
    headingEnd: string;
    paragraphs: string[];
    cta: string;
    form: string;
    image: string;
    imageAlt: string;
  };
  alert: string;
  happening: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    cards: FloodCard[];
    image: string;
    imageAlt: string;
    cta: string;
    form: string;
  };
  helps: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    items: FloodReliefItem[];
    image: string;
    imageAlt: string;
    cta: string;
    form: string;
  };
  responds: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    subtitle: string;
    steps: FloodStep[];
  };
  stats: FloodStat[];
  giving: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    levels: FloodGivingLevel[];
    cta: string;
    form: string;
  };
  choose: HealthcarePageContent["choose"];
};

const ASSETS = "/images/flood-relief";

export const floodReliefDefaults: FloodReliefPageContent = {
  hero: {
    badge: "Emergency Relief",
    headingAccent: "South Asia",
    headingEnd: "Flood Relief",
    paragraphs: [
      "Floods in Pakistan, Bangladesh & India have claimed 800+ lives, displaced tens of thousands, and left millions vulnerable.",
      "HCI responded within 36 hours during the 2022 Pakistan floods, delivering food, water, and shelter. Today, we are on the ground once again, bringing life-saving aid where it's needed most.",
    ],
    cta: "Be the Lifeline. Donate Now.",
    form: "flood",
    image: `${ASSETS}/hero.png`,
    imageAlt: "Human Concern USA volunteers carrying relief supplies through a village in Pakistan",
  },

  alert: "Alert - Immediate Help Needed",

  happening: {
    eyebrow: "This monsoon season has been catastrophic across South Asia.",
    headingStart: "What's",
    headingAccent: "Happening",
    headingEnd: "in South Asia",
    cards: [
      {
        title: "Pakistan",
        body: "More than 800 people have died and over 29,000 have been displaced, with entire villages in Buner and Swat wiped away.",
      },
      {
        title: "Bangladesh",
        body: "Recent floods have impacted over 5 million people, displacing 500,000 families and destroying homes, crops, and livelihoods.",
      },
      {
        title: "India",
        body: "Communities face heavy rains and landslides, with families caught in the cycle of hunger and disease.",
      },
    ],
    image: `${ASSETS}/remote.png`,
    imageAlt: "Relief workers standing among collapsed homes in a mountain village",
    cta: "Provide Lifesaving Support",
    form: "flood",
  },

  helps: {
    headingStart: "How Your",
    headingAccent: "Donation",
    headingEnd: "Helps",
    items: [
      { line1: "Emergency", line2: "Food Packs", icon: `${ASSETS}/relief-food-packs.svg` },
      { line1: "Clean Water", line2: "& Filtration", icon: `${ASSETS}/relief-water.svg` },
      { line1: "Medical Aid", line2: "& Treatment", icon: `${ASSETS}/relief-medical.svg` },
      {
        line1: "Shelter & Basic",
        line2: "Survival Kits",
        icon: `${ASSETS}/relief-shelter.svg`,
      },
      { line1: "Child & Family", line2: "Support", icon: "" },
      { line1: "Hygiene &", line2: "Emergency Kits", icon: "" },
    ],
    image: `${ASSETS}/homes.png`,
    imageAlt: "A man holding a mobile clinic record card in a crowded relief queue",
    cta: "Provide Lifesaving Support",
    form: "flood",
  },

  responds: {
    eyebrow: "Rapid, local-partner supported",
    headingStart: "How Human Concern",
    headingAccent: "USA Responds",
    headingEnd: "to Crisis",
    subtitle: "Accountable action",
    steps: [
      {
        number: "01",
        title: "Identify Rapid Needs Assessment",
        text: "Begin the journey of change",
        image: `${ASSETS}/step-1.png`,
      },
      {
        number: "02",
        title: "Emergency Distribution",
        text: "Begin the journey of change",
        image: `${ASSETS}/step-2.png`,
      },
      {
        number: "03",
        title: "Long-term Recovery Support",
        text: "Deploy Emergency Supplies",
        image: `${ASSETS}/step-3.png`,
      },
    ],
  },

  stats: [
    { value: 5000000, label: "People affected across South Asia" },
    { value: 500000, label: "Families displaced and without shelter" },
  ],

  giving: {
    eyebrow: "Your gift powers emergencies where it's needed most",
    headingStart: "Your Gift Delivers",
    headingAccent: "Emergency",
    headingEnd: "Relief",
    levels: [
      {
        amount: "100",
        text: "Provide food and clean water to sustain a family fighting to survive",
      },
      {
        amount: "175",
        text: "Deliver food staples plus a hygiene kit, protecting a family from hunger and disease",
      },
      {
        amount: "250",
        text: "Give an emergency shelter kit so a flood-hit family has safety and dignity",
      },
      {
        amount: "500",
        text: "Provide food and clean water for five families, keeping them alive through disaster",
      },
    ],
    cta: "Donate Now",
    form: "flood",
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "flood",
    image: `${ASSETS}/choose.png`,
    imageAlt: "Human Concern USA volunteers packing food boxes",
    points: [
      "45+ years of trusted humanitarian service.",
      "Rapid emergency relief deployment",
      "Local partner networks for access & accuracy",
      "Transparent reporting & donor accountability",
      "Faith-driven humanitarian values",
    ],
  },
};

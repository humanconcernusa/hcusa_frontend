/*
  The Lebanon Emergency Relief page wording.

  The page follows the same shape as the other appeals, so it reads and is edited the same way.
  The wording is this page's own wherever it had some — the hero, the crisis paragraphs, the five
  needs, the figures and the giving amounts. The aid grid's photos and the response steps carry
  the shared wording, because this page never had its own.

  Every button on this page carries a `form`: the donation popup it opens. The admin picks it from
  a dropdown, which appears automatically beside any `cta` that has a `form` next to it.
*/

import type { HealthcarePageContent } from "./healthcare";

export type LebanonCard = {
  title: string;
  body: string;
};

export type LebanonReliefItem = {
  line1: string;
  line2: string;
  /* The saved icon for this tile. Empty on the last two, which keep the drawn one. */
  icon: string;
};

export type LebanonStep = {
  number: string;
  title: string;
  text: string;
  image: string;
};

export type LebanonStat = {
  value: number;
  label: string;
};

export type LebanonGivingLevel = {
  amount: string;
  text: string;
};

export type LebanonPageContent = {
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
    cards: LebanonCard[];
    image: string;
    imageAlt: string;
    cta: string;
    form: string;
  };
  helps: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    items: LebanonReliefItem[];
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
    steps: LebanonStep[];
  };
  stats: LebanonStat[];
  giving: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    levels: LebanonGivingLevel[];
    cta: string;
    form: string;
  };
  choose: HealthcarePageContent["choose"];
};

const ASSETS = "/images/lebanon-emergency";

export const lebanonDefaults: LebanonPageContent = {
  hero: {
    badge: "Emergency Relief",
    headingAccent: "Lebanon",
    headingEnd: "Emergency Relief",
    paragraphs: [
      "Families across Lebanon are being forced from their homes as violence, airstrikes, and instability continue to deepen the crisis.",
      "Many are sheltering in overcrowded schools, mosques, community centres, and unfinished buildings with limited access to food, clean water, medicine, and basic supplies.",
      "Your donation can help provide emergency food, hygiene essentials, shelter support, clean water, and urgent care to families affected by the crisis in Lebanon.",
    ],
    cta: "Donate Now",
    form: "lebanon",
    image: `${ASSETS}/hero.png`,
    imageAlt:
      "Human Concern USA volunteers carrying a crate of eggs and a food distribution box in Lebanon",
  },

  alert: "Zakat-eligible donations accepted where applicable.",

  happening: {
    eyebrow: "When families flee, the most basic needs become urgent",
    headingStart: "Every Day Without Aid Makes",
    headingAccent: "Survival Harder",
    headingEnd: "",
    cards: [
      {
        title: "Shelter Is Overcrowded",
        body: "Families who fled with little or nothing are now trying to survive in overcrowded shelters and temporary spaces.",
      },
      {
        title: "Food and Medicine Run Out",
        body: "Food runs out quickly. Medicine becomes harder to access. Children lose routine, safety, and school. Elderly people and persons with disabilities face even greater barriers to care.",
      },
      {
        title: "Urgent Support Is Needed",
        body: "Your donation helps provide urgent support when families need it most.",
      },
    ],
    image: `${ASSETS}/survival.png`,
    imageAlt: "A Human Concern USA volunteer in a red vest carrying a young child through a camp",
    cta: "Send Relief Today",
    form: "lebanon",
  },

  helps: {
    headingStart: "What",
    headingAccent: "Families",
    headingEnd: "Need Right Now",
    items: [
      { line1: "Food", line2: "Support", icon: `${ASSETS}/need-food.svg` },
      { line1: "Hygiene", line2: "Essentials", icon: `${ASSETS}/need-hygiene.svg` },
      { line1: "Shelter", line2: "Support", icon: `${ASSETS}/need-shelter.svg` },
      { line1: "Clean", line2: "Water", icon: `${ASSETS}/need-water.svg` },
      { line1: "Urgent", line2: "Family Care", icon: `${ASSETS}/need-family.svg` },
    ],
    image: `${ASSETS}/hardship.png`,
    imageAlt: "A Human Concern USA worker handing a food box to a family in Lebanon",
    cta: "Support Now",
    form: "lebanon",
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
    { value: 1000000, label: "People uprooted from their homes" },
    { value: 390000, label: "Children displaced" },
    { value: 600, label: "Children killed or injured since March 2" },
    { value: 46, label: "Primary health care centres closed" },
  ],

  giving: {
    eyebrow: "Your gift powers emergencies where it's needed most",
    headingStart: "Help Provide",
    headingAccent: "Urgent",
    headingEnd: "Relief",
    levels: [
      { amount: "100", text: "Help provide emergency food for a displaced family." },
      { amount: "200", text: "Help deliver food, hygiene items, and essential supplies." },
      { amount: "350", text: "Help support shelter items, clean water, and urgent family care." },
      {
        amount: "500",
        text: "Help provide broader emergency support for families facing displacement.",
      },
    ],
    cta: "Give Emergency Relief",
    form: "lebanon",
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "lebanon",
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

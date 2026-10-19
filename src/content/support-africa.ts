/*
  The Support Africa's Forgotten Ummah page wording. The two component files under
  src/components/support-africa read from here, so the admin can edit this page's copy without
  touching code.

  Every button on this page carries a `form`: the donation popup it opens. The admin picks it from
  a dropdown, which appears automatically beside any `cta` that has a `form` next to it.
*/

import type { HealthcarePageContent } from "./healthcare";

export type SupportAfricaCard = {
  title: string;
  body: string;
};

export type SupportAfricaReliefItem = {
  line1: string;
  line2: string;
  icon: string;
};

export type SupportAfricaStep = {
  number: string;
  title: string;
  text: string;
  image: string;
};

export type SupportAfricaGivingLevel = {
  amount: string;
  text: string;
};

export type SupportAfricaPageContent = {
  hero: {
    badge: string;
    headingAccent: string;
    headingEnd: string;
    headingLine: string;
    body: string;
    cta: string;
    form: string;
    image: string;
    imageAlt: string;
  };
  alert: string;
  why: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    subtitle: string;
    cards: SupportAfricaCard[];
    image: string;
    imageAlt: string;
    cta: string;
    form: string;
  };
  relief: {
    headingStart: string;
    headingAccent: string;
    headingAccentTwo: string;
    headingEnd: string;
    items: SupportAfricaReliefItem[];
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
    steps: SupportAfricaStep[];
  };
  video: {
    image: string;
    imageAlt: string;
    videoId: string;
  };
  giving: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    levels: SupportAfricaGivingLevel[];
    cta: string;
    form: string;
  };
  choose: HealthcarePageContent["choose"];
};

const ASSETS = "/images/support-africa";

export const supportAfricaDefaults: SupportAfricaPageContent = {
  hero: {
    badge: "Emergency Relief",
    headingAccent: "Support",
    headingEnd: "Africa's",
    headingLine: "Forgotten Ummah",
    body: "Provide life-saving food, clean water, and sustainable healthcare to vulnerable communities across Africa",
    cta: "Donate Now",
    form: "africa",
    image: `${ASSETS}/hero.png`,
    imageAlt: "Two children supported by the Support Africa appeal",
  },

  alert: "Alert - Immediate Help Needed",

  why: {
    eyebrow: "Multiple crises are threatening lives",
    headingStart: "Why Your",
    headingAccent: "Immediate",
    headingEnd: "Help is Needed",
    subtitle: "Across Underserved African Regions.",
    cards: [
      {
        title: "The Challenges",
        body: "African communities are currently battling a \u201cperfect storm\u201d of conflict, severe drought, famine, and economic collapse.",
      },
      {
        title: "The Critical Gaps",
        body: "Families are living without the most basic human necessities. Clean water, nutritious food, healthcare, and safe shelter.",
      },
      {
        title: "The Most at Risk",
        body: "Millions of people have been displaced from their homes, with children and the elderly facing the greatest threat to survival.",
      },
      {
        title: "The Opportunity",
        body: "Your support provides immediate emergency relief and life-saving intervention where it is needed most.",
      },
    ],
    image: `${ASSETS}/why-needed.webp`,
    imageAlt: "Children celebrating after a water point is restored",
    cta: "Provide Lifesaving Support",
    form: "africa",
  },

  relief: {
    headingStart: "Your Support",
    headingAccent: "Brings",
    headingAccentTwo: "Relief",
    headingEnd: "and Hope",
    items: [
      { line1: "Emergency", line2: "Food Packs", icon: `${ASSETS}/relief-food-packs.svg` },
      { line1: "Clean Water", line2: "& Filtration", icon: `${ASSETS}/relief-water.svg` },
      { line1: "Medical Aid", line2: "& Treatment", icon: `${ASSETS}/relief-medical.svg` },
      { line1: "Shelter & Basic", line2: "Survival Kits", icon: `${ASSETS}/relief-shelter.svg` },
      { line1: "Nutritious Meals", line2: "for Children", icon: `${ASSETS}/relief-meals.svg` },
      {
        line1: "Livelihood &",
        line2: "Recovery Support",
        icon: `${ASSETS}/relief-livelihood.svg`,
      },
    ],
    image: `${ASSETS}/relief.jpg`,
    imageAlt: "Children gathered around a village water point",
    cta: "Provide Lifesaving Support",
    form: "africa",
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
        title: "Identify Critical Needs",
        text: "Begin the journey of change",
        image: `${ASSETS}/step-1.png`,
      },
      {
        number: "02",
        title: "Deploy Emergency Supplies",
        text: "Begin the journey of change",
        image: `${ASSETS}/step-2.png`,
      },
      {
        number: "03",
        title: "Sustain and Rebuild",
        text: "Deploy Emergency Supplies",
        image: `${ASSETS}/step-3.png`,
      },
    ],
  },

  video: {
    image: `${ASSETS}/imgi_84_hands.png`,
    imageAlt: "Video: hands reaching out in support",
    videoId: "t3qEFqzsU84",
  },

  giving: {
    eyebrow: "Every gift helps save lives",
    headingStart: "How You Can",
    headingAccent: "Help",
    headingEnd: "Right Now",
    levels: [
      { amount: "60", text: "Emergency meals for a family" },
      { amount: "100", text: "Clean water for multiple families" },
      { amount: "250", text: "Medical aid & critical care support" },
      { amount: "500", text: "Emergency shelter & survival kit" },
    ],
    cta: "Donate Now",
    form: "africa",
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "africa",
    image: `${ASSETS}/choose.jpg`,
    imageAlt: "A Human Concern USA water point serving a village",
    points: [
      "45+ years of trusted humanitarian service",
      "Transparent & Accountable",
      "Partnered with certified medical organizations",
      "Rapid crisis response teams",
      "Serving globally & locally",
    ],
  },
};

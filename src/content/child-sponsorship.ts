/*
  The Child Sponsorship page wording.

  It follows the food-aid and water-aid pages' shape, plus two bands of its own: the Global
  Sponsorship Locations map and the Frequently Asked Questions list.

  Every button opens the "general" popup for now.
*/

import type { HealthcarePageContent, HealthcareSectionKey } from "./healthcare";

export type ChildSponsorshipPageContent = Omit<HealthcarePageContent, "visible" | "why"> & {
  visible: Record<HealthcareSectionKey | "global" | "faq", boolean>;
  /* Which donation popup the "Why" band's button opens. */
  why: HealthcarePageContent["why"] & { form: string };
  global: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    body: string;
  };
  faq: {
    heading: string;
    items: { question: string; answer: string }[];
  };
};

/* The page's own artwork, saved under public/images/child-sponsorship. */
const ASSETS = "/images/child-sponsorship";

export const childSponsorshipDefaults: ChildSponsorshipPageContent = {
  visible: {
    hero: true,
    why: true,
    stories: true,
    counters: true,
    giving: true,
    choose: true,
    ctaBand: true,
    global: true,
    faq: true,
  },

  hero: {
    eyebrow: "Child Sponsorship",
    headingStart: "Change a Life",
    headingAccent: "Forever",
    body: "Provide vulnerable children with the food, education, and healthcare needed to break the cycle of poverty and build a brighter future.",
    cta: "Make A Donation",
    form: "child-sponsorship",
    image: `${ASSETS}/hero.webp`,
    imageAlt: "Children supported by the Human Concern USA child sponsorship programme",
  },

  why: {
    eyebrow: "A small monthly gift creates long-term impact.",
    headingStart: "Why",
    headingAccent: "Sponsor",
    headingEnd: "a Child?",
    lead: "",
    body: "Millions of children struggle to access basic needs such as food, clean water, education, and medical care. Sponsoring a child allows you to support their well-being and future, helping them grow healthy, educated, and independent. Your support empowers families and strengthens entire communities.",
    cta: "Sponsor a Child Today",
    form: "child-sponsorship",
    cards: [
      { title: "Education Support" },
      { title: "Healthcare Access" },
      { title: "Food & Nutrition" },
      { title: "Social Support" },
    ],
  },

  stories: {
    eyebrow: "Covers education & nutrition",
    headingStart: "Stories",
    headingAccent: "of",
    headingEnd: "Transformation",
    videoId: "Q-_2TEAAWfA",
    image: `${ASSETS}/video.jpg`,
    imageAlt: 'Covers education & nutrition Image'
  },

  counters: {
    firstCaption: "Benefited",
    firstLabel: "People",
    firstValue: 12167,
    secondCaption: "Sponsored",
    secondLabel: "Children",
    secondValue: 1833,
  },

  giving: {
    eyebrow: "Choose a level of support and feed families in need.",
    headingStart: "Giving",
    headingAccent: "Levels",
    levels: [
      {
        amount: "60",
        text: "Emergency meals for a family",
        cta: "Donate Now",
        form: "child-sponsorship",
      },
      {
        amount: "100",
        text: "Clean water for multiple families",
        cta: "Donate Now",
        form: "child-sponsorship",
      },
      {
        amount: "250",
        text: "Medical aid & critical care support",
        cta: "Donate Now",
        form: "child-sponsorship",
      },
      {
        amount: "500",
        text: "Emergency shelter & survival kit",
        cta: "Donate Now",
        form: "child-sponsorship",
      },
    ],
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "child-sponsorship",
    image: `${ASSETS}/why-choose.jpg`,
    imageAlt: "A Human Concern USA field worker sitting with a family",
    points: [
      "Serving vulnerable communities with transparency and dignity",
      "Transparent & Accountable",
      "Partnered with certified medical organizations",
      "Rapid crisis response teams",
      "Serving globally & locally",
    ],
  },

  global: {
    headingStart: "Global",
    headingAccent: "Sponsorship",
    headingEnd: "Locations",
    body: "Your donation can sponsor a child in Lebanon, Palestine, Tunisia, Morocco, Uyghur, Yemen, Bangladesh, India, Kashmir (Pakistan), Somalia, Rohingya & Guyana.",
  },

  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "What is the Child Sponsorship Program (CSP)?",
        answer:
          "Human Concern USA's Child Sponsorship Program (CSP) is committed to uplifting the lives of orphans and children in distress. We acknowledge the harsh reality that millions of children globally are deprived of education, subjected to child labor, trafficking, and abuse, and find themselves exploited as a result of poverty and inequality. Through our CSP, we guarantee that children are able to access education of the highest quality, reside in homes that are safe and secure, partake in nutritious meals, and are presented with ample opportunities to pursue and fulfill their dreams.",
      },
      {
        question: "How is the monthly sponsorship cost determined?",
        answer:
          "The monthly sponsorship cost is derived from the average living expenses of a family in the specific region. Our local team on the ground meticulously ensures that the calculated minimum monthly amount is sufficient to cover a child's daily necessities, including food, shelter, clothing, healthcare, and educational fees.",
      },
      {
        question: "Am I able to directly communicate with my sponsored child or their school?",
        answer:
          "While our Child Sponsorship Program (CSP) is designed to foster a meaningful bond between the donor and the sponsored child, we must emphasize that all correspondence with the child must be facilitated through Human Concern USA. This policy is in place to uphold our commitment to child protection, ensuring the child's privacy, safety, and security are not compromised.",
      },
      {
        question: "Am I able to contribute to the CSP using my Zakat funds?",
        answer:
          "Yes, our Child Sponsorship Program (CSP) falls within the eight permissible categories and, therefore, is eligible to receive Zakat funds.",
      },
      {
        question: "How do I keep track of the progress and well-being of my sponsored child?",
        answer:
          "Human Concern USA is dedicated to providing sponsors with the following reports on an annual basis to keep them informed about their sponsored child's development: Annual report of the child. School report card of the child. Recent photo of the child. Drawing or letter from the child addressed to you. A video of the child expressing their gratitude. Our CSP team will be in communication with you in the event that any of these reports are not available for any reason. Furthermore, you are always welcome to reach out to our CSP team at any time to request an update on your sponsored child. We will do our utmost to address any questions or concerns you may have and provide you with the most current information available.",
      },
      {
        question: "Is it possible to contribute to a general fund for the Child Sponsorship Program?",
        answer:
          "Indeed, you have the option to donate to the Child Sponsorship Program (CSP) in general, thereby contributing to a pool of funds. These general funds are then utilized to sponsor additional children, as well as to maintain the sponsorship of children whose donors may have discontinued their donations.",
      },
      {
        question: "Am I required to commit to a specific number of years for my sponsorship?",
        answer:
          "While Human Concern USA recommends donors to commit to at least one year of sponsorship, there is no strict minimum requirement. Committing to a year ensures the child in question receives education for that duration, potentially allowing their family to save enough resources for the child's education in the following year.",
      },
      {
        question:
          "How does Human Concern USA identify and select children for our sponsorship program?",
        answer:
          "We collaborate closely with our local teams on the ground to pinpoint the children who are in dire need of assistance. Our selection is based on the following criteria: The child should be of school-going age. The child must come from a low-income household. The child should be enrolled in school, except if they have a disability that prevents them from attending. The child must not be receiving support from any other non-governmental organization. A preference is given to female children. We prioritize orphaned children who find themselves living on the streets or in slums, are involved in child labor, and are more susceptible to exploitation, trafficking, and domestic violence.",
      },
      {
        question: "What is the impact on my sponsored child if I discontinue my donations?",
        answer:
          "In the event that a donor opts to cease their contributions to the Child Sponsorship Program (CSP), the child in question will no longer be sponsored by that donor and will instead be made available for sponsorship by other potential donors. In the case that a new sponsor is not promptly found, our organization will strive to uphold the child's sponsorship for a minimum of one year, utilizing our Zakat funds. Should a monthly donation fail to process due to a technical glitch (such as the expiration of a credit card), Human Concern USA commits to continuing the provision of funds to the child while our donor care team works diligently to rectify the situation.",
      },
      {
        question: "Can I give a gift to my sponsored child(ren)? Is it possible to offer an Eid gift?",
        answer:
          "Absolutely, you are welcome to give gifts to your sponsored child(ren). Currently, we can only facilitate the giving of monetary gifts. Such cash gifts, especially during festive occasions like Eid, can greatly contribute to the joy and happiness of the child and their family as a whole.",
      },
      {
        question:
          "Is it possible to meet my sponsored child in person or communicate with them through video calls on a regular basis?",
        answer:
          "While we place the utmost importance on the security and privacy of the children in our program, currently, we are unable to arrange visits to the child's home due to our stringent child security protocols, which dictate that the child's address must remain confidential. However, we are more than willing to do our best to facilitate a video call with your sponsored child, taking into account factors such as time zone differences and potential limitations in internet connectivity.",
      },
      {
        question:
          "How soon will I receive information about my sponsored child after I commit to sponsoring?",
        answer:
          "Upon your initial payment confirming your sponsorship, Human Concern USA will coordinate with our field team to gather the necessary details about your sponsored child. Within two weeks, you can expect to receive basic information including the child's name, date of birth, country, and school address. Following this, within a month's time, we will provide you with a comprehensive profile of the child, complete with their photograph and a breakdown of their financial situation. While we are committed to adhering to the aforementioned timelines, it is important to note that there may be unforeseen delays. The children we work with often reside in remote locations or conflict zones, and with the added travel restrictions brought about by COVID-19, it may take longer than anticipated to connect with the child and gather the required information. Rest assured, should any delays occur, our CSP team will keep you informed every step of the way.",
      },
      {
        question: "Is it permissible to donate an amount exceeding the monthly stipulated sum?",
        answer:
          "Indeed, you are welcome to donate more than the mandated monthly amount. It is common for donors to extend additional monetary gifts to children, particularly during Eid celebrations.",
      },
      {
        question: "I still have some questions. Is there someone I can talk to?",
        answer:
          "Our Child Sponsorship Program (CSP) has a dedicated team ready to assist you with any questions or concerns you might have. You can reach out to them by sending an email to info@humanconcern.org",
      },
    ],
  },
};

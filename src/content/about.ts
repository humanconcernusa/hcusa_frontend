/*
  The About Us page wording. Plain data and types, imported by the page, the admin editor
  and the server, so the shape lives exactly once. The values below are the shipped
  defaults: with nothing published the page falls back to these.

  Lists are fixed length and matched by position, so the admin can change a row but cannot
  invent or lose one.
*/

export type AboutSectionKey =
  | "hero"
  | "timeline"
  | "drives"
  | "impact"
  | "approach"
  | "stories"
  | "partners"
  | "choose"
  | "ctaBand";

export const ABOUT_SECTION_LABELS: Record<AboutSectionKey, string> = {
  hero: "Hero",
  timeline: "46 Years of Service timeline",
  drives: "What Drives Us tabs",
  impact: "Our Impact at a Glance",
  approach: "Our Approach & Strategy",
  stories: "Lives Transformed",
  partners: "Together With You",
  choose: "Why Choose Human Concern USA",
  ctaBand: "Give Hope. Inspire Change",
};

export const ABOUT_SECTION_KEYS = Object.keys(ABOUT_SECTION_LABELS) as AboutSectionKey[];

export type AboutPageContent = {
  visible: Record<AboutSectionKey, boolean>;

  hero: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    body: string;
    cta: string;
    form: string;
    image: string;
    imageAlt: string;
  };

  timeline: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    subtitle: string;
    items: { year: string; text: string; image: string; imageAlt: string }[];
  };

  drives: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    cta: string;
    tabs: {
      label: string;
      body: string;
      /* The Values tab is a bulleted list; the other two are paragraphs. */
      points: string[];
      image: string;
      imageAlt: string;
    }[];
  };

  impact: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    stats: { tag: string; value: string; caption: string; note: string }[];
  };

  approach: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    subtitle: string;
    images: { image: string; imageAlt: string }[];
    items: { title: string; body: string }[];
  };

  stories: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    items: { name: string; role: string; quote: string; image: string; imageAlt: string }[];
  };

  partners: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    subtitle: string;
    logos: { name: string; image: string }[];
  };

  choose: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    cta: string;
    form: string;
    image: string;
    imageAlt: string;
    points: string[];
  };
};

/* The page's own artwork, saved under public/images/about-us. */
const ASSETS = "/images/about-us";

const PHOTO = {
  /* The hero is the Gaza rubble photo, as the live page has it. */
  rubble: {
    image: `${ASSETS}/hero.jpg`,
    imageAlt: "A destroyed neighbourhood in Gaza where Human Concern USA is working",
  },
  clinic: {
    image: `${ASSETS}/why-choose.jpg`,
    imageAlt: "A Human Concern USA field worker with a family",
  },
  campaign: {
    image: `${ASSETS}/timeline-1979.webp`,
    imageAlt: "Three volunteers carrying Ramadan food boxes at a camp",
  },
  timeline1980: {
    image: `${ASSETS}/timeline-1980.webp`,
    imageAlt: "Volunteers carrying boxes overhead through a camp",
  },
  timeline1986: {
    image: `${ASSETS}/timeline-1986.png`,
    imageAlt: "A Human Concern USA volunteer walking through rubble in a red vest",
  },
  timeline1983: {
    image: `${ASSETS}/timeline-1983.webp`,
    imageAlt: "A community gathering supported by Human Concern USA",
  },
  values: {
    image: `${ASSETS}/values.webp`,
    imageAlt: "A Human Concern USA volunteer at a water project in Kenya",
  },
  mission: {
    image: `${ASSETS}/mission.webp`,
    imageAlt: "A child smiling at a Human Concern USA project",
  },
  vision: {
    image: `${ASSETS}/vision.webp`,
    imageAlt: "Girls in warm hats looking on",
  },
  rifat: {
    image: `${ASSETS}/story-rifat.webp`,
    imageAlt: "Rifat, a child sponsorship recipient in Bangladesh",
  },
  somira: {
    image: `${ASSETS}/story-somira.webp`,
    imageAlt: "Somira holding her thank you note",
  },
  shofiful: {
    image: `${ASSETS}/story-shofiful.webp`,
    imageAlt: "Shofiful Kader holding his thank you letter",
  },
  approachA: {
    image: `${ASSETS}/timeline-1986.png`,
    imageAlt: "A Human Concern USA volunteer walking through rubble in a red vest",
  },
  approachB: {
    image: `${ASSETS}/approach-2.png`,
    imageAlt: "A child smiling, photographed in black and white",
  },
  approachC: {
    image: `${ASSETS}/approach-3.png`,
    imageAlt: "A child smiling, holding a bag of supplies",
  },
};

export const aboutDefaults: AboutPageContent = {
  visible: {
    hero: true,
    timeline: true,
    drives: true,
    impact: true,
    approach: true,
    stories: true,
    partners: true,
    choose: true,
    ctaBand: true,
  },

  hero: {
    eyebrow: "46 Years of Compassion",
    headingStart: "From Crisis to",
    headingAccent: "Self-Sufficiency",
    body: "For over four decades, Human Concern USA has stood with vulnerable communities worldwide, providing relief, dignity, and opportunities for a better future.",
    cta: "Donate Today",
    form: "about",
    ...PHOTO.rubble,
  },

  timeline: {
    eyebrow: "Founded in the early 1980's",
    headingStart: "46 Years of",
    headingAccent: "Service",
    subtitle: "Human Concern USA has delivered decades of hope and transformation.",
    items: [
      {
        year: "1979",
        text: "3 volunteers gathered the community to help Afghan refugees in Pakistan.",
        ...PHOTO.campaign,
      },
      {
        year: "1980",
        text: "Founding members in Ottawa started meeting at OMA (basement) to establish and expand the charities.",
        ...PHOTO.timeline1980,
      },
      {
        year: "1983",
        text: "Achieved charitable status, formalising the mission to serve communities in need.",
        ...PHOTO.timeline1983,
      },
      {
        year: "1986",
        text: "Organisation renamed to HCI, a new identity reflecting broader humanitarian goals.",
        ...PHOTO.timeline1986,
      },
    ],
  },

  drives: {
    eyebrow: "Our purpose, promise & values",
    headingStart: "What",
    headingAccent: "Drives",
    headingEnd: "Us",
    cta: "Meet our Leadership",
    tabs: [
      {
        label: "Mission",
        body: "For more than four decades, our leaders, team members, volunteers, and supporters have united under a common goal to create a world free of poverty and injustice. This is no small feat, yet, as stewards of God's creation, we must strive for nothing less. Whether responding to emergencies or assessing global needs, we are on a mission to transition families from crisis to self-sufficiency. Our aim isn't to foster dependence on aid, but to empower communities to thrive independently.",
        points: [],
        ...PHOTO.mission,
      },
      {
        label: "Vision",
        body: "Our vision is to create a world free of poverty and injustice, where every individual can thrive independently and with dignity. Guided by our role as stewards of God's creation, we aspire to build a more just and equitable global community by transitioning families from crisis to self-sufficiency. Through inclusive and empowering initiatives, we aim to eliminate dependence on aid and foster a future where prosperity and hope abound for all.",
        points: [],
        ...PHOTO.vision,
      },
      {
        label: "Values",
        body: "",
        points: [
          "Embracing and Uplifting: We value inclusion and foster a culture where everyone can thrive.",
          "Respect and Compassion: We believe in the inherent worth of every individual and strive to show love and respect to help them reach their full potential.",
          "Advocacy for Fairness: We work to empower communities to challenge and change structures of injustice and inequality, both locally and globally.",
          "Integrity and Openness: We are committed to being an accountable organization that values transparency and honesty in all our interactions.",
        ],
        ...PHOTO.values,
      },
    ],
  },

  impact: {
    eyebrow: "Decades of global action",
    headingStart: "Our",
    headingAccent: "Impact",
    headingEnd: "at a Glance",
    stats: [
      {
        tag: "Emergency",
        value: "530,882",
        caption: "Cumulative number of people reached through HCI USA programs, trainings, and partner interventions.",
        note: "",
      },
      { tag: "Food Aid", value: "690,447", caption: "People Impacted", note: "" },
      { tag: "Education", value: "4,565", caption: "Students Impacted", note: "" },
      { tag: "Water", value: "111,334", caption: "People Reached", note: "" },
      { tag: "Health", value: "44,826", caption: "Patients Served", note: "" },
      { tag: "Child Sponsorship", value: "12,167", caption: "Children Impacted", note: "" },
      { tag: "Livelihood", value: "825", caption: "Lives Impacted", note: "" },
      {
        tag: "Livelihood",
        value: "27,287",
        caption: "People Impacted",
        note: "Cumulative number of people reached through HCI USA programs, trainings, and partner interventions.",
      },
    ],
  },

  approach: {
    eyebrow: "Needs assessment",
    headingStart: "Our",
    headingAccent: "Approach",
    headingEnd: "& Strategy",
    subtitle: "Community empowerment",
    images: [PHOTO.approachA, PHOTO.approachB, PHOTO.approachC],
    items: [
      {
        title: "Our Global Strategy to Combat Poverty.",
        body: "At Human Concern USA, we are dedicated to uplifting communities and individuals across the globe by creating avenues for sustainable transformation and progress. Our strategy begins with conducting needs assessments in collaboration with our partners, ensuring active community participation. Engaging with local communities is essential for designing and implementing successful programs. Their insights and guidance help us identify the most effective solutions. Leveraging our vast network of partners, our goal is to enhance healthcare services, educational programs, economic opportunities, and access to clean water. After identifying solutions, we mobilize resources to address issues and align with the United Nations' SDG goals. Our team conducts on-site visits, maintains frequent communication, and oversees project activities to ensure objectives are met. Detailed financial reports from our partners allow us to transparently share the impact of your donations, empowering communities with the tools they need to thrive. Your generous donations are the catalyst for this transformative work. Together, we can forge a path toward a global future where poverty is eradicated and prosperity abounds for all.",
      },
      {
        title: "Innovative, Eco-Friendly Solutions.",
        body: "Lasting change arises from tackling the root causes of poverty in communities. Through research, field studies, and dialogues with locals, we pinpoint the programs that will be most impactful. Investing in education, healthcare, clean water, skills training, and agriculture, Human Concern USA empowers communities to break free from the cycle of poverty. Our approach includes identifying solutions that address specific needs and align with the United Nations' SDG goals. We focus on creating innovative and eco-friendly solutions that foster self-reliance and prosperity. Your support today ensures a lasting positive impact for future generations.",
      },
    ],
  },

  stories: {
    eyebrow: "Stories from the field",
    headingStart: "Lives",
    headingAccent: "Transformed",
    items: [
      {
        name: "Rifat, Bangladesh CSP Recipient",
        role: "Child ID: HEIBD-009",
        quote: "Assalamu Alaikum. I am Rifat Hasan (Child ID: HEIBD-009), a Grade 6 student. I received my Eid gift through Human Concern USA and feel very happy and grateful. Thank you for your kindness and support. May Allah bless and reward you always.",
        ...PHOTO.rifat,
      },
      {
        name: "Somira, Rohingya CSP Recipient",
        role: "Child ID: 366",
        quote: "Assalamu Alaikum. I am Somira (HCI ID: 366). Thank you to Human Concern USA and the generous donors for your lovely gift. My family and I are very grateful. May Allah bless you for supporting children like me.",
        ...PHOTO.somira,
      },
      {
        name: "Shofiful, Rohingya CSP Recipient",
        role: "Child ID: 395",
        quote: "Assalamu Alaikum. My name is Shofiful Kader (ID: 395). Thank you to Human Concern USA, and my donors for the Ramadan gift. Your kindness brought joy to my family. May Allah (SWT) bless you and accept your good deeds.",
        ...PHOTO.shofiful,
      },
    ],
  },

  partners: {
    eyebrow: "Our partners",
    headingStart: "Together",
    headingAccent: "With You",
    subtitle: "We make the mission possible",
    logos: [
      { name: "IMANA", image: `${ASSETS}/imgi_32_New-Project-4-1.png` },
      { name: "Obat Helpers", image: `${ASSETS}/imgi_33_obat2_logo-2-1.png` },
      {
        name: "Humaniti Foundation",
        image: `${ASSETS}/imgi_35_20240605110047_humaniti_foundation-logo-blk-pnk-1-1024x290.png`,
      },
      { name: "Every Pregnancy", image: `${ASSETS}/imgi_29_everypregnancy-logo-1.svg` },
      { name: "Human Concern International", image: `${ASSETS}/imgi_60_HCI-LOGO-1-1.jpg` },
      { name: "IOM UN Migration", image: `${ASSETS}/imgi_31_IOM-logo-1.png` },
    ],
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "about",
    ...PHOTO.clinic,
    points: [
      "Serving vulnerable communities with transparency and dignity",
      "Transparent & Accountable",
      "Partnered with certified medical organizations",
      "Rapid crisis response teams",
      "Serving globally & locally",
    ],
  },
};

export const ABOUT_LIMIT_LONG = 2000;
export const ABOUT_LIMIT_SHORT = 200;
export const ABOUT_LONG_FIELDS = new Set(["body", "quote", "imageAlt", "note", "caption"]);

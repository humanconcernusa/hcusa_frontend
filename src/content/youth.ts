/*
  The HCI Global Humanitarian Youth Fellowship wording, taken from the reference screenshots and
  the FAQ answers you pasted.
*/

export type BenefitCard = {
  title: string;
  body?: string;
  intro?: string;
  bullets?: string[];
  after?: string;
  note?: string;
  icon: string;
};

export type YouthPageContent = {
  hero: {
    eyebrowLines: string[];
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    cta: string;
    image: string;
    imageAlt: string;
  };

  announcement: string;

  intro: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    paragraphs: string[];
    quote: string;
    quoteSource: string;
  };

  benefits: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    paragraphs: string[];
    cards: BenefitCard[];
  };

  turkey: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    body: string;
    items: string[];
    image: string;
    imageAlt: string;
  };

  timeline: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    entries: { date: string; title: string }[];
  };

  phases: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    cards: { title: string; body: string; icon: string }[];
  };

  more: {
    headingStart: string;
    headingAccent: string;
    paragraphs: string[];
  };

  faq: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    items: { question: string; answer: string[] }[];
    contactLead: string;
    contactEmail: string;
  };

  closing: {
    heading: string;
    body: string;
    image: string;
    imageAlt: string;
  };
};

const ASSETS = "/images/youth-fellowship";

export const youthDefaults: YouthPageContent = {
  hero: {
    eyebrowLines: ["Service with intention &", "leadership with impact"],
    headingStart: "HCI's Global",
    headingAccent: "Humanitarian",
    headingEnd: "Youth Fellowship.",
    cta: "Learn More",
    image: `${ASSETS}/hero.jpg`,
    imageAlt: "Young Human Concern USA volunteers standing together at a camp",
  },

  announcement:
    "Applications Are Now Closed And Currently Under Review. All Applicants Will Be Notified Of Their Status By The End Of June.",

  intro: {
    headingStart: "HCI's Global",
    headingAccent: "Humanitarian",
    headingEnd: "Youth Fellowship",
    paragraphs: [
      "For decades, Human Concern International has engaged young people not only as beneficiaries of humanitarian programs funded by Canadian donors, but as volunteers and participants in our programming. Youth have always played a vital role in the development of humanitarian work in shaping ideas, strengthening communities, and carrying forward the responsibility of service.",
      "In that spirit, HCI's Global Humanitarian Youth Fellowship was established to more intentionally involve youth in the life and leadership of HCI. Rooted in the Islamic tradition of philanthropy, the program mentors youth in leadership, service, and humanitarian engagement. It provides them with the skills, knowledge, and faith-based grounding to understand why giving and serving others are not optional acts of kindness, but central obligations in our deen.",
      "From the example of the Prophet ﷺ in leading with compassion and generosity, to the tradition of the Sahaba in supporting those in need and building just societies, HCI's Global Humanitarian Youth Fellowship seeks to cultivate the next generation of leaders who will carry this legacy forward.",
      "Through this initiative, we aim to nurture youth into active global citizens of the ummah who are rooted in their Deen, connected to their communities, and engaged in building real, just, and lasting solutions to the world's most pressing humanitarian challenges.",
      "At the heart of this vision is a timeless Islamic principle: that giving is not an act of generosity alone, but an expression of faith and a duty of conscience. Allah ﷻ reminds us in the Qur'an:",
      "Through mentorship, training, and collaboration, HCI's Global Humanitarian Youth Fellowship offers young people the opportunity to learn from community leaders, contribute their perspectives, and participate meaningfully in shaping HCI's humanitarian vision. It is a space where youth move beyond volunteers or recipients of aid and become active contributors who are helping design solutions, strengthen communities, and support the journey from crisis to sustainability around the world.",
    ],
    quote:
      "Never will you attain righteousness until you give from that which you love. And whatever you give, indeed Allah is Knowing of it.",
    quoteSource: "Surah Aal Imran, 3:92",
  },

  benefits: {
    eyebrow: "Program Benefits",
    headingStart: "What You Will",
    headingAccent: "Gain",
    headingEnd: "from Joining?",
    paragraphs: [
      "HCI's Global Humanitarian Youth Fellowship is not simply a program you attend but it is a leadership journey rooted in faith, service, and real-world impact.",
      "As a member of the inaugural HCI's Global Humanitarian Youth Fellowship cohort, you will have the opportunity to actively contribute to the direction of HCI's youth engagement strategy and community initiatives. Your voice will matter. Your ideas will help shape how HCI works with youth locally and globally.",
    ],
    cards: [
      {
        icon: "book",
        title: "Training & Mentorship",
        intro: "Participants will receive structured training in:",
        bullets: [
          "Islamic philanthropy and humanitarian ethics",
          "Leadership development grounded in the Prophetic tradition",
          "Project design, budgeting, and implementation",
          "Understanding global humanitarian work and development models",
        ],
      },
      {
        icon: "people",
        title: "Real Community Engagement",
        intro: "Throughout the program, you will:",
        bullets: [
          "Volunteer with HCI's local projects",
          "Support real humanitarian and community-based initiatives",
          "Apply what you learn in practical, meaningful ways",
        ],
        after:
          "This ensures that leadership is not only discussed, but practiced.",
      },
      {
        icon: "search",
        title: "Research & Strategy Contribution",
        body: "As an HCI's Global Humanitarian Youth Fellowship participant, you will contribute to shaping HCI's understanding of Muslim youth priorities. Your feedback, insights, and perspectives will inform how HCI develops future programming, engages donors, and supports communities globally.",
      },
      {
        icon: "globe",
        title: "Global Exposure",
        body: "Selected participants may have the opportunity to attend the Global Youth Convention, where youth from across HCI's international network come together to collaborate, exchange ideas, and pitch community impact projects.* This experience connects you to a broader ummah of youth leaders committed to service and sustainability",
        note: "*Participation in the Global Youth Convention is subject to selection and program criteria",
      },
      {
        icon: "ribbon",
        title: "Recognition & Long-Term Impact",
        intro: "Upon successful completion of the program, participants will receive:",
        bullets: [
          "A Certificate of Completion",
          "Formal recognition of your leadership and service",
          "Continued access to HCI mentors and networks",
          "Ongoing opportunities to engage with HCI initiatives",
        ],
      },
      {
        icon: "handshake",
        title: "CEO Advisory committee",
        intro: "Participants may have the opportunity to serve on the CEO advisory committee:",
        bullets: ["To influence strategy", "Shape programs", "And have an institutional impact"],
      },
    ],
  },

  turkey: {
    eyebrow: "Turkey",
    headingStart: "Global Youth",
    headingAccent: "Convention",
    headingEnd: "in Turkey",
    body: "As part of the program, selected youth will have the opportunity to pitch their community impact project at the Global Youth Convention, a multi-day international gathering bringing together youth cohorts from around the world for collaborative training, project development, and networking. Selected projects will receive a grant for you and your team to implement at home.",
    items: ["International Cohorts", "Grant Opportunities", "Turkey Destination"],
    image: `${ASSETS}/turkey.jpg`,
    imageAlt: "Istanbul at dusk, seen across the water",
  },

  timeline: {
    eyebrow: "Program Timeline",
    headingStart: "Global",
    headingAccent: "Youth",
    headingEnd: "Fellowship",
    entries: [
      { date: "April 1", title: "Applications Open" },
      { date: "May 31", title: "Applications Closed" },
      { date: "May 31", title: "Selected Applicants Contacted" },
      { date: "June", title: "Program Launch Event" },
      { date: "June - December 2026", title: "Project Development, Mentorship, Training" },
      { date: "Late 2026 / Early 2027", title: "Global Youth Convention" },
    ],
  },

  phases: {
    eyebrow: "How It Works",
    headingStart: "Three",
    headingAccent: "Phases",
    cards: [
      {
        icon: "book",
        title: "Application & Survey",
        body: "Once you complete your application, you will be invited to complete a survey. Applications are open until May 31st, 2026.",
      },
      {
        icon: "person",
        title: "Youth Selection",
        body: "Our team will review applications and select applicants to be part of HCI's Global Humanitarian Youth Fellowship. You can expect to hear back by May 31st, 2026. Our first meeting will take place in June.",
      },
      {
        icon: "plane",
        title: "Global Youth Fellowship Convention in Turkey",
        body: "Selected participants will travel to Turkey to pitch their solution to a community issue for a chance to win grants to implement your project back at home.",
      },
    ],
  },

  more: {
    headingStart: "More than",
    headingAccent: "a Program",
    paragraphs: [
      "HCI's Global Humanitarian Youth Fellowship is designed to help you grow in confidence, clarity, and commitment, rooted in your deen and equipped to serve your community.",
      "It is an opportunity to develop the skills, relationships, and vision necessary to carry forward the tradition of service that defines our faith.",
    ],
  },

  faq: {
    eyebrow: "FAQ",
    headingStart: "Frequently Asked",
    headingAccent: "Questions",
    items: [
      {
        question: "Who can apply?",
        answer: [
          "We are looking for applicants between the ages of 14-25 who share HCI's vision.",
          "Applicants should be located in one of the following cities.",
          "Canada: GTA, Ottawa, Vancouver, Calgary, Montreal, Edmonton",
          "USA: Indiana, New York, Arizona, Detroit, Dallas,Chicago",
        ],
      },
      {
        question: "What is the application window?",
        answer: ["Applications are open April 1-May 31, 2026."],
      },
      {
        question: "When is the Global Convention?",
        answer: [
          "The date will be announced to selected candidates once finalized. It will take place at the end of 2026 or early 2027.",
        ],
      },
      {
        question: "What is the time commitment?",
        answer: [
          "Applicants will be expected to attend a session per month from June to December 2026. These training dates will be roughly 4-6 hours.",
        ],
      },
      {
        question: "Can I participate if I am outside of the age range or location?",
        answer: [
          "The age requirement for HCI's Global Humanitarian Youth Fellowship is firm. The program is specifically designed for youth within the stated age range, as the curriculum, mentorship structure, and cohort model are tailored to that stage of personal and leadership development.",
          "With respect to location, the program is organized around select hub cities. However, this does not mean you must live directly within the city limits. We understand that many applicants live in surrounding suburbs, neighboring towns, or nearby communities. If you reside within reasonable proximity to one of the listed cities and can participate in that chapter's meetings and activities, you are welcome to apply under that city. Most meetings will be virtual but some may be in person.",
          "When completing your application, simply select the city you are able and willing to participate in. Our goal is accessibility and inclusion, not rigid geographic boundaries.",
        ],
      },
    ],
    contactLead: "If you have further questions, please contact us at",
    contactEmail: "fellowship@humanconcernusa.org",
  },

  closing: {
    heading: "Ready to Make a Difference?",
    body: "Join the inaugural cohort of HCI's Global Humanitarian Youth Fellowship. Applications are open April 1 – May 31, 2026. Your journey to becoming a humanitarian leader starts here.",
    image: `${ASSETS}/closing.jpg`,
    imageAlt: "Young women working together on a community project",
  },
};

/*
  The built-in blog posts. One record holds both faces of a post: the card on /blogs and the
  article on its own page at /<slug>.

  The admin manages these on the Blogs screen. Until the collection has anything in it, the
  live pages read this list, so the site never looks empty. The Import action copies it into
  the database.
*/

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPostContent = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
  /* The paragraphs before the first heading. */
  lead: string[];
  sections: ArticleSection[];
  /* The paragraphs after the last heading. */
  closing: string[];
};

/* The caps the editor and the server both keep to. */
export const MAX_TITLE_LENGTH = 200;
export const MAX_SLUG_LENGTH = 120;
export const MAX_EXCERPT_LENGTH = 400;
export const MAX_DATE_LENGTH = 60;
export const MAX_HEADING_LENGTH = 200;
export const MAX_PARAGRAPH_LENGTH = 4000;
export const MAX_SECTIONS = 30;
export const MAX_PARAGRAPHS = 40;

/* A post is a link on the grid only once it has words behind it. */
export function hasArticleBody(post: Pick<BlogPostContent, "lead" | "sections" | "closing">): boolean {
  return post.lead.length > 0 || post.sections.length > 0 || post.closing.length > 0;
}

const ASSETS = "/images/blogs";

/* The first five carry card text only; the sixth is the full Eid article. */
export const blogPostDefaults: BlogPostContent[] = [
  {
    slug: "beyond-the-destruction-how-the-gaza-conflict-changed-jobs-businesses-and-daily-life",
    title:
      "Beyond the Destruction How the Gaza Conflict Changed Jobs, Businesses, and Daily Life",
    excerpt:
      "War does not only damage buildings. It also closes businesses, removes jobs, raises prices, and pushes families deeper into poverty.",
    date: "August 15, 2026",
    image: `${ASSETS}/post-gaza-jobs.webp`,
    imageAlt: "Human Concern USA workers walking through destroyed streets",
    lead: [],
    sections: [],
    closing: [],
  },
  {
    slug: "can-gaza-rebuild-understanding-the-long-road-to-recovery",
    title: "Can Gaza Rebuild? Understanding the Long Road to Recovery",
    excerpt:
      "Gaza was once home to busy communities. Families ran local shops. Children filled classrooms. University students studied medicine, engineering and law.",
    date: "August 15, 2026",
    image: `${ASSETS}/post-gaza-rebuild.webp`,
    imageAlt: "Workers clearing rubble beside the Human Concern USA mark",
    lead: [],
    sections: [],
    closing: [],
  },
  {
    slug: "mobile-health-clinics-bringing-care-to-the-forgotten",
    title: "Mobile Health Clinics: Bringing Care to the Forgotten",
    excerpt:
      "A Clinic on Wheels. A Lifeline for Families. Help provide medical care in hard-to-reach communities. The Road to Healing Starts Here.",
    date: "June 24, 2026",
    image: `${ASSETS}/post-health-clinics.webp`,
    imageAlt: "A health worker examining a child on a mobile clinic",
    lead: [],
    sections: [],
    closing: [],
  },
  {
    slug: "how-one-well-transforms-an-entire-village-clean-water-charity",
    title: "How One Well Transforms an Entire Village | Clean Water Charity",
    excerpt:
      "How One Well Transforms an Entire Village Hours Spent Walking Can Become Hours Spent Learning. Give clean water. Give time back.",
    date: "June 24, 2026",
    image: `${ASSETS}/post-clean-water.webp`,
    imageAlt: "A girl carrying books and a water container",
    lead: [],
    sections: [],
    closing: [],
  },
  {
    slug: "gazas-students-have-lost-everything-heres-how-education-scholarships-are-rebuilding-hope",
    title:
      "Gaza's Students Have Lost Everything. Here's How Education Scholarships Are Rebuilding Hope.",
    excerpt:
      "Gaza's Students Have Lost Everything. Here's How Education Scholarships Are Rebuilding Hope. Before October 2023, Gaza had a thriving student population.",
    date: "May 22, 2026",
    image: `${ASSETS}/post-education.webp`,
    imageAlt: "A girl reading a book",
    lead: [],
    sections: [],
    closing: [],
  },
  {
    slug: "5-ways-to-honor-the-spirit-of-eid-all-year-an-american-muslims-guide-to-ongoing-charity",
    title:
      "5 Ways to Honor the Spirit of Eid All Year: An American Muslim's Guide to Ongoing Charity",
    excerpt:
      "5 Ways to Honor the Spirit of Eid All Year: An American Muslim's Guide to Ongoing Charity. Eid is a time of generosity and reflection that continues all year.",
    date: "May 22, 2026",
    image: `${ASSETS}/post-charitable-giving.webp`,
    imageAlt: "The doorway of a mosque lit in warm light",
    lead: [
      "Eid is a season of gratitude, generosity, and togetherness, but the spirit behind it doesn't have to end when the celebrations do. For Muslims living in the United States, there are meaningful, practical ways to carry that momentum forward every month of the year. Here's how.",
    ],
    sections: [
      {
        heading: "1. Set Up a Recurring Donation",
        paragraphs: [
          "The easiest way to make giving a habit is to automate it. Most Muslim charity organizations now offer monthly giving programs, so your sadaqah goes out whether life gets busy or not. Even $10–$25 a month adds up to $120–$300 annually, enough to fund clean water, school supplies, or food for a family in need. Small, consistent acts outperform one-time large gifts in long-term community impact.",
        ],
      },
      {
        heading: "2. Give Sadaqah Jariyah: Charity That Keeps Giving",
        paragraphs: [
          "Sadaqah jariyah is one of the most powerful concepts of ongoing charity in Islam, a gift that continues to benefit others and earn reward long after it is given. The Prophet ﷺ said that when a person dies, their deeds cease except for three, one of which is sadaqah jariyah. Funding a water well, sponsoring an orphan's education, or supporting a mosque or school are all classic examples, generating benefit for years or even decades.",
        ],
      },
      {
        heading: "3. Research the Best Islamic Charities Before You Give",
        paragraphs: [
          "Look for best Islamic charities that are transparent about their financials, have strong program efficiency ratios, and are registered 501(c)(3) nonprofits in the U.S., making your Muslim charity donations tax-deductible. Websites like Charity Navigator and GuideStar can help verify credibility.",
        ],
      },
      {
        heading: "4. Involve Your Family in Giving Decisions",
        paragraphs: [
          "A Fidelity Charitable study found that donors who learned about giving from their parents are 65% more likely to teach their own children to give. Make giving a family conversation, let kids pick a cause, count out coins for a donation jar, or help pack a care package. Tying these moments to Islamic values teaches the why behind generosity, not just the act itself.",
        ],
      },
      {
        heading: "5. Give Locally and Think Globally",
        paragraphs: [
          "Local need is just as real as the crises making international headlines. Many Muslim charity organizations and Islamic charity USA networks support domestic food banks, refugee resettlement, disaster relief, and low-income assistance right in your city. Giving locally strengthens Muslim community infrastructure and builds bridges with neighbors of all backgrounds, while global giving through trusted partners extends your impact even further.",
        ],
      },
    ],
    closing: [
      "Eid reminds us that generosity is a practice, not an occasion. Organizations like Human Concern International USA (HCI USA) make it simple to channel that practice into structured, verified giving programs, from sadaqah jariyah to emergency relief, so your compassion reaches people who need it most, all year long.",
    ],
  },
];

/*
  Turns a title into the post's URL. Used once, when a post is created, so an edit to the
  title never breaks a link that is already out in the world.
*/
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG_LENGTH);
}

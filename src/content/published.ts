/*
  The public site's content, read from files instead of the database.

  The publish step writes one JSON file per page under content/. The build reads those files
  and never opens a database connection, which is what lets the site be exported as plain
  HTML and served by any host.

  A file that is missing falls back to the shipped defaults, exactly like the database store
  does today, so a fresh checkout still renders a complete site.

  This module reads from disk, so it must only ever be imported by a server component. If a
  client component imports it the build will fail loudly, which is the intended outcome.
*/

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { aboutDefaults, type AboutPageContent } from "./about";
import { blogPostDefaults, type BlogPostContent } from "./blog-posts";
import { blogsDefaults, type BlogsPageContent } from "./blogs";
import { careerDefaults, type CareerPageContent } from "./careers";
import {
  childSponsorshipDefaults,
  type ChildSponsorshipPageContent,
} from "./child-sponsorship";
import { contactDefaults, type ContactPageContent } from "./contact";
import { donateFallbackDefaults, type DonateFallbackContent } from "./donate-fallback";
import { floodReliefDefaults, type FloodReliefPageContent } from "./flood-relief";
import { foodAidDefaults, type FoodAidPageContent } from "./food-aid";
import { footerDefaults, type FooterContent } from "./footer";
import { gazaScholarshipDefaults, type GazaPageContent } from "./gaza-scholarship";
import { headerDefaults, type HeaderContent } from "./header";
import { healthcareDefaults, type HealthcarePageContent } from "./healthcare";
import { homeDefaults, type HomePageContent } from "./home";
import { lebanonDefaults, type LebanonPageContent } from "./lebanon-emergency";
import { ourTeamDefaults, type OurTeamPageContent } from "./our-team";
import {
  palestineHardshipDefaults,
  type PalestineHardshipPageContent,
} from "./palestine-hardship-fund";
import { palestineDefaults, type PalestinePageContent } from "./palestine-relief";
import { privacyDefaults, type PrivacyPageContent } from "./privacy";
import { quickDonateDefaults, type QuickDonateContent } from "./quick-donate";
import { reportsDefaults, type ReportsPageContent } from "./reports";
import { sadaqahDefaults, type SadaqahPageContent } from "./sadaqah";
import { sudanDefaults, type SudanPageContent } from "./sudan-relief";
import { supportAfricaDefaults, type SupportAfricaPageContent } from "./support-africa";
import { travelDefaults, type TravelPageContent } from "./travel";
import { volunteerDefaults, type VolunteerPageContent } from "./volunteer";
import { waterAidDefaults, type WaterAidPageContent } from "./water-aid";
import { youthDefaults, type YouthPageContent } from "./youth";
import { zakatDefaults, type ZakatPageContent } from "./zakat";

/* Where the publish step writes, relative to the project root. */
const CONTENT_DIR = join(process.cwd(), "content");

/*
  Fills the published copy in over the shipped defaults, key by key.

  The file holds only what was stored. A page published before a section existed simply has no
  key for it, and reading the file straight would leave that section undefined and break the
  page. Extra keys are dropped: the defaults are the shape, exactly as the server treats them.

  This is the read-side counterpart of the coercion the server does when saving.
*/
function merge<T>(defaults: T, input: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(input) ? input : defaults) as T;
  }

  if (defaults !== null && typeof defaults === "object") {
    if (input === null || typeof input !== "object" || Array.isArray(input)) return defaults;

    const out: Record<string, unknown> = {};

    for (const [key, fallback] of Object.entries(defaults as Record<string, unknown>)) {
      out[key] = merge(fallback, (input as Record<string, unknown>)[key]);
    }

    return out as T;
  }

  return (input === undefined || input === null ? defaults : input) as T;
}

/* The published copy of one page, or the shipped defaults when nothing has been published. */
function readPublished<T>(pageKey: string, defaults: T): T {
  try {
    const raw = readFileSync(join(CONTENT_DIR, `${pageKey}.json`), "utf8");

    return merge(defaults, JSON.parse(raw));
  } catch {
    return defaults;
  }
}

/* The read half of a page store: the same `getPublished()` the pages already call. */
function publishedStore<T>(pageKey: string, defaults: T) {
  return {
    async getPublished(): Promise<T> {
      return readPublished(pageKey, defaults);
    },
  };
}

export async function getPublishedHome(): Promise<HomePageContent> {
  return readPublished("home", homeDefaults);
}

export async function getPublishedAbout(): Promise<AboutPageContent> {
  return readPublished("about", aboutDefaults);
}

export async function getPublishedHealthcare(): Promise<HealthcarePageContent> {
  return readPublished("healthcare", healthcareDefaults);
}

export async function getPublishedOurTeam(): Promise<OurTeamPageContent> {
  return readPublished("our-team", ourTeamDefaults);
}

export async function getPublishedPrivacy(): Promise<PrivacyPageContent> {
  return readPublished("privacy", privacyDefaults);
}

export async function getPublishedReports(): Promise<ReportsPageContent> {
  return readPublished("reports", reportsDefaults);
}

export async function getPublishedHeader(): Promise<HeaderContent> {
  return readPublished("header", headerDefaults);
}

export async function getPublishedQuickDonate(): Promise<QuickDonateContent> {
  return readPublished("quick-donate", quickDonateDefaults);
}

/* The popup shown when a donation form cannot be opened. Used on every page. */
export async function getPublishedDonateFallback(): Promise<DonateFallbackContent> {
  return readPublished("donate-fallback", donateFallbackDefaults);
}

export async function getPublishedFooter(): Promise<FooterContent> {
  return readPublished("footer", footerDefaults);
}

export const blogsStore = publishedStore<BlogsPageContent>("blogs", blogsDefaults);
export const careersStore = publishedStore<CareerPageContent>("careers", careerDefaults);
export const childSponsorshipStore = publishedStore<ChildSponsorshipPageContent>(
  "child-sponsorship",
  childSponsorshipDefaults,
);
export const contactStore = publishedStore<ContactPageContent>("contact", contactDefaults);
export const floodReliefStore = publishedStore<FloodReliefPageContent>(
  "flood-relief",
  floodReliefDefaults,
);
export const foodAidStore = publishedStore<FoodAidPageContent>("food-aid", foodAidDefaults);
export const gazaScholarshipStore = publishedStore<GazaPageContent>(
  "gaza-scholarship",
  gazaScholarshipDefaults,
);
export const lebanonStore = publishedStore<LebanonPageContent>(
  "lebanon-emergency",
  lebanonDefaults,
);
export const palestineHardshipStore = publishedStore<PalestineHardshipPageContent>(
  "palestine-hardship-fund",
  palestineHardshipDefaults,
);
export const palestineStore = publishedStore<PalestinePageContent>(
  "palestine-relief",
  palestineDefaults,
);
export const quickDonateStore = publishedStore<QuickDonateContent>(
  "quick-donate",
  quickDonateDefaults,
);
export const sadaqahStore = publishedStore<SadaqahPageContent>("sadaqah", sadaqahDefaults);
export const sudanStore = publishedStore<SudanPageContent>("sudan-relief", sudanDefaults);
export const supportAfricaStore = publishedStore<SupportAfricaPageContent>(
  "support-africa",
  supportAfricaDefaults,
);
export const travelStore = publishedStore<TravelPageContent>("travel", travelDefaults);
export const volunteerStore = publishedStore<VolunteerPageContent>(
  "volunteer",
  volunteerDefaults,
);
export const waterAidStore = publishedStore<WaterAidPageContent>("water-aid", waterAidDefaults);
export const youthStore = publishedStore<YouthPageContent>("youth", youthDefaults);
export const zakatStore = publishedStore<ZakatPageContent>("zakat", zakatDefaults);

/*
  The blog. One file per post plus a small index, so a new post is a new file and the listing
  never has to read every article.
*/

type BlogIndexEntry = {
  slug: string;
  title: string;
  date: string;
};

type PostListPage = {
  items: BlogPostContent[];
  total: number;
  page: number;
  pageCount: number;
};

function readBlogIndex(): BlogIndexEntry[] {
  return readPublished<BlogIndexEntry[]>("blog/index", []);
}

function readBlogPost(slug: string): BlogPostContent | null {
  return readPublished<BlogPostContent | null>(`blog/${slug}`, null);
}

/* Every published post, in list order. The shipped list stands in until anything is published. */
export async function getAllPosts(): Promise<BlogPostContent[]> {
  const index = readBlogIndex();

  if (index.length === 0) return blogPostDefaults;

  return index
    .map((entry) => readBlogPost(entry.slug))
    .filter((post): post is BlogPostContent => post !== null);
}

/* One page of posts for the /blogs grid. */
export async function getPublishedPosts(page: number, limit: number): Promise<PostListPage> {
  const all = await getAllPosts();
  const pageCount = Math.max(1, Math.ceil(all.length / limit));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * limit;

  return {
    items: all.slice(start, start + limit),
    total: all.length,
    page: current,
    pageCount,
  };
}

/* One post by its slug, or nothing when no post carries that URL. */
export async function getPostBySlug(slug: string): Promise<BlogPostContent | null> {
  return readBlogPost(slug) ?? blogPostDefaults.find((post) => post.slug === slug) ?? null;
}

/* The page keys the publish step writes. One JSON file per key. */
export const PAGE_KEYS = [
  "about",
  "blogs",
  "careers",
  "child-sponsorship",
  "contact",
  "donate-fallback",
  "flood-relief",
  "food-aid",
  "footer",
  "forms",
  "gaza-scholarship",
  "header",
  "healthcare",
  "home",
  "lebanon-emergency",
  "our-team",
  "palestine-hardship-fund",
  "palestine-relief",
  "privacy",
  "quick-donate",
  "reports",
  "sadaqah",
  "sudan-relief",
  "support-africa",
  "travel",
  "volunteer",
  "water-aid",
  "youth",
  "zakat",
] as const;

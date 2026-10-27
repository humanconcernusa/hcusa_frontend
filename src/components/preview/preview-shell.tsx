"use client";

import type { ReactNode } from "react";

import { DonateProvider } from "@/components/donate/donate-context";
import { QuickDonate } from "@/components/home/quick-donate";
import { SiteFooterBody } from "@/components/site-footer-body";
import { SiteHeader } from "@/components/site-header";

import type { FooterContent } from "@/content/footer";
import type { HeaderContent } from "@/content/header";
import type { HomePageContent } from "@/content/home";

/*
  The frame every previewed page sits in: the header, the page itself, the footer and the Quick
  Donate tab. It takes the chrome as props, so the preview draws the draft header and footer
  instead of the published ones.
*/

export const CTA_BAND = {
  headingStart: "Give Hope.",
  headingAccent: "Inspire",
  headingEnd: "Change",
  subtitle: "We'd love to hear from you.",
  primaryCta: "Become a Volunteer",
  secondaryCta: "Travel with Us",
};

export type Chrome = { header: HeaderContent; footer: FooterContent };

export function Shell({
  chrome,
  children,
  home,
  padTop,
  quickDonate = true,
}: {
  chrome: Chrome;
  children: ReactNode;
  /* The home page decides which of its sections show, and the header follows the same flags. */
  home?: HomePageContent["visible"];
  /* The page hides its hero, so the floating header needs the room the hero would have given it. */
  padTop?: boolean;
  quickDonate?: boolean;
}) {
  return (
    <DonateProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-6 focus:py-3 focus:text-ink focus:shadow-raised"
      >
        Skip to content
      </a>

      <div className="relative isolate">
        <SiteHeader
          className="absolute inset-x-0 top-2 z-20"
          visible={home}
          content={chrome.header}
        />

        <main id="main" className={padTop ? "pt-32 lg:pt-[7.5rem]" : undefined}>
          {children}
        </main>
      </div>

      <SiteFooterBody content={chrome.footer} />
      {quickDonate ? <QuickDonate /> : null}
    </DonateProvider>
  );
}

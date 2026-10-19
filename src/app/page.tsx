import { DonateProvider } from "@/components/donate/donate-context";
import { CeoMessage } from "@/components/home/ceo-message";
import { CtaBand } from "@/components/home/cta-band";
import { Hero } from "@/components/home/hero";
import { Impact } from "@/components/home/impact";
import { Programs } from "@/components/home/programs";
import { QuickDonate } from "@/components/home/quick-donate";
import { Testimonial } from "@/components/home/testimonial";
import { VideoBanner } from "@/components/home/video-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getPublishedHeader,
  getPublishedHome,
} from "@/content/published";

export default async function Home() {
  const [content, header] = await Promise.all([
    getPublishedHome(),
    getPublishedHeader(),
  ]);

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
          visible={content.visible}
          content={header}
        />

        {/*
          The hero carries the top spacing that keeps clear of the floating header, because
          the header sits over the hero photo. When the hero is hidden, the first section
          below needs that space instead, or the header lands on top of it.
        */}
        <main
          id="main"
          className={content.visible.hero ? undefined : "pt-32 lg:pt-[7.5rem]"}
        >
          {content.visible.hero ? <Hero content={content.hero} /> : null}
          {content.visible.videoBanner ? <VideoBanner content={content.videoBanner} /> : null}
          {content.visible.impact ? <Impact content={content.impact} /> : null}
          {content.visible.programs ? <Programs content={content.programs} /> : null}
          {content.visible.testimonial ? <Testimonial content={content.testimonial} /> : null}
          {content.visible.ceoMessage ? <CeoMessage content={content.ceoMessage} /> : null}
          {content.visible.ctaBand ? <CtaBand content={content.ctaBand} /> : null}
        </main>
      </div>

      <SiteFooter />

      <QuickDonate />
    </DonateProvider>
  );
}

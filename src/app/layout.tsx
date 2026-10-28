import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { BackToTop } from "@/components/back-to-top";
import { DonateFallbackProvider } from "@/components/donate/fallback-context";
import { QuickDonateProvider } from "@/components/donate/quick-donate-context";
import { SmoothAnchors } from "@/components/smooth-anchors";
import {
  getPublishedDonateFallback,
  getPublishedQuickDonate,
} from "@/content/published";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-roboto",
  display: "swap",
});

const brittiSans = localFont({
  src: [
    { path: "./fonts/britti-sans-300.otf", weight: "300", style: "normal" },
    { path: "./fonts/britti-sans-300-italic.otf", weight: "300", style: "italic" },
    { path: "./fonts/britti-sans-400.otf", weight: "400", style: "normal" },
    { path: "./fonts/britti-sans-400-italic.otf", weight: "400", style: "italic" },
    { path: "./fonts/britti-sans-600.otf", weight: "600", style: "normal" },
    { path: "./fonts/britti-sans-600-italic.otf", weight: "600", style: "italic" },
    { path: "./fonts/britti-sans-700.otf", weight: "700", style: "normal" },
    { path: "./fonts/britti-sans-700-italic.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-britti",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Human Concern USA",
  description:
    "Your donation provides life-saving water, food, and care to families in need.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  /*
    The Quick Donate tab shows on every page, so its one setting is read here, from the published
    content file, and handed down to every page through the provider.
  */
  const [quickDonate, donateFallback] = await Promise.all([
    getPublishedQuickDonate(),
    getPublishedDonateFallback(),
  ]);

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto.variable} ${brittiSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-page text-body font-body">
        <DonateFallbackProvider value={donateFallback}>
          <QuickDonateProvider value={quickDonate}>{children}</QuickDonateProvider>
        </DonateFallbackProvider>
        <SmoothAnchors />
        <BackToTop />
      </body>
    </html>
  );
}

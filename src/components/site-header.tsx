
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { DonateButton } from "@/components/donate/donate-button";
import { headerDefaults, type HeaderContent } from "@/content/header";
import type { SectionKey } from "@/content/home";

type MenuItem = { label: string; icon: string; href?: string };
type NavItem = { label: string; href: string; items: MenuItem[] };

const NAV_TARGET: Record<string, SectionKey | undefined> = {
  "#about": "ceoMessage",
  "#programs": "programs",
  "#get-involved": "ctaBand",
};

const NAV: NavItem[] = [
  {
    label: "About Us",
    href: "#about",
    items: [
      { label: "Who Are We?", icon: "who-we-are", href: "/about-us" },
      { label: "Our Team", icon: "our-team", href: "/our-team" },
      { label: "Reports", icon: "reports", href: "/reports" },
      { label: "Privacy Policy", icon: "privacy-policy", href: "/privacy-policy" },
    ],
  },
  {
    label: "Emergency Appeals",
    href: "#programs",
    items: [
      { label: "Support Africa", icon: "support-africa", href: "/support-africas-forgotten-ummah" },
      {
        label: "Palestine Relief",
        icon: "palestine-relief",
        href: "/palestine-relief",
      },
      { label: "Sudan Relief", icon: "sudan-relief", href: "/emergency-relief-sudan" },
      { label: "Palestine Hardship Fund", icon: "gaza-scholarship", href: "/palestine-hardship-fund" },
      {
        label: "South Asia Flood Relief",
        icon: "palestine-relief",
        href: "/emergency-flood-relief",
      },
      { label: "Lebanon Emergency", icon: "lebanon-emergency", href: "/lebanon-emergency" },
    ],
  },
  {
    label: "Core Appeals",
    href: "#programs",
    items: [
      { label: "Healthcare", icon: "healthcare", href: "/improving-healthcare" },
      { label: "Food Aid", icon: "food-aid", href: "/food-aid" },
      { label: "Water Aid", icon: "water-aid", href: "/water-aid" },
      {
        label: "Child/Orphan Sponsorship",
        icon: "child-sponsorship",
        href: "/child-sponsorship-program",
      },
      { label: "Zakat", icon: "zakat", href: "/zakat" },
      { label: "Sadaqah General", icon: "sadaqah-general", href: "/sadaqah-general" },
      { label: "Zakat Calculator", icon: "zakat-calculator", href: "/zakat-calculator" },
    ],
  },
  {
    label: "Get Involved",
    href: "#get-involved",
    items: [
      { label: "Volunteer", icon: "volunteer", href: "/volunteer" },
      { label: "Careers", icon: "careers", href: "/work-with-us" },
      { label: "Blogs", icon: "blogs", href: "/blogs" },
      { label: "Travel With Us", icon: "travel-with-us", href: "/travel-with-us" },
      {
        label: "Youth Fellowship",
        icon: "youth-fellowship",
        href: "/hci-global-humanitarian-youth-fellowship",
      },
      { label: "Contact", icon: "contact", href: "/contact-us" },
    ],
  },
];

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`size-3.5 fill-none stroke-current stroke-2 transition-transform duration-150 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteHeader({
  className = "",
  visible,
  content,
}: {
  className?: string;
  visible?: Record<SectionKey, boolean>;
  content?: HeaderContent;
}) {
  const { brand, donate, visible: show } = content ?? headerDefaults;
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [isOpen]);

  function closeDrawer() {
    setIsOpen(false);
    setOpenMobileMenu(null);
  }

  const navItems = visible
    ? NAV.filter((item) => {
        const section = NAV_TARGET[item.href];
        return section === undefined ? true : visible[section];
      })
    : NAV;

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpenMenu(null);
    }
  }

  return (
    <header className={className}>
      <div className="container-page">
        <div className="flex h-[4.1rem] items-center gap-3 rounded-full bg-surface px-4 shadow-card sm:px-5 xl:gap-6 xl:px-7">
          {show.logo ? (
            <Link
              href="/"
              aria-label={`${brand.imageAlt}, home`}
              className="flex shrink-0 items-center"
            >
              <Image
                src={brand.image}
                alt={brand.imageAlt}
                width={200}
                height={50}
                priority
                className="h-auto w-[170px] sm:w-[200px] xl:w-[210px]"
              />
            </Link>
          ) : null}

          {/* Desktop navigation: visible from 1280px */}
          <nav
            aria-label="Main"
            className={`min-w-0 flex-1 justify-center ${
              show.nav ? "hidden xl:flex" : "hidden"
            }`}
          >
            <ul className="flex items-center gap-4 2xl:gap-6">
              {navItems.map((item) => {
                const isMenuOpen = openMenu === item.label;

                return (
                  <li key={item.label} className="shrink-0">
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenMenu(item.label)}
                      onMouseLeave={() => setOpenMenu(null)}
                      onFocus={() => setOpenMenu(item.label)}
                      onBlur={handleBlur}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") setOpenMenu(null);
                      }}
                    >
                      <a
                        href={item.href}
                        aria-haspopup="true"
                        aria-expanded={isMenuOpen}
                        onClick={(event) => {
                          event.preventDefault();
                          setOpenMenu(isMenuOpen ? null : item.label);
                        }}
                        className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[0.9375rem] transition-colors ${
                          isMenuOpen
                            ? "text-action"
                            : "text-body hover:text-action"
                        }`}
                      >
                        {item.label}
                        <Chevron open={isMenuOpen} />
                      </a>

                      {isMenuOpen ? (
                        <div className="absolute top-full left-0 z-30 pt-3">
                          <ul className="min-w-[13.5rem] animate-menu-in rounded-xl bg-surface p-2 shadow-raised">
                            {item.items.map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href ?? "#"}
                                  aria-current={
                                    sub.href === pathname ? "page" : undefined
                                  }
                                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] whitespace-nowrap transition-colors ${
                                    sub.href === pathname
                                      ? "bg-action font-medium text-white"
                                      : "text-body hover:bg-page hover:text-action"
                                  }`}
                                >
                                  <Image
                                    src={`/icons/${sub.icon}.png`}
                                    alt=""
                                    width={18}
                                    height={18}
                                    className={`shrink-0 ${
                                      sub.href === pathname
                                        ? "brightness-0 invert"
                                        : ""
                                    }`}
                                  />
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3 xl:ml-0">
            {/* Desktop Donate button */}
            {show.cta ? (
              <div className="hidden xl:block">
                <DonateButton
                  formId={donate.form}
                  variant="primarySolid"
                  size="sm"
                  className="uppercase"
                >
                  {donate.cta}
                </DonateButton>
              </div>
            ) : null}

            {/* Hamburger: visible below 1280px */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsOpen(true)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label="Open menu"
              className="-mr-1 grid size-11 shrink-0 place-items-center rounded-full transition-colors hover:bg-page xl:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-6 fill-none stroke-ink stroke-[1.75]"
              >
                <path
                  d="M4 6.5h16M4 12h16M4 17.5h16"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile and tablet drawer: visible below 1280px */}
      <div
        className={`fixed inset-0 z-50 xl:hidden ${
          isOpen ? "" : "pointer-events-none"
        }`}
        inert={!isOpen}
      >
        <div
          aria-hidden="true"
          onClick={closeDrawer}
          className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <nav
          id="mobile-nav"
          aria-label="Main"
          className={`absolute inset-y-0 right-0 flex w-[80%] max-w-[22rem] flex-col overflow-y-auto bg-surface px-5 pt-5 pb-8 shadow-raised transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            {show.logo ? (
              <Link
                href="/"
                onClick={closeDrawer}
                aria-label={`${brand.imageAlt}, home`}
                className="mt-4"
              >
                <Image
                  src={brand.image}
                  alt={brand.imageAlt}
                  width={200}
                  height={50}
                  className="h-auto w-[150px] sm:w-[170px]"
                />
              </Link>
            ) : (
              <span />
            )}

            <button
              ref={closeRef}
              type="button"
              onClick={closeDrawer}
              aria-label="Close menu"
              className="-mt-1 -mr-2 grid size-10 shrink-0 place-items-center rounded-full transition-colors hover:bg-page"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-5 fill-none stroke-ink stroke-2"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <ul className={`mt-5 flex-col ${show.nav ? "flex" : "hidden"}`}>
            {navItems.map((item) => {
              const isExpanded = openMobileMenu === item.label;
              const panelId = `mobile-nav-${item.label
                .replace(/\W+/g, "-")
                .toLowerCase()}`;

              return (
                <li key={item.label} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileMenu(isExpanded ? null : item.label)
                    }
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    className={`flex min-h-12 w-full items-center gap-2 px-5 text-left text-[1rem] transition-colors hover:text-action ${
                      isExpanded ? "text-action" : "text-body"
                    }`}
                  >
                    {item.label}
                    <Chevron open={isExpanded} />
                  </button>

                  {isExpanded ? (
                    <ul
                      id={panelId}
                      className="flex flex-col pb-2 pl-7"
                    >
                      {item.items.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href ?? "#"}
                            onClick={closeDrawer}
                            aria-current={
                              sub.href === pathname ? "page" : undefined
                            }
                            className={`flex min-h-10 items-center gap-3 text-[0.9375rem] transition-colors ${
                              sub.href === pathname
                                ? "font-medium text-action"
                                : "text-body hover:text-action"
                            }`}
                          >
                            <Image
                              src={`/icons/${sub.icon}.png`}
                              alt=""
                              width={18}
                              height={18}
                              className="shrink-0"
                            />
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {show.cta ? (
            <div className="mt-8 px-1">
              <DonateButton
                formId={donate.form}
                variant="primarySolid"
                className="font-semibold uppercase"
                onClick={closeDrawer}
              >
                {donate.cta}
              </DonateButton>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

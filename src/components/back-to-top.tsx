"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/*
  The arrow that takes the reader back to the top of the page. It stays out of the way until the
  page has been scrolled a little, so it never sits over the top of a page nobody has moved down
  yet. It sits below the popups (z-50) and above the floating header (z-20), and keeps away from
  the admin portal, which has its own chrome.
*/
export function BackToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsVisible(window.scrollY > 400);
    }

    /* Read once on mount, so a page opened already scrolled shows the button. */
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function backToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  /* The admin portal has its own chrome, so the arrow is left out there. */
  if (pathname.startsWith("/admin")) return null;

  return (
    <button
      type="button"
      onClick={backToTop}
      aria-label="Back to top"
      className={`fixed right-5  z-40 grid size-11 place-items-center rounded-full bg-action text-white shadow-raised transition-[opacity,transform] duration-200 hover:bg-action-hover ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      } ${pathname.startsWith("/zakat-calculator")? "md:bottom-5 bottom-12": "bottom-5"}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-5 fill-none stroke-current stroke-2"
      >
        <path d="M12 19V6" strokeLinecap="round" />
        <path d="M6 11.5 12 5.5l6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

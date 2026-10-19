"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

/*
  Climbs from zero to the figure the first time it is scrolled to. A figure that arrives
  already written for the reader keeps its thousands separators, because the number is put
  back through toLocaleString on the way up.
*/

/* Reads the reduced-motion setting without setting state from an effect. */
function usePrefersReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function CountUp({
  value,
  className,
}: {
  value: string | number;
  className?: string;
}) {
  const target = typeof value === "number" ? value : Number(value.replace(/[^0-9]/g, "")) || 0;
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const duration = 1400;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          /* Ease out, so it settles onto the figure instead of stopping dead. */
          setShown(Math.round(target * (1 - (1 - progress) ** 3)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, reduced]);

  return (
    <p ref={ref} className={className}>
      {(reduced ? target : shown).toLocaleString("en-US")}
    </p>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

import {
  TURNSTILE_ENABLED,
  loadTurnstile,
  removeTurnstile,
  renderTurnstile,
  resetTurnstile,
} from "@/turnstile";

/*
  The visible Cloudflare check. Cloudflare draws its own box: "Verifying..." while it thinks, then
  "Success!" with a tick. When it wants a click, the box shows the "I am human" checkbox itself.

  The parent holds the token and keeps its button disabled until the token arrives.
*/

type Props = {
  onToken: (token: string) => void;
  /* Bump this after a failed send to throw the used token away and run a fresh check. */
  resetKey?: number;
  size?: "normal" | "compact" | "flexible";
  className?: string;
};

export function TurnstileBox({ onToken, resetKey = 0, size, className = "" }: Props) {
  const holderRef = useRef<HTMLDivElement | null>(null);
  const widgetRef = useRef<string | null>(null);
  const tokenHandler = useRef(onToken);
  /* The script can be blocked by an ad blocker. Say so, rather than leaving a dead button. */
  const [failed, setFailed] = useState(false);

  /* Kept in a ref so a new callback does not tear down and redraw the widget. */
  useEffect(() => {
    tokenHandler.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!TURNSTILE_ENABLED) return undefined;

    let active = true;

    void loadTurnstile().then((ready) => {
      if (!active) return;
      if (!ready) {
        setFailed(true);
        tokenHandler.current("");
        return;
      }
      if (!holderRef.current) return;

      widgetRef.current = renderTurnstile(holderRef.current, {
        size,
        onToken: (token) => tokenHandler.current(token),
        onExpire: () => tokenHandler.current(""),
        onError: () => tokenHandler.current(""),
      });
    });

    return () => {
      active = false;
      removeTurnstile(widgetRef.current);
      widgetRef.current = null;
    };
  }, [size]);

  useEffect(() => {
    if (resetKey === 0) return;
    tokenHandler.current("");
    resetTurnstile(widgetRef.current);
  }, [resetKey]);

  if (!TURNSTILE_ENABLED) return null;

  return (
    <div className={className}>
      <div ref={holderRef} />
      {failed ? (
        <p className="text-[0.75rem] text-action">
          The security check could not load. Please refresh the page.
        </p>
      ) : (
        <p className="mt-1 text-[0.6875rem] text-body">Security check · Cloudflare</p>
      )}
    </div>
  );
}

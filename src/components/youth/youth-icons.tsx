import type { ReactElement } from "react";

/*
  The glyphs this page needs, drawn solid in the reference's red. The card icons are filled shapes
  rather than outlines, so they hold their weight inside the pink tiles.
*/
type IconProps = { className?: string };

export function BookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M11 5.7C9.2 4.3 6.9 3.8 3 3.8V18c3.9 0 6.2.5 8 1.8V5.7Z" />
      <path d="M13 5.7c1.8-1.4 4.1-1.9 8-1.9V18c-3.9 0-6.2.5-8 1.8V5.7Z" />
    </svg>
  );
}

export function PeopleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <circle cx="9" cy="7.6" r="3.6" />
      <path d="M2.4 19.2c0-3.4 2.9-5.8 6.6-5.8s6.6 2.4 6.6 5.8c0 .6-.5 1.1-1.1 1.1H3.5c-.6 0-1.1-.5-1.1-1.1Z" />
      <path d="M16.4 4.5a3.3 3.3 0 0 1 0 6.2 4.8 4.8 0 0 0 0-6.2Z" />
      <path d="M18.1 13.7c2.3.5 4 2.3 4 4.6 0 .6-.5 1.1-1.1 1.1h-3.3c.2-.5.3-1.1.3-1.7 0-1.6-.6-3-1.6-4.1.6-.1 1.1-.1 1.7.1Z" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 3.4a7.6 7.6 0 1 0 4.6 13.6l4.6 4.6 1.8-1.8-4.6-4.6A7.6 7.6 0 0 0 11 3.4Zm0 2.6a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
      />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.6a9.4 9.4 0 1 0 0 18.8 9.4 9.4 0 0 0 0-18.8Zm6.8 8.2h-3a15 15 0 0 0-1.5-5.2 7.2 7.2 0 0 1 4.5 5.2ZM12 4.6c.8.9 1.7 2.7 2.1 6.2h-4.2c.4-3.5 1.3-5.3 2.1-6.2Zm-3.3 1a15 15 0 0 0-1.5 5.2h-3a7.2 7.2 0 0 1 4.5-5.2ZM4.2 13.2h3a15 15 0 0 0 1.5 5.2 7.2 7.2 0 0 1-4.5-5.2Zm6.1 0h3.4c-.4 3.5-1.3 5.3-1.7 5.9-.4-.6-1.3-2.4-1.7-5.9Zm4.1 5.2a15 15 0 0 0 1.4-5.2h3a7.2 7.2 0 0 1-4.4 5.2Z"
      />
    </svg>
  );
}

export function RibbonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <circle cx="12" cy="9" r="6" />
      <path d="M8.1 14.4 6.4 21.6 12 18.8l5.6 2.8-1.7-7.2a7.3 7.3 0 0 1-7.8 0Z" />
    </svg>
  );
}

export function HandshakeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M2.4 10.6 6 7l4 3.5-1.3 1.3-2.7-2.4-2.3 2.3v-1.1Z" />
      <path d="M21.6 10.6 18 7l-3.2 2.8 1.3 1.3L18 9.2l2.4 2.4v-1Z" />
      <path d="M8.2 12.6 12 16.4l3.8-3.8-1.3-1.3-2.5 2.5-2.5-2.5-1.3 1.3Z" />
      <path d="M11.3 17.6 12 18.3l4.4-4.4 2 .1-6.4 6.4-6.4-6.4 2-.1 3.7 3.7Z" />
    </svg>
  );
}

export function PersonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.6 20.2c0-3.7 3.3-6.3 7.4-6.3s7.4 2.6 7.4 6.3c0 .5-.4.9-.9.9H5.5c-.5 0-.9-.4-.9-.9Z" />
    </svg>
  );
}

export function PlaneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M3 13.3 21 4.4l-4.2 9.8-5.6 1.6L8.6 21l-1.9-5.1L3 13.3Z" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 20.4S4.4 15.8 4.4 10.7A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.6 2.7c0 5.1-7.6 9.7-7.6 9.7Z" />
    </svg>
  );
}

/* The hero pill's mark: three bars with a figure standing on the tallest. */
export function PodiumIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <rect x="1.5" y="15" width="5.5" height="7" rx="1" />
      <rect x="9.3" y="11" width="5.5" height="11" rx="1" />
      <rect x="17" y="17" width="5.5" height="5" rx="1" />
      <circle cx="12" cy="4.6" r="2.2" />
      <path d="M12 7.4c-2.3 0-3.6 1.5-3.6 3.4h7.2c0-1.9-1.3-3.4-3.6-3.4Z" />
    </svg>
  );
}

/* The card lookup: the content names an icon, and the page finds it here. */
export const YOUTH_ICONS: Record<string, (props: IconProps) => ReactElement> = {
  book: BookIcon,
  people: PeopleIcon,
  search: SearchIcon,
  globe: GlobeIcon,
  ribbon: RibbonIcon,
  handshake: HandshakeIcon,
  person: PersonIcon,
  plane: PlaneIcon,
};

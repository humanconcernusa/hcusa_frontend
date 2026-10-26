import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function Media({
  src,
  alt,
  className = "",
  sizes = "100vw",
  objectPosition,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /* Which part of the photo the crop keeps. Defaults to the centre. */
  objectPosition?: string;
}) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        style={objectPosition ? { objectPosition } : undefined}
        className="object-cover object-center"
      />
    </div>
  );
}

type ButtonVariant = "primary" | "primarySolid" | "secondary" | "dark" | "darkHover";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-medium whitespace-nowrap transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  /*
    The hover inverts the button to white on red text, so it carries its own red edge. Without
    that edge it vanished into a white card — the hero's Donate button had no border and no
    shadow, so its shape disappeared on hover.
  */
  primary:
    "border border-transparent bg-action text-white hover:border-action hover:bg-surface hover:text-action",
  /* Red that stays red on hover, for the header button. */
  primarySolid: "bg-action text-white hover:bg-action-hover",
  secondary: "bg-surface text-ink shadow-card hover:bg-action hover:text-white",
  dark: "bg-body text-white hover:bg-ink",
  /* Dark, and turns red on hover, for the About Us "Meet our Leadership" button. */
  darkHover: "bg-body text-white hover:bg-action",
};

const buttonSizes = {
  sm: "min-h-9 px-5 text-[0.8125rem]",
  md: "min-h-11 px-6 text-[0.9375rem]",
  lg: "min-h-12 px-8 text-base",
};

type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: keyof typeof buttonSizes;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentPropsWithoutRef<"button"> & ButtonStyleProps) {
  return (
    <button
      className={`${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  href = "",
  ...props
}: ComponentPropsWithoutRef<"a"> & ButtonStyleProps) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`;

  /*
    An internal link goes through Next's router, so moving between pages does not reload the
    whole site. In-page anchors and outside addresses stay plain links.
  */
  if (href.startsWith("/")) {
    return <Link href={href} className={classes} {...props} />;
  }

  return <a href={href} className={classes} {...props} />;
}

export function Eyebrow({ children, tone = "leaf" }: { children: ReactNode; tone?: "leaf" | "ink" }) {
  return (
    <p
      className={`text-center text-[0.75rem] text-balance font-medium uppercase tracking-[0.14em] ${
        tone === "leaf" ? "text-leaf" : "text-ink"
      }`}
    >
      {children}
    </p>
  );
}

export function Badge({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-leaf/20 bg-leaf/10 px-3.5 py-1.5 text-[0.75rem] font-medium text-leaf">
      {icon}
      {children}
    </span>
  );
}

/*
  The red-edged note: a tinted box with a thick action-red rule down its left side. The appeal
  heroes all use the same box, so the base lives here and each page passes only its own spacing.
*/
export function Callout({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`border-l-4 border-action bg-tint px-4 py-3 text-[1rem] text-ink ${className}`}>
      {children}
    </p>
  );
}

export function Tag({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-body">
      {icon}
      {children}
    </span>
  );
}

export function PlayButton({
  label = "Play video",
  onClick,
}: {
  label?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute top-1/2 left-1/2 grid md:size-16 size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface shadow-raised transition-transform duration-150 hover:scale-105"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="md:ml-1 size-6 fill-brand">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
}

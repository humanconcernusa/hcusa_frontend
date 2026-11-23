/*
  The image loader for a static site.

  Next's own image optimizer needs a Node server, so it cannot run here. Every image lives on
  Cloudflare R2:

  - An admin upload keeps three fixed sizes (the server makes them on upload), so this loader
    picks the file that fits the width Next asks for.
  - The site's own artwork is copied to R2 once, under the same /images paths, so a local path
    only needs the media host in front. It has no sized copies, which is why the size rule is
    applied before that prefix: otherwise hero.webp would become hero-640.webp and 404.

  The media base comes from NEXT_PUBLIC_MEDIA_URL, which is baked in at build time.
*/

const MEDIA_URL = (process.env.NEXT_PUBLIC_MEDIA_URL ?? "").replace(/\/+$/, "");

export default function mediaLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  /* An admin upload: use the copy the server already made for this width. */
  if (MEDIA_URL.length > 0 && src.startsWith(`${MEDIA_URL}/`) && src.endsWith(".webp")) {
    const suffix = width <= 640 ? "-640" : width <= 1280 ? "-1280" : "";

    return suffix.length > 0 ? src.replace(/\.webp$/, `${suffix}.webp`) : src;
  }

  /* The site's own artwork, copied to R2 under the same paths. */
  if (MEDIA_URL.length > 0 && src.startsWith("/images/")) {
    return `${MEDIA_URL}${src}`;
  }

  return src;
}

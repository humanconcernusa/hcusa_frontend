/*
  The image loader for a static site.

  Next's own image optimizer needs a Node server, so it cannot run here. Uploaded images live
  on Cloudflare R2 as three fixed sizes (the server makes them on upload), so this loader just
  picks the file that fits the width Next asks for. Because next/image calls this once per
  width, it still builds a proper srcset from each component's `sizes`. Local files under
  /images are passed through untouched — nothing resized them, and they are already the size
  they are used at.

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
  if (MEDIA_URL.length === 0 || !src.startsWith(`${MEDIA_URL}/`) || !src.endsWith(".webp")) {
    return src;
  }

  const suffix = width <= 640 ? "-640" : width <= 1280 ? "-1280" : "";

  return suffix.length > 0 ? src.replace(/\.webp$/, `${suffix}.webp`) : src;
}

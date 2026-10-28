/*
  The public address of an image.

  next/image already goes through the loader in image-loader.ts. A plain <img> does not, so the
  icons and badges that use one ask for their address here. The artwork lives on Cloudflare R2
  under the same paths, and the media base is baked in at build time.
*/

const MEDIA_URL = (process.env.NEXT_PUBLIC_MEDIA_URL ?? "").replace(/\/+$/, "");

export function assetUrl(src: string): string {
  /* An admin upload is already an absolute R2 address. */
  if (MEDIA_URL.length === 0 || !src.startsWith("/images/")) return src;

  return `${MEDIA_URL}${src}`;
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    The public site is a folder of HTML, CSS and JS that any host can serve. No Node server and
    no API routes — which is why the admin and the API live in server-app/.
  */
  output: "export",

  /*
    Next's image optimizer needs a server, so it cannot run here. The custom loader picks
    one of the fixed sizes the server already made on R2, and next/image still builds a
    srcset from each component's `sizes`.
  */
  images: {
    loader: "custom",
    loaderFile: "./src/image-loader.ts",
  },
};

export default nextConfig;

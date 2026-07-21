import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { buildAbsoluteUrl } from "@/lib/utilities";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: buildAbsoluteUrl("/sitemap.xml", siteConfig.siteUrl),
  };
}

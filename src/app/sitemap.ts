import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { buildAbsoluteUrl } from "@/lib/utilities";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: buildAbsoluteUrl("/", siteConfig.siteUrl),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

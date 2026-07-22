import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { collectionCatalog } from "@/data/development/mock-collections";
import { buildAbsoluteUrl } from "@/lib/utilities";

export default function sitemap(): MetadataRoute.Sitemap {
  const activeCollections = collectionCatalog
    .filter((entry) => entry.status === "active")
    .map((entry) => ({
      url: buildAbsoluteUrl(
        `/collections/${entry.collection.handle}`,
        siteConfig.siteUrl,
      ),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: buildAbsoluteUrl("/", siteConfig.siteUrl),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: buildAbsoluteUrl("/collections", siteConfig.siteUrl),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...activeCollections,
  ];
}

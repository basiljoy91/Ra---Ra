import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { journalArticles } from "@/data/development/editorial-content";
import { collectionCatalog } from "@/data/development/mock-collections";
import { buildAbsoluteUrl } from "@/lib/utilities";

export default function sitemap(): MetadataRoute.Sitemap {
  const editorialRoutes = ["/about", "/journal", "/contact", "/faq", "/size-guide"].map(
    (path) => ({
      url: buildAbsoluteUrl(path, siteConfig.siteUrl),
      changeFrequency: "monthly" as const,
      priority: path === "/journal" ? 0.7 : 0.6,
    }),
  );
  const journalRoutes = journalArticles.map((article) => ({
    url: buildAbsoluteUrl(`/journal/${article.slug}`, siteConfig.siteUrl),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
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
    ...editorialRoutes,
    ...journalRoutes,
    ...activeCollections,
  ];
}

import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { journalArticles } from "@/data/development/editorial-content";
import {
  getCollections,
  getProducts,
} from "@/lib/commerce/shopify/provider";
import { buildAbsoluteUrl } from "@/lib/utilities";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts({ limit: 250 }),
  ]);
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
  const collectionRoutes = collections.map((collection) => ({
      url: buildAbsoluteUrl(
        `/collections/${collection.handle}`,
        siteConfig.siteUrl,
      ),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  const productRoutes = products.map((product) => ({
    url: buildAbsoluteUrl(`/products/${product.handle}`, siteConfig.siteUrl),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
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
    ...collectionRoutes,
    ...productRoutes,
  ];
}

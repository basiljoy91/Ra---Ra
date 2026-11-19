import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { journalArticles } from "@/data/development/editorial-content";
import { getCollections, getProducts } from "@/lib/commerce/shopify/provider";
import { buildAbsoluteUrl } from "@/lib/utilities";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collectionsResult, productsResult] = await Promise.allSettled([
    getCollections(),
    getProducts({ limit: 250 }),
  ]);
  const collections =
    collectionsResult.status === "fulfilled" ? collectionsResult.value : [];
  const products = productsResult.status === "fulfilled" ? productsResult.value : [];
  const editorialRoutes = [
    "/about",
    "/journal",
    "/contact",
    "/faq",
    "/size-guide",
    "/impressum",
    "/privacy",
    "/terms",
    "/shipping",
    "/returns",
    "/widerruf",
    "/cookie-einstellungen",
  ].map(
    (path) => ({
      url: buildAbsoluteUrl(path, siteConfig.siteUrl),
      changeFrequency: "monthly" as const,
      priority: path === "/journal" ? 0.7 : path === "/widerruf" ? 0.8 : 0.6,
    }),
  );
  const journalRoutes = journalArticles.map((article) => ({
    url: buildAbsoluteUrl(`/journal/${article.slug}`, siteConfig.siteUrl),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const productRoutes = products.map((product) => ({
    url: buildAbsoluteUrl(`/products/${product.handle}`, siteConfig.siteUrl),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const collectionRoutes = collections.map((collection) => ({
    url: buildAbsoluteUrl(`/collections/${collection.handle}`, siteConfig.siteUrl),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: buildAbsoluteUrl("/", siteConfig.siteUrl),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...editorialRoutes,
    ...journalRoutes,
    ...collectionRoutes,
    ...productRoutes,
  ];
}

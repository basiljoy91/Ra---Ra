import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { buildAbsoluteUrl } from "@/lib/utilities";

export function createLegalMetadata(
  path: `/${string}`,
  title: string,
  description: string,
): Metadata {
  const url = buildAbsoluteUrl(path, siteConfig.siteUrl);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: siteConfig.siteName,
    },
  };
}


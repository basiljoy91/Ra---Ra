import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [65, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    const legacyDesigns = [
      ["past-present-beyond", "beyond-time"],
      ["beyond-fear", "beyond-fear"],
      ["beyond-reality", "beyond-reality"],
      ["beyond-limits", "beyond-limits"],
    ] as const;
    const legacyFits = [
      "sculptural-boxy-black",
      "washed-art-charcoal",
      "signature-regular-off-white",
      "relaxed-essential-chocolate",
    ] as const;

    return [
      {
        source: "/products/past-present-beyond",
        destination: "/products/beyond-time",
        permanent: true,
      },
      ...legacyDesigns.flatMap(([legacyDesign, canonicalHandle]) =>
      legacyFits.map((fit) => ({
        source: `/products/${legacyDesign}-${fit}`,
        destination: `/products/${canonicalHandle}`,
        permanent: true,
      })),
      ),
    ];
  },
};

export default nextConfig;

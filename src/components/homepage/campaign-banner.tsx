import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import styles from "@/components/homepage/homepage.module.css";

interface CampaignBannerContent {
  eyebrow: string;
  heading: readonly string[];
  description: string;
  action: { label: string; href: string };
  image: { src: string; alt: string; width: number; height: number };
}

export function CampaignBanner({
  content,
}: {
  content: CampaignBannerContent;
}) {
  return (
    <section className={styles.campaign} aria-labelledby="campaign-title">
      <Image
        alt={content.image.alt}
        className={styles.campaignImage}
        fill
        sizes="100vw"
        src={content.image.src}
        loading="lazy"
      />
      <div className={styles.campaignShade} />
      <div className={styles.campaignContent}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h2 id="campaign-title" className={styles.campaignTitle}>
          {content.heading.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p className={styles.campaignDescription}>{content.description}</p>
      </div>
      <div className={styles.campaignAction}>
        <Link className={styles.campaignCta} href={content.action.href}>
          {content.action.label}
          <ArrowRight aria-hidden="true" size={15} strokeWidth={1.3} />
        </Link>
      </div>
    </section>
  );
}

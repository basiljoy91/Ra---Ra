import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import styles from "@/components/homepage/homepage.module.css";
import type { ProductImage } from "@/lib/commerce";

interface QualityStoryContent {
  eyebrow: string;
  headingLines: readonly string[];
  description: string;
  action: { label: string; href: string };
  image: { src: string; alt: string; width: number; height: number };
  productImage: { src: string; alt: string; width: number; height: number };
  qualities: readonly string[];
}

interface QualityStoryProps {
  content: QualityStoryContent;
}

export function QualityStory({ content }: QualityStoryProps) {
  const productImage = {
    url: content.productImage.src,
    alt: content.productImage.alt,
    width: content.productImage.width,
    height: content.productImage.height,
  } satisfies ProductImage;

  return (
    <section className={styles.quality} aria-labelledby="quality-title">
      <div className={styles.qualityStory}>
        <Image
          alt={content.image.alt}
          className={styles.qualityStoryImage}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={content.image.src}
          loading="lazy"
        />
        <div className={styles.qualityStoryShade} />
        <div className={styles.qualityStoryContent}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="quality-title" className={styles.qualityTitle}>
            {content.headingLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className={styles.qualityDescription}>{content.description}</p>
          <Link className={styles.textLink} href={content.action.href}>
            {content.action.label}
            <ArrowRight aria-hidden="true" size={14} strokeWidth={1.3} />
          </Link>
        </div>
      </div>

      <div className={styles.qualityProduct}>
        <div className={styles.qualityProductVisual}>
          <Image
            alt={productImage.alt}
            className={styles.qualityProductImage}
            fill
            sizes="(min-width: 1024px) 32vw, 100vw"
            src={productImage.url}
            loading="lazy"
          />
          <span className={styles.magnifier} aria-hidden="true">
            <Image
              alt=""
              className={styles.magnifierImage}
              fill
              sizes="160px"
              src={productImage.url}
            />
          </span>
        </div>
        <div className={styles.qualityDetails}>
          <ul className={styles.qualityList} role="list">
            {content.qualities.map((quality) => (
              <li className={styles.qualityItem} key={quality}>
                <Check
                  aria-hidden="true"
                  className={styles.qualityCheck}
                  size={17}
                />
                <span>{quality}</span>
              </li>
            ))}
          </ul>
          <p className={styles.qualityCaption}>Limited edition 01</p>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import styles from "@/components/homepage/homepage.module.css";
import { Container } from "@/components/layout/container";
import type { EditorialHomepageHero } from "@/components/homepage/types";

export function EditorialHero({ content }: { content: EditorialHomepageHero }) {
  return (
    <section className={styles.hero} aria-labelledby="homepage-hero-title">
      <Image
        alt={content.image.alt}
        className={styles.heroImage}
        fill
        priority
        sizes="100vw"
        src={content.image.src}
      />
      <div className={styles.heroShade} />
      <Container className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h1 id="homepage-hero-title" className={styles.heroTitle}>
            {content.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className={styles.heroDescription}>
            {content.descriptionLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <Link className={styles.heroCta} href={content.cta.href}>
            {content.cta.label}
            <ArrowRight aria-hidden="true" size={15} strokeWidth={1.3} />
          </Link>
        </div>
      </Container>
      <div className={styles.heroIndex} aria-label="Slide 1 of 1">
        01 / 01
      </div>
    </section>
  );
}

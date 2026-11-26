import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Feather,
  Layers3,
  Orbit,
  Ruler,
  Shirt,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter/newsletter-form";
import { FavoriteButton } from "@/components/homepage/favorite-button.client";
import styles from "@/components/homepage/mobile-homepage.module.css";
import { editorialHomepage } from "@/config/editorial-homepage";
import {
  beyondDesigns,
} from "@/data/beyond-collection";
import type { Product } from "@/lib/commerce";
import { formatMoney } from "@/lib/utilities";
import type { NewsletterFormAction } from "@/types/newsletter";

const shortcuts = [
  { label: "Designs", href: "#designs-title", Icon: Sparkles },
  { label: "Beyond", href: "/about", Icon: Orbit },
  { label: "Stories", href: "/journal", Icon: Feather },
  { label: "Fit", href: "/size-guide", Icon: Shirt },
  { label: "Journal", href: "/journal", Icon: BookOpen },
] as const;

const benefits = [
  { label: "100% Supima cotton", Icon: Sparkles },
  { label: "280 GSM", Icon: Ruler },
  { label: "Double jersey", Icon: Layers3 },
  { label: "Oversized unisex fit", Icon: Shirt },
] as const;

function SectionHeading({
  id,
  title,
  href,
}: {
  id: string;
  title: string;
  href?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <h2 id={id}>{title}</h2>
      {href ? (
        <Link href={href}>
          View all <ArrowRight aria-hidden="true" size={13} />
        </Link>
      ) : null}
    </div>
  );
}

export function MobileEditorialStorefront({
  newsletterAction,
  products,
}: {
  newsletterAction: NewsletterFormAction;
  products: readonly Product[];
}) {
  return (
    <div className={styles.mobilePage}>
      <nav className={styles.seriesNav} aria-label="Explore the BEYOND stories">
        {beyondDesigns.map((design) => (
          <Link href={`/products/${design.handle}`} key={design.handle}>
            {design.title.replace("Beyond ", "")} <ArrowRight aria-hidden="true" size={19} />
          </Link>
        ))}
      </nav>

      <section className={styles.fabricBanner} aria-labelledby="fabric-title">
        <Image
          alt={beyondDesigns[0]!.images[10]!.alt}
          fill
          sizes="(max-width: 767px) 100vw, 1px"
          src={beyondDesigns[0]!.images[10]!.url}
        />
        <div className={styles.fabricShade} />
        <span className={styles.fabricLabel} aria-hidden="true">RA &amp; RA</span>
        <div className={styles.fabricCopy}>
          <h2 id="fabric-title">One garment.<br />Four meanings.</h2>
          <p>280 GSM Supima cotton.<br />Dense, smooth and softly structured.</p>
        </div>
      </section>

      <section className={styles.mobileSection} aria-labelledby="four-stories-title">
        <SectionHeading id="four-stories-title" title="The four stories" href="/journal" />
        <div className={styles.collectionRail}>
          {beyondDesigns.map((design) => (
            <article className={styles.collectionCard} key={design.handle}>
              <Link href={`/products/${design.handle}`}>
                <Image
                  alt={design.images[2]!.alt}
                  fill
                  sizes="(max-width: 767px) 72vw, 1px"
                  src={design.images[2]!.url}
                />
                <span className={styles.cardShade} />
                <span className={styles.collectionCopy}>
                  <strong>{design.title}</strong>
                  <span>{design.corePhilosophy} <ArrowRight aria-hidden="true" size={14} /></span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.mobileSection} aria-labelledby="designs-title">
        <SectionHeading id="designs-title" title="BEYOND designs" />
        <div className={styles.productGrid}>
          {products.slice(0, 4).map((product) => {
            const image = product.images[0];

            return (
              <article className={styles.productCard} key={product.id}>
                <Link className={styles.productImage} href={`/products/${product.handle}`}>
                  {image ? (
                    <Image alt={image.alt} fill sizes="(max-width: 767px) 50vw, 1px" src={image.url} />
                  ) : null}
                </Link>
                <FavoriteButton productName={product.title} />
                <Link className={styles.productDetails} href={`/products/${product.handle}`}>
                  <span>{product.title}</span>
                  <strong>{product.priceIsPlaceholder ? "Price pending" : formatMoney(product.price)}</strong>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.meaningBanner} aria-labelledby="meaning-title-mobile">
        <Image
          alt={beyondDesigns[2]!.hero.mobile.alt}
          fill
          sizes="(max-width: 767px) 100vw, 1px"
          src={beyondDesigns[2]!.hero.mobile.url}
        />
        <div className={styles.meaningShade} />
        <div className={styles.meaningCopy}>
          <h2 id="meaning-title-mobile">We create the design.<br />You give it meaning.</h2>
          <p>The artwork is intentional. The interpretation is personal.</p>
          <Link href="/about">Read the philosophy <ArrowRight aria-hidden="true" size={14} /></Link>
        </div>
      </section>

      <ul className={styles.benefitRail} aria-label="BEYOND garment specification" role="list">
        {benefits.map(({ label, Icon }) => (
          <li key={label}>
            <Icon aria-hidden="true" size={25} strokeWidth={1.25} />
            <span>{label}</span>
          </li>
        ))}
      </ul>

      <section className={styles.mobileSection} aria-labelledby="stories-title">
        <SectionHeading id="stories-title" title="Read the stories" href="/journal" />
        <div className={styles.storyGrid}>
          {beyondDesigns.slice(0, 2).map((design) => (
            <article className={styles.storyCard} key={design.handle}>
              <Link href={`/journal/${design.handle}`}>
                <div className={styles.storyMedia}>
                  <Image alt={design.images[2]!.alt} fill sizes="48vw" src={design.images[2]!.url} />
                </div>
                <div>
                  <span>{design.number} / 04</span>
                  <h3>{design.collectionStoryHeading}</h3>
                  <p>{design.shortDescription}</p>
                  <ArrowRight aria-hidden="true" size={15} />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.mobileSection} aria-labelledby="world-mobile-title">
        <SectionHeading id="world-mobile-title" title="A closer look" />
        <div className={styles.worldRail}>
          {beyondDesigns.map((design) => (
            <div className={styles.worldImage} key={design.handle}>
              <Image alt={design.images[3]!.alt} fill sizes="(max-width: 767px) 62vw, 1px" src={design.images[3]!.url} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.newsletter} aria-labelledby="mobile-newsletter-title">
        <div>
          <p>RA &amp; RA / COLLECTION 01</p>
          <h2 id="mobile-newsletter-title">Letters from<br />the studio</h2>
        </div>
        <p>Collection stories and release updates—sent only when there is something worth sharing.</p>
        <div className={styles.newsletterForm}>
          <NewsletterForm action={newsletterAction} config={editorialHomepage.newsletter} variant="editorial" />
        </div>
        <span className={styles.newsletterNote}>
          <CheckCircle2 aria-hidden="true" size={14} /> We only write when there is something worth sharing.
        </span>
      </section>
    </div>
  );
}

export function MobileHomepageShortcuts() {
  return (
    <nav className={styles.shortcutNav} aria-label="Homepage shortcuts">
      {shortcuts.map(({ label, href, Icon }, index) => (
        <Link aria-current={index === 0 ? "page" : undefined} href={href} key={label}>
          <Icon aria-hidden="true" size={25} strokeWidth={1.35} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

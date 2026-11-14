import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Feather,
  Layers3,
  Orbit,
  ShieldCheck,
  Shirt,
  Sparkles,
  Waves,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter/newsletter-form";
import { FavoriteButton } from "@/components/homepage/favorite-button.client";
import styles from "@/components/homepage/mobile-homepage.module.css";
import { editorialHomepage } from "@/config/editorial-homepage";
import type { Product } from "@/lib/commerce";
import { formatMoney } from "@/lib/utilities";
import type { NewsletterFormAction } from "@/types/newsletter";

const shortcuts = [
  { label: "New drop", href: "/collections/beyond?sort=newest", Icon: Sparkles },
  { label: "Beyond", href: "/collections/beyond", Icon: Orbit },
  { label: "Stories", href: "/journal", Icon: Feather },
  { label: "Fits", href: "/size-guide", Icon: Shirt },
  { label: "Journal", href: "/journal", Icon: BookOpen },
] as const;

const series = [
  { label: "Fear", href: "/products/beyond-fear-sculptural-boxy-black" },
  { label: "Reality", href: "/products/beyond-reality-sculptural-boxy-black" },
  { label: "Limits", href: "/products/beyond-limits-sculptural-boxy-black" },
  { label: "Time", href: "/products/past-present-beyond-sculptural-boxy-black" },
] as const;

const collections = [
  {
    title: "Beyond Fear",
    href: "/products/beyond-fear-sculptural-boxy-black",
    image: "/products/beyond-fear/sculptural-boxy-black/side-couple-black.png",
    alt: "Models wearing the Beyond Fear sculptural boxy T-shirt",
  },
  {
    title: "Beyond Reality",
    href: "/products/beyond-reality-sculptural-boxy-black",
    image: "/products/beyond-reality/sculptural-boxy-black/side-couple-black.png",
    alt: "Models wearing the Beyond Reality sculptural boxy T-shirt",
  },
  {
    title: "Beyond Limits",
    href: "/products/beyond-limits-sculptural-boxy-black",
    image: "/products/beyond-limits/sculptural-boxy-black/side-couple-black.png",
    alt: "Models wearing the Beyond Limits sculptural boxy T-shirt",
  },
  {
    title: "Beyond Time",
    href: "/products/past-present-beyond-sculptural-boxy-black",
    image: "/products/past-present-beyond/sculptural-boxy-black/side-couple-black.png",
    alt: "Models wearing the Past Present Beyond sculptural boxy T-shirt",
  },
] as const;

const fits = [
  {
    label: "Sculptural boxy",
    image: "/products/beyond-fear/sculptural-boxy-black/front-male-black.png",
  },
  {
    label: "Washed art",
    image: "/products/beyond-reality/washed-art-charcoal/front-male-black.png",
  },
  {
    label: "Signature regular",
    image: "/products/past-present-beyond/signature-regular-off-white/front-female-black.png",
  },
  {
    label: "Relaxed essential",
    image: "/products/beyond-limits/relaxed-essential-chocolate/front-female-black.png",
  },
] as const;

const benefits = [
  { label: "Premium cotton", Icon: Sparkles },
  { label: "Considered weight", Icon: Waves },
  { label: "Limited drops", Icon: Layers3 },
  { label: "Secure checkout", Icon: ShieldCheck },
] as const;

const worldImages = [
  {
    src: "/products/beyond-limits/washed-art-charcoal/front-male-black.png",
    alt: "Model wearing a washed black Beyond Limits T-shirt",
  },
  {
    src: "/editorial/washed-cotton-macro.png",
    alt: "Close view of washed black cotton",
  },
  {
    src: "/products/past-present-beyond/signature-regular-off-white/side-couple-black.png",
    alt: "Models wearing the Past Present Beyond artwork",
  },
  {
    src: "/products/beyond-fear/washed-art-charcoal/lifestyle-back.png",
    alt: "Beyond Fear back artwork in directional light",
  },
] as const;

const preferredHandles = [
  "beyond-fear-sculptural-boxy-black",
  "past-present-beyond-signature-regular-off-white",
  "beyond-limits-relaxed-essential-chocolate",
  "beyond-reality-washed-art-charcoal",
] as const;

function selectProducts(products: readonly Product[]) {
  const preferred = preferredHandles.flatMap((handle) => {
    const product = products.find((candidate) => candidate.handle === handle);
    return product ? [product] : [];
  });
  const preferredIds = new Set(preferred.map((product) => product.id));

  return [
    ...preferred,
    ...products.filter((product) => !preferredIds.has(product.id)),
  ].slice(0, 4);
}

function SectionHeading({
  id,
  title,
  href,
}: {
  id: string;
  title: string;
  href: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <h2 id={id}>{title}</h2>
      <Link href={href}>
        View all <ArrowRight aria-hidden="true" size={13} />
      </Link>
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
  const bestSellers = selectProducts(products);

  return (
    <div className={styles.mobilePage}>
      <nav className={styles.shortcutNav} aria-label="Homepage shortcuts">
        {shortcuts.map(({ label, href, Icon }, index) => (
          <Link aria-current={index === 0 ? "page" : undefined} href={href} key={label}>
            <Icon aria-hidden="true" size={25} strokeWidth={1.35} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <section className={styles.hero} aria-labelledby="mobile-hero-title">
        <Image
          alt="Two models wearing black Ra & Ra Beyond Fear T-shirts"
          className={styles.heroImage}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 1px"
          src="/products/beyond-fear/sculptural-boxy-black/side-couple-black.png"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <h1 id="mobile-hero-title">
            <span>Beyond</span>
            <span>Series</span>
          </h1>
          <i aria-hidden="true" />
          <p>Four perspectives.<br />One mindset.</p>
          <Link href="/collections/beyond">
            Explore now <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>

      <nav className={styles.seriesNav} aria-label="Explore the Beyond series">
        {series.map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label} <ArrowRight aria-hidden="true" size={19} />
          </Link>
        ))}
      </nav>

      <section className={styles.fabricBanner} aria-labelledby="fabric-title">
        <Image
          alt="Macro detail of premium washed black cotton"
          fill
          sizes="(max-width: 767px) 100vw, 1px"
          src="/editorial/washed-cotton-macro.png"
        />
        <div className={styles.fabricShade} />
        <span className={styles.fabricLabel} aria-hidden="true">Ra &amp; Ra</span>
        <div className={styles.fabricCopy}>
          <h2 id="fabric-title">Crafted<br />for more</h2>
          <p>Substantial feel. Structured drape.<br />Built for everyday wear.</p>
        </div>
      </section>

      <section className={styles.mobileSection} aria-labelledby="featured-collections-title">
        <SectionHeading id="featured-collections-title" title="Featured collections" href="/collections/beyond" />
        <div className={styles.collectionRail}>
          {collections.map((collection) => (
            <article className={styles.collectionCard} key={collection.title}>
              <Link href={collection.href}>
                <Image alt={collection.alt} fill sizes="(max-width: 767px) 72vw, 1px" src={collection.image} />
                <span className={styles.cardShade} />
                <span className={styles.collectionCopy}>
                  <strong>{collection.title}</strong>
                  <span>Explore <ArrowRight aria-hidden="true" size={14} /></span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.mobileSection} aria-labelledby="best-sellers-title">
        <SectionHeading id="best-sellers-title" title="Best sellers" href="/collections/beyond" />
        <div className={styles.productGrid}>
          {bestSellers.map((product) => {
            const image = product.images[0];
            const displayName = product.title.split(" — ")[0] ?? product.title;

            return (
              <article className={styles.productCard} key={product.id}>
                <Link className={styles.productImage} href={`/products/${product.handle}`}>
                  {image ? (
                    <Image
                      alt={image.alt}
                      fill
                      sizes="(max-width: 767px) 50vw, 1px"
                      src={image.url}
                    />
                  ) : null}
                </Link>
                <FavoriteButton productName={displayName} />
                <Link className={styles.productDetails} href={`/products/${product.handle}`}>
                  <span>{displayName}</span>
                  <strong>{formatMoney(product.price)}</strong>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.meaningBanner} aria-labelledby="meaning-title-mobile">
        <Image
          alt="Models wearing the Beyond Limits collection"
          fill
          sizes="(max-width: 767px) 100vw, 1px"
          src="/products/beyond-limits/sculptural-boxy-black/side-couple-black.png"
        />
        <div className={styles.meaningShade} />
        <div className={styles.meaningCopy}>
          <h2 id="meaning-title-mobile">Made to<br />mean more.</h2>
          <p>Apparel for ideas that move beyond the ordinary.</p>
          <Link href="/collections/beyond">Shop the collection <ArrowRight aria-hidden="true" size={14} /></Link>
        </div>
      </section>

      <section className={styles.mobileSection} aria-labelledby="shop-by-fit-title">
        <SectionHeading id="shop-by-fit-title" title="Shop by fit" href="/collections/beyond" />
        <div className={styles.fitRail}>
          {fits.map((fit) => (
            <Link href="/collections/beyond" className={styles.fitCard} key={fit.label}>
              <Image alt="" fill sizes="(max-width: 767px) 48vw, 1px" src={fit.image} />
              <span className={styles.cardShade} />
              <strong>{fit.label}</strong>
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          ))}
        </div>
      </section>

      <ul className={styles.benefitRail} aria-label="Ra & Ra product benefits" role="list">
        {benefits.map(({ label, Icon }) => (
          <li key={label}>
            <Icon aria-hidden="true" size={25} strokeWidth={1.25} />
            <span>{label}</span>
          </li>
        ))}
      </ul>

      <section className={styles.mobileSection} aria-labelledby="stories-title">
        <SectionHeading id="stories-title" title="Stories beyond" href="/journal" />
        <div className={styles.storyGrid}>
          <article className={styles.storyCard}>
            <Link href="/journal/atlas-and-the-weight-of-heaven">
              <div className={styles.storyMedia}>
                <Image alt="Beyond Limits artwork inspired by Atlas" fill sizes="48vw" src="/products/beyond-limits/sculptural-boxy-black/lifestyle-back.png" />
              </div>
              <div>
                <span>Journal</span>
                <h3>The weight Atlas carried</h3>
                <p>A closer reading of strength, burden and the heavens.</p>
                <ArrowRight aria-hidden="true" size={15} />
              </div>
            </Link>
          </article>
          <article className={styles.storyCard}>
            <Link href="/journal/what-250-gsm-really-means">
              <div className={styles.storyMedia}>
                <Image alt="Close view of black cotton texture" fill sizes="48vw" src="/editorial/washed-cotton-macro.png" />
              </div>
              <div>
                <span>Material study</span>
                <h3>Weight, hand and purpose</h3>
                <p>How fabric weight changes structure, drape and feel.</p>
                <ArrowRight aria-hidden="true" size={15} />
              </div>
            </Link>
          </article>
        </div>
      </section>

      <section className={styles.mobileSection} aria-labelledby="world-mobile-title">
        <SectionHeading id="world-mobile-title" title="Seen in the Ra & Ra world" href="/journal" />
        <div className={styles.worldRail}>
          {worldImages.map((image) => (
            <div className={styles.worldImage} key={image.src}>
              <Image alt={image.alt} fill sizes="(max-width: 767px) 62vw, 1px" src={image.src} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.newsletter} aria-labelledby="mobile-newsletter-title">
        <div>
          <p>Studio letters · Edition 01</p>
          <h2 id="mobile-newsletter-title">Join the<br />movement</h2>
        </div>
        <p>Be the first to hear about new drops, limited editions and the stories behind the work.</p>
        <div className={styles.newsletterForm}>
          <NewsletterForm action={newsletterAction} config={editorialHomepage.newsletter} variant="editorial" />
        </div>
        <span className={styles.newsletterNote}><CheckCircle2 aria-hidden="true" size={14} /> We only write when there is something worth sharing.</span>
      </section>
    </div>
  );
}

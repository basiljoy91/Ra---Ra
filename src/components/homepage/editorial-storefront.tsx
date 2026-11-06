import {
  ArrowRight,
  Cloud,
  Layers3,
  Paintbrush,
  Ruler,
  Shirt,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter/newsletter-form";
import { FavoriteButton } from "@/components/homepage/favorite-button.client";
import { HeroCarousel } from "@/components/homepage/hero-carousel.client";
import styles from "@/components/homepage/homepage.module.css";
import { editorialHomepage } from "@/config/editorial-homepage";
import type { Product } from "@/lib/commerce";
import { formatMoney } from "@/lib/utilities";
import type { NewsletterFormAction } from "@/types/newsletter";

const storyCards = [
  {
    title: "Courage",
    copy: "Fear rarely disappears before we move. The hourglass becomes a reminder that courage is a decision made while time is still moving.",
    image: "/products/beyond-fear/sculptural-boxy-black/lifestyle-back.png",
    href: "/products/beyond-fear-sculptural-boxy-black",
  },
  {
    title: "Perception",
    copy: "A hooded figure, orbital lines and a fractured moon ask where the visible world ends—and where imagination begins.",
    image: "/products/beyond-reality/washed-art-charcoal/lifestyle-back.png",
    href: "/products/beyond-reality-washed-art-charcoal",
  },
  {
    title: "Time",
    copy: "A classical portrait interrupted by modern red marks becomes an archive of identity: inherited, altered and carried forward.",
    image: "/products/past-present-beyond/signature-regular-off-white/lifestyle-back.png",
    href: "/products/past-present-beyond-signature-regular-off-white",
  },
] as const;

const benefits = [
  { value: "100%", label: "Cotton jersey", Icon: Cloud },
  { value: "250–280", label: "GSM fabric weight", Icon: Ruler },
  { value: "Four", label: "Unisex silhouettes", Icon: Shirt },
  { value: "Front + back", label: "Screen-printed artwork", Icon: Paintbrush },
  { value: "Edition 01", label: "One connected collection", Icon: Layers3 },
] as const;

const fieldNotes = [
  {
    category: "Artwork note · 01",
    title: "Atlas carried the heavens—not the Earth",
    excerpt: "The familiar globe on Atlas’s shoulders began as a celestial sphere. Beyond Limits uses that older story to ask whether strength is endurance, release, or both.",
    href: "/journal/atlas-and-the-weight-of-heaven",
  },
  {
    category: "Material note · 02",
    title: "What 250–280 GSM changes",
    excerpt: "GSM measures fabric weight per square metre. In this collection, the heavier specification is chosen for a denser hand, a cleaner fall and a more architectural silhouette.",
    href: "/journal/what-250-gsm-really-means",
  },
  {
    category: "Visual note · 03",
    title: "Classical marble was never simply white",
    excerpt: "Ancient sculpture was often painted and gilded. The red interruption in Past Present Beyond reconnects the classical face with colour, time and change.",
    href: "/journal/when-marble-was-never-white",
  },
] as const;

const bestProductIds = [
  "product-beyond-fear-sculptural-boxy-black",
  "product-beyond-reality-washed-art-charcoal",
  "product-past-present-beyond-signature-regular-off-white",
  "product-beyond-limits-relaxed-essential-chocolate",
] as const;

const newProductIds = [
  "product-beyond-limits-sculptural-boxy-black",
  "product-beyond-fear-washed-art-charcoal",
  "product-past-present-beyond-signature-regular-off-white",
  "product-beyond-reality-washed-art-charcoal",
  "product-beyond-limits-washed-art-charcoal",
  "product-past-present-beyond-sculptural-boxy-black",
] as const;

const socialImages = [
  "/products/beyond-limits/washed-art-charcoal/front-male-black.png",
  "/products/beyond-fear/sculptural-boxy-black/side-couple-black.png",
  "/products/past-present-beyond/signature-regular-off-white/lifestyle-back.png",
  "/editorial/washed-cotton-macro.png",
] as const;

function productsByIds(
  ids: readonly string[],
  allProducts: readonly Product[],
) {
  const selected = ids.flatMap((id) => {
    const expectedHandle = id.replace(/^product-/, "");
    const product = allProducts.find(
      (candidate) =>
        candidate.id === id || candidate.handle === expectedHandle,
    );
    return product ? [product] : [];
  });
  const selectedIds = new Set(selected.map((product) => product.id));

  return [
    ...selected,
    ...allProducts.filter((product) => !selectedIds.has(product.id)),
  ].slice(0, ids.length);
}

function ProductRail({
  id,
  title,
  productIds,
  allProducts,
  compact = false,
}: {
  id: string;
  title: string;
  productIds: readonly string[];
  allProducts: readonly Product[];
  compact?: boolean;
}) {
  const products = productsByIds(productIds, allProducts);

  return (
    <section className={styles.productRailSection} aria-labelledby={id}>
      <div className={styles.sectionHeadingRow}>
        <h2 id={id}>{title}</h2>
        <Link href="/collections/beyond">View all <ArrowRight aria-hidden="true" size={14} /></Link>
      </div>
      <div className={compact ? styles.compactProductRail : styles.productRail}>
        {products.map((product) => {
          const image = product.images[0];
          const displayName = product.title.split(" — ")[0] ?? product.title;

          return (
            <article className={styles.productTile} key={product.id}>
              <Link className={styles.productMedia} href={`/products/${product.handle}`}>
                {image ? (
                  <Image
                    alt={image.alt}
                    fill
                    sizes={compact ? "(min-width: 900px) 16vw, 42vw" : "(min-width: 900px) 24vw, 58vw"}
                    src={image.url}
                    className={styles.productImage}
                  />
                ) : null}
              </Link>
              <FavoriteButton productName={displayName} />
              <Link className={styles.productMeta} href={`/products/${product.handle}`}>
                <span>{displayName} T-Shirt</span>
                <span className={styles.priceHolder}>{formatMoney(product.price)}</span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function EditorialStorefront({
  newsletterAction,
  products,
}: {
  newsletterAction: NewsletterFormAction;
  products: readonly Product[];
}) {
  return (
    <div className={styles.page} data-editorial-homepage>
      <HeroCarousel />

      <section className={styles.storyStrip} aria-label="Collection stories">
        {storyCards.map((story) => (
          <article className={styles.storyCard} key={story.title}>
            <div className={styles.storyImageWrap}>
              <Image alt="" fill sizes="(min-width: 900px) 12vw, 28vw" src={story.image} className={styles.storyImage} />
            </div>
            <div>
              <h2>{story.title}</h2>
              <p>{story.copy}</p>
              <Link href={story.href}>Explore <ArrowRight aria-hidden="true" size={14} /></Link>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.collectionIntro} aria-labelledby="intro-title">
        <div className={styles.collectionIntroCopy}>
          <p className={styles.eyebrow}>The Beyond collection</p>
          <h2 id="intro-title">Four ideas.<br />One collection.</h2>
          <span aria-hidden="true" />
          <p>Fear, reality, time and limitation become four connected artworks. Each is translated across unisex silhouettes ranging from structured 280 GSM boxy jersey to relaxed 250 GSM forms.</p>
          <Link className={styles.darkButton} href="/collections/beyond">Explore the four stories</Link>
        </div>
        <div className={styles.collectionIntroImage}>
          <Image alt="Model wearing a washed black ra&ra T-shirt" fill sizes="(min-width: 900px) 66vw, 100vw" src="/campaign/beyond-limits-hero.png" />
        </div>
      </section>

      <ul className={styles.benefitStrip} role="list" aria-label="Product benefits">
        {benefits.map(({ value, label, Icon }) => (
          <li key={label}>
            <Icon aria-hidden="true" size={25} strokeWidth={1.2} />
            <span><strong>{value}</strong>{label}</span>
          </li>
        ))}
      </ul>

      <ProductRail id="best-of-ra-ra" title="The four stories" productIds={bestProductIds} allProducts={products} />

      <section className={styles.qualityMosaic} aria-labelledby="quality-title">
        <div className={styles.qualityCopy}>
          <p className={styles.eyebrow}>Material study</p>
          <h2 id="quality-title">Why weight<br />matters</h2>
          <span aria-hidden="true" />
          <p>GSM measures fabric weight per square metre. At 250–280 GSM, the collection is designed for a denser hand and a structured drape that holds its silhouette through everyday wear.</p>
        </div>
        <div className={styles.qualityImage}><Image alt="Premium washed black cotton fabric" fill sizes="33vw" src="/editorial/washed-cotton-macro.png" /></div>
        <div className={styles.qualityImage}><Image alt="Washed black ra&ra T-shirt detail" fill sizes="34vw" src="/editorial/washed-tee-flatlay.png" /></div>
      </section>

      <section className={styles.fieldNotes} aria-labelledby="field-notes-title">
        <div className={styles.fieldNotesHeading}>
          <p className={styles.eyebrow}>Read beyond the image</p>
          <h2 id="field-notes-title">Notes from the collection</h2>
          <p>Three details that change how the artwork—and the garment beneath it—can be read.</p>
        </div>
        <div className={styles.fieldNotesGrid}>
          {fieldNotes.map((note) => (
            <article key={note.title}>
              <p>{note.category}</p>
              <h3>{note.title}</h3>
              <p>{note.excerpt}</p>
              <Link href={note.href}>Read the note <ArrowRight aria-hidden="true" size={14} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.meaningBanner} aria-labelledby="meaning-title">
        <Image alt="Two models wearing ra&ra graphic T-shirts" fill sizes="100vw" src="/products/beyond-limits/sculptural-boxy-black/side-couple-black.png" />
        <div className={styles.meaningShade} />
        <div className={styles.meaningCopy}>
          <h2 id="meaning-title">The image starts<br />the conversation.</h2>
          <p>Myth, memory and imagined worlds—composed to reveal more the longer you look.</p>
          <Link className={styles.lightButton} href="/about">Read our approach <ArrowRight aria-hidden="true" size={14} /></Link>
        </div>
      </section>

      <ProductRail id="new-arrivals" title="Different cuts, same idea" productIds={newProductIds} allProducts={products} compact />

      <section className={styles.scarcityBanner} aria-labelledby="scarcity-title">
        <Image alt="Back artwork of a limited ra&ra T-shirt" fill sizes="100vw" src="/products/beyond-reality/washed-art-charcoal/lifestyle-back.png" />
        <div className={styles.scarcityShade} />
        <div className={styles.scarcityCopy}>
          <p className={styles.eyebrow}>Edition 01</p>
          <h2 id="scarcity-title">An edition,<br />not an endless restock.</h2>
          <p>Beyond is planned as a distinct chapter. When this edition closes, the next story begins.</p>
        </div>
      </section>

      <section className={styles.worldSection} aria-labelledby="world-title">
        <div className={styles.worldHeading}>
          <h2 id="world-title">Details worth a second look</h2>
          <p>Quiet symbols at the chest. Full narrative artwork across the back. The contrast is intentional.</p>
        </div>
        <div className={styles.worldGrid}>
          {socialImages.map((src, index) => (
            <div key={src} className={styles.worldImage}>
              <Image alt={`ra&ra editorial image ${index + 1}`} fill sizes="25vw" src={src} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.newsletter} aria-labelledby="newsletter-title">
        <h2 id="newsletter-title">Letters from the studio</h2>
        <p>Artwork notes, material decisions and release updates—sent only when there is something worth sharing.</p>
        <div className={styles.newsletterForm}>
          <NewsletterForm action={newsletterAction} config={editorialHomepage.newsletter} variant="editorial" />
        </div>
      </section>
    </div>
  );
}

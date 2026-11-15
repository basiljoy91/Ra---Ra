import { ArrowRight, Cloud, Layers3, Ruler, Shirt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter/newsletter-form";
import { FavoriteButton } from "@/components/homepage/favorite-button.client";
import { HeroCarousel } from "@/components/homepage/hero-carousel.client";
import { MobileEditorialStorefront } from "@/components/homepage/mobile-editorial-storefront";
import styles from "@/components/homepage/homepage.module.css";
import { beyondCollectionHero, beyondDesigns } from "@/data/beyond-collection";
import { editorialHomepage } from "@/config/editorial-homepage";
import type { Product } from "@/lib/commerce";
import { formatMoney } from "@/lib/utilities";
import type { NewsletterFormAction } from "@/types/newsletter";

const benefits = [
  { value: "100%", label: "Supima cotton", Icon: Cloud },
  { value: "280", label: "GSM fabric weight", Icon: Ruler },
  { value: "One", label: "Boxy oversized unisex fit", Icon: Shirt },
  { value: "Four", label: "Connected stories", Icon: Layers3 },
] as const;

function ProductRail({ products }: { products: readonly Product[] }) {
  return (
    <section className={styles.productRailSection} aria-labelledby="beyond-products">
      <div className={styles.sectionHeadingRow}>
        <h2 id="beyond-products">The four designs</h2>
        <Link href="/collections/beyond">
          Read the collection <ArrowRight aria-hidden="true" size={14} />
        </Link>
      </div>
      <div className={styles.productRail}>
        {products.slice(0, 4).map((product) => {
          const image = product.images[0];

          return (
            <article className={styles.productTile} key={product.id}>
              <Link className={styles.productMedia} href={`/products/${product.handle}`}>
                {image ? (
                  <Image
                    alt={image.alt}
                    className={styles.productImage}
                    fill
                    sizes="(min-width: 900px) 24vw, 58vw"
                    src={image.url}
                  />
                ) : null}
              </Link>
              <FavoriteButton productName={product.title} />
              <Link className={styles.productMeta} href={`/products/${product.handle}`}>
                <span>{product.title}</span>
                <span className={styles.priceHolder}>
                  {product.priceIsPlaceholder ? "Price pending" : formatMoney(product.price)}
                </span>
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
      <div className={styles.mobileExperience}>
        <MobileEditorialStorefront
          newsletterAction={newsletterAction}
          products={products}
        />
      </div>

      <div className={styles.desktopExperience}>
        <HeroCarousel />

        <section className={styles.storyStrip} aria-label="BEYOND stories">
          {beyondDesigns.map((story) => (
            <article className={styles.storyCard} key={story.handle}>
              <div className={styles.storyImageWrap}>
                <Image
                  alt={story.images[2]?.alt ?? story.title}
                  className={styles.storyImage}
                  fill
                  sizes="(min-width: 900px) 12vw, 28vw"
                  src={story.images[2]?.url ?? story.images[0]!.url}
                />
              </div>
              <div>
                <h2>{story.title}</h2>
                <p>{story.corePhilosophy}</p>
                <Link href={`/products/${story.handle}`}>
                  Explore <ArrowRight aria-hidden="true" size={14} />
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.collectionIntro} aria-labelledby="intro-title">
          <div className={styles.collectionIntroCopy}>
            <p className={styles.eyebrow}>RA &amp; RA / COLLECTION 01</p>
            <h2 id="intro-title">THE THINGS<br />WE CARRY.</h2>
            <span aria-hidden="true" />
            <p>
              Not everything that shapes us can be seen. BEYOND translates
              Time, Fear, Reality and Limits into a visual language of lines,
              forms, light and space.
            </p>
            <Link className={styles.darkButton} href="/collections/beyond">
              Read the collection philosophy
            </Link>
          </div>
          <div className={styles.collectionIntroImage}>
            <Image
              alt={beyondCollectionHero.desktop.alt}
              fill
              sizes="(min-width: 900px) 66vw, 100vw"
              src={beyondCollectionHero.desktop.url}
            />
          </div>
        </section>

        <ul className={styles.benefitStrip} role="list" aria-label="BEYOND garment specification">
          {benefits.map(({ value, label, Icon }) => (
            <li key={label}>
              <Icon aria-hidden="true" size={25} strokeWidth={1.2} />
              <span><strong>{value}</strong>{label}</span>
            </li>
          ))}
        </ul>

        <ProductRail products={products} />

        <section className={styles.qualityMosaic} aria-labelledby="quality-title">
          <div className={styles.qualityCopy}>
            <p className={styles.eyebrow}>The shared garment</p>
            <h2 id="quality-title">One form.<br />Four meanings.</h2>
            <span aria-hidden="true" />
            <p>
              Solid deep black. 280 GSM Supima cotton in a double-jersey knit.
              A boxy oversized unisex shape with dropped shoulders, wide
              straight sleeves and a dense, smooth, matte surface.
            </p>
          </div>
          <div className={styles.qualityImage}>
            <Image alt={beyondDesigns[0]!.images[10]!.alt} fill sizes="33vw" src={beyondDesigns[0]!.images[10]!.url} />
          </div>
          <div className={styles.qualityImage}>
            <Image alt={beyondDesigns[3]!.images[8]!.alt} fill sizes="34vw" src={beyondDesigns[3]!.images[8]!.url} />
          </div>
        </section>

        <section className={styles.fieldNotes} aria-labelledby="field-notes-title">
          <div className={styles.fieldNotesHeading}>
            <p className={styles.eyebrow}>The four stories</p>
            <h2 id="field-notes-title">What do you carry?</h2>
            <p>The artwork is intentional. The interpretation is personal.</p>
          </div>
          <div className={styles.fieldNotesGrid}>
            {beyondDesigns.map((story) => (
              <article key={story.handle}>
                <p>{story.number} / 04</p>
                <h3>{story.collectionStoryHeading}</h3>
                <p>{story.shortDescription}</p>
                <Link href={`/journal/${story.handle}`}>
                  Read the story <ArrowRight aria-hidden="true" size={14} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.meaningBanner} aria-labelledby="meaning-title">
          <Image
            alt={beyondDesigns[2]!.hero.desktop.alt}
            fill
            sizes="100vw"
            src={beyondDesigns[2]!.hero.desktop.url}
          />
          <div className={styles.meaningShade} />
          <div className={styles.meaningCopy}>
            <h2 id="meaning-title">We create the design.<br />You give it meaning.</h2>
            <p>You do not have to explain what it means to you—or see it the way we do.</p>
            <Link className={styles.lightButton} href="/about">
              About BEYOND <ArrowRight aria-hidden="true" size={14} />
            </Link>
          </div>
        </section>

        <section className={styles.worldSection} aria-labelledby="world-title">
          <div className={styles.worldHeading}>
            <h2 id="world-title">A closer look</h2>
            <p>Four designs, one deep-black garment, photographed from front, back and detail views.</p>
          </div>
          <div className={styles.worldGrid}>
            {beyondDesigns.map((design) => (
              <div className={styles.worldImage} key={design.handle}>
                <Image alt={design.images[2]!.alt} fill sizes="25vw" src={design.images[2]!.url} />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.newsletter} aria-labelledby="newsletter-title">
          <h2 id="newsletter-title">Letters from the studio</h2>
          <p>Collection stories and release updates—sent only when there is something worth sharing.</p>
          <div className={styles.newsletterForm}>
            <NewsletterForm
              action={newsletterAction}
              config={editorialHomepage.newsletter}
              variant="editorial"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

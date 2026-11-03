import { AtSign, Camera, Music2, Video } from "lucide-react";
import Image from "next/image";

import styles from "@/components/homepage/homepage.module.css";

interface JourneyImage {
  src: string;
  alt: string;
  position: string;
}

interface EditorialJourneyContent {
  eyebrow: string;
  gallery: readonly JourneyImage[];
  socialTitle: string;
  socialDescription: string;
  socialNote: string;
}

const socialIcons = [Camera, Video, Music2, AtSign];

export function EditorialJourney({
  content,
}: {
  content: EditorialJourneyContent;
}) {
  return (
    <section className={styles.journey} aria-labelledby="journey-title">
      {content.gallery.map((image) => (
        <div className={styles.galleryTile} key={image.src}>
          <Image
            alt={image.alt}
            className={styles.galleryImage}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
            src={image.src}
            style={{ objectPosition: image.position }}
            loading="lazy"
          />
        </div>
      ))}

      <div className={styles.socialPanel}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h2 id="journey-title" className={styles.socialTitle}>
          {content.socialTitle}
        </h2>
        <p className={styles.socialDescription}>{content.socialDescription}</p>
        <span className={styles.socialIcons} aria-hidden="true">
          {socialIcons.map((Icon, index) => (
            <span className={styles.socialIcon} key={index}>
              <Icon size={15} strokeWidth={1.3} />
            </span>
          ))}
        </span>
        <p className={styles.socialNote}>{content.socialNote}</p>
      </div>
    </section>
  );
}

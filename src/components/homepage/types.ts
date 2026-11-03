export interface EditorialHomepageHero {
  eyebrow: string;
  titleLines: readonly string[];
  descriptionLines: readonly string[];
  cta: { label: string; href: string };
  image: { src: string; alt: string; width: number; height: number };
}

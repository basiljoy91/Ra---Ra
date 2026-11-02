import { NewsletterForm } from "@/components/forms/newsletter/newsletter-form";
import styles from "@/components/homepage/homepage.module.css";
import { Container } from "@/components/layout/container";
import type {
  NewsletterFormAction,
  NewsletterSectionConfig,
} from "@/types/newsletter";

interface HomepageNewsletterProps {
  config: NewsletterSectionConfig;
  action: NewsletterFormAction;
}

export function HomepageNewsletter({
  config,
  action,
}: HomepageNewsletterProps) {
  return (
    <section className={styles.newsletter} aria-labelledby={`${config.id}-title`}>
      <Container className={styles.newsletterInner}>
        <div>
          <p className={styles.eyebrow}>{config.eyebrow}</p>
          <h2 id={`${config.id}-title`} className={styles.newsletterTitle}>
            {config.heading}
          </h2>
          <p className={styles.newsletterDescription}>{config.description}</p>
        </div>
        <NewsletterForm action={action} config={config} variant="editorial" />
      </Container>
    </section>
  );
}

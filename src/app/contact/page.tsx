import type { Metadata } from "next";
import Link from "next/link";

import { EditorialLayout } from "@/components/editorial/editorial-layout";
import { ContactForm } from "@/components/forms/contact/contact-form";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonStyles } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { contactHero } from "@/data/development/editorial-content";
import { submitDevelopmentContact } from "@/features/contact/development-contact-submission";
import { buildAbsoluteUrl } from "@/lib/utilities";

const title = "Contact";
const description =
  "Contact Ra & Ra through a development-ready, accessible enquiry interface.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: buildAbsoluteUrl("/contact", siteConfig.siteUrl) },
  openGraph: {
    title,
    description,
    url: buildAbsoluteUrl("/contact", siteConfig.siteUrl),
  },
};

export default function ContactPage() {
  return (
    <EditorialLayout hero={contactHero}>
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(16rem,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <aside className="lg:pt-2">
              <p className="type-label text-accent">Before you write</p>
              <h2 className="type-section-heading mt-3">How can we help?</h2>
              <p className="mt-5 max-w-md text-foreground-muted">
                The FAQ records what is confirmed and what remains pending. It may already answer questions about ordering, shipping, products or sizing.
              </p>
              <Link className={buttonStyles({ variant: "secondary", className: "mt-7" })} href="/faq">
                Read the FAQ
              </Link>
              <div className="mt-10 border-t border-border pt-7">
                <p className="font-semibold">Business email placeholder</p>
                <p className="mt-2 break-all text-foreground-muted">{siteConfig.contactEmail}</p>
                <p className="type-caption mt-2 text-foreground-muted">
                  This reserved address is intentionally not active.
                </p>
              </div>
            </aside>
            <section aria-labelledby="contact-form-heading" className="rounded-[var(--radius-panel)] border border-border bg-surface p-5 sm:p-8 lg:p-10">
              <h2 className="font-serif text-3xl font-semibold" id="contact-form-heading">
                Send an enquiry
              </h2>
              <p className="mt-3 text-foreground-muted">
                Complete the fields to validate the development form. No delivery service is connected.
              </p>
              <div className="mt-8">
                <ContactForm action={submitDevelopmentContact} />
              </div>
            </section>
          </div>
        </Container>
      </Section>
    </EditorialLayout>
  );
}

import { NewsletterForm } from "@/components/forms/newsletter/newsletter-form";
import { Container } from "@/components/layout/container";
import type {
  NewsletterFormAction,
  NewsletterSectionConfig,
} from "@/types/newsletter";

export function JournalNewsletter({
  action,
  config,
}: {
  action: NewsletterFormAction;
  config: NewsletterSectionConfig;
}) {
  return (
    <section aria-labelledby={`${config.id}-heading`} className="border-b border-[#cfc6bb] bg-[#e8dfd5] py-8 md:py-10">
      <Container className="grid gap-7 md:grid-cols-[minmax(18rem,0.85fr)_minmax(24rem,1.15fr)] md:items-center md:gap-12">
        <div>
          {config.eyebrow ? (
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-[#6a625a] uppercase">{config.eyebrow}</p>
          ) : null}
          <h2 className="mt-2 font-serif text-4xl font-semibold leading-none tracking-[-0.03em] text-[#171513] sm:text-5xl" id={`${config.id}-heading`}>
            {config.heading}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-[#686057]">{config.description}</p>
        </div>
        <NewsletterForm action={action} config={config} variant="editorial" />
      </Container>
    </section>
  );
}

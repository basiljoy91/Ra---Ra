import { FaqItem } from "@/components/editorial/faq-item.client";
import type { FaqCategoryData } from "@/types/editorial";

interface FaqGroupsProps {
  categories: readonly FaqCategoryData[];
}

export function FaqGroups({ categories }: FaqGroupsProps) {
  return (
    <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
      <nav aria-label="FAQ categories" className="lg:sticky lg:top-28 lg:self-start">
        <p className="type-label text-accent">On this page</p>
        <ul className="mt-4 space-y-2" role="list">
          {categories.map((category) => (
            <li key={category.id}>
              <a className="inline-flex min-h-11 items-center hover:underline" href={`#${category.id}`}>
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="min-w-0 space-y-14">
        {categories.map((category) => (
          <section aria-labelledby={`${category.id}-heading`} id={category.id} key={category.id}>
            <h2 className="type-section-heading scroll-mt-28" id={`${category.id}-heading`}>
              {category.title}
            </h2>
            <div className="mt-6 border-t border-border">
              {category.items.map((item) => (
                <FaqItem item={item} key={item.id} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

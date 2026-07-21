interface DiscoverySectionHeaderProps {
  eyebrow?: string | undefined;
  heading: string;
  description?: string | undefined;
  headingId: string;
}

export function DiscoverySectionHeader({
  eyebrow,
  heading,
  description,
  headingId,
}: DiscoverySectionHeaderProps) {
  return (
    <header className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.65fr)] md:items-end md:gap-10">
      <div className="flow-space-sm">
        {eyebrow ? (
          <p className="type-label text-accent">{eyebrow}</p>
        ) : null}
        <h2 className="type-section-heading max-w-[18ch]" id={headingId}>
          {heading}
        </h2>
      </div>

      {description ? (
        <p className="type-body max-w-[36rem] text-foreground-muted md:justify-self-end">
          {description}
        </p>
      ) : null}
    </header>
  );
}

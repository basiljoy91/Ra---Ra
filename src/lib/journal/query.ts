import type { JournalArticle } from "@/types/editorial";

export interface JournalCategory {
  value: string;
  label: string;
  count: number;
}

export interface JournalQueryState {
  category?: string;
  query: string;
}

export function normalizeJournalValue(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getJournalCategories(
  articles: readonly JournalArticle[],
): readonly JournalCategory[] {
  const categories = new Map<string, JournalCategory>();

  for (const article of articles) {
    if (!article.category) continue;

    const value = normalizeJournalValue(article.category);
    const current = categories.get(value);
    categories.set(value, {
      value,
      label: current?.label ?? article.category,
      count: (current?.count ?? 0) + 1,
    });
  }

  return Array.from(categories.values());
}

export function resolveJournalQuery(
  rawCategory: string | readonly string[] | undefined,
  rawQuery: string | readonly string[] | undefined,
  categories: readonly JournalCategory[],
): JournalQueryState {
  const categoryCandidate = Array.isArray(rawCategory)
    ? rawCategory.at(-1)
    : rawCategory;
  const queryCandidate = Array.isArray(rawQuery) ? rawQuery.at(-1) : rawQuery;
  const normalizedCategory = categoryCandidate
    ? normalizeJournalValue(categoryCandidate)
    : undefined;
  const category = categories.some((item) => item.value === normalizedCategory)
    ? normalizedCategory
    : undefined;
  const query = queryCandidate?.trim().slice(0, 100) ?? "";

  return { ...(category ? { category } : {}), query };
}

export function filterJournalArticles(
  articles: readonly JournalArticle[],
  state: JournalQueryState,
): readonly JournalArticle[] {
  const query = state.query.toLocaleLowerCase("en");

  return articles.filter((article) => {
    const matchesCategory = state.category
      ? normalizeJournalValue(article.category ?? "") === state.category
      : true;
    const matchesQuery = query
      ? [article.title, article.excerpt, article.category]
          .filter(Boolean)
          .some((value) => value?.toLocaleLowerCase("en").includes(query))
      : true;

    return matchesCategory && matchesQuery;
  });
}

export function sortJournalArticles(
  articles: readonly JournalArticle[],
): readonly JournalArticle[] {
  return articles
    .map((article, index) => ({ article, index }))
    .sort((left, right) => {
      if (!left.article.publishedAt || !right.article.publishedAt) {
        return left.index - right.index;
      }

      const leftTime = Date.parse(left.article.publishedAt);
      const rightTime = Date.parse(right.article.publishedAt);

      return Number.isNaN(leftTime) || Number.isNaN(rightTime)
        ? left.index - right.index
        : rightTime - leftTime;
    })
    .map(({ article }) => article);
}

export function buildJournalHref(
  state: JournalQueryState,
  overrides: { category?: string | undefined; query?: string | undefined } = {},
): string {
  const category = "category" in overrides ? overrides.category : state.category;
  const query = "query" in overrides ? overrides.query : state.query;
  const params = new URLSearchParams();

  if (category) params.set("category", category);
  if (query?.trim()) params.set("q", query.trim());

  const search = params.toString();
  return search ? `/journal?${search}` : "/journal";
}

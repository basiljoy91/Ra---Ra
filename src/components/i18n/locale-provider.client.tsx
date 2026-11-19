"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { LanguageChoiceDialog } from "@/components/i18n/language-choice-dialog";
import {
  type AppLocale,
  isAppLocale,
  localeCookieName,
  localeStorageKey,
} from "@/i18n/config";
import { translateCustomerText } from "@/i18n/catalog";

type LocaleContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const TRANSLATABLE_ATTRIBUTES = [
  "alt",
  "aria-description",
  "aria-label",
  "placeholder",
  "title",
] as const;

const TRANSLATABLE_META_SELECTORS = [
  'meta[name="description"]',
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[name="twitter:title"]',
  'meta[name="twitter:description"]',
] as const;

function translateElement(root: ParentNode, locale: AppLocale) {
  const ownerDocument = root instanceof Document ? root : root.ownerDocument;
  if (!ownerDocument) return;

  const walker = ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let textNode = walker.nextNode();

  while (textNode) {
    const parent = textNode.parentElement;
    if (
      parent &&
      !parent.closest("script, style, noscript, code, pre, [data-no-translate]")
    ) {
      const current = textNode.nodeValue ?? "";
      const translated = translateCustomerText(current, locale);
      if (translated !== current) textNode.nodeValue = translated;
    }
    textNode = walker.nextNode();
  }

  const elements = root instanceof Element
    ? [root, ...root.querySelectorAll<HTMLElement>("*")]
    : [...root.querySelectorAll<HTMLElement>("*")];

  for (const element of elements) {
    if (element.closest("[data-no-translate]")) continue;
    for (const attribute of TRANSLATABLE_ATTRIBUTES) {
      const current = element.getAttribute(attribute);
      if (!current) continue;
      const translated = translateCustomerText(current, locale);
      if (translated !== current) element.setAttribute(attribute, translated);
    }
  }

  if (root instanceof Document) {
    for (const selector of TRANSLATABLE_META_SELECTORS) {
      const meta = root.querySelector<HTMLMetaElement>(selector);
      const current = meta?.content;
      if (!meta || !current) continue;
      const translated = translateCustomerText(current, locale);
      if (translated !== current) meta.content = translated;
    }
  }
}

export function LocaleProvider({
  children,
  initialLocale,
  hasStoredPreference,
}: {
  children: ReactNode;
  initialLocale: AppLocale;
  hasStoredPreference: boolean;
}) {
  const [locale, setLocaleState] = useState<AppLocale>(initialLocale);
  const [preferenceResolved, setPreferenceResolved] = useState(hasStoredPreference);

  const setLocale = useCallback((nextLocale: AppLocale) => {
    setLocaleState(nextLocale);
    setPreferenceResolved(true);
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem(localeStorageKey, nextLocale);
  }, []);

  useEffect(() => {
    if (hasStoredPreference) return;

    const storedLocale = window.localStorage.getItem(localeStorageKey);
    if (!isAppLocale(storedLocale)) return;

    document.cookie = `${localeCookieName}=${storedLocale}; path=/; max-age=31536000; samesite=lax`;
    const frame = window.requestAnimationFrame(() => {
      setLocaleState(storedLocale);
      setPreferenceResolved(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hasStoredPreference]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
    translateElement(document, locale);
    document.title = document.title
      .split(" · ")
      .map((part) => translateCustomerText(part, locale))
      .join(" · ");

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData" && mutation.target.parentNode) {
          translateElement(mutation.target.parentNode, locale);
          continue;
        }
        for (const node of mutation.addedNodes) {
          if (node instanceof Element || node instanceof DocumentFragment) {
            translateElement(node, locale);
          } else if (node.parentNode) {
            translateElement(node.parentNode, locale);
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
      <LanguageChoiceDialog
        onChoose={setLocale}
        open={!preferenceResolved}
      />
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider.");
  return value;
}

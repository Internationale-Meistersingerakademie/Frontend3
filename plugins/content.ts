// The CMS carries `de` and `en` on its documents, but nuxt.config declares
// eight locales. Indexing a document by the active locale therefore yields
// undefined for es/fr/it/ja/ko/zh, and reading a field off it throws during
// SSR — which is why those six routes returned HTTP 500 on every page rather
// than simply showing untranslated text.
//
// Everything that reads localised CMS content goes through one of the two
// helpers below, so the fallback order lives in exactly one place. English
// first: it is the closest thing the site has to a lingua franca for the
// visitors who picked one of the unsupported locales.
const FALLBACK_LOCALES = ["en", "de"];

// A locale bag counts as present only if it actually holds something. The CMS
// emits empty-string fields for translations that were started but never
// filled in, and those should fall through rather than render as blanks.
const isPopulated = (bag: unknown): boolean =>
  !!bag &&
  typeof bag === "object" &&
  Object.values(bag as Record<string, unknown>).some(
    (value) => value !== null && value !== undefined && value !== ""
  );

export default defineNuxtPlugin(() => {
  const activeLocale = (): string => useNuxtApp().$i18n.locale.value;

  // Resolves the locale bag of a single CMS document, e.g. an audition or a
  // faculty member. Always returns an object, so `$loc(x).field` is safe even
  // when the document has no usable translation at all.
  const loc = (item: Record<string, any> | undefined | null): Record<string, any> => {
    if (!item) return {};
    for (const code of [activeLocale(), ...FALLBACK_LOCALES]) {
      if (isPopulated(item[code])) return item[code];
    }
    return {};
  };

  return {
    provide: {
      loc,

      getElementByTitle: (
        title: string,
        data: Array<Record<string, any>>
      ): {
        subtitle: string;
        title: string;
        content: string | Array<{ subtitle: string; text: string }>;
      } => {
        const result = data.find((item) => item.titleIntern === title);
        if (result) {
          for (const code of [activeLocale(), ...FALLBACK_LOCALES]) {
            const bag = result[code];
            if (bag && (bag.content || bag.title)) return bag;
          }
        }
        return { content: "", title: "", subtitle: "" };
      },
    },
  };
});

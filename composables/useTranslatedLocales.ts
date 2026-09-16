// nuxt.config declares eight locales, but a locale only earns a place in the
// switcher once it is actually usable. Offering fr/es/it/ja/ko/zh while every
// string behind them falls back to English does not read as a choice — it reads
// as a translation that broke.
//
// The bar is 75 % of the most complete locale's keys, measured rather than
// hardcoded, so a language appears on its own the moment someone finishes
// translating it and drops out again if new keys outpace the translators.
const COVERAGE_THRESHOLD = 0.75;

type Bag = Record<string, unknown>;

// Only keys that carry text count. Both the message bundles and the CMS keep
// placeholder entries around, and an empty string is not a translation.
const collectKeys = (bag: unknown, prefix = "", out = new Set<string>()): Set<string> => {
  if (bag === null || bag === undefined) return out;

  if (Array.isArray(bag)) {
    if (bag.some((entry) => String(entry ?? "").trim())) out.add(prefix);
    return out;
  }

  if (typeof bag === "object") {
    for (const [key, value] of Object.entries(bag as Bag)) {
      collectKeys(value, prefix ? `${prefix}.${key}` : key, out);
    }
    return out;
  }

  if (String(bag).trim()) out.add(prefix);
  return out;
};

export const useTranslatedLocales = () => {
  const { locale, locales, messages } = useI18n();

  return computed<Array<string>>(() => {
    const configured = (locales.value as Array<{ code: string } | string>).map((entry) =>
      typeof entry === "string" ? entry : entry.code
    );

    const bundles = (messages.value ?? {}) as Record<string, Bag>;
    const filled = new Map<string, number>(
      Object.entries(bundles).map(([code, bag]) => [code, collectKeys(bag).size])
    );

    // The reference is whichever locale is most complete, not a hardcoded one:
    // if the site is ever re-based on German the bar moves with it.
    const reference = Math.max(0, ...filled.values());

    // Nothing to measure against (bundles not loaded) — hiding everything would
    // be worse than showing too much, so the filter stands down.
    if (reference === 0) return configured;

    // The active locale always stays: a visitor who arrived on a link to an
    // untranslated locale still needs to see where they are and how to leave.
    return configured.filter(
      (code) => code === locale.value || (filled.get(code) ?? 0) / reference >= COVERAGE_THRESHOLD
    );
  });
};

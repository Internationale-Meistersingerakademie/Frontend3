// Anchor ids for the deep links from the landing page into /News and /Faculty.
//
// The CMS has no locale-independent key to hang these on: `content[]._id` is a
// separate subdocument per language (the German and English copies of one news
// item carry different ids), and even the dates drift between the two. So the
// id is derived from the text the visitor is currently reading. Within a locale
// the landing page and the target page derive the same string, which is what
// the link needs; a link shared across a language switch is the case the data
// model cannot support either way.

// German readers expect "ue", not "u", so the umlauts are transliterated before
// the generic accent stripping gets to them.
export const anchorId = (value?: string): string =>
  (value ?? "")
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// One sort, shared by the landing preview and the news page, so the three items
// on the landing page are always the top three of the list they link into. The
// CMS returns entries oldest-first and not reliably in date order at that
// (two 2023 items are transposed), so the order is imposed here rather than
// trusted.
export const sortedNews = (content: unknown): Array<Record<string, any>> =>
  Array.isArray(content)
    ? [...content].sort((a, b) => new Date(b?.date ?? 0).getTime() - new Date(a?.date ?? 0).getTime())
    : [];

// Falls back to the per-locale `_id` when an entry has no usable subtitle, so
// every item still gets a unique target.
export const newsAnchor = (entry: Record<string, any>): string =>
  anchorId(entry?.subtitle) || String(entry?._id ?? "");

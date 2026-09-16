<script setup>
import { hash } from "ohash";
import markdownParser from "@nuxt/content/transformers/markdown";

const props = defineProps({
  // Not `required`: several CMS keys are optional, and a missing one should
  // render nothing rather than warn on every page.
  markdownString: {
    type: String,
    default: "",
  },
});

// Some CMS documents wrap a passage in legacy block-level HTML (`<center>` is
// the common one). CommonMark treats such a tag as opening a raw-HTML block
// that runs until the next blank line, so any Markdown inside it is passed
// through verbatim — which is why visitors saw a literal
// `[edithwiens.com](http://edithwiens.com)` on /Contact and bare `-----` rules
// on /Impressum.
//
// Surrounding the tags with blank lines is the standard CommonMark idiom for
// "Markdown inside HTML": the tag becomes its own raw-HTML block, and the
// passage between the tags is parsed as ordinary Markdown. The wrapper still
// reaches the output, so the intended centring is preserved.
// `br` is on that same list, so a line *beginning* with <br> opened a raw-HTML
// block that ran to the end of the document — which is what hid the Markdown on
// /Impressum, where the CMS text is one unbroken run of <br>-separated lines.
// A <br> is a line break wherever it sits, so moving a leading one to the end of
// the previous line leaves the rendering identical while keeping it inline.
const BLOCK_TAGS = "center|div|section|figure";

const separateLegacyHtmlBlocks = (markdown) =>
  markdown
    // <center> is deprecated HTML, and MDC resolves unknown tags as components —
    // so every render logged "Failed to resolve component: Center". A div with
    // the equivalent style renders identically and resolves cleanly.
    .replace(/<center>/gi, '<div style="text-align:center">')
    .replace(/<\/center>/gi, "</div>")
    .replace(new RegExp(`(<(?:${BLOCK_TAGS})\\b[^>]*>)[ \\t]*\\r?\\n?`, "gi"), "$1\n\n")
    .replace(new RegExp(`[ \\t]*\\r?\\n?(</(?:${BLOCK_TAGS})>)`, "gi"), "\n\n$1")
    .replace(/\r?\n[ \t]*((?:<br\s*\/?>[ \t]*)+)/gi, (_match, breaks) => breaks.replace(/\s+/g, "") + "\n");

// Parsing inside `watchEffect` meant the promise had not settled by the time
// the server serialised the response — `record` was still empty, the `v-if`
// removed the node, and every Markdown block on the site shipped as an empty
// element that only filled in after hydration. That cost the pages their
// server-rendered body text (and made `/Datenschutz` jump several thousand
// pixels on load).
//
// useAsyncData awaits the parse during SSR and puts the result in the payload,
// so the HTML arrives complete and hydration is a no-op. The key is a hash of
// the string itself, which both de-duplicates identical blocks and keeps the
// 17 call sites from sharing one cache entry.
const { data: record } = await useAsyncData(
  `md-${hash(props.markdownString)}`,
  () => markdownParser.parse("custom.md", separateLegacyHtmlBlocks(props.markdownString || "")),
  { watch: [() => props.markdownString] }
);
</script>

<template>
  <ContentRendererMarkdown :value="record" v-if="record" />
</template>

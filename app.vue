<script setup lang="ts">
const { t } = useI18n();
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
useSeoMeta({
  ogTitle: t("seo.ogTitle"),
  ogDescription: t("seo.ogDescription"),
  ogImage: "", // TODO
  twitterCard: "summary_large_image",
});
const title = computed(() => t("seo.title"));
const description = computed(() => t("seo.description"));
</script>

<template>
  <!-- useLocaleHead computes htmlAttrs, but nothing applied them: every locale
       was served as a bare <html> with no lang. Besides the accessibility and
       SEO cost, CSS hyphenation is language-driven, so `hyphens: auto` below is
       inert without it — which matters on a site whose German compounds are the
       longest words it has to fit. -->
  <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir" />
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="google-site-verification" content="lAkh-BvANcTC1hIt5qqARbshxyDxPfnruUEzL8oGY8U" />
    <template v-for="link in head.link" :key="link.id">
      <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
    </template>
    <template v-for="meta in head.meta" :key="meta.id">
      <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
    </template>
  </Head>
  <div class="site-wrapper">
    <NuxtPage />
  </div>
</template>

<style lang="sass">
@import url("~/assets/fonts/main.css")

*
  margin: 0
  padding: 0
  box-sizing: border-box
  font-family: "Nunito Sans"
  -webkit-tap-highlight-color: transparent

// Every string on this site comes from the CMS and none of it has a length
// limit. These two declarations are what make an over-long word degrade
// (wrap, hyphenate) instead of overflowing its box and being clipped — the
// single most common failure across the audit.
// `anywhere` rather than `break-word`: the two behave identically once a line
// is being laid out, but only `anywhere` also lets the element's min-content
// width shrink. With `break-word`, a single 60-character URL still forced the
// container to its own intrinsic width — blowing a headline out to ~1050px on
// a 390px screen, where overflow-x: clip then hid the result silently.
p, h1, h2, h3, h4, h5, h6, li, a, span, td, th, blockquote
  overflow-wrap: anywhere
  hyphens: auto

// A CMS field that comes back empty still renders its element, which then
// contributes its margins to the layout — 13 such ghosts were measured across
// /Course, /Faculty and /Network. Collapsing them here is one rule instead of a
// v-if at every interpolation site.
h1:empty, h2:empty, h3:empty, h4:empty, h5:empty, h6:empty, p:empty
  display: none

.site-wrapper
  // `overflow: hidden` here was doing more than containing the box shadow: it
  // silently swallowed every horizontal overflow on the site, which is why a
  // 600px footer block on a 390px screen and a half-cut year rail presented as
  // "looks a bit off" rather than as a scrollbar. Those causes are fixed now.
  // `clip` keeps stray width contained without turning this into a scroll
  // container, so sticky positioning and in-page anchors keep working.
  overflow-x: clip
  box-shadow: 10px 0 10px rgba(0, 0, 0, 0.1), -10px 0 10px rgba(0, 0, 0, 0.1)

// other stuff
// for nav and banner:
.nav-left, .nav-right, .mobile_nav
  .router-link-active
    &:after
      content: '' !important
      position: absolute !important
      width: 100% !important
      height: 2px !important
      display: block !important
      margin-top: 5px !important
      right: 0 !important
      left: 0 !important
      background: #FFF !important
      transition: width .3s ease !important

// ADD PADDING WHEN SCREEN IS TOO LARGE
@media screen and (min-width: 1920px)
  html, body
    display: flex
    justify-content: center
    align-items: center
    background: #fff

  .site-wrapper
    background-color: #fff
    width: 90vw
    max-width: 1900px

a
  color: #A91744
</style>

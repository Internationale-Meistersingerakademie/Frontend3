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

.site-wrapper
  overflow: hidden
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

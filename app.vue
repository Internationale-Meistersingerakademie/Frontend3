<script setup lang="ts">
const { t } = useI18n()
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})
useSeoMeta({
  ogTitle: t('seo.ogTitle'),
  ogDescription: t('seo.ogDescription'),
  ogImage: "", // TODO
  twitterCard: "summary_large_image",
})
const title = computed(() => t('seo.title'))
const description = computed(() => t('seo.description'))

</script>
<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <template v-for="link in head.link" :key="link.id">
      <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
    </template>
    <template v-for="meta in head.meta" :key="meta.id">
      <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
    </template>
  </Head>
  <div class="site-wrapper">
    <NuxtPage/>
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

// ADD PADDING WHEN SCREEN IS TOO LARGE
@media screen and (min-width: 1920px)
  html, body
    padding: 0 200px
    display: flex
    justify-content: center
    align-items: center
    background: #F5F5F5

  .site-wrapper
    background-color: #fff
    width: 90vw
    max-width: 1900px

a
  color: #c73562

</style>
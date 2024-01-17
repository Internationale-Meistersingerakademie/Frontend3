<script setup lang="ts">
const { t } = useI18n();
const runtimeConfig = useRuntimeConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.masterclass")}` : t("misc.masterclass");
  },
});

const { data: content, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/text/name/masterclass`, {
  default: () => [],
});
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Could not load data",
    data: {
      error: error.value,
      source: "/text/name/masterclass",
    },
  });
}
</script>
<template>
  <ScholarshipBanner />
  <Navigation />
  <div class="category-header">
    <h1>{{ content[0][$i18n.locale]["title"] }}</h1>
  </div>
  <div class="content-container">
    <HelperMarkdownStringRenderer :markdownString="content[0][$i18n.locale]['content']" />
    <div class="image-container">
      <img src="/media/masterclass/IMA2023-07-18_Kurse_1439.webp" alt="Masterclass Image 1" />
      <img src="/media/masterclass/IMA2023-07-18_Kurse_1451.webp" alt="Masterclass Image 2" class="last-image" />
    </div>
  </div>
  <Footer />
</template>
<style lang="sass" scoped>
// CATEGORY HEADER
.category-header
  display: flex
  justify-content: space-between
  align-items: center
  flex-direction: column

  h1
    font-size: 28px
    font-weight: 600
    color: $black
    letter-spacing: 1px
    margin-bottom: 30px
    z-index: 2
    text-transform: uppercase

  h3
    opacity: 0.4
    font-size: 20px
    color: $black
    letter-spacing: 1px
    text-transform: uppercase
    margin-bottom: 40px

p
  text-align: center
  max-width: 720px
  color: $black
  font-size: 16px
  letter-spacing: 1px
  margin-bottom: 40px
  z-index: 100


.content-container
  display: flex
  flex-direction: column
  align-items: center
  padding: 20px
  max-width: 60vw
  margin: 0 auto

.image-container
  display: flex
  justify-content: center
  margin-top: 20px

  img
    max-width: 50%
    height: auto
    margin-bottom: 50px


// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .category-header
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: column

    h1
      font-size: 23px
      margin-top: 50px

  .content-container
    max-width: 80vw

  .image-container
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    margin-top: 20px

    img
      max-width: 80vw
    .last-image
      margin-bottom: -250px
</style>

<script setup lang="ts">
const {t} = useI18n()
const runtimeConfig = useRuntimeConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.masterclass")}` : t("misc.masterclass");
  }
})

let content: Ref<Array<Record<string, any>>> = ref([])

async function fetchTextData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/text/name/masterclass`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/text/name/masterclass'
      }
    })
  } else {
    //@ts-ignore
    content = data
  }
}

await fetchTextData();

const buttonClicked = () => {
  alert('Kommt bald!')
}

</script>
<template>
  <ScholarshipBanner/>
  <Navigation/>
  <div class="category-header">
    <h1>{{ content[0][$i18n.locale]['title'] }}</h1>
    <p>
      <HelperMarkdownStringRenderer :markdownString="content[0][$i18n.locale]['content']" />
    </p>
    <a
      type="button"
      href="#"
      class="border-button"
      @click="buttonClicked"
    >{{ $t("application.applyNow") }}</a
    >
  </div>
  <Footer/>

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

  img
    margin-bottom: 50px

// BORDER BUTTON
.border-button
  padding: 10px 20px
  border: 3px solid $red
  font-size: 12px
  font-weight: 700
  color: $red
  text-transform: uppercase
  letter-spacing: 0.4px
  cursor: pointer
  text-decoration: none
  transition: all .5s ease
  background-color: #FFF
  margin-bottom: 40px

  &:hover
    background-color: $red
    color: #FFF

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

    p
      max-width: 80vw
      text-align: justify

    img
      margin-bottom: -250px
</style>

<script setup lang="ts">
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.privacy")}` : t("misc.privacy");
  }
})

let text: Ref<Array<Record<string, any>>> = ref([])

async function fetchTextData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/text/name/privacy`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/text/name/privacy'
      }
    })
  } else {
    //@ts-ignore
    text = data
  }
}

await fetchTextData();
</script>
<template>
  <ScholarshipBanner/>
  <Navigation/>
  <Datenschutz :text="text"/>
  <Footer/>
</template>
<script setup lang="ts">
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.legal")}` : t("misc.legal");
  }
})

let text: Ref<Array<Record<string, any>>> = ref([])

async function fetchTextData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/text/name/imprint`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/text/name/imprint'
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
  <Legal :text="text"/>
  <Footer/>
</template>
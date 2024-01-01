<script setup lang="ts">
const {t} = useI18n()
const runtimeConfig = useRuntimeConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.news")}` : t("misc.news");
  }
})

let list: Ref<Array<Record<string, any>>> = ref([])

async function fetchListData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/list/name/news`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/list/name/news'
      }
    })
  } else {
    //@ts-ignore
    list = data
  }
}

await fetchListData();
</script>
<template>
  <ScholarshipBanner/>
  <Navigation/>
  <News :list="list"/>
  <Footer/>

</template>
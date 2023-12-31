<script setup lang="ts">
import type {Ref} from "vue";

const {t} = useI18n()
const runtimeConfig = useRuntimeConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.network")}` : t("misc.network");
  }
})
let text: Ref<Array<Record<string, any>>> = ref([])
let list: Ref<Array<Record<string, any>>> = ref([])

async function fetchTextData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/text/site/home`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/text/site/home'
      }
    })
  } else {
    //@ts-ignore
    text = data
  }
}

async function fetchListData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/list/site/network`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/list/site/network'
      }
    })
  } else {
    //@ts-ignore
    list = data
  }
}

await fetchTextData()
await fetchListData()

</script>
<template>
  <ScholarshipBanner />
  <Navigation />
  <NetworkNetzwerk :text="text" :list="list"/>
  <Footer />
</template>
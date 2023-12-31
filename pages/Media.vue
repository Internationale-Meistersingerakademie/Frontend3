<script setup lang="ts">
import type {Ref} from "vue";

const {t} = useI18n()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.media")}` : t("misc.media");
  }
})
const runtimeConfig = useRuntimeConfig()

let text: Ref<Array<Record<string, any>>> = ref([])
let media: Ref<Array<Record<string, any>>> = ref([])

async function fetchMediaData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/media`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/media'
      }
    })
  } else {
    //@ts-ignore
    media = data
  }
}
async function fetchTextData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/text/name/mediaText`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/text/name/mediaText'
      }
    })
  } else {
    //@ts-ignore
    text = data
  }
}
await fetchMediaData()
await fetchTextData()

</script>
<template>
  <ScholarshipBanner />
  <Navigation />
  <MediaYearNavigation :text="text" :media="media" />
  <MediaMedienContent :media="media" />
  <Footer />

</template>
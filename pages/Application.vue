<script setup lang="ts">
import type {Ref} from "vue";

const {t} = useI18n()
const runtimeConfig = useRuntimeConfig()

let text: Ref<Array<Record<string, any>>> = ref([])

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.application")}` : t("misc.application");
  }
})

async function fetchTextData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/text/name/apply`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/text/name/apply'
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
  <ApplicationBewerbung :text="text"/>
  <Footer/>

</template>
<script setup lang="ts">
import type {Ref} from "vue";

const {t} = useI18n()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.faculty")}` : t("misc.faculty");
  }
})

const runtimeConfig = useRuntimeConfig()

let text: Ref<Array<Record<string, any>>> = ref([])
let faculty: Ref<Array<Record<string, any>>> = ref([])

async function fetchTextData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/text/site/faculty`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/text/site/faculty'
      }
    })
  } else {
    //@ts-ignore
    text = data
  }
}
async function fetchFacultyData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/person`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/person'
      }
    })
  } else {
    //@ts-ignore
    faculty = data.value.sort((a, b) => b.importance - a.importance).filter(d => d.published);
  }
}

await fetchTextData()
await fetchFacultyData()

</script>
<template>
  <ScholarshipBanner />
  <Navigation />
  <FacultyLehrerCategories :text="text" />
  <FacultyLehrerList :faculty="faculty"/>
  <Footer />

</template>
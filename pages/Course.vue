<script setup lang="ts">
import type {Ref} from "vue";

const runtimeConfig = useRuntimeConfig()

const {t} = useI18n()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.course")}` : t("misc.course");
  }
})

let text: Ref<Array<Record<string, any>>> = ref([])
let list: Ref<Array<Record<string, any>>> = ref([])
let audition: Ref<Array<Record<string, any>>> = ref([])

async function fetchListData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/list/site/course`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/list/site/course'
      }
    })
  } else {
    //@ts-ignore
    list = data
  }
}

async function fetchTextData() {

  let {data, error} = await useFetch(`${runtimeConfig.public.API}/text/site/course`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/text/site/course'
      }
    })
  }
  let {data: data2, error: error2} = await useFetch(`${runtimeConfig.public.API}/text/site/course`)
  if (error2.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error2.value,
        source: '/text/site/course'
      }
    })
  }
  if (data && data2) {
    //@ts-ignore
    text.value = data.value.concat(data2.value)
  }
}

async function fetchAuditionData() {
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/audition`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/audition'
      }
    })
  } else {
    //@ts-ignore
    audition = data
  }
}

await fetchTextData();
await fetchListData();
await fetchAuditionData();
</script>
<template>
  <ScholarshipBanner/>
  <Navigation/>
  <CourseKursbeschreibung :text="text"/>
  <CourseTeilnehmer :text="text" :auditions="audition"/>
  <CourseRepertoire :text="text" :list="list"/>
  <CourseVeranstaltungen :text="text" :list="list"/>
  <Footer/>
</template>
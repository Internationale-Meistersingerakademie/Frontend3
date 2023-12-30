<script setup lang="ts">
import type {Ref} from "vue";

const runtimeConfig = useRuntimeConfig()

let text: Ref<Array<Record<string, any>>> = ref([])
let list: Ref<Array<Record<string, any>>> = ref([])
let audition: Ref<Array<Record<string, any>>> = ref([])
let faculty: Ref<Array<Record<string, any>>> = ref([])

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
  const {data, error} = await useFetch(`${runtimeConfig.public.API}/list/site/home`)
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Could not load data',
      data: {
        error: error.value,
        source: '/list/site/home'
      }
    })
  } else {
    //@ts-ignore
    list = data
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

if (process.server) {
  await fetchTextData();
}
await fetchListData();
await fetchAuditionData();
await fetchFacultyData();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Home` : 'Home';
  }
})
</script>
<template>
  <div>
    <HomeScholarshipBanner/>
    <Navigation/>
    <HomeWelcomeVideo :text="text"/>
    <HomeVorsingen :text="text" :list="list" :auditions="audition"/>
    <HomeMediaPreview :text="text" :list="list"/>
    <HomeNewsLehrer :text="text" :list="list" :persons="faculty"/>
    <HomeSocialMedia/>
    <HomeFooter/>
  </div>
</template>
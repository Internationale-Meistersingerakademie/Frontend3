<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const text = ref<Array<Record<string, any>>>([]);
const list = ref<Array<Record<string, any>>>([]);
const audition = ref<Array<Record<string, any>>>([]);
const faculty = ref<Array<Record<string, any>>>([]);

async function fetchTextData() {
  const { data, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/text/site/home`);
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Could not load data",
      data: {
        error: error.value,
        source: "/text/site/home",
      },
    });
  } else {
    if (data.value) text.value = data.value;
  }
}

async function fetchListData() {
  const { data, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/list/site/home`);
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Could not load data",
      data: {
        error: error.value,
        source: "/list/site/home",
      },
    });
  } else {
    if (data.value) list.value = data.value;
  }
}

async function fetchAuditionData() {
  const { data, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/audition`);
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Could not load data",
      data: {
        error: error.value,
        source: "/audition",
      },
    });
  } else {
    if (data.value) audition.value = data.value;
  }
}

async function fetchFacultyData() {
  const { data, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/person`);
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Could not load data",
      data: {
        error: error.value,
        source: "/person",
      },
    });
  } else {
    if (data.value) faculty.value = data.value.sort((a, b) => b.importance - a.importance).filter((d) => d.published);
  }
}

await Promise.all([fetchTextData(), fetchListData(), fetchAuditionData(), fetchFacultyData()]);

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Home` : "Home";
  },
});
</script>

<template>
  <div>
    <ScholarshipBanner />
    <Navigation />
    <HomeWelcomeVideo :text="text" />
    <HomeVorsingen :text="text" :list="list" :auditions="audition" />
    <HomeMediaPreview />
    <HomeNewsLehrer :text="text" :list="list" :persons="faculty" />
    <HomeSocialMedia />
    <Footer />
  </div>
</template>

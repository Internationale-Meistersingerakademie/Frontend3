<script setup lang="ts">

const runtimeConfig = useRuntimeConfig();

const { t } = useI18n();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.course")}` : t("misc.course");
  },
});

const text = ref<Array<Record<string, any>>>([]);
const list = ref<Array<Record<string, any>>>([]);
const audition = ref<Array<Record<string, any>>>([]);

async function fetchListData() {
  const { data, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/list/site/course`);
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Could not load data",
      data: {
        error: error.value,
        source: "/list/site/course",
      },
    });
  } else {
    if (data.value) list.value = data.value;
  }
}

async function fetchTextData() {
  let { data, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/text/site/course`);
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Could not load data",
      data: {
        error: error.value,
        source: "/text/site/course",
      },
    });
  }
  let { data: data2, error: error2 } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/text/site/course`);
  if (error2.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Could not load data",
      data: {
        error: error2.value,
        source: "/text/site/course",
      },
    });
  }
  if (data && data2) {
    if (data.value && data2.value) text.value = data.value.concat(data2.value);
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

await Promise.all([fetchListData(), fetchTextData(), fetchAuditionData()]);
</script>

<template>
  <ScholarshipBanner />
  <Navigation />
  <CourseKursbeschreibung :text="text" />
  <CourseTeilnehmer :text="text" :auditions="audition" />
  <CourseRepertoire :text="text" :list="list" />
  <CourseVeranstaltungen :text="text" :list="list" />
  <Footer />
</template>

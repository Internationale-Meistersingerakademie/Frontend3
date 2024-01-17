<script setup lang="ts">
const { t } = useI18n();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.faculty")}` : t("misc.faculty");
  },
});

const runtimeConfig = useRuntimeConfig();

const text = ref<Array<Record<string, any>>>([]);
const faculty = ref<Array<Record<string, any>>>([]);

async function fetchTextData() {
  const { data, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/text/site/faculty`);
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Could not load data",
      data: {
        error: error.value,
        source: "/text/site/faculty",
      },
    });
  } else {
    if (data.value) text.value = data.value;
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

await Promise.all([fetchTextData(), fetchFacultyData()]);
</script>

<template>
  <ScholarshipBanner />
  <Navigation />
  <FacultyLehrerCategories :text="text" />
  <FacultyLehrerList :faculty="faculty" />
  <Footer />
</template>

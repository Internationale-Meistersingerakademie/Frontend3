<script setup lang="ts">
const { t } = useI18n();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.media")}` : t("misc.media");
  },
});
const runtimeConfig = useRuntimeConfig();

const text = ref<Array<Record<string, any>>>([]);
const media = ref<Array<Record<string, any>>>([]);

async function fetchMediaData() {
  const { data, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/media`);
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Could not load data",
      data: {
        error: error.value,
        source: "/media",
      },
    });
  } else {
    if (data.value) media.value = data.value;
  }
}
async function fetchTextData() {
  const { data, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/text/name/mediaText`);
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Could not load data",
      data: {
        error: error.value,
        source: "/text/name/mediaText",
      },
    });
  } else {
    if (data.value) text.value = data.value;
  }
}

await Promise.all([fetchMediaData(), fetchTextData()]);
</script>
<template>
  <ScholarshipBanner />
  <Navigation />
  <MediaYearNavigation :text="text" :media="media" />
  <MediaMedienContent :media="media" />
  <Footer />
</template>

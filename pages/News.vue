<script setup lang="ts">
const { t } = useI18n();
const runtimeConfig = useRuntimeConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.news")}` : t("misc.news");
  },
});

const { data: list, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/list/name/news`);
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Could not load data",
    data: {
      error: error.value,
      source: "/list/name/news",
    },
  });
}
</script>
<template>
  <ScholarshipBanner />
  <Navigation />
  <News :list="list" />
  <Footer />
</template>

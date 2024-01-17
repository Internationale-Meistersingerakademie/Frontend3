<script setup lang="ts">
const { t } = useI18n();
const runtimeConfig = useRuntimeConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.application")}` : t("misc.application");
  },
});

const { data: text, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/text/name/apply`, {
  default: () => [],
});
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Could not load data",
    data: {
      error: error.value,
      source: "/text/name/apply",
    },
  });
}
</script>

<template>
  <ScholarshipBanner />
  <Navigation />
  <ApplicationBewerbung :text="text" />
  <Footer />
</template>

<script setup lang="ts">
const { t } = useI18n();
const runtimeConfig = useRuntimeConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.privacy")}` : t("misc.privacy");
  },
});

const { data: text, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/text/name/privacy`, {
  default: () => [],
});
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Could not load data",
    data: {
      error: error.value,
      source: "/text/name/privacy",
    },
  });
}
</script>
<template>
  <ScholarshipBanner />
  <Navigation />
  <Legal :text="text" />
  <Footer />
</template>

<script setup lang="ts">
const { t } = useI18n();
const runtimeConfig = useRuntimeConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.contact")}` : t("misc.contact");
  },
});

const { data: text, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/text/name/contact`, {
  default: () => [],
});
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Could not load data",
    data: {
      error: error.value,
      source: "/text/name/contact",
    },
  });
}
</script>

<template>
  <ScholarshipBanner />
  <Navigation />
  <Contact :text="text" />
  <Footer />
</template>

<script setup lang="ts">
const { t } = useI18n();
const runtimeConfig = useRuntimeConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.network")}` : t("misc.network");
  },
});

const text = ref<Array<Record<string, any>>>([]);
const list = ref<Array<Record<string, any>>>([]);

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
  const { data, error } = await useFetch<Array<Record<string, any>>>(`${runtimeConfig.public.API}/list/site/network`);
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Could not load data",
      data: {
        error: error.value,
        source: "/list/site/network",
      },
    });
  } else {
    if (data.value) list.value = data.value;
  }
}

await Promise.all([fetchTextData(), fetchListData()]);
</script>
<template>
  <ScholarshipBanner />
  <Navigation />
  <NetworkNetzwerk :text="text" :list="list" />
  <Footer />
</template>

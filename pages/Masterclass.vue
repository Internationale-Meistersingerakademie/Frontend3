<script setup lang="ts">
const {t} = useI18n()
const runtimeConfig = useRuntimeConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.masterclass")}` : t("misc.masterclass");
  }
})

</script>
<template>
  <ScholarshipBanner/>
  <Navigation/>
  <Footer/>

</template>
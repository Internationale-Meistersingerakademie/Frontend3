<script setup lang="ts">

const {t} = useI18n()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.sponsors")}` : t("misc.sponsors");
  }
})

</script>
<template>
  <ScholarshipBanner/>
  <Navigation/>
  <SponsorsSponsoren/>
  <Footer/>

</template>
<script setup lang="ts">
const {t} = useI18n()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.application")}` : t("misc.application");
  }
})

</script>
<template>

</template>
<script setup lang="ts">
const { t } = useI18n()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${t("misc.privacy")}` : t("misc.privacy");
  }
})
</script>
<template>

</template>
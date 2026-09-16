<script setup lang="ts">
defineProps({
  text: { required: true, type: Object },
});
</script>

<template>
  <div class="category-header">
    <h1>{{ $loc(text[0]).title }}</h1>
    <!-- A div, not a p: the renderer emits block-level elements, and the browser
         auto-closed the paragraph around them — which ejected the content from
         the styled element and dropped these rules entirely. -->
    <div class="rich-text">
      <helperMarkdownStringRenderer :markdownString="$loc(text[0]).content" />
    </div>
    <a
      type="button"
      href="https://www.yaptracker.com/applications/internationale-meistersinger-akademie-2026"
      class="border-button"
      target="_blank"
      >{{ $t("application.applyNow") }}</a
    >

    <img src="/media/application/bewerbung_img.jpg" alt="Bewerbungsbild" style="max-height: 512px" />
  </div>
</template>

<style lang="sass" scoped>
// CATEGORY HEADER
.category-header
  display: flex
  justify-content: space-between
  align-items: center
  flex-direction: column

  h1
    font-size: 28px
    font-weight: 600
    color: $black
    letter-spacing: 1px
    margin-bottom: 30px
    z-index: 2
    text-transform: uppercase

  h3
    opacity: 0.4
    font-size: 20px
    color: $black
    letter-spacing: 1px
    text-transform: uppercase
    margin-bottom: 40px

  .rich-text
    text-align: center
    max-width: 720px
    color: $black
    font-size: 16px
    letter-spacing: 1px
    margin-bottom: 40px
    z-index: 100

    // The Markdown output is rendered by a child component, so its own
    // paragraphs sit outside this file's scope id and need :deep().
    :deep(p)
      margin-bottom: 16px

      &:last-child
        margin-bottom: 0

  img
    margin-bottom: 50px

// BORDER BUTTON
.border-button
  padding: 10px 20px
  border: 3px solid $red
  font-size: 12px
  font-weight: 700
  color: $red
  text-transform: uppercase
  letter-spacing: 0.4px
  cursor: pointer
  text-decoration: none
  transition: all .5s ease
  background-color: #FFF
  margin-bottom: 40px

  &:hover
    background-color: $red
    color: #FFF

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .category-header
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: column

    h1
      font-size: 23px
      margin-top: 50px

    .rich-text
      max-width: 80vw
      text-align: justify

    img
      margin-bottom: -250px
</style>

<script setup lang="ts">
defineProps({
  text: { required: true, type: Array as PropType<Array<Record<string, any>>> },
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
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

	.rich-text
		max-width: 900px
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
</style>

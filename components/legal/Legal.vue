<script setup lang="ts">
defineProps({
  text: { required: true, type: Array as PropType<Array<Record<string, any>>> },
});
</script>

<template>
  <div class="category-header">
    <h1>{{ text[0][$i18n.locale].title }}</h1>
    <p>
      <helperMarkdownStringRenderer :markdownString="text[0][$i18n.locale].content" />
    </p>
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

	p
		text-align: justify
		max-width: 900px
		color: $black
		font-size: 16px
		letter-spacing: 1px
		margin-bottom: 40px
		z-index: 100

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

		p
			max-width: 80vw
			text-align: justify
</style>

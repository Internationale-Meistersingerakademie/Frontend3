<script setup lang="ts">
const { $getElementByTitle } = useNuxtApp();

// Define your props here
const props = defineProps({
  text: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
});
const scrollTo = (selector: string) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
const additionalTextContent = $getElementByTitle("additional_text", props.text).content;
</script>
<template>
  <div class="lehrer-categories">
    <div class="category-header">
      <h1>{{ $t("faculty.ourTeachers") }}</h1>

      <p class="hinweis">
        {{ additionalTextContent }}
      </p>

      <div class="categories">
        <div class="category masterteachers" @click="scrollTo('.masterteachers-hl')">
          {{ $t("faculty.categories.masterteachers") }}
        </div>
        <div class="category head-coach" @click="scrollTo('.head-coach-hl')">
          {{ $t("faculty.categories.headCoach") }}
        </div>
        <div class="category language-coach" @click="scrollTo('.language-coach-hl')">
          {{ $t("faculty.categories.coaching") }}
        </div>
        <div class="category pianists" @click="scrollTo('.pianists-hl')">
          {{ $t("faculty.categories.pianists") }}
        </div>
        <div class="category makeup" @click="scrollTo('.makeup-hl')">
          {{ $t("faculty.categories.makeupArtist") }}
        </div>
      </div>
    </div>
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
		margin-bottom: 50px
		z-index: 2

.categories
	display: flex
	justify-content: space-between
	width: 75%
	max-width: 1100px

.category
	background-color: #F1F1F1
	padding: 10px 20px
	font-size: 14px
	color: $black
	font-weight: 600
	letter-spacing: 1px
	cursor: pointer
	transition: all .5s ease

	&:hover
		background-color: $red
		color: #FFF
		box-shadow: 0 0 30px 0 rgba(#000 ,0.25)

.hinweis
	margin-bottom: 55px
	font-weight: bold
	opacity: 0.5
	letter-spacing: 1px

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

	.categories
		display: flex
		justify-content: space-between
		width: 80%
		overflow-x: scroll

	.category
		background-color: #F1F1F1
		padding: 10px 20px
		font-size: 14px
		color: $black
		font-weight: 600
		letter-spacing: 1px
		cursor: pointer
		transition: all .5s ease
		margin-right: 20px
		display: flex
		justify-content: center
		align-items: center

		&:hover
			background-color: inherit
			color: inherit
			box-shadow: inherit
</style>

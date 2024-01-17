<script setup lang="ts">
const { $getElementByTitle } = useNuxtApp();

// Define your props here
const props = defineProps({
  text: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
  list: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
});

const repertoireTitle = $getElementByTitle("repertoire", props.list).title;
const repertoireContent = $getElementByTitle("repertoire", props.list).content as Array<Record<string, any>>;
const financialTermsTitle = $getElementByTitle("financialTerms", props.list).title;
const financialTermsContent = $getElementByTitle("financialTerms", props.list).content as Array<Record<string, any>>;
const locationCourseTitle = $getElementByTitle("location_course", props.text).title;
const locationCourseContent = $getElementByTitle("location_course", props.text).content as string;
</script>
<template>
  <div class="repertoire">
    <!-- CURVED BACKGROUND -->
    <div class="hide-overflow">
      <div class="curved-bg"></div>
    </div>

    <!-- REPERTOIRE WRAPPER -->
    <div class="repertoire-wrapper">
      <h1>{{ repertoireTitle }}</h1>

      <div class="rep-entry" v-for="elem in repertoireContent" v-bind:key="elem.subtitle">
        <h2>{{ elem.subtitle }}</h2>
        <li><helperMarkdownStringRenderer :markdownString="elem.text" /></li>
      </div>
    </div>

    <!-- GALLERY WRAPPER -->
    <div class="gallery-wrapper">
      <div class="gallery-entry">
        <img src="/media/course/gallery_3.png" alt="Reitstadel Neumarkt" />
        <p>
          {{ $t("course.repertoire.gallery.0") }}
        </p>
      </div>

      <div class="gallery-entry">
        <img src="/media/course/gallery_2.png" alt="" />
        <p>
          {{ $t("course.repertoire.gallery.1") }}
        </p>
      </div>

      <div class="gallery-entry">
        <img src="/media/course/gallery_1.png" alt="St. Josef Kloster" />
        <p>
          {{ $t("course.repertoire.gallery.2") }}
        </p>
      </div>
    </div>

    <!-- FINANCE WRAPPER -->
    <div class="finance-wrapper">
      <div class="finance">
        <h1>{{ financialTermsTitle }}</h1>
        <ul>
          <li v-for="elem in financialTermsContent" v-bind:key="elem.subtitle">{{ elem["subtitle"] }}{{ elem["text"] }}</li>
        </ul>
      </div>

      <div class="ort">
        <h1>{{ locationCourseTitle }}</h1>
        <p>
          <HelperMarkdownStringRenderer :markdownString="locationCourseContent" />
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.repertoire
	height: 1240px
	width: 100%
	display: flex
	flex-direction: row
	margin-top: -50px

// CURVED BACKGROUND
.curved-bg
	height: 1210px
	width: 350%
	border-radius: 100%
	position: absolute
	left: -125%
	z-index: 1
	box-shadow: 0 0 20px 0 rgba(#000, 0.08)

.hide-overflow
	height: 200%
	width: 100%
	padding-top: 20px
	position: absolute
	overflow-x: hidden

// REPERTOIRE WRAPPER
.repertoire-wrapper
	height: 100%
	width: 33.3%
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	position: relative
	margin-top: 0px

	h1
		font-size: 28px
		color: $black
		letter-spacing: 1px
		position: absolute
		top: 100px

.rep-entry
	margin-bottom: 50px

	h2
		font-size: 15px
		color: $black
		text-transform: uppercase
		letter-spacing: 1px
		line-height: 26px
		max-width: 350px
		margin-bottom: 15px

	li
		opacity: 0.7
		font-size: 15px
		color: $black
		line-height: 25px
		max-width: 300px
		list-style-type: none
		position: relative
		margin-left: 30px
		margin-bottom: 5px

		&:before
			content: "–"
			display: block
			position: absolute
			left: -30px


// GALLERY WRAPPER
.gallery-wrapper
	height: 100%
	width: 50%
	display: flex
	flex-direction: column
	align-items: center
	margin-top: 50px

	@media screen and (max-width: 1880px)
		width: 33.3%

.gallery-entry
	img
		height: 190px
		margin-top: 60px

		@media screen and (max-width: 1670px)
			height: 190px

	&:nth-child(1)
		position: relative

		// &:after
		// 	content: ""
		// 	display: block
		// 	width: 3px
		// 	height: 820px
		// 	background-color: $black
		// 	opacity: 0.05
		// 	position: absolute
		// 	left: 50%
		// 	top: 100px
		// 	z-index: -1

	p
		max-width: 275px
		text-align: left
		font-size: 14px
		color: $black
		line-height: 23px
		margin-top: 10px

// FINANCE WRAPPER
.finance-wrapper
	height: 100%
	width: 33.3%
	display: flex
	flex-direction: column
	align-items: center

	div
		h1
			font-size: 28px
			color: $black
			letter-spacing: 1px

.finance
	margin-top: 100px

	h1
		text-align: center
		margin-bottom: 30px

	ul
		max-width: 550px

		li
			margin-bottom: 10px
			line-height: 28px
			opacity: 0.7
			font-size: 14px
			color: $black
			line-height: 26px
			margin-left: 15px
			max-width: 330px

.ort
	margin-top: 60px

	h1
		text-align: center
		margin-bottom: 30px

	p
		max-width: 350px
		text-align: justify
		opacity: 0.7
		font-size: 15px
		color: $black
		letter-spacing: 1px
		line-height: 25px

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
	.repertoire
		height: auto
		flex-direction: column
		justify-content: center
		align-items: center
		margin-top: 150px

		@media screen and (max-width: 414px)
			margin-top: 250px

		@media screen and (max-width: 375px)
			margin-top: 450px

		@media screen and (max-width: 320px)
			margin-top: 700px


	.hide-overflow
		display: none

	.ort
		width: 300%
		display: flex
		flex-direction: column
		align-items: center

		p
			width: 75%
			text-align: justify
			font-size: 14px

	.finance
		margin-top: 60px

		ul
			width: 100%
			display: flex
			flex-direction: column
			align-items: center
			justify-content: center

			li
				width: 130%

	// REPERTOIRE WRAPPER
	.repertoire-wrapper
		width: 75%

		h1
			position: static
			margin-bottom: 40px

	.rep-entry
		margin-bottom: 30px

	// GALLERY WRAPPER
	.gallery-wrapper
		height: 100%
		width: 50%
		margin-top: -30px

	.gallery-entry
		img
			width: 100vw
			height: auto
			margin-top: 60px

		// &:nth-child(1)
		// 	position: relative
		//
		// 	&:after
		// 		content: ""
		// 		display: block
		// 		width: 3px
		// 		height: 720px
		// 		background-color: $black
		// 		opacity: 0.1
		// 		position: absolute
		// 		left: 50%
		// 		top: 100px
		// 		z-index: -1

		p
			max-width: 350px
			font-size: 12px
			text-align: left
			line-height: 19px
			margin-left: 20px
</style>

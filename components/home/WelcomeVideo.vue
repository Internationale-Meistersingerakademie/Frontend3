<script setup lang="ts">
const { $getElementByTitle } = useNuxtApp()

const props = defineProps({
  text: {type: Array<Record<string, any>>, required: true}
})

const welcomeText = $getElementByTitle('welcome_at_ima', props.text)

</script>
<template>
	<div class="welcome-video">
		<div class="welcome-wrapper">
			<!-- WILLKOMMEN VIDEO -->
			<div class="welcome-video-wrapper">
				<video
          v-if="$i18n.locale === 'de'"
					loading="lazy"
					src="/media/home/edith_wiens_de.mp4"
					width="710px"
					controls
					preload="metadata"
				></video>
        <video
          v-else
          loading="lazy"
          src="/media/home/edith_wiens_en.mp4"
          width="710px"
          controls
          preload="metadata"
        ></video>
			</div>

			<!-- WILLKOMMEN TEXT -->
			<div class="welcome-text-wrapper">
				<h1>{{ welcomeText.title }}</h1>
				<p>
          {{ welcomeText.content }}
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="sass" scoped>
.welcome-video
	width: 100%
	display: flex
	justify-content: center

.welcome-wrapper
	width: 100%
	display: flex
	justify-content: space-between
	align-items: center
	margin-top: -58px
	height: 400px

.welcome-video-wrapper
	flex: 1
	z-index: 1000
	height: 100%
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	position: relative
	overflow: hidden

	video
		outline: none
		position: absolute
		z-index: 1000
		left: -1px
		top: -1px
		-webkit-clip-path: polygon(27px 36px,55px 34px,99px 31px,146px 28px,205px 24px,256px 21px,311px 18px,387px 14px,421px 13px,449px 12px,475px 11px,498px 11px,512px 10px,527px 10px,545px 9px,563px 9px,581px 8px,605px 7px,634px 6px,644px 5px,689px 5px,708px 4px,734px 4px,761px 3px,779px 2px,820px 2px,820px 458px,1px 457px,1px 39px)
		clip-path: polygon(27px 36px,55px 34px,99px 31px,146px 28px,205px 24px,256px 21px,311px 18px,387px 14px,421px 13px,449px 12px,475px 11px,498px 11px,512px 10px,527px 10px,545px 9px,563px 9px,581px 8px,605px 7px,634px 6px,644px 5px,689px 5px,708px 4px,734px 4px,761px 3px,779px 2px,820px 2px,820px 458px,1px 457px,1px 39px)

		&::-webkit-media-controls-fullscreen-button
			display: none !important

		@media screen and (max-width: 1570px)
			top: -11px
			width: 730px

.welcome-text-wrapper
	flex: 0.8
	display: flex
	justify-content: center
	align-items: center
	flex-direction: column
	margin-top: 35px
	padding: 0 60px

	h1
		font-size: 25px
		color: $black
		letter-spacing: 1.56px
		margin-bottom: 20px
		text-transform: uppercase
		z-index: 100
		text-align: center

	p
		opacity: 0.8
		font-size: 14px
		color: $black
		letter-spacing: 1px
		text-align: justify
		line-height: 24px
		max-width: 580px

		@media screen and (max-width: 1570px)
			font-size: 14px
			line-height: 24px
			margin-bottom: 30px

		@media screen and (max-width: 1440px)
			line-height: 22px

.video-thumb
		z-index: 2

.welcome-bg
	position: absolute
	top: -100px
	z-index: 1

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
	.welcome-wrapper
		background-color: #FFF
		height: 880px
		flex-direction: column-reverse
		margin: 170px 0 0 0
		padding: 0
		overflow: visible

	.welcome-video-wrapper
		justify-content: center

		video
			position: relative
			-webkit-clip-path: none
			width: 100%
			z-index: 10000
			height: 180px
			margin-top: 100px

	.welcome-text-wrapper
		padding: 0 40px

		h1
			max-width: 250px
			margin-top: 0

		p
			opacity: 0.8
			font-size: 13px
			color: $black
			letter-spacing: 1px
			text-align: justify
			line-height: 24px
			max-width: 620px
</style>
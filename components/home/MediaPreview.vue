<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="media-preview">
    <div class="media-preview-wrapper">
      <div class="link">
        <NuxtLink :to="localePath('/Media')" class="media-button">{{ $t("home.mediaPreview.toMedia") }}</NuxtLink>
      </div>
      <video src="/media/home/bg_video.mp4" class="bg-video" autoplay loop muted></video>
    </div>
    <img src="/media/home/video_curve.png" alt="" class="video-curve" />
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

.video-curve
	margin-left: -15px

	@media screen and (max-width: 1500px)
		margin-left: -250px

	@media screen and (max-width: 1250px)
		margin-left: -300px

.media-preview-wrapper
	height: 350px
	width: 100%
	position: relative
	display: flex
	justify-content: center
	align-items: center

	video
		margin-top: 300px
		width: 100%
		filter: brightness(0.9)
		z-index: -2
		pointer-events: none

.link
	position: absolute
	right: 200px
	top: 50%
	cursor: pointer
	transition: opacity .5s ease

.media-button
	border: none
	background: none
	color: #FFF
	text-transform: uppercase
	text-decoration: none
	font-size: 15px
	font-weight: 600
	letter-spacing: 1px
	margin-top: -10px
	cursor: pointer


	&:after
		content: ''
		position: absolute
		width: 100%
		height: 3px
		display: block
		margin-top: 5px
		right: 0
		background: #FFF
		transition: width .3s ease

	&:hover:after
		width: 0
		left: 0
		background: #FFF

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
	.video-curve
		display: none

	.media-preview-wrapper
		height: 350px
		width: 100%
		position: relative
		display: flex
		justify-content: center
		align-items: center
		margin-bottom: 50px
		margin-top: 0px

		video
			width: 100%
			margin-top: 0
			filter: brightness(0.8)
			z-index: -2
			touch-action: none
			pointer-events: none

	.link
		position: absolute
		right: 27%
		top: 47%
		cursor: pointer
		transition: opacity .5s ease

	.media-button
		font-size: 18px
		margin-top: 0

		&:after
			display: none

		&:hover:after
			display: none
</style>

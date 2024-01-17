<script setup lang="ts">
const { $getElementByTitle } = useNuxtApp();

// Define your props here
const props = defineProps({
  text: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
});

const courseDescription1Title = $getElementByTitle("courseDescription1", props.text).title;
const courseDescription2Title = $getElementByTitle("courseDescription2", props.text).title;
const courseDescription1Content = $getElementByTitle("courseDescription1", props.text).content;
const courseDescription2Content = $getElementByTitle("courseDescription2", props.text).content;
</script>
<template>
  <div class="kursbeschreibung">
    <div class="left">
      <h1>{{ courseDescription1Title }}</h1>
      <div id="kurs-text">
        <p>
          {{ courseDescription1Content }}
        </p>
      </div>
    </div>
    <div class="right">
      <video src="/media/course/kurs_video.mp4#t=0.5" controls preload="metadata"></video>
      <h1>{{ courseDescription2Title }}</h1>
      <p>{{ courseDescription2Content }}</p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.kursbeschreibung
	width: 100%
	height: 600px
	background-color: #FFF
	display: flex
	flex-direction: row

	div
		flex: 1
		z-index: 100

	p
		text-align: justify
		margin-bottom: 20px
		opacity: 0.6
		font-size: 15px
		color: $black
		letter-spacing: 1px
		line-height: 24px
		max-width: 580px

		@media screen and (max-width: 1400px)
			font-size: 14px
			max-width: 510px

.left
	display: flex
	align-items: center
	flex-direction: column
	justify-content: flex-start
	margin-top: 20px

	h1
		font-size: 28px
		font-weight: 600
		color: $black
		letter-spacing: 1px

#kurs-text
	display: flex
	flex-direction: column
	justify-content: flex-start
	align-items: flex-start
	margin-top: 25px

.right
	display: flex
	flex-direction: column
	justify-content: flex-end
	align-items: flex-start
	position: relative

	h1
		margin-bottom: 15px
		font-size: 28px
		font-weight: 600
		color: $black
		letter-spacing: 1px

	p
		margin-bottom: 70px
		max-width: 580px

		@media screen and (max-width: 1400px)
			font-size: 14px

	video
		position: absolute
		top: -63px
		right: 0
		width: 100%
		max-height: 320px
		outline: none
		z-index: 1000
		-webkit-clip-path: polygon(9px 2px,130px 2px,208px 4px,257px 4px,300px 5px,350px 6px,415px 8px,494px 11px,550px 13px,598px 15px,690px 20px,749px 24px,813px 28px,863px 32px,905px 35px,936px 37px,960px 39px,960px 423px,0px 423px,1px 1px)

		@media screen and (min-width: 1500px)
			max-height: 320px
			width: 100%

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
	.kursbeschreibung
		height: auto
		flex-direction: column
		padding-bottom: 10px
		align-items: center

		p
			text-align: justify
			margin-bottom: 20px
			line-height: 24px
			max-width: 75%

	#kurs-text
		align-items: center

	.left
		h1
			font-size: 22px
			margin-top: 20px

	.right
		h1
			font-size: 22px
			margin-top: 20px

		video
			-webkit-clip-path: none
			margin: 15px 0 30px 0
			position: static

	.right
		flex-direction: column
		justify-content: flex-end
		align-items: center
</style>

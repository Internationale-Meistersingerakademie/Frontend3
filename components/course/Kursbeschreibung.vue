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

// Both clips are portrait phone testimonials. kurs_video.mp4 has black side
// bars baked into a 16:9 frame; object-fit in the CSS crops them back off.
//
// Safari decodes AV1 only on Apple hardware that has an AV1 decoder (iPhone 15
// Pro, M3 and later), so every AV1 source needs an H.264 one after it.
const videos = [
  {
    sources: [{ src: "/media/course/kurs_video.mp4", type: "video/mp4" }],
    poster: "/media/course/kurs_video_poster.jpg",
  },
  {
    sources: [
      { src: "/media/course/samantha_hankey_av1.mp4", type: 'video/mp4; codecs="av01.0.08M.10, mp4a.40.2"' },
      { src: "/media/course/samantha_hankey.mp4", type: "video/mp4" },
    ],
    poster: "/media/course/samantha_hankey_poster.jpg",
  },
];

const players: HTMLVideoElement[] = [];

// Native controls stay hidden until a clip is started, so before that the
// posters read as clean cards with a single play button each.
const started = ref(videos.map(() => false));

// Two people talking at once is noise, so starting one clip pauses the other.
function onPlay(index: number) {
  started.value[index] = true;
  players.forEach((player, i) => {
    if (i !== index) player.pause();
  });
}
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
      <div class="videos">
        <div v-for="(video, index) in videos" :key="video.poster" class="video">
          <video
            :ref="(el) => (players[index] = el as HTMLVideoElement)"
            :poster="video.poster"
            :controls="started[index]"
            preload="none"
            @play="onPlay(index)"
          >
            <source v-for="source in video.sources" :key="source.src" :src="source.src" :type="source.type" />
          </video>
          <button
            v-if="!started[index]"
            type="button"
            class="play"
            :aria-label="$t('course.description.playVideo')"
            @click="players[index].play()"
          ></button>
        </div>
      </div>
      <h1>{{ courseDescription2Title }}</h1>
      <p>{{ courseDescription2Content }}</p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.kursbeschreibung
	width: 100%
	min-height: 600px
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
	justify-content: flex-start
	align-items: flex-start
	position: relative
	margin-top: 20px

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

.videos
	// Opts out of the `flex: 1` every div in this block gets, which would
	// stretch the row down over the text.
	flex: none
	display: grid
	grid-template-columns: 1fr 1fr
	gap: 20px
	width: 100%
	max-width: 460px
	margin-bottom: 40px

.video
	position: relative
	box-shadow: 0 0 30px 0 rgba(#000, 0.15)

	video
		display: block
		width: 100%
		aspect-ratio: 9 / 16
		object-fit: cover
		background-color: $black
		outline: none

.play
	position: absolute
	inset: 0
	width: 100%
	border: none
	background: none
	cursor: pointer

	&::before
		content: ""
		position: absolute
		top: 50%
		left: 50%
		width: 64px
		height: 64px
		margin: -32px 0 0 -32px
		border-radius: 100%
		background-color: rgba($red, 0.9)
		box-shadow: 0 0 30px 0 rgba(#000, 0.25)
		transition: transform 0.2s

	&::after
		content: ""
		position: absolute
		top: 50%
		left: 50%
		margin: -11px 0 0 -6px
		border-style: solid
		border-width: 11px 0 11px 18px
		border-color: transparent transparent transparent #FFF

	&:hover::before,
	&:focus-visible::before
		transform: scale(1.08)

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
	.kursbeschreibung
		height: auto
		flex-direction: column
		padding-bottom: 10px
		align-items: center

		p
			text-align: left
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

	.videos
		width: calc(100% - 32px)
		margin: 15px 0 30px 0

	.right
		flex-direction: column
		justify-content: flex-end
		align-items: center
</style>

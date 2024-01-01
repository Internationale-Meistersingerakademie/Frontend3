<script setup lang="ts">
const props = defineProps({
  media: {type: Array<Record<string, any>>, required: true}
})
const changeAudio = (id: string, link: string) => {
  const audio = document.getElementById(id) as HTMLAudioElement
  audio.pause()
  audio.src = link
  audio.load()
  audio.play()
}

</script>
<template>
  <div class="medien-wrapper">
    <div class="timeline"></div>
    <div class="medien-content">
      <!-- YEAR -->
      <div v-for="year in props.media" class="year-wrapper">
        <h1 class="year-title twoNineteen" :id="'year' + year.year">
          {{ year.year }}
        </h1>

        <div class="year-text-wrapper">

          <div class="teilnehmer">
            <h3>
              <HelperMarkdownStringRenderer
                :markdownString="year.textDE.titleOfTheYear"/>
            </h3>
            <ul>
              <li
                v-for="participant in year.textDE.participants"
                v-bind:key="participant"
              >
                <HelperMarkdownStringRenderer
                  :markdownString="participant"/>
              </li>
            </ul>
          </div>
        </div>
        <div class="year-media-wrapper">
          <div class="video-wrapper" v-for="(videoLink, index) in year.video">
            <iframe
              v-bind:key="videoLink"
              loading="lazy"
              width="100%"
              height="315"
              :src="videoLink"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <object
              v-if="year.video.length === year.downloads.length && year.downloads[index].link !== ''"
              :data="year.downloads[index].link"
              type="application/pdf"
              width="100%"
              height="315">
              <p>Alternative text - include a link <a href="myfile.pdf">to the PDF!</a></p>
            </object>
          </div>

          <!-- Bilder - müsste migriert werden -->
          <!--            &lt;!&ndash; Documentation: https://ssense.github.io/vue-carousel/ &ndash;&gt;-->
          <!--            <div v-if="year.images.length > 0" class="gallery-wrapper">-->
          <!--              <carousel-->
          <!--                class="siema"-->
          <!--                :autoplay="true"-->
          <!--                :perPage="1"-->
          <!--                :paginationEnabled="false"-->
          <!--              >-->
          <!--                <slide v-for="image in year.images" v-bind:key="image.link"-->
          <!--                  ><img :src="image.link" :alt="image.alt"-->
          <!--                /></slide>-->
          <!--              </carousel>-->
          <!--            </div>-->

        </div>
        <!-- AUDIO WRAPPER -->
        <div v-if="year.audio.length > 0" class="audio-wrapper">
          <div class="audio-leute">
            <h3 style="margin-top: 10px">Audio-Demos</h3>
            <ul>
              <li
                v-for="audio in year.audio"
                v-bind:key="audio"
                @click="changeAudio('audio' + year.year, audio.link)"
              >
                {{ audio.name }}
              </li>
            </ul>

          </div>
          <audio
            :src="year.audio[0].link"
            :id="'audio' + year.year"
            controls
          >
            Sadly, your Browser does not support the
            <code>audio</code>-Tag.
          </audio>
        </div>
        <!-- Downloads - wurde nutzlos, da die PDFs nun oben integriert sind-->
<!--        <div class="teilnehmer" v-if="year.downloads.length">-->
<!--          <h3 style="margin-top: 10px">Programmhefte</h3>-->
<!--          <ul>-->
<!--            <li v-for="download in year.downloads" v-bind:key="download.alt">-->
<!--              <a :href="download.link" target="_blank"> {{ download.alt }}</a>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>


<style lang="sass" scoped>
.timeline
  height: 2870px
  width: 8px
  background-color: #D8D8D8
  position: absolute
  left: 0
  top: 870px

  @media screen and (min-width: 1440px)
    left: 0

.medien-wrapper
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  margin-top: 50px

.medien-content
  width: 1200px

  @media screen and (max-width: 1350px)
    width: 1100px

.year-wrapper
  margin-bottom: 60px

.year-title
  font-size: 45px
  color: $black
  letter-spacing: 2.5px
  margin-bottom: 25px

  @media screen and (min-width: 1440px)
    position: relative

  &:before
    content: ""
    display: block
    height: 22px
    width: 22px
    background-color: $red
    border-radius: 100%
    position: absolute
    left: -11px
    margin-top: 20px

    @media screen and (min-width: 1440px)
      left: -130px

  &:after
    content: ""
    display: block
    height: 7px
    width: 70px
    background-color: $red
    position: absolute
    left: 0
    margin-top: -32px

    @media screen and (max-width: 1420px)
      width: 45px

    @media screen and (min-width: 1440px)
      left: -125px

// YEAR TEXT WRAPPER
.year-text-wrapper
  display: flex
  margin-bottom: 30px
  text-align: left

.desc, .teilnehmer
  h3
    font-size: 16px
    color: $red
    letter-spacing: 1px
    font-weight: 600
    margin-bottom: 10px

.desc
  flex: 1.2

  p
    opacity: 0.7
    font-size: 15px
    color: $black
    text-align: justify
    line-height: 25px
    max-width: 430px

.teilnehmer
  flex: 2
  padding-left: 50px
  display: flex
  flex-direction: column

  ul
    columns: 2
    column-gap: 0px

    li
      position: relative
      margin-left: 20px
      margin-bottom: 10px
      font-size: 15px
      color: $black

    &:before
      content: ""
      display: block
      height: 5px
      width: 5px
      border-radius: 100%
      background-color: $black
      position: absolute
      top: 8px
      left: -12px

.audio-leute
  flex: 2
  display: flex
  flex-direction: column
  margin-bottom: 10px

  ul
    columns: 1
    column-gap: 0px

    li
      position: relative
      margin-left: 20px
      margin-bottom: 5px
      font-size: 15px
      color: $black
      transition: 0.5s

    li:hover
      text-decoration: underline

.year-media-wrapper
  .video-wrapper
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 10px
    margin-bottom: 25px

.audio-wrapper
  width: 100%
  height: auto

  audio
    margin-bottom: 5px

  h3
    margin-bottom: 10px

  ul
    li
      cursor: pointer

audio
  width: 100%

// SIEMA GALLERY
.VueCarousel-dot
  margin-top: 0px !important

.VueCarousel-dot-container
  margin-top: 0px !important

.gallery-wrapper
  width: 49%
  height: 315px
  border: 5px solid red

  div
    width: 100%
    height: 100%

    img
      width: 100%
      height: 100%

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .timeline
    display: none

  .year-title
    margin-left: -50px

  .year-text-wrapper
    flex-direction: column
    align-items: center
    text-align: left

  .medien-content
    width: 100%

  .desc
    display: flex
    flex-direction: column
    align-items: flex-start
    max-width: 85%

  .teilnehmer
    flex: 2
    padding-left: 0px
    display: flex
    flex-direction: column
    margin-top: 40px
    max-width: 85%

    ul
      columns: 1
      column-gap: 0px

      li
        position: relative
        margin-left: 20px
        margin-bottom: 10px
        font-size: 15px
        color: $black
        list-style: circle

  .year-media-wrapper
    display: flex
    flex-direction: column
    flex-wrap: nowrap
    width: 100%
    justify-content: space-between

    iframe
      width: 100%
      max-width: 350px
      margin: 0 auto 25px auto
      height: 210px

  .year-wrapper
    display: flex
    flex-direction: column
    align-items: center

  .gallery-wrapper
    width: 100%

  // AUDIO WRAPPER
  .audio-wrapper
    width: 100%
    height: auto
    padding: 10px

    audio
      outline: none

    ul
      li
        cursor: pointer
</style>

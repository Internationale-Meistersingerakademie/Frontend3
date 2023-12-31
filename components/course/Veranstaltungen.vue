<script setup lang="ts">
const { $getElementByTitle } = useNuxtApp()

// Define your props here
const props = defineProps({
  text: { type: Array<Record<string, any>>, required: true },
  list: { type: Array<Record<string, any>>, required: true }
})

const eventsCourseTitle = $getElementByTitle("events_course", props.list).title
const eventsCourseContent = $getElementByTitle("events_course", props.list).content as Array<Record<string, any>>
const roundtablesTitle = $getElementByTitle("roundtables", props.text).title
const roundtablesContent = $getElementByTitle("roundtables", props.text).content

const images = ref([
  'IMA 2011 (_) - Abschluss Blumen.jpg',
  'IMA 2011 - Wallis Giunta, Simone Easthope, Erin Snell.jpg',
  'IMA 2011 - Wallis Giunta.jpg',
  'IMA 2013 - Deanne Breiwick, Takaoki Onishi.jpg',
  'IMA 2014 - Andrew Stenson.jpg',
  'IMA 2014 - Virginie Verrez.jpg',
  'IMA 2016 - Fassbaender und Ivan.jpg',
  'IMA 2017 - Kelsey.jpg',
  'IMA 2017 - Natalia.jpg',
  'IMA 2017 - Tamara.jpg',
  'IMA 2017 - Virginie Verrez.jpg',
  'IMA 2018 - Alina_Adamski.jpg',
  'IMA 2018 - Hubert_Zapiór.jpg',
  'IMA 2018 - Jonathan_Abernethy.jpg',
  'IMA 2019 - Cabaret.jpg',
  'IMA 2019 - Cabaret - Kasanders, Wolz und Moore Kopie 2.jpg',
  'IMA 2019 - Liederabend - Jamez McCorkle.jpg',
  'IMA 2019 - Operagala - Meghan-Jamez.jpg',
  'IMA 2019 - Orchestra - Erika Baikoff.jpg',
  'IMA 2019 - Orchestra - Ian Castro, Tenor.jpg',
  'IMA 2019 Wiens_Martineau.jpg',
  'IMA2023-07-13_Eroeffnungskonzert_0037.webp',
  'IMA2023-07-13_Eroeffnungskonzert_0059.webp',
  'IMA2023-07-13_Eroeffnungskonzert_0081.webp',
  'IMA2023-07-13_Eroeffnungskonzert_0138.webp',
  'IMA2023-07-13_Eroeffnungskonzert_0148.webp',
  'IMA2023-07-13_Eroeffnungskonzert_0232.webp',
  'IMA2023-07-18_Kurse_1204.webp',
  'IMA2023-07-18_Kurse_1228.webp',
  'IMA2023-07-18_Kurse_1250.webp',
  'IMA2023-07-18_Kurse_1382.webp',
  'IMA2023-07-18_Kurse_1439.webp',
  'IMA2023-07-18_Kurse_1485.webp',
  'IMA2023-07-18_Kurse_1510.webp',
  'IMA2023-07-18_Kurse_1517.webp',
  'IMA2023-07-18_Kurse_1518.webp',
  'IMA2023-07-21_Liederabend_0441.webp',
  'IMA2023-08-04_Operngala_0546.webp',
  'IMA2023-08-04_Operngala_0549.webp',
  'IMA2023-08-04_Operngala_0561.webp',
  'IMA2023-08-04_Operngala_0591.webp',
  'IMA2023-08-04_Operngala_0607.webp',
  'IMA2023-08-04_Operngala_0634.webp',
  'IMA2023-08-04_Operngala_0643.webp',
  'IMA2023-08-04_Operngala_0645.webp',
  'IMA2023-08-04_Operngala_0667.webp',
  'IMA2023-08-04_Operngala_0679.webp',
  'IMA2023-08-04_Operngala_0684.webp',
  'IMA2023-08-04_Operngala_0692.webp',
  'IMG_0003.jpg',
])
const currentImage = ref(0)

const nextImage = () => {
  if (currentImage.value < images.value.length - 1) {
    currentImage.value++
  } else {
    currentImage.value = 0
  }
}

const previousImage = () => {
  if (currentImage.value > 0) {
    currentImage.value--
  } else {
    currentImage.value = images.value.length - 1
  }
}

let prefetchLink:any = null

onMounted(() => {
  prefetchLink = document.createElement('link')
  prefetchLink.rel = 'prefetch'
  document.head.appendChild(prefetchLink)

  console.log($getElementByTitle("events_course", props.list))
})

watch(currentImage, () => {
  const nextImageIndex = (currentImage.value + 1) % images.value.length
  const nextImageUrl = '/media/course/roundtables_galery/' + images.value[nextImageIndex]
  prefetchLink.href = nextImageUrl
})
</script>
<template>
  <div class="veranstaltungen">
    <!-- VERANSTALTUNGEN WRAPPER -->
    <div class="veranstaltungen-wrapper">
      <h1 id="veranstaltungen">
        {{ eventsCourseTitle }}
      </h1>

      <div class="events-wrapper">
        <div
          class="event-entry"
          v-for="elem in eventsCourseContent"
          v-bind:key="elem.subtitle"
        >
          <h3>{{ elem.subtitle }}</h3>
          <p>
            {{ elem.text }}
          </p>
        </div>
      </div>

      <a
        class="border-button"
        href="https://www.neumarkt.de/kultur-stadtinfo/veranstaltungen-und-feste/internationale-meistersinger-akademie/"
        target="_blank">{{$t('course.events.tickets')}}</a>

    </div>

    <!-- ROUNDTABLES GALLERY WRAPPER -->
    <div class="roundtables-gallery-wrapper">
      <div class="roundtables-wrapper">
        <div class="roundtables">
          <h1>{{ roundtablesTitle }}</h1>
          <p>
            {{ roundtablesContent }}
          </p>
        </div>

        <!-- CAN WE LEAVE THIS OUT? -> YES -->

        <!-- <div
          class="other-topic"
          v-if="getElementByTitle('another_topic', this.texts)"
        >
          <h1>{{ getElementByTitle("another_topic", this.texts).title }}</h1>
          <p>
            {{ getElementByTitle("another_topic", this.texts).content }}
          </p>
        </div> -->
      </div>
      <div class="imageContainer">
        <div></div>
        <img src="/media/course/arrow_back.svg" alt="arrow_back" class="arrow" v-on:click="previousImage"/>
        <div>
          <img
            v-for="(image, index) in images"
            :src="'/media/course/roundtables_galery/' + image"
            :alt="'Image ' + index"
            class="image"
            :style="{ display: index === currentImage ? 'block' : 'none' }"
          />
        </div>
        <img src="/media/course/arrow_forward.svg" alt="arrow_forward" class="arrow" v-on:click="nextImage"/>
        <div></div>
      </div>
    </div>
  </div>
</template>


<style lang="sass" scoped>

.veranstaltungen
  display: flex
  justify-content: center
  flex-direction: column
  margin: 50px 0 50px 0

// VERANSTALTUNGEN
.veranstaltungen-wrapper
  width: 100%
  display: flex
  position: relative
  flex-direction: row
  justify-content: center
  flex-wrap: wrap
  padding: 100px 100px 0 100px

  h1
    position: absolute
    top: 20px
    font-size: 28px
    color: $black
    letter-spacing: 1px
    line-height: 68px
    margin-bottom: 20px

.events-wrapper
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: center
// background-color: pink

.event-entry
  margin: 20px
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1)
  padding: 0 20px

  h3
    font-size: 16px
    color: $black
    line-height: 28px
    background-color: #FFF
    display: inline
    margin-left: -20px
    padding: 5px 10px 5px 15px
    position: relative
    box-shadow: 0 0 25px 0 rgba(#000, 0.1)

    &:before
      content: ""
      display: block
      height: 100%
      width: 5px
      background-color: $red
      position: absolute
      left: 0
      top: 0

  p
    width: 400px
    margin: 15px 0 40px 15px
    opacity: 0.7
    font-size: 15px
    color: $black
    line-height: 24px

.border-button
  padding: 10px 20px
  border: 3px solid $red
  font-size: 12px
  font-weight: 700
  color: $red
  text-transform: uppercase
  letter-spacing: 0.4px
  cursor: pointer
  transition: all .5s ease
  background-color: #FFF
  position: relative
  z-index: 1
  margin-top: 50px
  text-decoration: none

  &:hover
    background-color: $red
    color: #FFF

  &:hover:after
    opacity: 0.6
    right: -260px

// &:focus
// 	background-color: $red
// 	color: #FFF


// ROUNDTABLES
.roundtables-gallery-wrapper
  width: 100%
  margin-top: 70px
  display: flex
  flex-direction: column
  justify-content: space-between

.roundtables-wrapper
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  h1
    font-size: 28px
    color: $black
    letter-spacing: 1px
    line-height: 35px
    max-width: 450px
    margin: 17px 0 20px 0

  p
    opacity: 0.7
    font-size: 15px
    color: $black
    letter-spacing: 1px
    text-align: justify
    line-height: 24px
    max-width: 700px

.other-topic
  margin-top: 30px

// GALLERY
.gallery-wrapper
  display: flex
  align-items: center
  justify-content: center
  margin-top: 50px

  div
    width: 700px

  img
    width: 100%
    align-self: center
    margin-bottom: 10px

  p
    max-width: 380px
    font-size: 15px
    color: $black
    letter-spacing: 1
    text-align: justify
    line-height: 24px

.imageContainer
  display: grid
  grid-template-columns: 1fr 50px 800px 50px 1fr
  grid-gap: 20px
  justify-items: center
  margin: 40px 0

  .image
    height: 400px
    width: auto
    align-self: center

  .arrow
    height: 30px
    width: 30px
    cursor: pointer
    transition: all .5s ease
    align-self: center

    &:hover
      transform: scale(1.1)
      opacity: 0.6
      transition: all .5s ease

    &:active
      transform: scale(1.1)
      opacity: 0.6
      transition: all .5s ease
// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)

  // VERANSTALTUNGEN
  .veranstaltungen-wrapper
    h1
      top: 20px
      left: 10%

  .event-entry
    p
      max-width: 250px

  .veranstaltungen
    flex-direction: column
    align-items: center


  // ROUNDTABLES
  .roundtables-wrapper
    h1
      text-align: center

  .roundtables
    display: flex
    flex-direction: column
    align-items: center
    width: 100%

    p
      width: 100%
      font-size: 14px
      text-align: center

  // GALLERY
  .gallery-wrapper
    margin-top: 40px
    margin-bottom: -260px

    div
      height: auto
      width: 100vw
      display: flex
      flex-direction: column
      justify-content: center

    img
      width: 100vw
      height: auto
      margin-bottom: 10px

    p
      max-width: 250px
      font-size: 13px
      text-align: left
      line-height: 22px
      margin-left: 20px
  .imageContainer
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    grid-gap: 0

    .image
      width: 86vw
      height: auto

    .arrow
      z-index: 1
      width: 7vw
      height: auto

      &:hover
        transform: none
        opacity: 1

      &:active
        transform: none
        opacity: 1
</style>

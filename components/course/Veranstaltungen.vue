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

const eventsCourseTitle = $getElementByTitle("events_course", props.list).title;
const eventsCourseContent = $getElementByTitle("events_course", props.list).content as Array<Record<string, any>>;
const roundtablesTitle = $getElementByTitle("roundtables", props.text).title;
const roundtablesContent = $getElementByTitle("roundtables", props.text).content;

const images = ref([
  "IMA 2011 (_) - Abschluss Blumen.jpg",
  "IMA 2011 - Wallis Giunta, Simone Easthope, Erin Snell.jpg",
  "IMA 2011 - Wallis Giunta.jpg",
  "IMA 2013 - Deanne Breiwick, Takaoki Onishi.jpg",
  "IMA 2014 - Andrew Stenson.jpg",
  "IMA 2014 - Virginie Verrez.jpg",
  "IMA 2016 - Fassbaender und Ivan.jpg",
  "IMA 2017 - Kelsey.jpg",
  "IMA 2017 - Natalia.jpg",
  "IMA 2017 - Tamara.jpg",
  "IMA 2017 - Virginie Verrez.jpg",
  "IMA 2018 - Alina_Adamski.jpg",
  "IMA 2018 - Hubert_Zapiór.jpg",
  "IMA 2018 - Jonathan_Abernethy.jpg",
  "IMA 2019 - Cabaret.jpg",
  "IMA 2019 - Cabaret - Kasanders, Wolz und Moore Kopie 2.jpg",
  "IMA 2019 - Liederabend - Jamez McCorkle.jpg",
  "IMA 2019 - Operagala - Meghan-Jamez.jpg",
  "IMA 2019 - Orchestra - Erika Baikoff.jpg",
  "IMA 2019 - Orchestra - Ian Castro, Tenor.jpg",
  "IMA 2019 Wiens_Martineau.jpg",
  "IMA2023-07-13_Eroeffnungskonzert_0037.webp",
  "IMA2023-07-13_Eroeffnungskonzert_0059.webp",
  "IMA2023-07-13_Eroeffnungskonzert_0081.webp",
  "IMA2023-07-13_Eroeffnungskonzert_0138.webp",
  "IMA2023-07-13_Eroeffnungskonzert_0148.webp",
  "IMA2023-07-13_Eroeffnungskonzert_0232.webp",
  "IMA2023-07-18_Kurse_1204.webp",
  "IMA2023-07-18_Kurse_1228.webp",
  "IMA2023-07-18_Kurse_1250.webp",
  "IMA2023-07-18_Kurse_1382.webp",
  "IMA2023-07-18_Kurse_1439.webp",
  "IMA2023-07-18_Kurse_1485.webp",
  "IMA2023-07-18_Kurse_1510.webp",
  "IMA2023-07-18_Kurse_1517.webp",
  "IMA2023-07-18_Kurse_1518.webp",
  "IMA2023-07-21_Liederabend_0441.webp",
  "IMA2023-08-04_Operngala_0546.webp",
  "IMA2023-08-04_Operngala_0549.webp",
  "IMA2023-08-04_Operngala_0561.webp",
  "IMA2023-08-04_Operngala_0591.webp",
  "IMA2023-08-04_Operngala_0607.webp",
  "IMA2023-08-04_Operngala_0634.webp",
  "IMA2023-08-04_Operngala_0643.webp",
  "IMA2023-08-04_Operngala_0645.webp",
  "IMA2023-08-04_Operngala_0667.webp",
  "IMA2023-08-04_Operngala_0679.webp",
  "IMA2023-08-04_Operngala_0684.webp",
  "IMA2023-08-04_Operngala_0692.webp",
  "IMG_0003.jpg",
]);
const currentImage = ref(0);

const nextImage = () => {
  if (currentImage.value < images.value.length - 1) {
    currentImage.value++;
  } else {
    currentImage.value = 0;
  }
};

const previousImage = () => {
  if (currentImage.value > 0) {
    currentImage.value--;
  } else {
    currentImage.value = images.value.length - 1;
  }
};

let prefetchLink: any = null;

onMounted(() => {
  prefetchLink = document.createElement("link");
  prefetchLink.rel = "prefetch";
  document.head.appendChild(prefetchLink);
});

watch(currentImage, () => {
  const nextImageIndex = (currentImage.value + 1) % images.value.length;
  const nextImageUrl = "/media/course/roundtables_galery/" + images.value[nextImageIndex];
  prefetchLink.href = nextImageUrl;
});
</script>
<template>
  <div class="veranstaltungen">
    <!-- VERANSTALTUNGEN WRAPPER -->
    <div class="veranstaltungen-wrapper">
      <h1 id="veranstaltungen">
        {{ eventsCourseTitle }}
      </h1>

      <div class="events-wrapper">
        <div class="event-entry" v-for="elem in eventsCourseContent" v-bind:key="elem.subtitle">
          <h3>{{ elem.subtitle }}</h3>
          <p>
            {{ elem.text }}
          </p>
        </div>
      </div>

      <a
        class="border-button"
        href="https://www.neumarkt.de/kultur-stadtinfo/veranstaltungen-und-feste/internationale-meistersinger-akademie/"
        target="_blank"
        >{{ $t("course.events.tickets") }}</a
      >
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
      <!-- The controls are buttons rather than click-bound <img>: as images they
           were unreachable by keyboard and announced as decorative, so the
           gallery could only be operated with a mouse. -->
      <div class="imageContainer">
        <button type="button" class="arrow" :aria-label="$t('course.events.previousImage')" v-on:click="previousImage">
          <img src="/media/course/arrow_back.svg" alt="" />
        </button>
        <div class="image-frame">
          <img
            v-for="(image, index) in images"
            :src="'/media/course/roundtables_galery/' + image"
            :alt="'Image ' + index"
            class="image"
            loading="lazy"
            :style="{ display: index === currentImage ? 'block' : 'none' }" />
        </div>
        <button type="button" class="arrow" :aria-label="$t('course.events.nextImage')" v-on:click="nextImage">
          <img src="/media/course/arrow_forward.svg" alt="" />
        </button>
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
  // The wrapper is a column so the heading can sit in normal flow above the
  // grid. It used to be absolutely positioned at top: 20px with a 68px
  // line-height inside 100px of reserved padding — which held exactly one line.
  // The current CMS title is 118 characters, so it wrapped and painted straight
  // over the cards beneath it (three of them at 390px).
  flex-direction: column
  align-items: center
  padding: 60px 40px 0 40px

  h1
    font-size: 28px
    color: $black
    letter-spacing: 1px
    line-height: 1.4
    text-align: center
    max-width: 800px
    margin-bottom: 40px

.events-wrapper
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: center
  align-items: stretch
  gap: 30px

// The card matches .news-element on the landing page and /News — tinted fill,
// left crimson rule, one shadow, lift on hover. Previously this was the only
// card on the site with no fill, no vertical padding, two nested shadows and no
// hover state, which is what made the block read as foreign to the page.
.event-entry
  display: flex
  flex-direction: column
  flex: 0 1 400px
  max-width: 400px
  background-color: #F9F9F9
  border-left: 7px solid $red
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1)
  padding: 22px
  transition: all 0.2s ease

  &:hover
    transform: scale(1.01)
    box-shadow: 0 0 40px rgba(#000, 0.1)

  h3
    font-size: 16px
    color: $black
    line-height: 28px
    letter-spacing: 1px
    // display: block, not inline. As an inline box the heading's own text
    // length set the card's width, so cards in one row differed by 2x, and a
    // heading that wrapped shattered into separate shadowed chips.
    display: block
    margin-bottom: 12px

    // The global `h3:empty` rule cannot win here: this scoped selector scores
    // 0-3-2 against its 0-1-1, so an empty CMS subtitle kept its margin.
    &:empty
      display: none

  p
    opacity: 0.7
    font-size: 15px
    color: $black
    letter-spacing: 1px
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

// GALLERY
// The .gallery-wrapper and .other-topic rules that used to sit here targeted
// selectors this component does not render — roughly 45 lines of dead
// stylesheet, including the mobile `margin-bottom: -260px` that was supposedly
// compensating for the footer.
.imageContainer
  display: grid
  // The 800px track was fixed, so the gallery could not narrow below it.
  // minmax(0, 800px) keeps the same maximum and lets it shrink on small screens.
  grid-template-columns: 50px minmax(0, 800px) 50px
  justify-content: center
  align-items: center
  grid-gap: 20px
  margin: 40px 0
  padding: 0 20px

  .image-frame
    min-width: 0

  .image
    max-height: 400px
    max-width: 100%
    width: auto
    margin: 0 auto

  .arrow
    height: 30px
    width: 30px
    padding: 0
    border: none
    background: none
    cursor: pointer
    transition: all .5s ease
    z-index: 100

    img
      width: 100%
      height: 100%
      display: block

    &:hover,
    &:active,
    &:focus-visible
      transform: scale(1.1)
      opacity: 0.6
// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)

  // VERANSTALTUNGEN
  .veranstaltungen-wrapper
    padding: 40px 20px 0 20px

  // The card is free to use the full column width here; the old 250px cap left
  // the text in a narrow ribbon inside a much wider card.
  .event-entry
    flex: 1 1 100%
    max-width: 100%

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
  .imageContainer
    grid-template-columns: 30px minmax(0, 1fr) 30px
    grid-gap: 10px
    padding: 0 10px

    .image
      max-height: 260px

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
      width: 7vw
      height: auto

      &:hover
        transform: none
        opacity: 1

      &:active
        transform: none
        opacity: 1
</style>

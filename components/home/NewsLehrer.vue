<script setup lang="ts">
const { $getElementByTitle } = useNuxtApp();
const localePath = useLocalePath();

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
  persons: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
});
const splitText = (text?: string) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.slice(0, 25).join(" ") + (words.length > 25 ? " ..." : "");
};

// Indexing persons[0..2] directly threw whenever the API returned fewer than
// three faculty members; slicing renders what is actually there.
const featuredPersons = computed<Array<Record<string, any>>>(() => props.persons.slice(0, 3));

// Several portrait filenames contain spaces, which made the previous bare
// `url(' + image + ')` concatenation invalid CSS — the browser dropped the
// declaration and the slot rendered empty. encodeURI escapes the space (and
// the double quote, as %22) so the quoted url() always parses.
// Only the image, no sizing: `.lehrer-img` already asks for `cover` / `center`,
// which crops a portrait to fill the slot. Repeating `100% 100%` here overrode
// that and scaled each photo to the box on both axes independently — the
// faculty upload sizes range from 266x266 to 1814x2348, so the tall ones were
// squashed by about a quarter.
const portraitStyle = (image?: string) => ({
  backgroundImage: image ? `url("${encodeURI(image)}")` : undefined,
});

// `sortedNews` rather than a local sort: /News now applies the same one, so
// these three stay the top three of that page and the deep links below land on
// cards the visitor can see. It also copies before sorting — the previous
// version sorted the prop array in place.
const reducedNewsArray = computed<Array<Record<string, any>>>(() =>
  sortedNews(($getElementByTitle("news", props.list) as any)?.content).slice(0, 3)
);

// const teachersShown = ["Prof. Dr. h.c. mult. Edith Wiens", "Anne Sofie von Otter", "Pål Moe"];
</script>

<template>
  <div class="news-lehrer">
    <div class="news-lehrer-wrapper">
      <!-- NEWS SECTION -->
      <div class="news">
        <h1 class="news-lehrer-title">
          {{ $getElementByTitle("news", list).title }}
        </h1>

        <!-- NEWS ELEMENT 1 -->
        <div class="news-element" v-for="elem in reducedNewsArray" v-bind:key="elem.subtitle">
          <h5>{{ elem.subtitle }}</h5>
          <p class="news-lehrer-text">
            {{ splitText(elem.text) }}
          </p>
          <div class="date-link-wrapper">
            <div>
              <h6>
                {{
                  new Date(elem.date).toLocaleDateString($i18n.locale, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </h6>
            </div>
            <NuxtLink :to="`${localePath('/News')}#${newsAnchor(elem)}`" class="news-lehrer-link"
              >{{ $t("home.newsLehrer.readMore") }} <span>►</span></NuxtLink
            >
          </div>
        </div>

        <!-- NEWS BUTTON -->
        <NuxtLink :to="localePath('News')" class="border-button">{{ $t("home.newsLehrer.allNews") }}</NuxtLink>
      </div>

      <!-- LEHRER SECTION -->
      <div class="lehrer">
        <h1 class="news-lehrer-title">{{ $t("home.newsLehrer.faculty") }}</h1>

        <div class="lehrer-element" v-for="person in featuredPersons" v-bind:key="person.name">
          <div class="lehrer-img" :style="portraitStyle(person.image)"></div>
          <div class="lehrer-text-wrapper">
            <h6>{{ person.name }}</h6>
            <p>
              {{ splitText($loc(person).content) }}
            </p>
            <NuxtLink :to="`${localePath('/Faculty')}#${anchorId(person.name)}`" class="news-lehrer-link lehrer-hover"
              >{{ $t("home.newsLehrer.readMore") }} <span>►</span></NuxtLink
            >
          </div>
        </div>

        <!-- LEHRER BUTTON -->
        <NuxtLink :to="localePath('/Faculty')" class="border-button">{{ $t("home.newsLehrer.allFaculty") }} </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>

.news-lehrer-wrapper
  height: 900px
  width: 100%
  background-color: #FFF
  display: flex
  position: relative
  margin-top: -75px

.border-button
  padding: 10px 20px
  border: 3px solid $red
  font-weight: 700
  font-size: 12px
  color: $red
  text-transform: uppercase
  letter-spacing: 0.4px
  cursor: pointer
  position: absolute
  bottom: 60px
  transition: all .5s ease
  background-color: #FFF
  text-decoration: none

  &:hover
    background-color: $red
    color: #FFF

.news-lehrer-title
  margin-bottom: 70px
  margin-top: -90px
  font-size: 40px
  color: $black
  letter-spacing: 2.22px
  text-transform: uppercase

.news-lehrer-link
  font-size: 14px
  color: $red
  letter-spacing: 0.67px
  text-decoration: none
  display: flex
  align-items: center
  transition: opacity .5s ease
  position: relative

  // &:after
  // 	content: ''
  // 	position: absolute
  // 	width: 0
  // 	height: 2px
  // 	display: block
  // 	margin-top: 10px
  // 	right: 0
  // 	background: $red
  // 	transition: width .3s ease

  // &:hover:after
  // 	width: 100%
  // 	left: 0
  // 	background: $red

  &:hover
    opacity: 0.2

  span
    font-size: 7px
    margin: 3px 0 0 7px
    display: block

// .lehrer-hover
// 	width: 120px

//NEWS
.news
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  border-right: 1px solid #E9E9E9

.news-element
  max-width: 570px
  min-width: 570px
  height: 170px
  background-color: #F9F9F9
  margin-bottom: 35px
  display: flex
  flex-direction: column
  justify-content: space-between
  padding: 22px
  border-left: 7px solid $red
  transition: all 0.2s ease
  cursor: pointer

  &:hover
    transform: scale(1.01)
    box-shadow: 0px 0px 40px rgba(#000, 0.1)

  h5
    font-size: 15px
    color: $black
    letter-spacing: 0.83px
    text-transform: uppercase

  p
    opacity: 0.6
    font-size: 14px
    color: $black
    letter-spacing: 0.67px
    text-align: left


  div
    h6
      font-size: 12px
      color: $black
      letter-spacing: 0.67px
      margin-right: 5px
      font-weight: 300

  div
    display: flex
    justify-content: space-between
    align-items: center

// LEHRER
.lehrer
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

.lehrer-element
  display: flex
  flex-direction: row
  height: 170px
  max-width: 570px
  min-width: 375px
  margin-bottom: 35px
  transition: all 0.2s ease
  cursor: pointer

  &:hover
    transform: scale(1.01)
    box-shadow: 0px 0px 40px rgba(#000, 0.1)

.lehrer-img
  background-size: cover
  background-position: center
  flex: 0.45

//.lehrer-img-2
//	background: url(../../assets/home_assets/lehrer/fassbaender.jpg)
//	background-size: cover
//	background-position: center
//	flex: 0.45
//
//.lehrer-img-3
//	background: url(../../assets/home_assets/lehrer/martineau.jpg)
//	background-size: cover
//	background-position: center
//	flex: 0.45

.lehrer-text-wrapper
  display: flex
  flex: 1
  flex-direction: column
  justify-content: space-between
  background-color: #F9F9F9
  padding: 22px

  h6
    font-size: 14px
    font-weight: 600
    color: $black
    letter-spacing: 0.67px

  p
    opacity: 0.6
    font-size: 14px
    color: $black
    letter-spacing: 0.67px
    text-align: left

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .news-lehrer-wrapper
    height: 2000px
    flex-direction: column
    margin-top: -120px

  // NEWS
  .news-element
    width: 100%
    min-width: inherit
    height: 190px
    margin-bottom: 25px

    @media screen and (max-width: 320px)
      height: 200px

    p
      font-size: 13px
      text-align: left

    &:hover
      transform: inherit
      box-shadow: inherit

    h5
      @media screen and (max-width: 320px)
        font-size: 13px

  .news-lehrer-title
    margin-bottom: 50px
    margin-top: -160px
    font-size: 30px

  .news-lehrer-link
    @media screen and (max-width: 320px)
      font-size: 10px

  .date-link-wrapper
    div
      h6
        @media screen and (max-width: 320px)
          font-size: 11px

  // LEHRER
  .lehrer
    margin-top: -150px

    h1
      margin-bottom: 80px

  .lehrer-img
    position: absolute
    top: -45px
    right: 6%
    height: 85px
    width: 85px

  .lehrer-element
    height: 210px
    max-width: 100%
    min-width: inherit
    margin-bottom: 60px
    position: relative

    &:hover
      transform: inherit
      box-shadow: inherit

  .lehrer-text-wrapper
    h6
      font-size: 14px
      max-width: 180px

    p
      font-size: 13px
      letter-spacing: 0.67px
      text-align: left
      max-width: 500px

  // BORDER BUTTON
  .border-button
    position: static

  .border-button-news
    margin-top: 50px
</style>

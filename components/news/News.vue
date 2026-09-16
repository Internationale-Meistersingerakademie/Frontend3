<script setup lang="ts">
const i18n = useI18n();
const { $getElementByTitle } = useNuxtApp();

const props = defineProps({
  list: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
});

// `:target` only reacts to real fragment navigation; arriving here by clicking
// a landing-page card is a history-API push, which leaves it inert. Reading the
// hash off the route instead marks the linked item the same way in both cases.
const route = useRoute();
const linkedAnchor = computed(() => decodeURIComponent(route.hash.replace(/^#/, "")));

// Newest first. The CMS hands these back oldest-first, so the page used to open
// on a 2021 item and bury the current season at the bottom. `sortedNews` is the
// same sort the landing page's preview uses, which keeps its three cards the
// top three of this list — and therefore keeps its deep links pointing at
// entries the visitor can see without scrolling past five years of archive.
const newsEntries = computed(() => sortedNews(($getElementByTitle("news", props.list) as any)?.content));

const niceDates = (elem: Record<string, any>) => {
  return new Date(elem.date).toLocaleDateString(i18n.locale.value, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
<template>
  <div class="category-header">
    <h1>NEWS</h1>

    <div class="news">
      <!-- NEWS ELEMENT 1 -->
      <div
        class="news-element"
        v-for="elem in newsEntries"
        v-bind:key="newsAnchor(elem)"
        :id="newsAnchor(elem)"
        :class="{ 'is-linked': newsAnchor(elem) === linkedAnchor }">
        <h5>{{ elem.subtitle }}</h5>
        <p class="news-lehrer-text">
          {{ elem.text }}
        </p>
        <div class="date-link-wrapper">
          <div>
            <h6>{{ niceDates(elem) }}</h6>
          </div>
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
    margin-bottom: 30px
    z-index: 2
    text-transform: uppercase

//NEWS
.news
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  border-right: 1px solid #E9E9E9

.news-element
  max-width: 770px
  min-width: 375px
  background-color: #F9F9F9
  margin-bottom: 35px
  // Arriving from a landing-page link, the item would otherwise sit flush
  // against the top edge of the viewport.
  scroll-margin-top: 90px
  display: flex
  flex-direction: column
  justify-content: space-between
  padding: 22px
  border-left: 7px solid $red
  transition: all 0.7s ease
  cursor: auto

  // Says which of the twenty-one entries the incoming link meant.
  &.is-linked
    background-color: #F3EAEE

  h5
    font-size: 15px
    color: $black
    letter-spacing: 0.83px
    text-transform: uppercase
    margin-bottom: 15px

  p
    opacity: 0.6
    font-size: 14px
    color: $black
    letter-spacing: 0.67px
    text-align: justify
    margin-bottom: 15px
    line-height: 20px

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

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .category-header
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: column
    width: 100vw

    h1
      font-size: 23px
      margin-top: 50px

  //NEWS
  .news
    flex: 1
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    width: 100vw
    border-right: 1px solid #E9E9E9

    &:last-child
      margin-bottom: -280px

  .news-element
    width: 100vw
    background-color: #F9F9F9
    margin-bottom: 35px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-between
    padding: 15px
    border-left: 5px solid $red

    h5
      font-size: 15px
      color: $black
      letter-spacing: 0.83px
      text-transform: uppercase
      margin-bottom: 15px

    p
      opacity: 0.6
      font-size: 12px
      color: $black
      letter-spacing: 0.67px
      text-align: justify
      margin-bottom: 15px
      line-height: 20px
      width: 90%

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

.date-link-wrapper
  width: 200px
</style>

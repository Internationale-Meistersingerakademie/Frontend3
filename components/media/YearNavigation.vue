<script setup lang="ts">
defineProps({
  text: { required: true, type: Array as PropType<Array<Record<string, any>>> },
  media: { required: true, type: Object },
});
const scrollTo = (selector: string) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
<template>
  <div class="medien-header">
    <h1>{{ text[0][$i18n.locale].title }}</h1>

    <p>
      {{ text[0][$i18n.locale].content }}
    </p>

    <div class="year-navigation">
      <div v-for="year in media" v-bind:key="year" class="year" @click="scrollTo('#year' + year.year)">
        {{ year.year }}
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
// TIMELINE
.timeline
  height: 12870px
  width: 8px
  background-color: #D8D8D8
  position: absolute
  left: 0
  margin-top: 130px

  @media screen and (min-width: 1440px)
    left: -232px

// MEDIEN HEADER
.medien-header
  display: flex
  justify-content: space-between
  align-items: center
  flex-direction: column

  h1
    font-size: 28px
    font-weight: 600
    color: $black
    letter-spacing: 1px
    margin-bottom: 40px
    z-index: 2

  p
    text-align: center
    max-width: 800px
    margin-bottom: 40px
    padding: 0 100px

.year-navigation
  height: 70px
  display: flex
  padding: 15px 20px 15px 10px

  @media screen and (min-width: 1440px)
    position: relative

.year
  background-color: #F1F1F1
  padding: 10px 20px
  margin: 0 10px
  font-weight: 600
  letter-spacing: 1px
  cursor: pointer
  transition: all .5s ease

  &:hover
    background-color: $red
    color: #FFF
    box-shadow: 0 0 30px 0 rgba(#000, 0.25)

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .medien-header
    margin-top: 50px

    h1
      margin-bottom: 20px

    p
      max-width: 100%
      padding: 0 50px

  .year-navigation
    width: 80%
    overflow-x: scroll

  .timeline
    display: none
</style>

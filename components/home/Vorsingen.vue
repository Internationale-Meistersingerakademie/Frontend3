<script setup lang="ts">
const { $getElementByTitle } = useNuxtApp();
const localePath = useLocalePath();

const props = defineProps({
  text: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
  list: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
  auditions: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
});
</script>

<template>
  <div class="vorsingen">
    <div class="vorsingen-wrapper">
      <!-- VORSINGEN TITLE -->
      <h1>
        {{ $getElementByTitle("audition_deadlines_text", props.text).title }}
      </h1>
      <h3>
        {{ $getElementByTitle("audition_deadlines_text", props.text).subtitle }}
      </h3>
      <h3 class="neumarkt_angabe">NEUMARKT i.d.OPf., Germany</h3>
      <h2>
        {{ $getElementByTitle("audition_deadlines_text", props.text).content }}
      </h2>
      <p class="special-information">
        {{ $getElementByTitle("audition_text", props.text).content }}
      </p>
      <!-- VORSINGEN ELEMENTE -->
      <div class="vorsingen-elements-wrapper" v-if="auditions.length">
        <div class="vorsingen-element" v-for="audition in auditions" v-bind:key="audition[$i18n.locale].location">
          <h4 class="location">{{ audition[$i18n.locale].location }}</h4>
          <h4 class="date">{{ audition[$i18n.locale].date }}</h4>
          <h4 class="deadline">
            Deadline:
            <span>{{
              new Date(audition[$i18n.locale].deadline).toLocaleDateString($i18n.locale, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}</span>
          </h4>
        </div>
      </div>
      <!-- ANMELDEN BUTTON -->
      <NuxtLink :to="localePath('/Application')">
        <button type="button" name="button" class="border-button">
          {{ $t("home.vorsingen.apply") }}
        </button>
      </NuxtLink>

      <!-- IMA AUF EINEN BLICK -->
      <div class="blick-wrapper">
        <h5>{{ $t("home.vorsingen.glance") }}</h5>
        <div>
          <NuxtLink :to="localePath('/Network#gaeste')">
            {{ $t("home.vorsingen.glanceContent.0") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Course#veranstaltungen')">
            {{ $t("home.vorsingen.glanceContent.1") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Course#veranstaltungen')">
            {{ $t("home.vorsingen.glanceContent.2") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Faculty#meisterlehrer')">
            {{ $t("home.vorsingen.glanceContent.3") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Faculty#korrepetitor')">
            {{ $t("home.vorsingen.glanceContent.4") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Course')">
            {{ $t("home.vorsingen.glanceContent.5") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Media')">
            {{ $t("home.vorsingen.glanceContent.6") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Network#engagements')">
            {{ $t("home.vorsingen.glanceContent.7") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Faculty#makup')">
            {{ $t("home.vorsingen.glanceContent.8") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Course')">
            {{ $t("home.vorsingen.glanceContent.9") }}
          </NuxtLink>
        </div>
      </div>

      <img src="/media/home/video_curve.png" alt="" class="video-curve" />
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.vorsingen-wrapper
  height: 830px
  width: 100%
  background-color: #FFF
  display: flex
  flex-direction: column
  justify-content: space-around
  align-items: center
  box-shadow: 0 -10px 20px 0 rgba(0, 0, 0, 0.03)
  position: relative

  h1, h2, h3
    text-transform: uppercase

  h1
    font-size: 28px
    color: $black
    letter-spacing: 1.56px
    margin-top: 40px

  h3
    opacity: 0.44
    font-size: 22px
    color: $black
    letter-spacing: 1.22px
    margin-top: -27px
    margin-bottom: -7px

  h2
    font-size: 22px
    color: $red
    letter-spacing: 1.11px

  .neumarkt_angabe
    font-size: 19px
    text-transform: none
    margin-bottom: 0

.video-curve
  position: absolute
  bottom: -30px
  z-index: -1

.vorsingen-elements-wrapper
  display: flex
  justify-content: space-between
  width: 80%

  @media screen and (max-width: 1570px)
    width: 100%
    transform: scale(0.8)

  h4
    letter-spacing: 0.94px
    font-size: 20px
    color: $black
    margin-bottom: 7px

.location
  opacity: 0.6

  &:before
    content: ""
    display: block
    height: 1px
    background-color: $black
    opacity: 0.2
    margin-bottom: 15px

.deadline
  opacity: 1
  font-weight: 600

  span
    color: $red
    opacity: 1

.special-information
  text-align: center
  max-width: 750px

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

  &:hover
    background-color: $red
    color: #FFF

  &:hover:after
    opacity: 0.6
    right: -260px

  &:focus:after
    opacity: 0.6
    right: -260px

  &:after
    content: "Video-only application possible"
    display: flex
    opacity: 0
    padding: 5px
    justify-content: center
    align-items: center
    width: 250px
    height: 40px
    color: $black
    position: absolute
    right: -240px
    top: -6px
    transition: all 0.5s ease
    z-index: 0

.border-button-live
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

  &:hover
    background-color: $red
    color: #FFF

  &:hover:after
    opacity: 0.6
    right: -260px

  &:focus:after
    opacity: 0.6
    right: -260px

  &:after
    content: "on YouTube"
    display: flex
    opacity: 0
    padding: 5px
    justify-content: center
    align-items: center
    width: 250px
    height: 40px
    color: $black
    position: absolute
    right: -240px
    top: -6px
    transition: all 0.5s ease
    z-index: 0

.blick-wrapper
  display: flex
  flex-direction: column
  align-items: center
  margin-bottom: -10px

  h5
    font-size: 17px
    color: $black
    letter-spacing: 1px
    margin-bottom: 10px
    text-transform: uppercase

  div
    width: 90%
    text-align: center

    a
      position: relative
      margin-left: 10px
      line-height: 30px
      opacity: 0.8
      font-size: 17px
      color: $black
      letter-spacing: 0.67px
      text-decoration: none

      &:hover
        color: #999
        text-decoration: underline
        cursor: pointer

.with_dot
  &:after
    content: ""
    display: block
    height: 6px
    width: 6px
    background-color: black
    border-radius: 100px
    position: absolute
    right: -14px
    top: 10px

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .vorsingen-elements-wrapper
    flex-direction: column
    justify-content: space-between

  .vorsingen-element
    margin-bottom: 30px

  .vorsingen-wrapper
    height: 1550px
    margin-top: 0px

    h1
      font-size: 20px
      color: $black
      max-width: 350px
      letter-spacing: 1px
      margin-top: 20px
      text-align: center

    h3
      opacity: 0.44
      font-size: 15px
      color: $black
      letter-spacing: 1.22px
      margin-top: 0px

    h2
      font-size: 15px
      color: $red
      letter-spacing: 1.11px
      margin-top: 0px

  .neumarkt_angabe
    font-size: 19px
    text-transform: none

  .special-information
    text-align: center
    max-width: 80%
    font-size: 13px
    margin-top: 0px

  .border-button
    margin-bottom: 20px
    margin-top: 0px

  .border-button-live
    margin-bottom: 20px
    margin-top: 0px

  .blick-wrapper
    display: flex
    flex-direction: column
    align-items: center

    h5
      font-size: 16px
      color: $black
      letter-spacing: 1px
      margin-bottom: 10px
      text-transform: uppercase

    div
      width: 90%
      text-align: center

      a
        position: relative
        margin-left: 10px
        line-height: 28px
        opacity: 0.8
        font-size: 14px
        color: $black
        letter-spacing: 0.67px

        &:hover
          color: #999
          text-decoration: underline
          cursor: pointer
</style>

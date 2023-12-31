<script setup lang="ts">
const {$getElementByTitle} = useNuxtApp()

const props = defineProps({
  text: {type: Array<Record<string, any>>, required: true},
  list: {type: Array<Record<string, any>>, required: true}
})
const scrollTo = (selector: string) => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({behavior: 'smooth'})
  }
}

const year = new Date().getFullYear()
const startYear = 2014
const years = Array.from({length: year - startYear + 1}, (_, i) => startYear + i)

</script>
<template>
  <div class="lehrer-categories">
    <div class="category-header">
      <h1>{{ $t('network.network') }}</h1>
      <h3>{{ $getElementByTitle("network", props.text).title }}</h3>
      <p>
        <HelperMarkdownStringRenderer :markdownString="$getElementByTitle('network', props.text).content as string"/>
      </p>

      <div class="netzwerk-structure-wrapper">
        <a class="gaeste category" @click="scrollTo('.gaeste-hl')">
          {{ $t('network.attendeesOfTheAuditions') }}
        </a>
        <div class="arrow">
          <svg
            width="60"
            height="17"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <path
                d="M1806 632c994.113 0 1794-250.138 1794-386S2794.113 0 1800 0 0 110.138 0 246s811.887 386 1806 386z"
                id="a"
              />
            </defs>
            <g fill="none" fill-rule="evenodd">
              <use
                fill="#FFF"
                fill-rule="nonzero"
                xlink:href="#a"
                transform="translate(-1513 -316)"
              />
              <g fill="#9C9C9C">
                <path d="M0 6.086h53v4H0z"/>
                <path d="M50.293 0l9.192 8.086-9.192 8.072z"/>
              </g>
            </g>
          </svg>
        </div>
        <!-- <div class="resultierende-label">RESULTIERENDE</div> -->
        <a class="engagements category" @click="scrollTo('.engagements-hl')">
          {{ $t('network.engagements') }}
        </a>
        <div>&#38;</div>
        <a class="vertretungen category" @click="scrollTo('.vertretungen-hl')">
          {{ $t('network.generalManagement') }}
        </a>
        <a class="preise category" @click="scrollTo('.preise-hl')">{{ $t('network.prices') }}</a>
      </div>

      <div class="vorsingen-wrapper">
        <span class="gaeste-hl"></span>
        <!-- Anker -->

        <div
          v-for="year in years.reverse()"
          class="vorsingen-liste"
          v-if="$getElementByTitle('networkParticipants'+year.toString(), props.list) != null"
        >
          <h1 class="gaeste-hl">
            {{ ($getElementByTitle('networkParticipants' + year.toString(), props.list) as any)["title"] }}
          </h1>
          <ul>
            <li
              v-for="guest in ($getElementByTitle('networkParticipants'+year.toString(), props.list) as any)['content']"
              v-bind:key="guest.subtitle"
            >
              <span>{{ guest.subtitle }}</span> {{ guest.text }}
            </li>
          </ul>
        </div>
      </div>

      <div class="engagements-wrapper">
        <h1 class="engagements-hl">RESULTIERENDE ENGAGEMENTS</h1>
        <div
          class="engagement"
          v-if="($getElementByTitle('networkFixedContract', props.list) as any) != null"
        >
          <h1>
            {{ ($getElementByTitle('networkFixedContract', props.list) as any)["title"] }}
          </h1>
          <div class="engagement-liste">
            <ul>
              <li
                v-for="element in ($getElementByTitle('networkFixedContract', props.list) as any)['content']"
                v-bind:key="element.text"
              >
                <HelperMarkdownStringRenderer :markdownString="`${element.subtitle} ${element.text}`"/>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="engagement"
          v-if="($getElementByTitle('networkGuestContract', props.list) as any) != null"
        >
          <h1>
            {{ ($getElementByTitle('networkGuestContract', props.list) as any)["title"] }}
          </h1>
          <div class="engagement-liste">
            <ul>
              <li
                v-for="element in ($getElementByTitle('networkGuestContract', props.list) as any)['content']"
                v-bind:key="element.text"
              >
                <HelperMarkdownStringRenderer :markdownString="`${element.subtitle} ${element.text}`"/>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="engagement"
          v-if="($getElementByTitle('networkYoungEngagement', props.list) as any) != null"
        >
          <h1>
            {{ ($getElementByTitle('networkYoungEngagement', props.list) as any)["title"] }}
          </h1>
          <div class="engagement-liste">
            <ul>
              <li
                v-for="element in ($getElementByTitle('networkYoungEngagement', props.list) as any)['content']"
                v-bind:key="element.text"
              >
                <HelperMarkdownStringRenderer :markdownString="`${element.subtitle} ${element.text}`"/>
              </li>
            </ul>
          </div>
        </div>

        <p class="special-information">
          <HelperMarkdownStringRenderer :markdownString="$getElementByTitle('network_special', props.text).content as string"/>
        </p>

        <div
          class="engagement"
          v-if="($getElementByTitle('networkConcertRecital', props.list) as any) != null"
        >
          <h1>
            {{ ($getElementByTitle('networkConcertRecital', props.list) as any)["title"] }}
          </h1>
          <div class="engagement-liste">
            <ul>
              <li
                v-for="element in ($getElementByTitle('networkConcertRecital'+year.toString(), props.list) as any)['content']"
                v-bind:key="element.text"
              >
                <HelperMarkdownStringRenderer :markdownString="`${element.subtitle} ${element.text}`"/>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="engagement"
          v-if="($getElementByTitle('networkManagement', props.list) as any) != null"
        >
          <h1>
            {{ ($getElementByTitle('networkManagement', props.list) as any)["title"] }}
          </h1>
          <div class="engagement-liste">
            <ul>
              <li
                v-for="element in ($getElementByTitle('networkManagement', props.list) as any)['content']"
                v-bind:key="element.text"
              >
                <HelperMarkdownStringRenderer :markdownString="`${element.subtitle} ${element.text}`"/>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="engagement"
          v-if="($getElementByTitle('networkCompetitionPrices', props.list) as any) != null"
        >
          <h1>
            {{ ($getElementByTitle('networkCompetitionPrices', props.list) as any)["title"] }}
          </h1>
          <div class="engagement-liste">
            <ul>
              <li
                v-for="element in ($getElementByTitle('networkCompetitionPrices', props.list) as any)['content']"
                v-bind:key="element.text"
              >
                <HelperMarkdownStringRenderer :markdownString="`${element.subtitle} ${element.text}`"/>
              </li>
            </ul>
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
    margin-bottom: 10px
    z-index: 2
    text-transform: uppercase

  h3
    opacity: 0.4
    font-size: 20px
    color: $black
    letter-spacing: 1px
    text-transform: uppercase
    margin-bottom: 40px

  p
    text-align: center
    max-width: 720px
    color: $black
    font-size: 16px
    letter-spacing: 1px
    margin-bottom: 40px


.special-information
  text-align: center
  max-width: 750px
  margin: -50px auto 0 auto

// VORSINGEN WRAPPER
.vorsingen-wrapper
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

.vorsingen-liste
  max-width: 65%
  display: flex
  flex-direction: column
  align-items: center

  h1
    margin-bottom: 30px
    color: $red

  ul
    margin-left: 20px
    margin-bottom: 60px

    li
      margin-bottom: 8px
      line-height: 23px
      letter-spacing: 1px
      font-size: 16px

      span
        font-weight: 600

// ENGAGEMENT WRAPPER
.engagements-wrapper
  text-align: center
  max-width: 65%

  h1
    color: $red
    margin-bottom: 30px

.engagement
  text-align: center
  margin-bottom: 50px

  h1
    margin-bottom: 10px
    text-align: left

  ul
    columns: 2
    text-align: left
    column-gap: 50px
    margin-left: 20px

    li
      font-size: 16px
      letter-spacing: 1px
      line-height: 31px

// NETZWERK STRUCTURE
.netzwerk-structure-wrapper
  display: flex
  align-items: center
  justify-content: space-between
  width: 1100px
  margin: 30px 0 70px 0

  div
    font-weight: 600

    svg
      margin-bottom: -3px

.category
  background-color: #F1F1F1
  padding: 10px 20px
  font-size: 14px
  color: $black
  font-weight: 600
  letter-spacing: 1px
  cursor: pointer
  transition: all .5s ease

  &:hover
    background-color: $red
    color: #FFF
    box-shadow: 0 0 30px 0 rgba(#000, 0.25)

.netzwerk-structure-wrapper
  .preise
    position: relative
    margin-right: -30px

    &:before
      content: ""
      display: block
      height: 37px
      width: 3px
      background-color: $red
      position: absolute
      left: -30px
      top: 1px
      pointer-events: none

  .vertretungen
    margin-right: 20px

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .special-information
    margin: 0px auto 0 auto

  .category-header
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: column

    h1
      font-size: 23px
      margin-top: 50px

    h3
      font-size: 15px
      margin-bottom: 30px
      text-align: center
      max-width: 300px

    p
      text-align: justify
      max-width: 80%
      font-size: 15px
      margin-bottom: 10px

  // VORSINGEN WRAPPER
  .vorsingen-wrapper
    width: 100%
    display: flex
    flex-direction: column
    align-items: center

  .vorsingen-liste
    max-width: 80%

    h1
      margin-bottom: 20px

    ul
      margin-bottom: 5px

      li
        margin-bottom: 8px
        line-height: 23px
        letter-spacing: 1px
        font-size: 14px

        span
          font-weight: 600

  // ENGAGEMENT WRAPPER
  .engagements-wrapper
    text-align: center
    display: flex
    flex-direction: column
    align-items: center
    margin-bottom: -220px
    max-width: 80%

    h1
      margin-bottom: 0px

  .engagement
    text-align: center
    margin-bottom: 0px
    max-width: 100%

    h1
      margin-bottom: 10px
      display: flex
      justify-content: center
      align-items: center

    ul
      columns: 1
      column-gap: 0

      li
        font-size: 14px
        line-height: 29px

  // NETZWERK STRUCTURE
  .netzwerk-structure-wrapper
    flex-direction: column
    width: auto
    height: 500px
    margin: 30px 0 10px 0

    svg
      margin-bottom: 0
      transform: rotate(90deg)

  .category
    &:hover
      background-color: $red
      color: #FFF
      box-shadow: 0 0 30px 0 rgba(#000, 0.25)

  .netzwerk-structure-wrapper
    .preise
      position: relative
      margin-right: 0px

      &:before
        content: ""
        display: block
        height: 80px
        width: 3px
        background-color: $red
        position: absolute
        left: 47px
        top: -70px
        transform: rotate(90deg)

    .vertretungen
      margin-right: 0px
      margin-bottom: 20px
</style>

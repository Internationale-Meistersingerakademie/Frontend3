<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const localePath = useLocalePath()
const route = useRoute()

const bewerbungNavLink = ref(null)

onMounted(() => {
  // HIGHLIGHT CURRENT PAGE
  const routeName = route.fullPath
  if (routeName.includes("Application")) {
    // @ts-ignore
    bewerbungNavLink.value.$el.classList.add("current-page")
  }
})
</script>
<template>
  <div class="scholarship-banner">
    <div class="banner">
      <div class="lang-switcher element">
        <div v-if="$i18n.locale === 'de'">
          <NuxtLink :to="localePath($route.fullPath, 'de')" class="lang-switcher-element"
          >DEU
          </NuxtLink>
          <span class="lang-switcher-element">–</span>
          <NuxtLink :to="localePath($route.fullPath, 'en')" class="lang-switcher-element"
          >ENG
          </NuxtLink>
        </div>
        <div v-else>
          <NuxtLink :to="localePath($route.fullPath, 'en')" class="lang-switcher-element"
          >ENG
          </NuxtLink>
          <span class="lang-switcher-element">–</span>
          <NuxtLink :to="localePath($route.fullPath, 'de')" class="lang-switcher-element"
          >DEU
          </NuxtLink>
        </div>
      </div>
      <h2>{{ $t('home.scholarshipBanner.title') }}</h2>
      <NuxtLink :to="localePath('/Application')" class="bewerbung-nav-link element" ref="bewerbungNavLink">
        {{ $t('navigation.bewerbung') }}
      </NuxtLink>
      <img src="/media/home/banner.png" alt="Banner"/>
    </div>
  </div>
</template>
<style lang="sass" scoped>
a
  color: #FFF
  text-decoration: none
  font-weight: 400
  font-size: 16px
  letter-spacing: 3px
  text-align: center
  position: relative

  @media screen and (max-width: 1570px)
    letter-spacing: 1px

  &:after
    content: ''
    position: absolute
    width: 0
    height: 2px
    display: block
    margin-top: 5px
    right: 0
    background: #FFF
    transition: width .3s ease

  &:hover:after
    width: 100%
    left: 0
    background: #FFF

.banner
  height: 105px
  width: 100%
  background: #A91744
  display: flex
  justify-content: space-between
  align-items: center
  position: relative

  h2
    font-family: "Nunito Sans", sans-serif
    font-weight: 100
    text-transform: uppercase
    font-size: 17px
    color: #FFFFFF
    letter-spacing: 3px
    text-align: center
    line-height: 51px

  .element
    margin: 0 50px

img
  align-self: center
  height: 20px
  width: 100%
  position: absolute
  bottom: -10px


.lang-switcher

  div
    span
      color: #FFF
      margin-right: 10px

.lang-switcher-element
  text-decoration: none
  color: #FFF
  margin-right: 10px

  &:nth-child(2)
    opacity: 0.3

  &:nth-child(3)
    opacity: 0.6

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .banner
    height: 70px

    h2
      font-size: 12px
      line-height: 20px
      max-width: 280px
      letter-spacing: 1px

    img
      height: 13px

  .lang-switcher
    display: none
</style>

<script lang="ts" setup>
const localePath = useLocalePath();
</script>

<template>
  <div class="scholarship-banner">
    <div class="banner">
      <div class="lang-switcher element">
        <div v-if="$i18n.locale === 'de'">
          <NuxtLink :to="localePath($route.fullPath, 'de')" class="lang-switcher-element">DEU </NuxtLink>
          <span class="lang-switcher-element">–</span>
          <NuxtLink :to="localePath($route.fullPath, 'en')" class="lang-switcher-element">ENG </NuxtLink>
        </div>
        <div v-else>
          <NuxtLink :to="localePath($route.fullPath, 'en')" class="lang-switcher-element">ENG </NuxtLink>
          <span class="lang-switcher-element">–</span>
          <NuxtLink :to="localePath($route.fullPath, 'de')" class="lang-switcher-element">DEU </NuxtLink>
        </div>
      </div>
      <h2>{{ $t("home.scholarshipBanner.title") }}</h2>
      <NuxtLink :to="localePath('/Application')" class="bewerbung-nav-link element">
        {{ $t("navigation.bewerbung") }}
      </NuxtLink>
      <img src="/media/home/banner.png" alt="Banner" />
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

  &.router-link-active
    &:after
      content: '' !important
      position: absolute !important
      width: 100% !important
      height: 2px !important
      display: block !important
      margin-top: 5px !important
      right: 0 !important
      left: 0 !important
      background: #FFF !important
      transition: width .3s ease !important

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
    justify-content: center

    h2
      font-size: 12px
      line-height: 20px
      max-width: 280px
      letter-spacing: 1px

    img
      height: 13px

  .lang-switcher
    display: none
  .bewerbung-nav-link
    display: none
</style>

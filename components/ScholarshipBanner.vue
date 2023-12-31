<script setup lang="ts">
const localePath = useLocalePath()
</script>
<template>
  <div class="scholarship-banner">
    <div class="banner">
      <div class="lang-switcher">
        <div v-if="$i18n.locale === 'de'">
          <NuxtLink :to="localePath($route.fullPath, 'de')" class="lang-switcher-element"
          >DEU</NuxtLink>
          <span class="lang-switcher-element">–</span>
          <NuxtLink :to="localePath($route.fullPath, 'en')" class="lang-switcher-element"
          >ENG</NuxtLink>
        </div>
        <div v-else>
          <NuxtLink :to="localePath($route.fullPath, 'en')" class="lang-switcher-element"
          >ENG</NuxtLink>
          <span class="lang-switcher-element">–</span>
          <NuxtLink :to="localePath($route.fullPath, 'de')" class="lang-switcher-element"
          >DEU</NuxtLink>
        </div>
      </div>
      <h2>{{ $t('home.scholarshipBanner.title') }}</h2>
      <img src="/media/home/banner.png" alt="Banner" />
    </div>
  </div>
</template>
<style lang="sass" scoped>
.banner
  height: 105px
  width: 100%
  background: #A91744
  display: flex
  justify-content: center
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

  img
    align-self: center
    height: 20px
    width: 100%
    position: absolute
    bottom: -10px

.lang-switcher
  position: absolute
  left: 50px

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

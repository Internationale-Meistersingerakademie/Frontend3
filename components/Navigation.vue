<script setup lang="ts">
const localePath = useLocalePath()

import {useRoute} from 'vue-router'
import anime from 'animejs'

const route = useRoute()
const hamburger = ref(null)
const mobileNav = ref(null)

const homeNavLink = ref(null)
const kursNavLink = ref(null)
const lehrerNavLink = ref(null)
const netzwerkNavLink = ref(null)
const medienNavLink = ref(null)
const meisterkursNavLink = ref(null)
const backgroundClass = ref()
onMounted(() => {
  // HIGHLIGHT CURRENT PAGE
  const routeName = route.fullPath

  // Dieser Code ist nicht schön. Ein Switch-Case wäre besser, aber da es nur wenige Cases sind, bin ich zu faul.
  if (routeName.includes("home") || routeName === "/" || routeName === "/en") {
    backgroundClass.value = "header-wrapper-home"
  } else if (routeName.includes("Course")) {
    // @ts-ignore
    backgroundClass.value = "header-wrapper-course"
  } else if (routeName.includes("Faculty")) {
    // @ts-ignore
    backgroundClass.value = "header-wrapper-faculty"
  } else if (routeName.includes("Network")) {
    // @ts-ignore
    backgroundClass.value = "header-wrapper-network"
  } else if (routeName.includes("Media")) {
    // @ts-ignore
    backgroundClass.value = "header-wrapper-media"
  } else if (routeName.includes("Masterclass")) {
    // @ts-ignore
    backgroundClass.value = "header-wrapper-masterclass"
  }
  else if (routeName.includes("Application")) {
    backgroundClass.value = "header-wrapper-application"
  }
  else if (routeName.includes("Contact") || routeName.includes("Impressum") || routeName.includes("Datenschutz")) {
    backgroundClass.value = "header-wrapper-impressum"
  }
  else if (routeName.includes("News")) {
    backgroundClass.value = "header-wrapper-application"
  }
  else if (routeName.includes("Sponsors")) {
    backgroundClass.value = "header-wrapper-sponsors"
  }

  // @ts-ignore
  hamburger.value.addEventListener("click", () => {
    // @ts-ignore
    if (mobileNav.value.hasAttribute("id", "show-mobile-nav")) {
      // SLIDE OUT ANIMATION
      let slideOutTimeline = anime.timeline({
        easing: "easeOutExpo",
        duration: 50
      });

      slideOutTimeline
        .add({
          targets: ".mobile_nav *",
          translateY: ["0", "-30px"],
          opacity: [1, 0],
          delay: anime.stagger(10)
        })
        .add({
          targets: mobileNav,
          opacity: [1, 0],
          complete: function () {
            // @ts-ignore
            mobileNav.value.removeAttribute("id", "show-mobile-nav");
          }
        })
        .add({
          targets: ".lang-switcher",
          translateY: ["0", "-30px"],
          opacity: [1, 0],
          easing: "easeOutExpo",
          offset: "-=500",
        });
    } else {
      // @ts-ignore
      mobileNav.value.setAttribute("id", "show-mobile-nav");

      // SLIDE IN ANIMATION
      let slideInTimeline = anime.timeline({
        easing: "easeOutExpo",
        duration: 400
      });

      slideInTimeline
        .add({
          targets: mobileNav,
          height: ["0", "100vh"],
          opacity: [0, 1],
          duration: 300
        })
        .add({
          targets: ".mobile_nav *",
          translateY: ["-20px", "0"],
          opacity: [0, 1],
          delay: anime.stagger(10)
        });

      anime({
        targets: ".lang-switcher",
        translateY: ["-30px", "0"],
        opacity: [0, 1],
        easing: "easeOutExpo",
        delay: 0
      });
    }
  });
})
</script>
<template>
  <div class="navigation">
    <div :class="['header-wrapper', backgroundClass]">
      <!-- NAVIGATION -->
      <nav class="desktop_nav">
        <div class="nav-left">
          <NuxtLink :to="localePath('/')" class="home-nav-link" ref="homeNavLink">{{ $t('navigation.home') }}</NuxtLink>
          <NuxtLink :to="localePath('/Course')" class="kurs-nav-link" ref="kursNavLink">{{
              $t('navigation.kurs')
            }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Faculty')" class="lehrer-nav-link" ref="lehrerNavLink">{{
              $t('navigation.lehrer')
            }}
          </NuxtLink>
        </div>

        <div class="nav-right">
          <NuxtLink :to="localePath('/Network')" class="netzwerk-nav-link" ref="netzwerkNavLink">
            {{ $t('navigation.netzwerk') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Media')" class="medien-nav-link" ref="medienNavLink">{{
              $t('navigation.medien')
            }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Application')" class="bewerbungNavLink">
            {{ $t("navigation.bewerbung") }}
          </NuxtLink>
        </div>
      </nav>

      <!-- LOGO -->
      <div class="logo-wrapper">
        <h1>
          {{ $t('navigation.title') }}
        </h1>
        <!-- MOBILE NAV -->
        <div class="mobile-nav" id="mobile-nav">
          <div class="lang-switcher">
            <div v-if="$i18n.locale === 'de'">
              <NuxtLink
                :to="localePath($route.fullPath, 'de')"
                class="lang-switcher-element"
              >
                DEU
              </NuxtLink>
              <span class="lang-switcher-element">–</span>
              <NuxtLink
                :to="localePath($route.fullPath, 'en')"
                class="lang-switcher-element"
              >
                ENG
              </NuxtLink>
            </div>
            <div v-else>
              <NuxtLink
                :to="localePath($route.fullPath, 'en')"
                class="lang-switcher-element"
              >
                ENG
              </NuxtLink>
              <span class="lang-switcher-element">–</span>
              <NuxtLink
                :to="localePath($route.fullPath, 'de')"
                class="lang-switcher-element"
              >
                DEU
              </NuxtLink>
            </div>
          </div>

          <div class="hamburger" ref="hamburger">
            <div></div>
            <div></div>
            <div></div>
          </div>

          <nav class="mobile_nav" ref="mobileNav">
            <NuxtLink :to="localePath('/')">{{ $t('navigation.home') }}</NuxtLink>
            <NuxtLink :to="localePath('/Course')">{{ $t('navigation.kurs') }}</NuxtLink>
            <NuxtLink :to="localePath('/Faculty')">{{ $t('navigation.lehrer') }}</NuxtLink>
            <NuxtLink :to="localePath('/Network')">{{ $t('navigation.netzwerk') }}</NuxtLink>
            <NuxtLink :to="localePath('/Media')">{{ $t('navigation.medien') }}</NuxtLink>
            <NuxtLink :to="localePath('/Application')">{{ $t('navigation.bewerbung') }}</NuxtLink>
          </nav>
        </div>
        <div>
          <h3>{{ $t('navigation.director') }}</h3>
          <h4>{{ $t('navigation.position') }}</h4>
        </div>
        <img
          src="/media/ima_logo.png"
          height="195px"
          alt=""
        />
      </div>

      <img src="/media/home/video_curve.png" class="video-curve"/>
    </div>
  </div>
</template>
<style lang="sass" scoped>

.mobile-nav
  display: none

.header-wrapper
  width: 100%
  position: relative

.header-wrapper-home
  height: 780px
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 25%), url('/media/header_background_home.png')
  background-size: cover
  background-position: center !important

.header-wrapper-application
  height: 530px
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 25%), url('/media/header_background_bewerbung.jpg')
  z-index: 1
  background-size: cover
  background-position: center !important

.header-wrapper-impressum
  height: 530px
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 25%), url('/media/header_background_impressum.jpg')
  z-index: 1
  background-size: cover
  background-position: center !important

.header-wrapper-course
  height: 530px
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 25%), url('/media/header_background_course.jpg')
  z-index: 1
  background-size: cover
  background-position: center !important

.header-wrapper-masterclass
  height: 530px
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 25%), url('/media/header_background_masterclass.jpg')
  z-index: 1
  background-size: cover
  background-position: center !important

.header-wrapper-faculty
  height: 530px
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 25%), url('/media/header_background_faculty.webp')
  z-index: 1
  background-size: cover
  background-position: top !important

.header-wrapper-media
  height: 530px
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 25%), url('/media/header_background_media.jpg')
  z-index: 1
  background-size: cover
  background-position: center !important

.header-wrapper-network
  height: 530px
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 25%), url('/media/header_background_network.jpg')
  z-index: 1
  background-size: cover
  background-position: top !important

.header-wrapper-sponsors
  height: 530px
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 25%), url('/media/header_background_sponsors.webp')
  z-index: 1
  background-size: cover
  background-position: center !important


.video-curve
  position: absolute
  bottom: -57px

  @media screen and (max-width: 1570px)
    left: -200px

nav
  display: flex
  justify-content: space-between
  align-items: center
  height: 112px
  margin-top: 10px

  div
    height: 100%
    width: 35%
    max-width: 550px
    display: flex
    justify-content: space-between
    align-items: center

  a
    color: #FFF
    text-decoration: none
    font-weight: 600
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

.nav-right
  padding-right: 50px
  margin-left: 300px

  @media screen and (max-width: 1570px)
    margin-left: 250px
    padding-right: 45px

.nav-left
  padding-left: 50px
  margin-right: 300px

  @media screen and (max-width: 1570px)
    margin-right: 250px
    padding-left: 45px

.logo-wrapper
  color: #FFF
  display: flex
  flex-direction: column
  height: 300px
  align-items: center
  justify-content: space-between
  text-align: center
  margin-top: -77px

  h1
    max-width: 550px
    font-size: 32px
    font-weight: 700
    letter-spacing: 3.3px
    line-height: 51px
    margin-bottom: 20px

    @media screen and (max-width: 1570px)
      font-size: 23px
      line-height: 34px
      letter-spacing: 2px
      width: 400px

    h3
      font-size: 19px
      letter-spacing: 1.54px
      margin-bottom: 7px

    h4
      font-weight: 400
      font-size: 17px
      letter-spacing: 1.34px
      margin-bottom: 50px

  img
    align-self: center
    margin-top: 20px
    height: 200px

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .header-wrapper
    position: inherit
    height: 450px
    background-position: left

  .desktop_nav
    display: none

  .logo-wrapper
    margin-top: 0

    h1
      font-size: 18px
      max-width: 250px
      line-height: 25px
      margin-top: 40px
      align-self: flex-start
      text-align: left
      margin-left: 40px

      @media screen and (max-width: 320px)
        font-size: 14px
        max-width: 200px
        line-height: 21px

    div
      align-self: flex-start
      margin-left: 40px

      h3
        font-size: 15px

        @media screen and (max-width: 320px)
          font-size: 14px

      h4
        text-align: left
        font-size: 15px

        @media screen and (max-width: 320px)
          font-size: 14px

    img
      transform: scale(0.7)

  .header-wrapper-home
    background-position: left !important
  // MOBILE NAV
  #mobile-nav
    display: block

  .mobile_nav
    height: 100vh
    width: 100vw
    background-color: $red
    position: absolute
    z-index: 1000
    top: 0
    left: 0
    display: none
    flex-direction: column
    margin-top: 80px
    padding: 25% 0 55% 0

  #show-mobile-nav
    display: flex

  .hamburger
    position: absolute
    right: 40px
    top: 115px
    z-index: 10000

    div
      height: 3px
      width: 35px
      background-color: #FFF
      margin-bottom: 6px

  nav
    a
      &:after
        content: ''
        position: absolute
        width: 0
        height: 2px
        display: none
        margin-top: 5px
        right: 0
        background: #FFF
        transition: width .3s ease

      &:hover:after
        width: 0
        left: 0
        background: #FFF

  .lang-switcher
    position: absolute
    z-index: 10000
    top: 115px
    left: -45px
    opacity: 0

    div
      display: flex
      width: 150px
      justify-content: space-between

      a, span
        margin-right: 10px
        color: #FFF
        text-decoration: none
        font-size: 15px

        &:nth-child(2)
          opacity: 0.3

        &:nth-child(3)
          // opacity: 0.6

          &:before
            content: ""
            display: block
            height: 2px
            width: 30px
            background-color: #FFF
            position: absolute
            top: 12px
            left: 93px

  .video-curve
    display: none
</style>

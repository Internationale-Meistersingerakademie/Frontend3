<script setup lang="ts">
const localePath = useLocalePath()
</script>
<template>
  <div class="footer">
    <div class="footer-wrapper">
      <div class="links">
        <!-- LINKS -->
        <div class="weitere-links-wrapper">
          <span class="link-title">{{$t('home.footer.weitereLinks')}}</span>
          <div>
            <a
              href="https://www.neumarkt.de/kultur-stadtinfo/veranstaltungen-und-feste/internationale-meistersinger-akademie/"
              target="_blank"
            >{{$t('home.footer.kartenverkauf')}}</a
            >
            <a href="https://www.ima-neumarkt.de/" target="_blank"
            >{{$t('home.footer.foerderverein')}}</a
            >
            <NuxtLink :to="localePath('/Media')">{{$t('home.footer.medien')}}</NuxtLink>
            <NuxtLink :to="localePath('/Sponsors')">{{$t('home.footer.sponsoren')}}</NuxtLink>
            <NuxtLink :to="localePath('/Contact')">{{$t('home.footer.kontakt')}}</NuxtLink>
          </div>
        </div>

        <!-- SOCIAL & LANGUAGE -->
        <div class="lang-social-wrapper">
          <div class="lang-switcher">
            <span class="link-title">{{$t('home.footer.changeLanguage')}}</span>
            <div v-if="$i18n.locale === 'de'">
              <NuxtLink
                :to="localePath('index', 'de')"
                class="lang-switcher-element"
                @click="$i18n.locale = 'de'"
              >
                DEU
              </NuxtLink>
              <span class="lang-switcher-element">–</span>
              <NuxtLink
                :to="localePath('index', 'en')"
                class="lang-switcher-element"
                @click="$i18n.locale = 'en'"
              >
                ENG
              </NuxtLink>
            </div>
            <div v-else>
              <NuxtLink
                :to="localePath('index', 'en')"
                class="lang-switcher-element"
                @click="$i18n.locale = 'en'"
              >
                ENG
              </NuxtLink>
              <span class="lang-switcher-element">–</span>
              <NuxtLink
                :to="localePath('index', 'de')"
                class="lang-switcher-element"
                @click="$i18n.locale = 'de'"
              >
                DEU
              </NuxtLink>
            </div>
          </div>

          <div class="social-links">
            <span class="link-title">{{$t('home.footer.folgtUns')}}</span>
            <div>
              <a
                href="https://www.facebook.com/IMA-116394978416192/"
                target="_system"
              >Facebook</a
              >
              <a
                href="https://www.instagram.com/intern.meistersingerakademie/"
                target="_system"
              >Instagram</a
              >
              <!--<a href="#">Twitter</a>-->
            </div>
          </div>
        </div>
      </div>

      <!-- IMPRESSUM -->
      <div class="impressum">
        <div>
          <NuxtLink :to="localePath('/Impressum')" class="impressum-link">{{$t('home.footer.impressum')}}</NuxtLink>
          <NuxtLink :to="localePath('/Datenschutz')" class="datenschutz-link">{{$t('home.footer.datenschutz')}}</NuxtLink>
        </div>
        <span>© Copyright 2020 - {{(new Date()).getFullYear()}}</span>
      </div>

      <!-- SPONSOREN -->
      <div class="sponsoren">
        <img
          src="/media/neumarkt_logo.png"
          loading="lazy"
          height="140px"
          alt="Neumarkt Logo"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.impressum-link
  margin-right: 15px

.datenschutz-link
  margin-left: 15px

.footer-wrapper
  height: 220px
  width: 100%
  display: flex
  padding: 0 5%
  position: relative
  background-color: #F5F5F5

.link-title
  opacity: 0.6
  font-size: 14px
  color: $black
  letter-spacing: 0.12px

.links
  flex: 1
  display: flex
  flex-direction: column
  justify-content: space-between
  padding: 30px 0

  a
    font-size: 15px
    color: $black
    letter-spacing: 0.14px
    text-decoration: none
    margin-right: 25px
    position: relative

    &:after
      content: ''
      position: absolute
      width: 0
      height: 2px
      display: block
      margin-top: 1px
      right: 0
      bottom: -1px
      background: $black
      transition: width .3s ease

    &:hover:after
      width: 100%
      left: 0
      background: $black

.lang-social-wrapper
  display: flex
  justify-content: space-between
  width: 430px
  position: absolute
  bottom: 30px

.lang-switcher
  div
    a, span
      margin-right: 10px

      &:nth-child(1)
        padding-bottom: 1px
        border-bottom: 2px solid $black

      &:nth-child(2)
        opacity: 0.3

      &:nth-child(3)
        opacity: 0.6

.social-links
  div
    a
      &:nth-child(1)
        color: #4267B2

        &:after
          background: #4267B2

        &:hover:after
          width: 100%
          left: 0
          background: #4267B2

      &:nth-child(2)
        color: #F61969

        &:after
          background: #F61969

        &:hover:after
          width: 100%
          left: 0
          background: #F61969

      &:nth-child(3)
        color: #35A1F2

        &:after
          background: #35A1F2

        &:hover:after
          width: 100%
          left: 0
          background: #35A1F2

.impressum
  flex: 1
  display: flex
  flex-direction: column
  justify-content: flex-end
  align-items: center
  padding-bottom: 30px

  span
    margin-top: 10px
    opacity: 0.6
    font-size: 15px
    color: $black
    letter-spacing: 0.72px

  a
    font-size: 16px
    color: $black
    letter-spacing: 0.14px
    text-decoration: none
    position: relative

    &:after
      content: ''
      position: absolute
      width: 0
      height: 2px
      display: block
      margin-top: 1px
      right: 0
      background: $black
      transition: width .3s ease

    &:hover:after
      width: 100%
      left: 0
      background: $black

.sponsoren
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

  img
    align-self: center
    background-color: #FFF
    padding: 35px

.weitere-links-wrapper
  width: 600px
  position: absolute

  div
    a
      font-size: 16px
      line-height: 30px

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .footer-wrapper
    height: 750px
    flex-direction: column
    justify-content: center
    align-items: center
    padding: 0 5%
    margin-top: 300px

  .weitere-links-wrapper
    display: flex
    flex-direction: column
    align-items: center
    position: relative

    span
      margin-bottom: 0px

    div
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      margin-top: 15px

      a
        font-size: 15px
        margin-bottom: 10px
        margin-right: 0

  .lang-social-wrapper
    display: flex
    justify-content: center
    align-items: center
    margin: 60px 0 0 0
    flex-direction: column
    width: 100%
    position: relative

  .lang-switcher
    margin-bottom: 40px
    justify-content: center
    align-items: center
    display: flex
    flex-direction: column

  .social-links
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

  .links
    margin-bottom: 0px
    flex: 3

  .social-links
    div
      display: flex
      justify-content: space-between
      width: 130%
      margin-top: 5px
      a
        margin-right: 0

  .impressum
    order: 2
    justify-content: center
    padding-bottom: 0
    margin-top: 0px

  .sponsoren
    order: 1
    margin-bottom: 0px

    a
      margin: 15px 0 0 0

    img
      height: 130px
</style>

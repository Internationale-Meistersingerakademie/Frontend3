<script setup lang="ts">
const localePath = useLocalePath();
const { locale } = useI18n();

const LANG_LABELS: Record<string, string> = {
  de: 'DEU', en: 'ENG', fr: 'FRA', es: 'ESP',
  it: 'ITA', ja: '日本', ko: '한국', zh: '中文',
};

// Not every configured locale, only the ones that are actually translated —
// see composables/useTranslatedLocales.ts for where the bar sits.
const availableLocales = useTranslatedLocales();
</script>

<template>
  <div class="footer">
    <div class="footer-wrapper">
      <div class="links">
        <!-- LINKS -->
        <div class="weitere-links-wrapper">
          <span class="link-title">{{ $t("home.footer.weitereLinks") }}</span>
          <div>
            <a href="https://www.neumarkt.de/kultur-stadtinfo/veranstaltungen-und-feste/internationale-meistersinger-akademie/" target="_blank">{{
              $t("home.footer.kartenverkauf")
            }}</a>
            <a href="https://www.ima-neumarkt.de/" target="_blank">{{ $t("home.footer.foerderverein") }}</a>
            <NuxtLink :to="localePath('/Media')">{{ $t("home.footer.medien") }}</NuxtLink>
            <NuxtLink :to="localePath('/Sponsors')">{{ $t("home.footer.sponsoren") }}</NuxtLink>
            <NuxtLink :to="localePath('/Contact')">{{ $t("home.footer.kontakt") }}</NuxtLink>
          </div>
        </div>

        <!-- SOCIAL & LANGUAGE -->
        <div class="lang-social-wrapper">
          <div class="lang-switcher">
            <span class="link-title">{{ $t("home.footer.changeLanguage") }}</span>
            <div class="lang-switcher-row">
              <template v-for="(code, i) in availableLocales" :key="code">
                <span v-if="i > 0" class="lang-switcher-sep">–</span>
                <NuxtLink
                  :to="localePath($route.fullPath, code)"
                  :class="['lang-switcher-element', { active: locale === code }]"
                >{{ LANG_LABELS[code] || code.toUpperCase() }}</NuxtLink>
              </template>
            </div>
          </div>

          <div class="social-links">
            <span class="link-title">{{ $t("home.footer.folgtUns") }}</span>
            <div>
              <a href="https://www.facebook.com/IMA-116394978416192/" target="_system">Facebook</a>
              <a href="https://www.instagram.com/intern.meistersingerakademie/" target="_system">Instagram</a>
              <!--<a href="#">Twitter</a>-->
            </div>
          </div>
        </div>
      </div>

      <!-- IMPRESSUM -->
      <div class="impressum">
        <div>
          <NuxtLink :to="localePath('/Impressum')" class="impressum-link">{{ $t("home.footer.impressum") }}</NuxtLink>
          <NuxtLink :to="localePath('/Datenschutz')" class="datenschutz-link">{{ $t("home.footer.datenschutz") }}</NuxtLink>
        </div>
        <span>© Copyright 2020 - {{ new Date().getFullYear() }}</span>
      </div>

      <!-- SPONSOREN -->
      <div class="sponsoren">
        <!-- Bare numbers rather than `height="140px"`: the units are invalid in
             an HTML dimension attribute, and while Chrome happens to parse the
             leading digits anyway, only a valid pair gives the browser an
             aspect ratio to reserve space with before this lazy image loads.
             477x140 is the file's own 1182x347 ratio. The rendered size is set
             in CSS below, not here. -->
        <img src="/media/neumarkt_logo.png" loading="lazy" width="477" height="140" alt="Neumarkt Logo" />
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
  min-height: 220px
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
  .lang-switcher-row
    display: flex
    flex-wrap: wrap
    gap: 6px 10px
    align-items: center

  .lang-switcher-element
    opacity: 0.6
    color: $black
    text-decoration: none
    font-size: 15px
    // These render as <a> inside `.links`, so they were picking up its
    // `margin-right: 25px` — meant for the horizontal link list, not for a row
    // that spaces itself with `gap`. It put 35px before each separator against
    // 10px after it, and left a trailing 25px inside the centred row box, so
    // "ENG – DEU" sat ~13px left of every other centred line in the footer.
    margin-right: 0

    &.active
      opacity: 1
      padding-bottom: 1px
      border-bottom: 2px solid $black

  .lang-switcher-sep
    opacity: 0.3

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
    // Sized from the height, with the width left to follow the logo's own
    // 1182x347 ratio — 70px tall is what the old `height="140px"` attribute
    // actually produced, since the global border-box rule spent 70px of it on
    // the padding. Stating it here keeps the 35px white frame *around* the
    // logo rather than inside it, so the picture is the size it used to be
    // instead of half again as large.
    box-sizing: content-box
    width: auto
    height: 70px
    // Room for the padding in the cap, and `contain` as a hard floor against
    // distortion: the mobile rule at the bottom of this file pins the height,
    // so a clamped width would otherwise squash the logo (it was rendering 37%
    // too wide for its height at 390px).
    max-width: calc(100% - 70px)
    object-fit: contain

.weitere-links-wrapper
  // max-width, because the mobile breakpoint below never reset the 600px and
  // the block ran off the left edge of a 390px screen — taking the ENG, DEU,
  // 한국 and 中文 links with it. Those last two appear nowhere else in the UI,
  // so on a phone the site had two entirely unreachable locales.
  //
  // As wide as the links need rather than a fixed 600px, which squeezed the
  // German row and let `hyphens: auto` split "MEDI-EN" across two lines with
  // half the footer still empty. The cap is the space left of the logo column:
  // this box is positioned against the footer's padding box, where the logo's
  // third of the content starts at 65%.
  width: max-content
  max-width: 57%
  position: absolute

  div
    // Flex items wrap as whole links, so when the row does run out of room a
    // label moves down intact instead of being hyphenated mid-word.
    display: flex
    flex-wrap: wrap
    column-gap: 25px

    a
      font-size: 16px
      line-height: 30px
      margin-right: 0

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .footer-wrapper
    min-height: 750px
    flex-direction: column
    justify-content: center
    align-items: center
    padding: 0 5%
    // Was 300px, which six different components then subtracted back out with
    // negative bottom margins of -200px to -280px. Because each page picked its
    // own counterweight, the actual gap above the footer ranged from 20px on
    // /Faculty to 340px on /Course. One modest value, applied once, replaces
    // the whole arrangement.
    margin-top: 80px

  .weitere-links-wrapper
    display: flex
    flex-direction: column
    align-items: center
    position: relative
    width: 100%
    max-width: none

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
      // 60px of picture, matching what `height: 130px` used to leave once the
      // border-box padding was taken out of it.
      height: 60px
</style>

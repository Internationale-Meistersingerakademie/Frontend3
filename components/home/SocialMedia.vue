<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="social-media">
    <div class="social-media-wrapper">
      <!-- INSTAGRAM -->
      <section class="social-column instagram">
        <h2 class="insta-fb-title">Instagram</h2>

        <!-- LightWidget ships a companion script that resizes this frame over
             postMessage. That script was never loaded, so the iframe sat at the
             150px HTML default with scrolling disabled and roughly four fifths
             of the feed was unreachable. Rather than add another third-party
             script, the frame is given a definite height here via aspect-ratio:
             the widget is a square-ish grid, so this shows all of it. -->
        <div class="embed-frame">
          <iframe
            src="https://cdn.lightwidget.com/widgets/9fe9954c82765ba4845d27ff1a3df830.html"
            title="Instagram"
            loading="lazy"
            allowtransparency="true"
            class="lightwidget-widget"></iframe>
        </div>

        <a
          href="https://www.instagram.com/intern.meistersingerakademie/"
          class="border-button"
          target="_blank"
          rel="noopener noreferrer">
          {{ $t("home.social.to") }} Instagram
        </a>
      </section>

      <!-- META -->
      <section class="social-column facebook">
        <h2 class="insta-fb-title">Meta</h2>

        <!-- This was a Facebook Social Plugin (<div class="fb-page">), but the
             Facebook JS SDK is not loaded anywhere in the app, so nothing ever
             parsed it and visitors saw only its bare <blockquote> fallback
             link. A self-contained card renders reliably, matches the rest of
             the page, and — on a site with no consent banner — avoids handing
             every visitor's IP to Meta before they have opted in. Re-enabling
             the real timeline is a product decision, not a layout one. -->
        <div class="meta-card">
          <h3>Internationale Meistersinger Akademie</h3>
          <p>{{ $t("home.social.metaLead") }}</p>
        </div>

        <a
          href="https://www.facebook.com/IMA-116394978416192/"
          class="border-button"
          target="_blank"
          rel="noopener noreferrer">
          {{ $t("home.social.to") }} Facebook
        </a>
      </section>
    </div>

    <!-- Previously absolutely positioned so that it straddled the boundary
         between the two columns, and then hidden outright below 1200px — which
         removed the only link to the successes page from every phone. -->
    <NuxtLink :to="localePath('/Network')" class="border-button erfolge-button">
      {{ $t("home.social.successes") }}
    </NuxtLink>
  </div>
</template>

<style lang="sass" scoped>
.social-media
  display: flex
  flex-direction: column
  align-items: center
  padding-bottom: 80px

// No fixed height. This box was 1200px tall while holding 178px of content,
// and everything inside it was positioned against that number rather than
// against the content.
.social-media-wrapper
  width: 100%
  display: flex
  align-items: stretch
  border-top: 1px solid #E9E9E9

.social-column
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  // The columns stretch to match each other, and the Meta card is much shorter
  // than the Instagram grid — left at flex-start that difference showed up as
  // ~405px of dead space under the Meta button. Centring shares it out.
  justify-content: center
  padding: 60px 40px

.instagram
  border-right: 1px solid #E9E9E9

.insta-fb-title
  font-size: 40px
  font-weight: 600
  color: $black
  letter-spacing: 2.22px
  text-transform: uppercase
  text-align: center
  margin-bottom: 40px

// EMBEDS
.embed-frame
  width: 100%
  max-width: 550px

.lightwidget-widget
  width: 100%
  border: 0
  overflow: hidden
  aspect-ratio: 1 / 1

// META CARD
// Same idiom as .news-element on the landing page: tinted fill, left crimson
// rule, one shadow, lift on hover.
.meta-card
  width: 100%
  max-width: 550px
  background-color: #F9F9F9
  border-left: 7px solid $red
  box-shadow: 0 0 20px rgba(#000, 0.08)
  padding: 30px
  transition: all 0.2s ease

  &:hover
    transform: scale(1.01)
    box-shadow: 0 0 40px rgba(#000, 0.1)

  h3
    font-size: 18px
    color: $black
    letter-spacing: 1px
    line-height: 28px
    margin-bottom: 14px

  p
    opacity: 0.7
    font-size: 15px
    color: $black
    letter-spacing: 1px
    line-height: 24px

// BUTTONS
.border-button
  display: inline-block
  margin-top: 40px
  padding: 10px 20px
  border: 3px solid $red
  font-weight: 700
  font-size: 12px
  color: $red
  text-transform: uppercase
  letter-spacing: 0.4px
  text-align: center
  text-decoration: none
  cursor: pointer
  transition: all .5s ease
  background-color: #FFF

  &:hover
    background-color: $red
    color: #FFF

// ERFOLGE DER IMA
.erfolge-button
  margin-top: 60px
  padding: 15px 30px
  font-weight: 600
  letter-spacing: 3px
  background-color: $red
  color: #FFF

  &:hover
    background-color: #FFF
    color: $red

// - - - MOBILE STYLES - - - //
// The stacking order and spacing here used to be produced by a stack of large
// margins (250px, 390px, 130px, -100px) tuned against the 1200px box; with the
// box gone the natural column order is correct on its own.
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .social-media-wrapper
    flex-direction: column

  .social-column
    padding: 50px 20px

  .instagram
    border-right: none
    border-bottom: 1px solid #E9E9E9

  .insta-fb-title
    font-size: 30px
    margin-bottom: 30px
</style>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
<template>
  <div class="social-media">
    <div class="social-media-wrapper">
      <!-- INSTAGRAM -->
      <div class="instagram">
        <h1 class="insta-fb-title">Instagram</h1>
        <div class="insta-grid">
          <!-- LIGHTWIDGET INSTAGRAM -->
            <iframe
              src="https://cdn.lightwidget.com/widgets/9fe9954c82765ba4845d27ff1a3df830.html"
              scrolling="no"
              allowtransparency="true"
              class="lightwidget-widget"
              style="width:100%;border:0;overflow:hidden;"
            ></iframe
            >
        </div>

        <a
          type="button"
          href="https://www.instagram.com/intern.meistersingerakademie/"
          class="border-button"
          target="_system"
        >{{ $t('home.social.to') }} Instagram</a
        >
      </div>

      <!-- FACEBOOK -->
      <div class="facebook">
        <!-- ERFOLGE BUTTON -->
        <NuxtLink :to="localePath('/Network')" class="border-button erfolge-button"
        ><span>{{ $t('home.social.successes') }}</span></NuxtLink
        >

        <h1 class="insta-fb-title">Meta</h1>

        <!-- FACEBOOK PLUGIN -->
        <div
          class="fb-page"
          data-href="https://www.facebook.com/IMA-116394978416192/"
          data-tabs="timeline"
          data-width="650px"
          data-height="800px"
          data-small-header="false"
          data-adapt-container-width="false"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote
            cite="https://www.facebook.com/IMA-116394978416192/"
            class="fb-xfbml-parse-ignore"
          >
            <a href="https://www.facebook.com/IMA-116394978416192/"
            >IMA {{ $t('home.social.on') }} Meta</a
            >
          </blockquote>
        </div>
        <a
          type="button"
          href="https://www.facebook.com/IMA-116394978416192/"
          class="border-button"
          target="_blank"
        >{{ $t('home.social.to') }} Facebook</a
        >
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.social-media-wrapper
  height: 1200px
  width: 100%
  display: flex
  position: relative
  border-top: 1px solid #E9E9E9

.border-button
  padding: 10px 20px
  border: 3px solid $red
  font-weight: 700
  font-size: 12px
  color: $red
  text-transform: uppercase
  letter-spacing: 0.4px
  cursor: pointer
  position: absolute
  bottom: 100px
  text-decoration: none
  transition: all .5s ease
  background-color: #FFF

  &:hover
    background-color: $red
    color: #FFF

.insta-fb-title
  font-size: 40px
  color: $black
  letter-spacing: 2.22px
  text-transform: uppercase
  position: absolute
  top: 80px

//INSTAGRAM
.instagram
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  border-right: 1px solid #E9E9E9

.insta-grid
  width: 550px
  min-width: inherit

//FACEBOOK
.facebook
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  position: relative

.fb-page
  @media screen and (max-width: 1200px)
    transform: scale(0.9)

// EROLFGE DER IMA - BUTTON
.erfolge-button
  display: flex
  justify-content: center
  align-items: center
  position: absolute
  top: -25px
  left: -145px
  width: 280px
  height: 50px
  padding: 0
  font-weight: 600
  background-color: $red
  color: #FFF
  letter-spacing: 3px

  &:hover
    background-color: #FFF
    color: $red
    height: 60px
    width: 290px
    top: -30px
    left: -150px

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .social-media-wrapper
    height: 1200px
    display: flex
    flex-direction: column
    margin-top: -100px

  //INSTAGRAM
  .insta-grid
    width: 300px

    @media screen and (max-width: 1200px)
      width: 350px

  .instagram
    margin-bottom: 50px
    margin-top: 250px

    h1
      position: static
      margin: 0 0 25px 0
      font-size: 30px

    a
      margin-top: 30px

  //FACEBOOK
  .fb-page
    @media screen and (max-width: 1200px)
      transform: scale(0.65)

  .facebook
    margin-top: 390px

    .border-button
      margin-top: -90px
      margin-bottom: 50px

    h1
      position: static
      margin: 130px 0 -100px 0
      font-size: 30px

  // EROLFGE DER IMA - BUTTON
  .erfolge-button
    position: static
    margin-bottom: 20px
    display: none

    &:hover
      background-color: inherit
      color: inherit
      height: inherit
      width: inherit
      top: inherit
      left: inherit

  // BORDER BUTTON
  .border-button
    padding: 10px 20px
    border: 3px solid $red
    font-weight: 700
    font-size: 12px
    color: $red
    text-transform: uppercase
    letter-spacing: 0.4px
    cursor: pointer
    position: static
    bottom: 100px
    text-decoration: none
    transition: all .5s ease
    background-color: #FFF

    &:hover
      background-color: $red
      color: #FFF
</style>

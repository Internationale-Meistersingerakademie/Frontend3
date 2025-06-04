<template>
  <div class="category-header">
    <h1>{{ $t("sponsors.sponsors") }}</h1>
    <div class="sponsoren-wrapper">
      <div class="row">
        <img src="/media/sponsors/sponsor_3.jpg" style="height: 110px" alt="" />
        <img src="/media/sponsors/sponsor_2.png" style="height: 120px" alt="" />
        <img src="/media/sponsors/sponsor_1.png" style="height: 100px" alt="" />
        <img src="/media/sponsors/sponsor_4.png" style="height: 80px" alt="" />
      </div>

      <div class="row">
        <img src="/media/sponsors/sponsor_5.png" style="height: 120px" alt="" />
        <img src="/media/sponsors/sponsor_6.jpg" style="height: 100px" alt="" />
        <img src="/media/sponsors/sponsor_8.jpg" style="height: 110px" alt="" />
        <img src="/media/sponsors/sponsor_10.png" style="height: 90px" alt="" />
      </div>

      <div class="row">
        <img src="/media/sponsors/sponsor_11.png" style="height: 80px" alt="" />
        <img src="/media/sponsors/sponsor_12.png" style="height: 70px" alt="" />
        <img src="/media/sponsors/sponsor_14.png" style="height: 120px" alt="" />
      </div>

      <div class="row">
        <img src="/media/sponsors/sponsor_16.png" style="height: 120px" alt="" />
        <img src="/media/sponsors/sponsor_7.svg" style="height: 70px" alt="" />
        <img src="/media/sponsors/sponsor_20.jpg" style="height: 80px" alt="" />
      </div>

      <div class="row">
        <img src="/media/sponsors/sponsor_22.jpg" style="height: 80px" alt="" />

        <img src="/media/sponsors/sponsor_19.png" alt="" />

        <img src="/media/sponsors/sponsor_21.png" alt="" />

      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>

// CATEGORY HEADER
.category-header
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column

  h1
    font-size: 28px
    font-weight: 600
    color: $black
    letter-spacing: 1px
    margin-bottom: 30px
    z-index: 2
    text-transform: uppercase

.sponsoren-wrapper
  max-width: 1200px
  min-width: 1200px

.row
  margin-bottom: 80px
  display: flex
  justify-content: space-between

  img
    height: 100px

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .category-header
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: column
    margin-bottom: -200px

    h1
      font-size: 23px
      margin-top: 50px

  .sponsoren-wrapper
    max-width: 500px

  .row
    margin-bottom: 0px
    flex-direction: column

    img
      height: 70px
      align-self: center
      margin-bottom: 20px
</style>
<script setup lang="ts">
</script>
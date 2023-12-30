<template>
  <div>
    <NuxtPage/>
  </div>
</template>
<style>

@import url("~/assets/fonts/main.css");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Nunito Sans";
  -webkit-tap-highlight-color: transparent;
}

.site-wrapper {
  overflow: hidden;
}

/* ADD PADDING WHEN SCREEN IS TOO LARGE */
@media screen and (min-width: 1920px) {
  html, body {
    padding: 0 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .site-wrapper {
    width: 90vw;
    max-width: 1900px
  }
}
a {
  color: #c73562;
}
</style>
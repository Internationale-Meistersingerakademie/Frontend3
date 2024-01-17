<script setup lang="ts">
const props = defineProps({
  faculty: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
});

const getPersonsByCategory = (category: string): any => {
  return props.faculty.filter((person: any) => person.category === category);
};
</script>
<template>
  <div class="lehrer-list">
    <div class="list-wrapper">
      <!-- MASTERTEACHERS -->
      <div class="list-category">
        <h1 class="masterteachers-hl" id="meisterlehrer">{{ $t("faculty.categories.masterteachers") }}</h1>
        <div v-for="lehrer in getPersonsByCategory('masterTeacher')" v-bind:key="lehrer.name">
          <div class="lehrer">
            <img :src="lehrer.image" alt="" />
            <h3>
              {{
                lehrer.name.toLowerCase().includes("h.c. mult.")
                  ? lehrer.name.toUpperCase().replace("H.C. MULT.", "h.c. mult.")
                  : lehrer.name.toUpperCase()
              }}
            </h3>
            <h4>{{ lehrer[$i18n.locale].subtitle }}</h4>
            <p>{{ lehrer[$i18n.locale].content }}</p>
          </div>
        </div>
      </div>

      <!-- HEAD COACH -->
      <div class="list-category">
        <h1 class="head-coach-hl" id="korrepetitor">{{ $t("faculty.categories.headCoach") }}</h1>

        <div v-for="lehrer in getPersonsByCategory('headCoach')" v-bind:key="lehrer.name">
          <div class="lehrer">
            <img :src="lehrer.image" alt="" />
            <h3>{{ lehrer.name }}</h3>
            <h4>{{ lehrer[$i18n.locale].subtitle }}</h4>
            <p>{{ lehrer[$i18n.locale].content }}</p>
          </div>
        </div>
      </div>

      <!-- LANGUAGE COACH -->
      <div class="list-category">
        <h1 class="language-coach-hl">{{ $t("faculty.categories.coaching") }}</h1>

        <div v-for="lehrer in getPersonsByCategory('languageCoach')" v-bind:key="lehrer.name">
          <div class="lehrer">
            <img :src="lehrer.image" alt="" />
            <h3>{{ lehrer.name }}</h3>
            <h4>{{ lehrer[$i18n.locale].subtitle }}</h4>
            <p>{{ lehrer[$i18n.locale].content }}</p>
          </div>
        </div>
      </div>

      <!-- PINANISTS -->
      <div class="list-category">
        <h1 class="pianists-hl">{{ $t("faculty.categories.pianists") }}</h1>

        <div v-for="lehrer in getPersonsByCategory('pianist')" v-bind:key="lehrer.name">
          <div class="lehrer">
            <img :src="lehrer.image" alt="" />
            <h3>{{ lehrer.name }}</h3>
            <h4>{{ lehrer[$i18n.locale].subtitle }}</h4>
            <p>{{ lehrer[$i18n.locale].content }}</p>
          </div>
        </div>
      </div>

      <!-- MAKE-UP MASTERCLASS -->
      <div class="list-category">
        <h1 class="makeup-hl" id="makup">{{ $t("faculty.categories.makeupArtist") }}</h1>

        <div v-for="lehrer in getPersonsByCategory('makeup')" v-bind:key="lehrer.name">
          <div class="lehrer">
            <img :src="lehrer.image" alt="" />
            <h3>{{ lehrer.name }}</h3>
            <h4>{{ lehrer[$i18n.locale].subtitle }}</h4>
            <p>{{ lehrer[$i18n.locale].content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>

.lehrer-list
  display: flex
  justify-content: center
  padding-left: 60px
  margin-bottom: 30px

.list-wrapper
  width: 70%
  max-width: 1000px

.list-category
  h1
    font-size: 28px
    font-weight: 600
    color: $black
    letter-spacing: 1px
    margin: 70px 0 30px 0

.lehrer
  width: 100%
  background-color: #FFF
  position: relative
  padding: 25px 35px 25px 100px
  box-shadow: 0 0 30px 0 rgba(#000, 0.15)
  margin-bottom: 50px

  img
    position: absolute
    height: 120px
    width: 120px
    left: -60px
    top: 30px

  h3
    font-size: 16px
    color: $black
    letter-spacing: 1px
    font-weight: 600
    margin-bottom: 5px

  h4
    opacity: 0.7
    font-size: 14px
    color: $black
    letter-spacing: 1px
    font-weight: 600
    margin-bottom: 20px

  p
    max-width: 990px
    opacity: 0.7
    font-size: 15px
    color: $black
    text-align: justify
    line-height: 23px

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .lehrer-list
    padding-left: 0
    margin-bottom: -280px

  .list-wrapper
    width: 100%

  .lehrer
    width: 100%
    padding: 25px 35px 25px 35px
    margin-bottom: 80px

    img
      max-height: 20vw
      max-width: 20vw
      left: 72%
      top: -20px

    h3
      max-width: 180px
      line-height: 25px

    h4
      max-width: 200px

    p
      font-size: 13px

  .list-category
    h1
      font-size: 23px
      margin-left: 30px
      max-width: 200px
</style>

<script setup lang="ts">
const { $getElementByTitle } = useNuxtApp();
const localePath = useLocalePath();

const props = defineProps({
  text: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
  list: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
  auditions: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
  dates:{
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  }
});

// `audition_deadlines_text.content` is a single CMS text field that editors
// have filled with the whole audition tour — five stops, each with a city, a
// date and an application deadline, separated by "--" and/or newlines. It used
// to be dropped into one <h2> styled for a short line ("01. Juli - 04. August
// 2027"), so HTML collapsed the newlines and it rendered as a wall of red
// uppercase. Parsing it back into rows lets it be typeset as the list it is.
//
// Every step degrades: text that matches nothing still renders, just as one
// plain row, so an editor changing the format can never blank the section.
const auditionDeadlines = computed(() => {
  const raw = $getElementByTitle("audition_deadlines_text", props.text).content;
  if (typeof raw !== "string") return { heading: "", rows: [], text: "" };

  const parts = raw
    .split(/--|\r?\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (!parts.length) return { heading: "", rows: [], text: "" };

  // A leading label such as "Auditions IMA 2027:" carries no date of its own.
  const heading = /:\s*$/.test(parts[0]) ? parts.shift()!.replace(/:\s*$/, "") : "";

  // "New York: 17./18. Oktober 2026" -> place + date, on the first colon only,
  // so a city that carries no date still comes back as a usable place.
  const splitPlace = (head: string) => {
    const colon = head.indexOf(":");
    return colon === -1
      ? { place: head.trim(), date: "" }
      : { place: head.slice(0, colon).trim(), date: head.slice(colon + 1).trim() };
  };

  const rows = parts.map((row) => {
    // "New York: 17./18. Oktober 2026 - Application deadline: Sept 24"
    const full = row.match(/^(.*?)\s*[-–]\s*((?:application\s+)?deadline)\s*:\s*(.*)$/i);
    if (full) return { ...splitPlace(full[1]), label: full[2], deadline: full[3].trim(), key: row };

    // "Video Deadline: 06. Januar 2027" — a deadline with no date beside it.
    // Its label goes in the place column rather than the deadline one, so the
    // row still fills the table left-to-right like every other row instead of
    // leaving the first two columns blank.
    const bare = row.match(/^(.*?deadline)\s*:\s*(.*)$/i);
    if (bare) return { place: bare[1].trim(), date: "", label: "", deadline: bare[2].trim(), key: row };

    return { ...splitPlace(row), label: "", deadline: "", key: row };
  });

  // The table is only earned, never assumed. This is one free-text CMS field:
  // an editor can reword it, drop the "--" separators, or repurpose it
  // entirely for an announcement, and none of that should end up typeset as a
  // table of one-cell rows. Two independent rows have to actually carry a
  // parsed deadline, and they have to be at least half of what is there, or
  // the whole thing falls back to being rendered as the prose it evidently is.
  const parsed = rows.filter((row) => row.deadline).length;
  if (parsed < 2 || parsed < rows.length / 2) {
    // `raw`, not the parts: the fallback shows exactly what the editor typed,
    // including any leading line the heading rule would otherwise have eaten.
    return { heading: "", rows: [], text: raw.trim() };
  }

  return { heading, rows, text: "" };
});
</script>

<template>
  <div class="vorsingen">
    <div class="vorsingen-wrapper">
      <!-- VORSINGEN TITLE -->
      <h1>
        {{ $getElementByTitle("audition_deadlines_text", props.text).title }}
      </h1>
      <h3>
        {{ $getElementByTitle("audition_deadlines_text", props.text).subtitle }}
      </h3>
      <h3 class="neumarkt_angabe">NEUMARKT i.d.OPf., Germany</h3>
      <!-- AUDITION DEADLINES -->
      <div class="audition-deadlines" v-if="auditionDeadlines.rows.length">
        <h2 v-if="auditionDeadlines.heading">{{ auditionDeadlines.heading }}</h2>
        <!-- A real table: the columns are what needs to line up, and cells
             align on their baselines and size to the widest entry without any
             of it being restated in CSS. -->
        <table class="deadline-table">
          <tbody>
            <tr v-for="row in auditionDeadlines.rows" v-bind:key="row.key">
              <td class="deadline-place">{{ row.place }}</td>
              <td class="deadline-date" :class="{ 'is-blank': !row.date }">{{ row.date }}</td>
              <td class="deadline-due" :class="{ 'is-blank': !row.deadline }">
                <template v-if="row.deadline">
                  <span class="deadline-label" v-if="row.label">{{ row.label }}:</span>
                  <strong>{{ row.deadline }}</strong>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Whatever the field holds when it is not an audition table: an
           announcement, a reworded tour, a single date. Red and prominent as
           before, but typeset to survive any length. -->
      <h2 class="audition-note" v-else-if="auditionDeadlines.text">{{ auditionDeadlines.text }}</h2>
      <p class="special-information">
        {{ $getElementByTitle("audition_text", props.text).content }}
      </p>
      <!-- VORSINGEN ELEMENTE -->
      <div class="vorsingen-elements-wrapper" v-if="auditions.length">
        <div class="vorsingen-element" v-for="audition in auditions" v-bind:key="$loc(audition).location">
          <h4 class="location">{{ $loc(audition).location }}</h4>
          <h4 class="date">{{ $loc(audition).date }}</h4>
          <h4 class="deadline">
            Deadline:
            <span>{{
              new Date($loc(audition).deadline).toLocaleDateString($i18n.locale, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}</span>
          </h4>
        </div>
      </div>
      <!-- ANMELDEN BUTTON -->
      <NuxtLink :to="localePath('/Application')" v-if="auditions.length">
        <button type="button" name="button" class="border-button">
          {{ $t("home.vorsingen.apply") }}
        </button>
      </NuxtLink>

      <!-- TERMINE ELEMENTE -->
      <div class="vorsingen-elements-wrapper" v-if="dates.length">
        <div class="vorsingen-element" v-for="date in dates" v-bind:key="$loc(date).location">
          <h4 class="location">{{ $loc(date).location }}</h4>
          <h4 class="date">{{ $loc(date).text }}</h4>
          <h4 class="deadline">
            {{$t("home.vorsingen.date") }}:
            <span>{{
                new Date($loc(date).date).toLocaleDateString($i18n.locale, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}</span>
          </h4>
        </div>
      </div>
      <!-- ANMELDEN BUTTON -->
      <NuxtLink to="https://www.neumarkt.de/kultur-stadtinfo/veranstaltungen-und-feste/internationale-meistersinger-akademie/" v-if="dates.length" target="_blank">
        <button type="button" name="button" class="border-button">
          {{ $t("home.vorsingen.tickets") }}
        </button>
      </NuxtLink>

      <!-- IMA AUF EINEN BLICK -->
      <div class="blick-wrapper">
        <h5>{{ $t("home.vorsingen.glance") }}</h5>
        <div>
          <NuxtLink :to="localePath('/Network#gaeste')">
            {{ $t("home.vorsingen.glanceContent.0") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Course#veranstaltungen')">
            {{ $t("home.vorsingen.glanceContent.1") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Course#veranstaltungen')">
            {{ $t("home.vorsingen.glanceContent.2") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Faculty#meisterlehrer')">
            {{ $t("home.vorsingen.glanceContent.3") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Faculty#korrepetitor')">
            {{ $t("home.vorsingen.glanceContent.4") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Course')">
            {{ $t("home.vorsingen.glanceContent.5") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Media')">
            {{ $t("home.vorsingen.glanceContent.6") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Network#engagements')">
            {{ $t("home.vorsingen.glanceContent.7") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Faculty#makup')">
            {{ $t("home.vorsingen.glanceContent.8") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/Course')">
            {{ $t("home.vorsingen.glanceContent.9") }}
          </NuxtLink>
        </div>
      </div>

      <img src="/media/home/video_curve.png" alt="" class="video-curve" />
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.vorsingen-wrapper
  min-height: 830px
  width: 100%
  background-color: #FFF
  display: flex
  flex-direction: column
  justify-content: space-around
  align-items: center
  box-shadow: 0 -10px 20px 0 rgba(0, 0, 0, 0.03)
  position: relative

  h1, h2, h3
    text-transform: uppercase

  h1
    font-size: 28px
    color: $black
    letter-spacing: 1.56px
    margin-top: 40px

  h3
    opacity: 0.44
    font-size: 22px
    color: $black
    letter-spacing: 1.22px
    margin-top: -27px
    margin-bottom: -7px

  h2
    font-size: 22px
    color: $red
    letter-spacing: 1.11px

  .neumarkt_angabe
    font-size: 19px
    text-transform: none
    margin-bottom: 0

.video-curve
  position: absolute
  bottom: -30px
  z-index: -1

.vorsingen-elements-wrapper
  display: flex
  justify-content: space-between
  width: 80%

  @media screen and (max-width: 1570px)
    width: 100%
    transform: scale(0.8)

  h4
    letter-spacing: 0.94px
    font-size: 20px
    color: $black
    margin-bottom: 7px

.location
  opacity: 0.6

  &:before
    content: ""
    display: block
    height: 1px
    background-color: $black
    opacity: 0.2
    margin-bottom: 15px

.deadline
  opacity: 1
  font-weight: 600

  span
    color: $red
    opacity: 1

// AUDITION DEADLINES
// The heading keeps the red uppercase treatment the old <h2> had — it finally
// gets to be the short line that styling was drawn for. The tour itself is a
// list, so it is typeset as one: a quiet rule between rows, the city carrying
// the weight, and the red reserved for the date that actually has a cut-off.
.audition-deadlines
  display: flex
  flex-direction: column
  align-items: center
  width: 100%

.deadline-table
  width: 100%
  max-width: 620px
  margin-top: 20px
  border-collapse: collapse
  text-align: left

  td
    padding: 13px 16px 13px 0
    border-top: 1px solid rgba(0, 0, 0, 0.1)
    // Cells of three different sizes sit on one line, so they align on their
    // baselines rather than their boxes.
    vertical-align: baseline

    &:last-child
      padding-right: 0

  tr:last-child td
    border-bottom: 1px solid rgba(0, 0, 0, 0.1)

.deadline-place
  font-size: 17px
  font-weight: 600
  letter-spacing: 0.9px
  color: $black
  white-space: nowrap

// All the slack goes to the middle column, which keeps the city and the
// deadline hugging their own content and pins the deadline to the right rule.
.deadline-date
  width: 100%
  font-size: 16px
  letter-spacing: 0.5px
  color: $black
  opacity: 0.7

.deadline-due
  font-size: 14px
  letter-spacing: 0.5px
  color: $black
  white-space: nowrap
  text-align: right

  .deadline-label
    opacity: 0.6
    // Vue condenses the newline between this span and the <strong>, so the
    // gap after the colon has to be a real one.
    margin-right: 5px

  strong
    color: $red
    font-weight: 600

// Not uppercase, unlike the section's other headings: this one holds whatever
// the field turns out to contain, and `pre-line` keeps the editor's own line
// breaks rather than collapsing everything into one block. Qualified by the
// wrapper because `.vorsingen-wrapper h1, h2, h3` sets the uppercase and would
// otherwise outrank a lone class.
.vorsingen-wrapper .audition-note
  max-width: 620px
  margin-top: 4px
  text-align: center
  text-transform: none
  white-space: pre-line
  line-height: 1.6

.special-information
  text-align: center
  max-width: 750px

.border-button
  padding: 10px 20px
  border: 3px solid $red
  font-size: 12px
  font-weight: 700
  color: $red
  text-transform: uppercase
  letter-spacing: 0.4px
  cursor: pointer
  transition: all .5s ease
  background-color: #FFF
  position: relative
  z-index: 1

  &:hover
    background-color: $red
    color: #FFF

  &:hover:after
    opacity: 0.6
    right: -260px

  &:focus:after
    opacity: 0.6
    right: -260px

  &:after
    content: "Video-only application possible"
    display: flex
    opacity: 0
    padding: 5px
    justify-content: center
    align-items: center
    width: 250px
    height: 40px
    color: $black
    position: absolute
    right: -240px
    top: -6px
    transition: all 0.5s ease
    z-index: 0

.border-button-live
  padding: 10px 20px
  border: 3px solid $red
  font-size: 12px
  font-weight: 700
  color: $red
  text-transform: uppercase
  letter-spacing: 0.4px
  cursor: pointer
  transition: all .5s ease
  background-color: #FFF
  position: relative
  z-index: 1

  &:hover
    background-color: $red
    color: #FFF

  &:hover:after
    opacity: 0.6
    right: -260px

  &:focus:after
    opacity: 0.6
    right: -260px

  &:after
    content: "on YouTube"
    display: flex
    opacity: 0
    padding: 5px
    justify-content: center
    align-items: center
    width: 250px
    height: 40px
    color: $black
    position: absolute
    right: -240px
    top: -6px
    transition: all 0.5s ease
    z-index: 0

.blick-wrapper
  display: flex
  flex-direction: column
  align-items: center
  margin-bottom: -10px

  h5
    font-size: 17px
    color: $black
    letter-spacing: 1px
    margin-bottom: 10px
    text-transform: uppercase

  div
    width: 90%
    text-align: center

    a
      position: relative
      margin-left: 10px
      line-height: 30px
      opacity: 0.8
      font-size: 17px
      color: $black
      letter-spacing: 0.67px
      text-decoration: none

      &:hover
        color: #999
        text-decoration: underline
        cursor: pointer

.with_dot
  &:after
    content: ""
    display: block
    height: 6px
    width: 6px
    background-color: black
    border-radius: 100px
    position: absolute
    right: -14px
    top: 10px

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
  .vorsingen-elements-wrapper
    flex-direction: column
    justify-content: space-between
    // Separates the list from the red deadline paragraph above it. Nothing
    // held these apart before except the slack the 1550px box was handing out,
    // and the list is empty out of season, so the gap has to be its own.
    margin-top: 30px

  .vorsingen-element
    margin-bottom: 30px

  .vorsingen-wrapper
    // Was min-height: 1550px, holding ~690px of content. `space-around` then
    // shared the ~860px of slack out between the headings, so the title, the
    // dates and the location each floated on their own screenful of white.
    // Sized to content instead, with the rhythm set by explicit margins below.
    min-height: auto
    margin-top: 0px
    padding-bottom: 60px

    h1
      font-size: 20px
      color: $black
      max-width: 350px
      letter-spacing: 1px
      margin-top: 40px
      text-align: center

    h3
      opacity: 0.44
      font-size: 15px
      color: $black
      letter-spacing: 1.22px
      margin-top: 0px
      // The desktop -7px pulls the location line up into the date line once
      // the slack above is gone.
      margin-bottom: 6px

    h2
      font-size: 15px
      color: $red
      letter-spacing: 1.11px
      margin-top: 24px

  .neumarkt_angabe
    font-size: 19px
    text-transform: none

  // AUDITION DEADLINES
  // Down to a tablet the three columns still fit; only the type steps down.
  // `white-space` is deliberately NOT relaxed here — the slack in this table
  // is claimed by the date column, so letting the city or the deadline wrap
  // collapses them to their minimum word width (a 25px city column and rows
  // 375px tall). The narrow breakpoint below stacks instead.
  .deadline-table
    // Matches the 90% the "auf einen Blick" list uses, so the table sits in
    // the same gutter as the rest of the section instead of edge to edge.
    max-width: 90%
    margin-top: 16px

    td
      padding: 11px 12px 11px 0

  .deadline-place
    font-size: 15px
    letter-spacing: 0.5px

  .deadline-date
    font-size: 14px

  .deadline-due
    font-size: 13px

// - - - NARROW STACKED ROWS - - - //
// Three columns stop fitting once "Application deadline: December 16" can no
// longer sit beside the date — on a phone the deadline column collapses to the
// width of the word "Application". Below this width each row stacks, which
// also puts every line on one shared left edge instead of three ragged ones.
@media only screen and (max-width: 600px)
  .deadline-table
    max-width: 90%

    tr
      display: block
      padding: 13px 0
      border-top: 1px solid rgba(0, 0, 0, 0.1)

      &:last-child
        border-bottom: 1px solid rgba(0, 0, 0, 0.1)

    td
      display: block
      padding: 0
      border: none
      text-align: left
      white-space: normal

    // The video-deadline row carries no date of its own; as a block that cell
    // would still take a line.
    .is-blank
      display: none

  .deadline-place
    font-size: 15px

  .deadline-date
    font-size: 14px
    margin-top: 3px

  .deadline-due
    font-size: 13px
    margin-top: 7px
    text-align: left

  .vorsingen-wrapper .audition-note
    // Same gutter as `.special-information`, the other free-text block here.
    max-width: 80%
    line-height: 1.7

  .special-information
    text-align: center
    max-width: 80%
    font-size: 13px
    margin-top: 24px

  .border-button
    margin-bottom: 20px
    margin-top: 0px

  .border-button-live
    margin-bottom: 20px
    margin-top: 0px

  .blick-wrapper
    display: flex
    flex-direction: column
    align-items: center
    margin-top: 40px

    h5
      font-size: 16px
      color: $black
      letter-spacing: 1px
      margin-bottom: 10px
      text-transform: uppercase

    div
      width: 90%
      text-align: center

      a
        position: relative
        margin-left: 10px
        line-height: 28px
        opacity: 0.8
        font-size: 14px
        color: $black
        letter-spacing: 0.67px

        &:hover
          color: #999
          text-decoration: underline
          cursor: pointer
</style>

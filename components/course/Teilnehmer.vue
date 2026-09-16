<script setup lang="ts">
const { $getElementByTitle } = useNuxtApp();
const localePath = useLocalePath();

// Define your props here
const props = defineProps({
  text: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
  auditions: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
});

const participantsTitle = $getElementByTitle("participants", props.text).title;
const participantsSubtitle = $getElementByTitle("participants", props.text).subtitle;
const participantsContent = $getElementByTitle("participants", props.text).content;
const auditionDeadlinesTextTitle = $getElementByTitle("audition_deadlines_text", props.text).title;
const auditionDeadlinesTextSubtitle = $getElementByTitle("audition_deadlines_text", props.text).subtitle;
const auditionDeadlinesTextContent = $getElementByTitle("audition_deadlines_text", props.text).content;
const auditionTextContent = $getElementByTitle("audition_text", props.text).content;
</script>

<template>
  <div class="teilnehmer">
    <div class="left">
      <h1>{{ participantsTitle }}</h1>
      <h2>{{ participantsSubtitle }}</h2>
      <div>
        <p>
          {{ participantsContent }}
        </p>
      </div>
    </div>
    <div class="right">
      <h1 v-if="auditionDeadlinesTextTitle">
        {{ auditionDeadlinesTextTitle }}
      </h1>
      <h3 v-if="auditionDeadlinesTextSubtitle">
        {{ auditionDeadlinesTextSubtitle }}
      </h3>
      <!-- The location label belongs to the deadline block above it: it is a
           caption for those dates, not a standalone statement, so it renders
           only when that block has something to caption. -->
      <h3 class="neumarkt_angabe" v-if="auditionDeadlinesTextContent || auditions.length">NEUMARKT i.d.OPf.</h3>
      <h2 v-if="auditionDeadlinesTextContent">
        {{ auditionDeadlinesTextContent }}
      </h2>
      <p class="special-information" v-if="auditionTextContent">
        {{ auditionTextContent }}
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
      <NuxtLink :to="localePath('/Application')">
        <button type="button" name="button" class="border-button">
          {{ $t("home.vorsingen.apply") }}
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="sass" scoped>

// TEILNEHMER
// min-height, not height: the columns are filled from the CMS and both of them
// grow with the text an editor supplies. A fixed height clipped the longer one.
.teilnehmer
	// No floor at all. 950px was chosen for a right-hand column that the CMS no
	// longer fills, so the min-height held open 837px of blank space that the
	// v-if guards had just emptied. Padding gives the section its breathing
	// room; the taller column gives it its height.
	width: 100%
	display: flex
	padding: 80px 0
	background-color: #FFF
	box-shadow: 0 -10px 20px 0 rgba(#000, 0.05)

.left
	flex: 1
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	position: relative

	// Seperator — inset from the top and bottom rather than given a fixed
	// height, so it tracks the column instead of assuming a 950 px box.
	&:after
		content: ""
		display: block
		width: 3px
		position: absolute
		top: 15%
		bottom: 15%
		right: 0
		background-color: $black
		opacity: 0.1

	h1
		margin-bottom: 10px
		font-size: 28px
		color: $black
		letter-spacing: 1px

	h2
		opacity: 0.4
		font-size: 22px
		color: $black
		letter-spacing: 1px

	div
		margin-top: 30px
		// The 50px side padding is added on top of a child that is already
		// width-constrained, so at 390px the padding box overhung the column by
		// 11px. Capping the pair keeps the inset without the overhang.
		padding: 0 50px
		max-width: 100%

	p
		text-align: justify
		margin-bottom: 20px
		opacity: 0.6
		font-size: 15px
		color: $black
		letter-spacing: 1px
		line-height: 24px
		max-width: 500px

// VORSINGEN
.right
	background-color: #FFF
	flex: 1
	display: flex
	flex-direction: column
	align-items: center
	// The column stretches to match the (much longer) participants text beside
	// it. With its content anchored to the top, the CMS's currently-empty
	// audition fields left the slack as one gap at the bottom; centring turns
	// that into balanced margins around the call to action.
	justify-content: center

	h1, h2, h3
		text-transform: uppercase
		text-align: center

	h1
		font-size: 28px
		color: $black
		letter-spacing: 1.56px
		margin-top: 40px
		max-width: 450px
		margin: 70px auto 20px auto

	h3
		opacity: 0.4
		font-size: 19px
		color: $black
		letter-spacing: 1.22px
		margin-bottom: 20px

	h2
		font-size: 18px
		color: $red
		letter-spacing: 1px

	.neumarkt_angabe
		font-size: 18px
		text-transform: none


.special-information
	text-align: center
	font-size: 14px
	max-width: 570px
	margin-top: 20px
	margin-bottom: -15px

// VORSINGEN ELEMENTE
.vorsingen-elements-wrapper
	display: flex
	flex-direction: column
	justify-content: space-between
	transform: scale(0.8)
	margin-top: 10px

	@media screen and (max-width: 1570px)
		width: 100%
		transform: scale(0.8)
		justify-content: column

	@media screen and (max-width: 1540px)
		width: 100%
		transform: scale(0.8)
		margin-top: 0
		justify-content: column

	h4
		letter-spacing: 0.94px
		font-size: 17px
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

.vorsingen-element
	margin: 10px
	margin-right: 30px

	@media screen and (max-width: 1540px)
		margin-bottom: 20px

.vorsingen-elements-top
	display: flex
	justify-content: space-between
	margin-bottom: 20px
	width: 100%

	@media screen and (max-width: 1540px)
		flex-direction: column
		align-items: center
		margin-bottom: 0

.vorsingen-elements-bottom
	display: flex
	justify-content: center

// ANMELDEN BUTTON
.border-button
	padding: 10px 20px
	margin-top: 30px
	border: 3px solid $red
	font-weight: 700
	font-size: 12px
	color: $red
	text-transform: uppercase
	letter-spacing: 0.4px
	cursor: pointer
	transition: all .5s ease
	background-color: #FFF
	position: relative

	@media screen and (max-width: 1540px)
		margin-top: -15px

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
		content: "Videoanmeldung ist möglich"
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
	margin-top: 30px
	border: 3px solid $red
	font-weight: 700
	font-size: 12px
	color: $red
	text-transform: uppercase
	letter-spacing: 0.4px
	cursor: pointer
	transition: all .5s ease
	background-color: #FFF
	position: relative

	@media screen and (max-width: 1540px)
		margin-top: -15px

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
		content: "auf YouTube"
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

// - - - MOBILE STYLES - - - //
@media only screen and (min-width: 50px) and (max-width: 1200px)
	.teilnehmer
		min-height: 0
		flex-direction: column

	.special-information
		max-width: 80%
		font-size: 13px

	.left
		flex: none

		// The separator divides two side-by-side columns; once they stack it is
		// just a stray vertical rule against the screen edge.
		&:after
			display: none

		h1
			font-size: 25px
			margin-top: 40px

		h2
			font-size: 16px

		p
			width: 80vw

	.right
		flex: none

		h1
			font-size: 22px
			margin-top: 30px

		h3
			font-size: 15px

		h2
			font-size: 15px

	// A 250px tooltip anchored 260px to the right of its button has nowhere to
	// go on a phone — it lands entirely outside the viewport. (It is also a
	// hardcoded German string on an eight-locale site, so it needs moving into
	// i18n before it can be shown more widely than this.)
	.border-button,
	.border-button-live
		&:after
			display: none
</style>

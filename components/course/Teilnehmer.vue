<script setup lang="ts">
const { $getElementByTitle } = useNuxtApp()
const localePath = useLocalePath()

// Define your props here
const props = defineProps({
  text: { type: Array<Record<string, any>>, required: true },
  auditions: {type: Array<Record<string, any>>, required: true}
})

const participantsTitle = $getElementByTitle("participants", props.text).title
const participantsSubtitle = $getElementByTitle("participants", props.text).subtitle
const participantsContent = $getElementByTitle("participants", props.text).content
const auditionDeadlinesTextTitle = $getElementByTitle("audition_deadlines_text", props.text).title
const auditionDeadlinesTextSubtitle = $getElementByTitle("audition_deadlines_text", props.text).subtitle
const auditionDeadlinesTextContent = $getElementByTitle("audition_deadlines_text", props.text).content
const auditionTextContent = $getElementByTitle("audition_text", props.text).content
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
      <h1>
        {{ auditionDeadlinesTextTitle }}
      </h1>
      <h3>
        {{ auditionDeadlinesTextSubtitle }}
      </h3>
      <h3 class="neumarkt_angabe">
        NEUMARKT i.d.OPf.
      </h3>
      <h2>
        {{ auditionDeadlinesTextContent }}
      </h2>
      <p class="special-information">
        {{ auditionTextContent }}
      </p>

      <!-- VORSINGEN ELEMENTE -->
      <div class="vorsingen-elements-wrapper">
        <div
          class="vorsingen-element"
          v-for="audition in auditions"
          v-bind:key="audition[$i18n.locale].location"
        >
          <h4 class="location">{{ audition[$i18n.locale].location }}</h4>
          <h4 class="date">{{ audition[$i18n.locale].date }}</h4>
          <h4 class="deadline">
            Deadline:
            <span>{{ new Date(audition[$i18n.locale].deadline).toLocaleDateString($i18n.locale,  {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            }) }}</span>
          </h4>
        </div>
      </div>
      <!-- ANMELDEN BUTTON -->
      <NuxtLink :to="localePath('/Application')">
        <button type="button" name="button" class="border-button">
          {{ $t('home.vorsingen.apply') }}
        </button>
      </NuxtLink>

		</div>
	</div>
</template>

<style lang="sass" scoped>

// TEILNEHMER
.teilnehmer
	height: 950px
	width: 100%
	display: flex
	background-color: #FFF
	box-shadow: 0 -10px 20px 0 rgba(#000, 0.05)

.left
	flex: 1
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	position: relative

	// Seperator
	&:after
		content: ""
		display: block
		width: 3px
		height: 300px
		position: absolute
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
		padding: 0 50px

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
		height: 1800px
		flex-direction: column

	.special-information
		max-width: 80%
		font-size: 13px

	.left
		flex: none

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
</style>

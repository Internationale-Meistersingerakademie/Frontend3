<script setup lang="ts">
/**
 * Concert photo gallery — one instance per year on the Media page.
 *
 * Design notes, because the constraints drove most of the decisions:
 *
 * - The source photographs are ~640x427. The previous layout painted them at
 *   595px wide, i.e. essentially 1:1, so they looked soft and had nowhere to go
 *   on a retina display. This lays them out at a FIXED HEIGHT with natural
 *   width instead — a contact-sheet filmstrip. Downscaling to 340px tall makes
 *   them visibly crisper, and it reads as an archive rather than a widget.
 *
 * - Natural widths also mean NO object-fit cropping. Mixed portrait/landscape
 *   sets sit together honestly, and the varied widths supply the asymmetric
 *   rhythm that a uniform grid of slides never had.
 *
 * - Because slide widths differ, "scroll by one slide" cannot be a fixed pixel
 *   step; every scroll action resolves against real element geometry.
 *
 * - No per-slide captions. Every image in a year currently shares one alt
 *   string ("Konzert in Ottobeuren 2026"), so captioning each frame would print
 *   the same sentence six times. The alt text stays as the accessible name and
 *   is shown in the lightbox, where it is singular and useful.
 */

interface GalleryImage {
  link: string
  alt?: string
}

const props = defineProps<{
  images: GalleryImage[]
  year: number | string
}>()

const track = ref<HTMLElement | null>(null)
const lightbox = ref<HTMLDialogElement | null>(null)

// Proportional thumb rather than a 0->1 fill. A fill is empty at rest, which
// left the gallery opening with no crimson in it at all, and it only encodes
// position. A thumb sized to clientWidth/scrollWidth also communicates how much
// of the strip is currently in view — the same information a scrollbar gives,
// in the page's own visual language.
const thumb = ref({ width: 100, left: 0 })
const current = ref(0) // index nearest the viewport centre
const scrollable = ref(false) // false => hide controls entirely
const activeIndex = ref(0) // lightbox selection

const total = computed(() => props.images.length)
const pad = (n: number) => String(n).padStart(2, '0')

/** Index of the slide closest to the centre of the visible track. */
function nearestIndex(): number {
  const el = track.value
  if (!el) return 0
  const slides = Array.from(el.children) as HTMLElement[]
  const centre = el.scrollLeft + el.clientWidth / 2
  let best = 0
  let bestDist = Number.POSITIVE_INFINITY
  slides.forEach((slide, i) => {
    const d = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - centre)
    if (d < bestDist) {
      bestDist = d
      best = i
    }
  })
  return best
}

function measure() {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  // 2px tolerance: sub-pixel layout can leave a phantom pixel of scroll.
  scrollable.value = max > 2

  // Floor the thumb at 10% so it never shrinks to an invisible sliver on a very
  // long strip, and clamp its offset so it cannot overhang the right end.
  const width = Math.max(10, (el.clientWidth / el.scrollWidth) * 100)
  const left = max > 0 ? (el.scrollLeft / max) * (100 - width) : 0
  thumb.value = { width, left: Math.min(Math.max(left, 0), 100 - width) }

  current.value = nearestIndex()
}

/** Move one frame in either direction, resolved against real slide positions. */
function step(direction: -1 | 1) {
  const el = track.value
  if (!el) return
  const slides = Array.from(el.children) as HTMLElement[]
  const next = Math.min(Math.max(nearestIndex() + direction, 0), slides.length - 1)
  el.scrollTo({ left: slides[next].offsetLeft, behavior: 'smooth' })
}

function openLightbox(i: number) {
  activeIndex.value = i
  lightbox.value?.showModal()
}

function navigate(direction: -1 | 1) {
  if (!total.value) return
  activeIndex.value = (activeIndex.value + direction + total.value) % total.value
}

/**
 * Close when the dark surround is clicked. The dialog now fills the viewport,
 * so a click landing on the element itself (rather than bubbling up from the
 * panel or a control) means the user clicked outside the photograph.
 */
function onBackdropClick(e: MouseEvent) {
  if (e.target === lightbox.value) lightbox.value?.close()
}

/** <dialog> gives Esc and focus trapping for free; only arrows need wiring. */
function onDialogKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    navigate(1)
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    navigate(-1)
  }
}

let observer: ResizeObserver | null = null

onMounted(() => {
  measure()
  // Widths depend on decoded image dimensions, so re-measure as they arrive.
  if (typeof ResizeObserver !== 'undefined' && track.value) {
    observer = new ResizeObserver(measure)
    observer.observe(track.value)
  }
  window.addEventListener('resize', measure)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('resize', measure)
})
</script>

<template>
  <section v-if="images && images.length" class="gallery" :aria-label="`Bildergalerie ${year}`">
    <!-- Index rail: counter, progress, controls. Sits above the frames so the
         controls never cover photography. -->
    <div class="gallery-head">
      <p class="gallery-count">
        <span class="gallery-count-current">{{ pad(current + 1) }}</span>
        <span class="gallery-count-sep">/</span>
        <span class="gallery-count-total">{{ pad(total) }}</span>
      </p>

      <div class="gallery-rule" aria-hidden="true">
        <span :style="{ width: `${thumb.width}%`, left: `${thumb.left}%` }" />
      </div>

      <div v-if="scrollable" class="gallery-nav">
        <button
          type="button"
          class="gallery-arrow"
          :disabled="current === 0"
          aria-label="Vorheriges Bild"
          @click="step(-1)">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 4 L7 12 L15 20" />
          </svg>
        </button>
        <button
          type="button"
          class="gallery-arrow"
          :disabled="current >= total - 1"
          aria-label="Nächstes Bild"
          @click="step(1)">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 4 L17 12 L9 20" />
          </svg>
        </button>
      </div>
    </div>

    <ul
      ref="track"
      class="gallery-track"
      tabindex="0"
      role="region"
      :aria-label="`Bildergalerie ${year}, ${total} Bilder`"
      @scroll.passive="measure">
      <li v-for="(image, i) in images" :key="image.link" class="gallery-frame">
        <button type="button" class="gallery-open" @click="openLightbox(i)">
          <img
            :src="image.link"
            :alt="image.alt || `Bild ${i + 1} von ${total}, ${year}`"
            loading="lazy"
            decoding="async"
            @load="measure" />
          <span class="gallery-frame-index" aria-hidden="true">{{ pad(i + 1) }}</span>
        </button>
      </li>
    </ul>

    <!-- Native dialog: Esc, focus trap and inertness come for free. -->
    <dialog
      ref="lightbox"
      class="gallery-lightbox"
      @keydown="onDialogKey"
      @click="onBackdropClick">
      <div v-if="images[activeIndex]" class="lightbox-inner">
        <img :src="images[activeIndex].link" :alt="images[activeIndex].alt || ''" />
        <div class="lightbox-bar">
          <p class="lightbox-caption">{{ images[activeIndex].alt }}</p>
          <p class="lightbox-count">{{ pad(activeIndex + 1) }} / {{ pad(total) }}</p>
        </div>
      </div>

      <button
        type="button"
        class="lightbox-close"
        aria-label="Schließen"
        @click="lightbox?.close()">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5 L19 19 M19 5 L5 19" />
        </svg>
      </button>

      <button
        v-if="total > 1"
        type="button"
        class="lightbox-arrow lightbox-prev"
        aria-label="Vorheriges Bild"
        @click="navigate(-1)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 L7 12 L15 20" /></svg>
      </button>
      <button
        v-if="total > 1"
        type="button"
        class="lightbox-arrow lightbox-next"
        aria-label="Nächstes Bild"
        @click="navigate(1)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 L17 12 L9 20" /></svg>
      </button>
    </dialog>
  </section>
</template>

<style lang="sass" scoped>
$frame-height: 340px
$frame-height-mobile: 220px
$hairline: #E2E2E2

.gallery
  margin-bottom: 30px

// - - - INDEX RAIL - - - //
.gallery-head
  display: flex
  align-items: center
  gap: 18px
  margin-bottom: 14px

.gallery-count
  flex: none
  font-size: 13px
  letter-spacing: 1.5px
  font-variant-numeric: tabular-nums
  color: $black

.gallery-count-current
  font-weight: 600

.gallery-count-sep
  margin: 0 4px
  opacity: 0.35

.gallery-count-total
  opacity: 0.5

// Echoes the crimson dashes of the year timeline, but earns its keep as a
// scroll position indicator.
.gallery-rule
  flex: 1
  position: relative
  height: 2px
  background-color: $hairline

  span
    position: absolute
    top: 0
    bottom: 0
    background-color: $red
    transition: left 0.18s ease-out, width 0.18s ease-out

.gallery-nav
  flex: none
  display: flex
  gap: 6px

.gallery-arrow
  width: 34px
  height: 34px
  display: flex
  align-items: center
  justify-content: center
  border: 1px solid $hairline
  background: transparent
  color: $black
  cursor: pointer
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease

  svg
    width: 15px
    height: 15px
    fill: none
    stroke: currentColor
    stroke-width: 1.6
    stroke-linecap: square

  &:hover:not(:disabled)
    background-color: $red
    border-color: $red
    color: #FFFFFF

  &:disabled
    opacity: 0.25
    cursor: default

  &:focus-visible
    outline: 2px solid $red
    outline-offset: 2px

// - - - FILMSTRIP - - - //
.gallery-track
  display: flex
  align-items: flex-end
  gap: 12px
  margin: 0
  padding: 0 0 14px 0
  list-style: none
  overflow-x: auto
  overscroll-behavior-x: contain
  scroll-snap-type: x proximity
  -webkit-overflow-scrolling: touch

  // Native scrollbar hidden: the crimson thumb in the index rail above already
  // reports position and extent, and showing both meant two competing scrollbars
  // on one strip. Scrolling stays fully available — wheel, trackpad, swipe,
  // arrow keys and the buttons.
  scrollbar-width: none

  &::-webkit-scrollbar
    display: none

  &:focus-visible
    outline: 2px solid $red
    outline-offset: 4px

.gallery-frame
  flex: 0 0 auto
  margin: 0
  scroll-snap-align: start

.gallery-open
  display: block
  position: relative
  padding: 0
  border: 0
  background: none
  cursor: zoom-in
  overflow: hidden
  // Photographs sit on a faint ground so a slow-loading frame does not punch a
  // white hole in the strip.
  background-color: #F4F4F4

  img
    display: block
    height: $frame-height
    width: auto
    // No object-fit: widths follow each photograph's own proportions, so
    // nothing is ever cropped and portrait shots stay intact.
    transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.3, 1), filter 0.4s ease
    filter: saturate(0.92)

  // Crimson underline draws in from the left — the same gesture as the year
  // headings' dash.
  &:after
    content: ""
    position: absolute
    left: 0
    right: 0
    bottom: 0
    height: 3px
    background-color: $red
    transform: scaleX(0)
    transform-origin: left center
    transition: transform 0.35s ease

  &:hover,
  &:focus-visible
    img
      transform: scale(1.04)
      filter: saturate(1)

    &:after
      transform: scaleX(1)

    .gallery-frame-index
      opacity: 1
      transform: translateY(0)

  &:focus-visible
    outline: 2px solid $red
    outline-offset: 3px

.gallery-frame-index
  position: absolute
  left: 10px
  bottom: 12px
  font-size: 11px
  letter-spacing: 1.5px
  font-variant-numeric: tabular-nums
  color: #FFFFFF
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6)
  opacity: 0
  transform: translateY(4px)
  transition: opacity 0.3s ease, transform 0.3s ease

// - - - LIGHTBOX - - - //
// The dialog itself spans the whole viewport and centres its panel with flex.
//
// It does NOT rely on the UA stylesheet's `inset: 0; margin: auto` centring for
// modal dialogs: this site has a global `margin: 0` reset, which beats that UA
// rule and pinned the lightbox to the top-left corner at its content size —
// a 640px box in the corner instead of a centred overlay.
.gallery-lightbox
  position: fixed
  inset: 0
  width: 100%
  max-width: 100%
  height: 100%
  max-height: 100%
  margin: 0
  padding: 0
  border: 0
  overflow: hidden
  // The dialog spans the viewport, so it paints the dark ground itself rather
  // than relying on ::backdrop. ::backdrop is still set below as a belt-and-
  // braces fallback, but it is a top-layer pseudo-element with patchier support
  // and tooling behaviour, and the scrim is too important to leave to it.
  background: rgba(#101010, 0.94)
  // Pushes the page behind out of focus so the photograph is the only subject.
  backdrop-filter: blur(10px) saturate(0.9)

  // dialog:not([open]) is display:none in the UA sheet, so the flex layout has
  // to be scoped to [open] or the lightbox would render while closed.
  &[open]
    display: flex
    align-items: center
    justify-content: center
    animation: lightbox-fade 0.28s ease-out

    .lightbox-inner
      animation: lightbox-rise 0.42s cubic-bezier(0.2, 0.7, 0.3, 1)

  &::backdrop
    background: rgba(#101010, 0.94)

@keyframes lightbox-fade
  from
    opacity: 0
  to
    opacity: 1

@keyframes lightbox-rise
  from
    opacity: 0
    transform: scale(0.985) translateY(10px)
  to
    opacity: 1
    transform: none

// No white panel or framing chrome: the photograph sits directly on the dark
// ground and the type sits under it. Explicit width rather than max-width —
// the sources are only 640px wide and max-width never upscales, which is why
// the "full screen" view came out barely larger than the 510px thumbnail.
.lightbox-inner
  display: flex
  flex-direction: column
  align-items: center
  gap: 16px
  width: min(92vw, 1200px)

  img
    display: block
    width: 100%
    height: auto
    max-height: calc(88vh - 56px)
    object-fit: contain
    box-shadow: 0 40px 90px rgba(0, 0, 0, 0.5)

.lightbox-bar
  display: flex
  align-items: baseline
  justify-content: space-between
  gap: 24px
  width: 100%

.lightbox-caption
  font-size: 13px
  letter-spacing: 0.6px
  color: rgba(#FFFFFF, 0.74)

.lightbox-count
  flex: none
  font-size: 12px
  letter-spacing: 2px
  font-variant-numeric: tabular-nums
  color: rgba(#FFFFFF, 0.42)

// Borderless glyphs rather than buttons-in-boxes — on a full-bleed dark ground
// the boxes were the dated part.
.lightbox-close,
.lightbox-arrow
  position: absolute
  display: flex
  align-items: center
  justify-content: center
  width: 52px
  height: 52px
  border: 0
  background: transparent
  color: rgba(#FFFFFF, 0.55)
  cursor: pointer
  transition: color 0.25s ease, transform 0.25s ease

  svg
    width: 22px
    height: 22px
    fill: none
    stroke: currentColor
    stroke-width: 1.25
    stroke-linecap: round
    stroke-linejoin: round

  &:hover
    color: #FFFFFF

  &:focus-visible
    outline: 1px solid rgba(#FFFFFF, 0.6)
    outline-offset: 4px
    color: #FFFFFF

.lightbox-prev:hover
  transform: translateY(-50%) translateX(-3px)

.lightbox-next:hover
  transform: translateY(-50%) translateX(3px)

// Controls sit against the viewport edges, not the panel, so they never crowd
// the photograph.
.lightbox-close
  top: 18px
  right: 18px

.lightbox-arrow
  top: 50%
  transform: translateY(-50%)

.lightbox-prev
  left: 18px

.lightbox-next
  right: 18px

// - - - MOBILE - - - //
@media only screen and (max-width: 1200px)
  .gallery-head
    gap: 12px

  .gallery-open img
    height: $frame-height-mobile

  // Strip arrows are redundant next to native swipe on the filmstrip itself.
  .gallery-nav
    display: none

  // The lightbox arrows are NOT redundant — it shows one image at a time with
  // no swipe handler, so they are the only way through the set. They stay
  // vertically centred on the photograph; the old bottom-anchored position left
  // them floating in dead space, reading as unrelated to the image.
  .lightbox-inner
    width: 96vw

  .lightbox-close,
  .lightbox-arrow
    width: 44px
    height: 44px

  .lightbox-close
    top: 10px
    right: 10px

  .lightbox-prev
    left: 2px

  .lightbox-next
    right: 2px

// - - - REDUCED MOTION - - - //
@media (prefers-reduced-motion: reduce)
  .gallery-rule span,
  .gallery-open img,
  .gallery-open,
  .gallery-open:after,
  .gallery-frame-index
    transition: none

  .gallery-open:hover img,
  .gallery-open:focus-visible img
    transform: none

  .gallery-lightbox[open],
  .gallery-lightbox[open] .lightbox-inner
    animation: none

  .lightbox-prev:hover,
  .lightbox-next:hover
    transform: translateY(-50%)
</style>

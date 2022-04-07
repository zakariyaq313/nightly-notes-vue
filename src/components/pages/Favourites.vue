<template>
    <base-component :activePage="'favourites'">
      <template v-slot:page-label>
        <b>Favourites</b>
      </template>

      <template v-slot:action-button></template>

      <template v-slot:notes-unavailable>
        <h2 class="favourites-info">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><linearGradient xmlns="http://www.w3.org/2000/svg" id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="512" y2="0"><stop offset="0" stop-color="#fd3a84"></stop><stop offset="1" stop-color="#ffa68d"></stop></linearGradient><linearGradient xmlns="http://www.w3.org/2000/svg" id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="421" y2="121"><stop offset="0" stop-color="#ffc2cc"></stop><stop offset="1" stop-color="#fff2f4"></stop></linearGradient><g xmlns="http://www.w3.org/2000/svg"><g><g><circle cx="256" cy="256" fill="url(#SVGID_1_)" r="256" data-original="url(#SVGID_1_)"></circle></g></g><g><g><path d="m331 121c-32.928 0-58.183 18.511-75 46.058-16.82-27.552-42.077-46.058-75-46.058-25.511 0-48.788 10.768-65.541 30.32-15.772 18.409-24.459 42.993-24.459 69.225 0 28.523 10.698 54.892 33.666 82.986 20.138 24.632 49.048 49.971 82.524 79.313 12.376 10.848 25.174 22.065 38.775 34.306 2.853 2.567 6.444 3.85 10.035 3.85s7.182-1.283 10.035-3.851c13.601-12.241 26.398-23.458 38.775-34.306 33.476-29.341 62.386-54.681 82.524-79.313 22.968-28.092 33.666-54.462 33.666-82.985 0-53.637-36.748-99.545-90-99.545z" fill="url(#SVGID_2_)" data-original="url(#SVGID_2_)"></path></g></g></g></g></svg>
          <span>No favourite notes</span>
        </h2>
      </template>
    </base-component>
</template>

<script>
import Base from "../Base.vue";

export default {
  name: "Favourites",
  components: {
    "base-component": Base
  }
}
</script>

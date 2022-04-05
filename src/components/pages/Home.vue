<template>
    <base-component :activePage="'home'">
      <template v-slot:page-label></template>
      <template v-slot:action-button></template>
      <template v-slot:notes-unavailable></template>
    </base-component>
</template>

<script>
import Base from "../Base.vue";

export default {
  components: {
    "base-component": Base
  }
}
</script>
<template>
  <main>
    <navigation></navigation>
    <router-view></router-view>
  </main>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  components: { Navigation },
  name: "App"
}
</script>

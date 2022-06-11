<template>
	<main>
		<Navigation />
		<RouterView />
		<Footer />
	</main>
</template>

<script>
import Footer from './components/Footer.vue';
import Navigation from "./components/Navigation.vue";

export default {
	components: { Navigation, Footer },
	name: "App"
}
</script>

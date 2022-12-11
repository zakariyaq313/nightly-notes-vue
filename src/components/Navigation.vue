<template>
	<nav :class="['navigation-buttons', focusedPage]">
		<button @click="switchPage('home')" title="Home"><Home/></button>
		<button @click="switchPage('favourites')" title="Favourites"><HeartOutlined/></button>
		<button @click="switchPage('trash')" title="Trash"><Trash/></button>
	</nav>
</template>

<script>
import HeartOutlined from './icons/HeartOutlined.vue';
import Home from './icons/Home.vue';
import Trash from './icons/Trash.vue';
export default {
	components: { Home, HeartOutlined, Trash },
	name: "Navigation",
	data() {
		return {
			focusedPage: ""
		}
	},
	methods: {
		switchPage(page) {
			this.$router.push(`/${page}`);
		}
	},
	watch: {
		"$route": {
			handler: function() {
				const currentPage = this.$router.currentRoute.value.name;
				this.focusedPage = `focus-${currentPage}`;
			}, deep: true
		}
	}
}
</script>

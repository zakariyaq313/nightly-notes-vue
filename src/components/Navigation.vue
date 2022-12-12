<template>
	<nav :class="['navigation-buttons', focusedPage]">
		<button @click="switchPage('home')" title="Home"><Home/></button>
		<button @click="switchPage('favourites')" title="Favourites"><HeartOutlined/></button>
		<button @click="switchPage('trash')" title="Trash"><TrashCan/></button>
	</nav>
</template>

<script>
import Home from "./icons/Home.vue";
import HeartOutlined from "./icons/HeartOutlined.vue";
import TrashCan from "./icons/TrashCan.vue";
export default {
	components: { Home, HeartOutlined, TrashCan },
	name: "Navigation",
	data() {
		return {
			focusedPage: "focus-home"
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

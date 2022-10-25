<template>
	<nav :class="['navigation-buttons', focusedPage]">
		<button @click="switchPage('home')" title="Home"><HomeIcon/></button>
		<button @click="switchPage('favourites')" title="Favourites"><HeartOutlineIcon/></button>
		<button @click="switchPage('trash')" title="Trash"><TrashIcon/></button>
	</nav>
</template>

<script>
import HeartOutlineIcon from './icons/HeartOutlineIcon.vue';
import HomeIcon from './icons/HomeIcon.vue';
import TrashIcon from './icons/TrashIcon.vue';
export default {
	components: { HomeIcon, HeartOutlineIcon, TrashIcon },
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
			},
			deep: true
		}
	}
}
</script>

<template>
		<nav :class="['navigation-buttons', focusPage]">
			<button title="Home" @click="switchPage('home')">
				<HomeIcon />
			</button>

			<button title="Favourites" @click="switchPage('favourites')">
				<HeartOutlineIcon />
			</button>

			<button title="Trash" @click="switchPage('trash')">
				<TrashIcon />
			</button>
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
			focusPage: ""
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
				this.focusPage = `focus-${currentPage}`;
			},
			
			deep: true
		}
	}
}
</script>

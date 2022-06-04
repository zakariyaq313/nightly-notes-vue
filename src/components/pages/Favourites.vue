<template>
	<BaseComponent :activePage="'favourites'">
		<template v-slot:page-label>
			<b>Favourites</b>
		</template>

		<template v-slot:action-button></template>

		<template v-slot:notes-unavailable>
			<h2 class="favourites-info">
				<HeartIcon />
				<span>No favourite notes</span>
			</h2>
		</template>
	</BaseComponent>
</template>

<script>
import BaseComponent from "../Base.vue";
import HeartIcon from '../icons/HeartIcon.vue';

export default {
	name: "Favourites",
	components: {
		BaseComponent, HeartIcon
	}
}
</script>

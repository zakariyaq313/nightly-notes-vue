<template>
	<BaseComponent :activePage="'favourites'">
		<template v-slot:page-label>
			<b>Favourites</b>
		</template>
		<template v-slot:action-button></template>
		<template v-slot:notes-unavailable>
			<span class="favourites-info">
				<HeartColored />
				<h2>No favourite notes</h2>
			</span>
		</template>
	</BaseComponent>
</template>

<script>
import BaseComponent from "../Base.vue";
import HeartColored from '../icons/HeartColored.vue';

export default {
	name: "Favourites",
	components: {
		BaseComponent, HeartColored
	}
}
</script>

<template>
	<BaseComponent :activePage="'home'">
		<template v-slot:page-label>
			<span class="logo"><b>Notes</b><b>Mini</b></span>
		</template>

		<template v-slot:action-button></template>

		<template v-slot:notes-unavailable>
			<h2>
				<NotesIcon />
				<span>Anything to add?</span>
			</h2>
		</template>
	</BaseComponent>
</template>

<script>
import BaseComponent from "../Base.vue";
import NotesIcon from '../icons/NotesIcon.vue';

export default {
	components: {
		BaseComponent, NotesIcon
	}
}
</script>

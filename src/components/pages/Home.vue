<template>
	<BaseComponent :activePage="'home'">
		<template v-slot:page-label>
			<span class="logo"><b>Notes</b><b>Mini</b></span>
		</template>

		<template v-slot:action-button></template>

		<template v-slot:notes-unavailable>
			<span>
				<NotesIcon />
				<h2 class="clickable" @click="newNote">Anything to add?</h2>
			</span>
		</template>
	</BaseComponent>
</template>

<script>
import BaseComponent from "../Base.vue";
import NotesIcon from '../icons/NotesIcon.vue';

export default {
	components: {
		BaseComponent, NotesIcon
	},
	methods: {
		newNote() {
			this.$store.commit("noteDialogIsVisible", true);
		}
	}
}
</script>

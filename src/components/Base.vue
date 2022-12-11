<template>
	<header>
		<div class="page-label">
			<slot name="page-label"></slot>
		</div>

		<slot name="action-button">
			<button	class="create-note-btn comical-shadow-clickable"
				:disabled="activePage === 'favourites'"
				@click="showNoteDialog">
					<span><Plus/>New Note</span>
					<span></span>
					<span></span>
			</button>
		</slot>
	</header>

	<div v-if="notesUnavailable" class="notes-unavailable">
		<slot name="notes-unavailable"></slot>
	</div>

	<slot name="confirm-deletion"></slot>

	<div @click="closeNote" :class="['overlay', overlayClasses]"></div>
	<div v-if="isThemeGradient && $store.state.isNoteDialogVisible"
		:class="['background-blur', backgroundBlurClasses]">
	</div>

	<NoteDialog :activePage="activePage"
		:fontDropdownVisible="fontSelectVisible"
		:paletteVisible="themePaletteVisible"
		@toggle-font-dropdown="toggleFontSelect"
		@hide-font-dropdown="hideFontSelect"
		@toggle-palette="toggleThemeSelect"
		@hide-palette="hideThemeSelect"
		@delete-note="confirmDeleteAmount"
		@is-theme-gradient="themeIsGradient">
	</NoteDialog>

	<div v-if="!notesUnavailable" class="notes">
		<Note v-for="note in notes"
			:key="note.id"
			:id="note.id"
			:title="note.title"
			:text="note.text"
			:images="note.images"
			:theme="note.theme"
			:font="note.font"
			:favourite="note.favourite">
		</Note>
	</div>
</template>

<script>
import NoteDialog from "./NoteDialog.vue";
import Plus from "./icons/Plus.vue";
import Note from "./Note.vue";

export default {
	name: "Base",
	components: {NoteDialog, Note, Plus},
	props: {
		activePage: {
			type: String,
			required: true
		}
	},
	emits: ["confirm-deletion"],
	data() {
		return {
			themePaletteVisible: false,
			fontSelectVisible: false,
			isThemeGradient: false
		}
	},
	methods: {
		toggleFontSelect() {
			this.fontSelectVisible = !this.fontSelectVisible;
		},
		hideFontSelect() {
			this.fontSelectVisible = false;
		},
		toggleThemeSelect() {
			this.themePaletteVisible = !this.themePaletteVisible;
		},
		hideThemeSelect() {
			this.themePaletteVisible = false;
		},
		themeIsGradient(value) {
			this.isThemeGradient = value;
		},
		showNoteDialog() {
			this.$store.commit("noteIsNew", true);
			this.$store.commit("noteDialogIsVisible", true);
		},
		closeNote() {
			this.hideThemeSelect();
			this.hideFontSelect();
			this.$store.dispatch("exitNote", this.activePage);
		},
		confirmDeleteAmount(amount) {
			this.$emit("confirm-deletion", amount);
		}
	},
	computed: {
		notes() {
			if (this.activePage === "favourites") {
				return this.$store.state.favouriteNotes;
			} else if(this.activePage === "trash") {
				return this.$store.state.trashedNotes;
			} else {
				return this.$store.state.userNotes;
			}
		},
		notesUnavailable() {
			return this.notes.length === 0 ? true : false;
		},
		overlayClasses() {
			return this.$store.state.isNoteDialogVisible ? "overlay-visible" : "";
		},
		backgroundBlurClasses() {
			return this.$store.state.noteTheme;
		}
	},
	mounted() {
		const state = this.$store.state;
		this.$watch (() => [state.noteTitle, state.noteText, state.noteImages], (value) => {
			if (value[0].trim() !== "" || value[1].trim() !== "" || value[2].length > 0) {
				this.$store.commit("noteIsEmpty", false);
			} else {
				this.$store.commit("noteIsEmpty", true);
			}
		}, {deep: true})
	}
};
</script>

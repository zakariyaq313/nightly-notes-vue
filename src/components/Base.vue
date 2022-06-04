<template>
	<div>
		<nav class="navbar">
			<div class="page-label">
				<slot name="page-label"></slot>
			</div>

			<div>
				<slot name="action-button">
					<button
						class="create-note-btn comical-shadow-clickable"
						@click="showForm"
						:disabled="activePage === 'favourites'">
						
						<span>
							<PlusIcon />
							New Note
						</span>
						<span></span>
						<span></span>
					</button>
				</slot>
			</div>
		</nav>

		<div v-if="notesUnavailable" class="notes-unavailable">
			<slot name="notes-unavailable"></slot>
		</div>

		<slot name="confirm-deletion"></slot>

		<div @click="closeNote" :class="['overlay', overlayVisible]"></div>
		<div :class="['background-blur', blurOverlayClasses]"></div>

		<CreateNote
			:activePageName="activePage"
			:fontDropdownVisible="isFontDropdownVisible"
			:paletteVisible="isPaletteVisible"
			@toggle-font-dropdown="toggleFontSelect"
			@hide-font-dropdown="hideFontSelect"
			@toggle-palette="toggleThemeSelect"
			@hide-palette="hideThemeSelect"
			@delete-note="confirmDeleteAmount"
			@is-theme-gradient="themeIsGradient">
		</CreateNote>

		<div class="notes">
			<Note
				v-for="note in notes"
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

		<footer>
			<p>
				Created by
				<a class="rising-background"
					href="https://zakariyaq313.github.io/my-website/"
					target="_blank" rel="noopener noreferrer">
					Muhammad Zakariya
				</a>
			</p>
		</footer>
	</div>
</template>

<script>
import CreateNote from "./NoteDialog.vue";
import PlusIcon from "./icons/PlusIcon.vue";
import Note from "./Note.vue";

export default {
	name: "Base",

	components: {
		CreateNote, Note, PlusIcon
	},

	props: {
		activePage: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			isPaletteVisible: false,
			isFontDropdownVisible: false,
			isThemeGradient: false
		}
	},

	methods: {
		toggleFontSelect() {
			this.isFontDropdownVisible = !this.isFontDropdownVisible;
		},

		hideFontSelect() {
			this.isFontDropdownVisible = false;
		},

		toggleThemeSelect() {
			this.isPaletteVisible = !this.isPaletteVisible;
		},

		hideThemeSelect() {
			this.isPaletteVisible = false;
		},

		themeIsGradient(value) {
			this.isThemeGradient = value;
		},

		showForm() {
			this.$store.commit("newNote", true);
			this.$store.commit("formVisibility", true);
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
			if(this.notes.length <= 0 && !this.$store.state.isFormVisible) {
				return true;
			} else {
				return false;
			}
		},

		overlayVisible() {
			return this.$store.state.isFormVisible ? "overlay-visible" : "";
		},

		blurOverlayClasses() {
			let classes = [
							this.$store.state.noteTheme, //theme colour
							this.$store.state.isFormVisible &&
							this.isThemeGradient ? "blur-visible" : "" //visibility
						];
			return classes;
		}
	},

	mounted() {
		this.$watch (
			() => [
					this.$store.state.noteTitle,
					this.$store.state.noteText,
					this.$store.state.noteImages
				],
			(currentValue) => {
				if (currentValue[0].trim() !== "" ||
					currentValue[1].trim() !== "" ||
					currentValue[2].length > 0) {
						this.$store.commit("noteEmpty", false);
				} else {
					this.$store.commit("noteEmpty", true);
				}
			},
			{
				deep: true
			}
		)
	}
};
</script>

<template>
	<!-- 
		This component is too large and can be broken down into multiple
		components. Unfortunately, I do not have enough free time at hand
		to update this app anymore, hence this will remain the way it is.
	-->

	<form :class="['note-dialog', noteDialogClasses]">
		<div class="note-content">
			<div class="action-buttons">
				<button @click.prevent="closeNoteDialog">
					<ArrowLeftIcon />
				</button>

				<button @click.prevent="toggleFavourite"
					:disabled="trashIsOpen"
					class="favourite-button">
						<HeartOutlineIcon v-if="!$store.state.noteIsFavourite" />
						<HeartFilledIcon v-if="$store.state.noteIsFavourite" />
				</button>
			</div>

			<!-- Note images -->
			<div v-if="imagesPresent" class="note-images" :style="imagesColumn" @click="hidePalette">
				<div v-for="(image, index) in $store.state.noteImages" :key="index" class="note-image">
					<img :src="image" :class="imageWidth">

					<!-- Delete image button -->
					<button @click.prevent="deleteImage(index)"
						class="delete-image"
						:disabled="trashIsOpen">
							<DeleteIcon />
					</button>
				</div>
			</div>

			<div class="user-inputs">
				<!-- Note title -->
				<input v-model="currentTitle"
					type="text"
					placeholder="Title"
					:disabled="trashIsOpen"
					@focus="closeOtherActions"
					@keydown="enterTextarea"
					spellcheck="false"
					class="note-title"
				/>
				
				<!-- Note content -->
				<textarea v-model="currentNote"
					ref="textarea"
					placeholder="Your note"
					:disabled="trashIsOpen"
					@focus="closeOtherActions"
					spellcheck="false"
					class="note-text">
				</textarea>
				
				<!-- Hidden image upload button -->
				<input type="file"
					ref="imageUploader"
					accept="image/*"
					@change="uploadImage"
					style="display: none;"
				/>
			</div>
		</div>
				
		<div class="note-options">
			<span v-if="!trashIsOpen"
				@click="toggleFontDropdown"
				class="font-select-button">
					Font family
					<ArrowDownIcon :style="rotateArrow" />
			</span>

			<button v-if="!trashIsOpen"
				@click.prevent="uploadButtonClicked"
				title="Image">
					<ImageIcon />
			</button>

			<button v-if="!trashIsOpen"
				@click.prevent="togglePalette"
				title="Background colour">
					<PaletteIcon />
			</button>

			<button v-if="!trashIsOpen"
				@click.prevent="trashNote"
				:disabled="$store.state.isNoteEmpty"
				title="Delete">
					<DeleteIcon />
			</button>

			<button v-if="trashIsOpen"
				@click.prevent="deleteNote"
				title="Delete forever">
					<DeleteIcon />
			</button>

			<button v-if="trashIsOpen"
				@click.prevent="restoreNote"
				title="Restore">
					<RestoreIcon />
			</button>

			<ul v-if="fontDropdownVisible" class="font-selection-dropdown">
				<li v-for="(fontStyle, index) in fontStyles"
					:key="index"
					:class="fontClasses(fontStyle.className)"
					@click="fontChange(fontStyle.className)">
						{{ fontStyle.name }}
				</li>
			</ul>

			<div v-if="paletteVisible" class="palette-container">
				<div class="palette comical-shadow-idle">

					<div class="solid-colours">
						<b>Solid</b>
						<div class="theme-buttons">
							<button v-for="(solid, index) in colorsSolid"
								:key="index"
								:class="activeTheme(solid)"
								@click.prevent="themeChange(solid, false)">
							</button>
						</div>
					</div>

					<div class="gradient-colours">
						<b>Gradient</b>
						<div class="theme-buttons">
							<button v-for="(gradient, index) in colorsGradient"
								:key="index"
								:class="activeTheme(gradient)"
								@click.prevent="themeChange(gradient, true)">
							</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</form>
</template>

<script>
import { fontStyles, colorsSolid, colorsGradient } from "../store/themeProps";
import ArrowDownIcon from './icons/ArrowDownIcon.vue';
import ArrowLeftIcon from './icons/ArrowLeftIcon.vue';
import DeleteIcon from './icons/DeleteIcon.vue';
import HeartFilledIcon from './icons/HeartFilledIcon.vue';
import HeartOutlineIcon from './icons/HeartOutlineIcon.vue';
import ImageIcon from './icons/ImageIcon.vue';
import PaletteIcon from './icons/PaletteIcon.vue';
import RestoreIcon from './icons/RestoreIcon.vue';

export default {
  	components: { ArrowLeftIcon, HeartOutlineIcon, HeartFilledIcon, DeleteIcon, ArrowDownIcon, ImageIcon, PaletteIcon, RestoreIcon },
	name: "NoteDialog",
	props: {
		activePage: {
			type: String,
			required: true
		},

		fontDropdownVisible: {
			type: Boolean,
			required: true
		},

		paletteVisible: {
			type: Boolean,
			required: true
		}
	},

	emits: [
		"toggle-font-dropdown",
		"hide-font-dropdown",
		"toggle-palette",
		"hide-palette",
		"delete-note",
		"is-theme-gradient"
	],

	data() {
		return {
			imagesColumn: "",
			imageWidth: ""
		}
	},

	methods: {
		toggleFontDropdown() {
			if (this.paletteVisible) {
				this.hidePalette();
			}
			this.$emit("toggle-font-dropdown");
		},

		togglePalette() {
			if (this.fontDropdownVisible) {
				this.hideFontDropdown();
			}
			this.$emit("toggle-palette");
		},

		hideFontDropdown() {
			this.$emit("hide-font-dropdown");
		},

		hidePalette() {
			this.$emit("hide-palette");
		},

		closeOtherActions() {
			if (this.fontDropdownVisible) {
				this.hideFontDropdown();
			}

			if (this.paletteVisible) {
				this.hidePalette();
			}
		},

		uploadButtonClicked() {
			this.closeOtherActions();
			this.$refs.imageUploader?.click();
		},

		uploadImage(e) {
			const uploadedImage = URL.createObjectURL(e.target.files[0]);
			this.$store.commit("addNoteImages", uploadedImage);
		},

		deleteImage(index) {
			this.$store.commit("deleteNoteImages", index);
		},

		closeNoteDialog() {
			this.closeOtherActions();
			this.$store.dispatch("exitNote", this.activePage);
		},

		toggleFavourite() {
			this.closeOtherActions();
			this.$store.commit("toggleFavourite");
		},

		enterTextarea(e) {
			if (e.key === "Enter" || e.key === "NumpadEnter") {
				e.preventDefault();
				this.$refs.textarea.focus();
			}
		},

		activeTheme(theme) {
			let activeThemeName = theme;
			if (activeThemeName === "dark") {
				activeThemeName = "default-theme-button";
			}

			return this.$store.state.noteTheme === theme ?
				`${activeThemeName} active-theme` :
				activeThemeName;
		},

		themeChange(theme, isGradient) {
			this.$emit("is-theme-gradient", isGradient);
			this.$store.commit("setNoteTheme", theme);
		},

		fontChange(font) {
			this.$store.commit("setNoteFont", font);
		},

		fontClasses(fontClass) {
			return fontClass === this.$store.state.noteFont ?
				[fontClass, "chosen-font"] :
				fontClass;
		},

		trashNote() {
			this.closeOtherActions();
			this.$store.dispatch("moveToTrash");
		},

		deleteNote() {
			this.$emit("delete-note", "one");
		},

		restoreNote() {
			this.$store.dispatch("restoreFromTrash");
		}
	},

	computed: {
		noteDialogClasses() {
			const classes = [
				this.$store.state.noteTheme, // background color
				this.$store.state.noteFont, // font-family
				this.$store.state.isNoteDialogVisible ? "note-dialog-visible" : "" // visibility
			];
			return classes;
		},

		imagesPresent() {
			return this.$store.state.noteImages.length > 0;
		},

		rotateArrow() {
			return this.fontDropdownVisible ? "transform: rotate(180deg)" : "transform: rotate(0)";
		},

		trashIsOpen() {
			return this.activePage === "trash";
		},

		currentTitle: {
			get() {
				return this.$store.state.noteTitle;
			},
			set(title) {
				this.$store.commit("setNoteTitle", title);
			}
		},

		currentNote: {
			get() {
				return this.$store.state.noteText;
			},
			set(text) {
				this.$store.commit("setNoteText", text);
			}
		}
	},

	created() {
		this.fontStyles = fontStyles;
		this.colorsSolid = colorsSolid;
		this.colorsGradient = colorsGradient;
	},

	mounted() {
		this.$watch(() => [this.$store.state.noteImages], (images) => {
			if (images[0].length === 1) {
				this.imagesColumn = "columns: 1";
				this.imageWidth = "rem-50";
			} else {
				this.imagesColumn = "columns: 2";
				this.imageWidth = "rem-24";
			}
		},
		{
			deep: true
		})
	}
}
</script>

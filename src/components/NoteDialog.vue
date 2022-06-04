<template>
	<!-- 
		This component is too large and can be broken down into multiple
		components. Unfortunately, I do not have enough free time at hand
		to update this app anymore, hence this will remain the way it is.
	-->

	<form :class="formClasses">
		<div class="upper-half">
			<div class="action-buttons">
				<button @click.prevent="hideForm">
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
			<div v-if="imagesPresent" class="images" :style="imageColumn" @click="hidePalette">
				<div v-for="(image, index) in $store.state.noteImages" :key="index" class="image">
					<img :src="image" :class="imageWidth">

					<!-- Delete image button -->
					<button
						@click.prevent="deleteImage(index)"
						class="delete-image"
						:disabled="trashIsOpen">
							<DeleteIcon />
					</button>
				</div>
			</div>

			<div class="user-inputs">
				<!-- Note title -->
				<input
					type="text"
					placeholder="Title"
					:disabled="trashIsOpen"
					v-model="currentTitle"
					@focus="closeOtherActions"
					@keydown="enterTextarea"
					spellcheck="false" 
				/>
				
				<!-- Note text -->
				<textarea
					placeholder="Your note"
					:disabled="trashIsOpen"
					v-model="currentNote"
					@focus="closeOtherActions"
					ref="textarea"
					spellcheck="false">
				</textarea>
				
				<!-- Hidden image upload button -->
				<input
					@change="imageUpload"
					ref="uploadImage"
					type="file"
					accept="image/*"
					style="display: none;"
				/>
			</div>
		</div>
				
		<div class="lower-half">
			<div class="note-options">
				<span
					v-if="!trashIsOpen"
					@click="toggleFontDropdown"
					class="font-select-button">
						Font family
						<ArrowDownIcon :style="rotateArrow" />
				</span>

				<button
					v-if="!trashIsOpen"
					@click.prevent="uploadButtonClicked"
					title="Image">
						<ImageIcon />
				</button>

				<button
					v-if="!trashIsOpen"
					@click.prevent="togglePalette"
					title="Background colour">
						<PaletteIcon />
				</button>

				<button
					v-if="!trashIsOpen"
					@click.prevent="removeNote"
					:disabled="$store.state.isNoteEmpty"
					title="Delete">
						<DeleteIcon />
				</button>

				<button
					v-if="trashIsOpen"
					@click.prevent="deleteSingleNote"
					title="Delete forever">
						<DeleteIcon />
				</button>

				<button
					v-if="trashIsOpen"
					@click.prevent="restoreNote"
					title="Restore">
						<RestoreIcon />
				</button>

				<ul v-if="fontDropdownVisible" class="font-selection-dropdown">
					<li v-for="(fontStyle, index) in fontStyles"
						:key="index"
						:class="fontClasses(fontStyle.class)"
						@click="fontChange(fontStyle.class)">
							{{ fontStyle.name }}
					</li>
				</ul>

				<div v-if="paletteVisible" class="palette-container">
					<div class="palette comical-shadow-idle">
						<div class="solid-colours">
							<b>Solid</b>
							<div class="theme-buttons">
								<button v-for="(themeColour, index) in themeColours"
										:key="index"
										:class="activeTheme(themeColour)"
										@click.prevent="themeChange(themeColour, false)">
								</button>
							</div>
						</div>

						<div class="gradient-colours">
							<b>Gradient</b>
							<div class="theme-buttons">
								<button v-for="(themeGradient, index) in themeGradients"
										:key="index"
										:class="activeTheme(themeGradient)"
										@click.prevent="themeChange(themeGradient, true)">
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</template>

<script>
import { fontStyles, themeColours, themeGradients } from "../store/themeProps";
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
	name: "CreateNote",
	props: {
		activePageName: {
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
			fontStyles: fontStyles,
			themeColours: themeColours,
			themeGradients: themeGradients
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

		uploadButtonClicked() {
			this.closeOtherActions();
			this.$refs.uploadImage.click();
		},

		removeNote() {
			this.closeOtherActions();
			this.$store.dispatch("moveToTrash");
		},

		closeOtherActions() {
			if (this.fontDropdownVisible) {
				this.hideFontDropdown();
			}

			if (this.paletteVisible) {
				this.hidePalette();
			}
		},

		hideFontDropdown() {
			this.$emit("hide-font-dropdown");
		},

		hidePalette() {
			this.$emit("hide-palette");
		},

		hideForm() {
			this.hideFontDropdown();
			this.hidePalette();
			this.$store.dispatch("exitNote", this.activePageName);
		},

		enterTextarea(e) {
			if (e.key === "Enter" || e.key === "NumpadEnter") {
				e.preventDefault();
				this.$refs.textarea.focus();
			}
		},

		toggleFavourite() {
			this.closeOtherActions();
			this.$store.commit("toggleFavouriteStatus");
		},

		deleteSingleNote() {
			this.$emit("delete-note", "delete-one");
		},

		restoreNote() {
			this.$store.dispatch("moveOutOfTrash");
		},

		deleteImage(index) {
			this.$store.commit("deleteImages", index);
		},

		imageUpload(e) {
			this.$store.commit("imageUploaded", URL.createObjectURL(e.target.files[0]));
		},

		activeTheme(theme) {
			let activeThemeName = theme;
			if (activeThemeName === "dark") {
				activeThemeName = "default-theme-button";
			}
			return this.$store.state.noteTheme === theme ? `${activeThemeName} active-theme` : activeThemeName;
		},

		themeChange(theme, isGradient) {
			this.$emit("is-theme-gradient", isGradient);
			this.$store.commit("setTheme", theme);
		},

		fontChange(font) {
			this.$store.commit("setFont", font);
		},

		fontClasses(fontClass) {
			return fontClass === this.$store.state.noteFont ? [fontClass, "chosen-font"] : fontClass;
		}
	},

	computed: {
		formClasses() {
			let classes = [
				this.$store.state.noteTheme, //theme
				this.$store.state.noteFont, //font
				this.$store.state.isFormVisible ? "form-visible" : "" //visibility
			];
			return classes;
		},

		imagesPresent() {
			return this.$store.state.noteImages.length > 0;
		},

		imageColumn() {
			return this.$store.state.noteImages.length === 1 ? "columns: 1" : "columns: 2";
		},

		imageWidth() {
			return this.$store.state.noteImages.length === 1 ? "rem-50" : "rem-24";
		},

		rotateArrow() {
			return this.fontDropdownVisible ? "transform: rotate(180deg)" : "transform: rotate(0)";
		},

		trashIsOpen() {
			return this.activePageName === "trash" ? true : false; 
		},

		currentTitle: {
			get() {
				return this.$store.state.noteTitle;
			},
			set(title) {
				this.$store.commit("currentTitle", title);
			}
		},

		currentNote: {
			get() {
				return this.$store.state.noteText;
			},
			set(note) {
				this.$store.commit("currentNote", note);
			}
		}
	}
}
</script>

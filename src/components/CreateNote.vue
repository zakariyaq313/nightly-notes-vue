<template>
    <!-- Note dialog -->
    <form :class="formClasses">
      <div class="upper-half">
        <div class="action-buttons">
          <button @click.prevent="hideForm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          </button>

          <button @click.prevent="toggleFavourite"
            :disabled="$store.state.isNoteEmpty || trashIsOpen"
            class="favourite-button">
            <svg v-if="!$store.state.noteIsFavourite" class="favourite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.66 3.99c-2.64-1.8-5.9-.96-7.66 1.1-1.76-2.06-5.02-2.91-7.66-1.1-1.4.96-2.28 2.58-2.34 4.29-.14 3.88 3.3 6.99 8.55 11.76l.1.09c.76.69 1.93.69 2.69-.01l.11-.1c5.25-4.76 8.68-7.87 8.55-11.75-.06-1.7-.94-3.32-2.34-4.28zM12.1 18.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
            <svg v-if="$store.state.noteIsFavourite" class="unfavourite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"/></svg>
          </button>
        </div>

        <!-- Note images -->
        <div v-if="imagesPresent" class="images" :style="imageColumn" @click="hidePalette">
          <div v-for="(image, index) in $store.state.noteImages" :key="index" class="image">
            <img :src="image" :class="imageWidth">

            <!-- Delete image button -->
            <button @click.prevent="deleteImage(index)" class="delete-image" :disabled="trashIsOpen">
              <svg viewBox="0 0 24 24"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
            </button>
          </div>
        </div>

        <div class="user-inputs">
          <!-- Note title -->
          <input type="text" placeholder="Title" :disabled="trashIsOpen" v-model="currentTitle" @focus="closeOtherActions" @keydown="enterTextarea" spellcheck="false">
          <!-- Note text -->
          <textarea placeholder="Your note" :disabled="trashIsOpen" v-model="currentNote" @focus="closeOtherActions" ref="textarea" spellcheck="false"></textarea>
          <!-- Hidden image upload button -->
          <input @change="imageUpload" ref="uploadImage" type="file" accept="image/*" style="display: none;">
        </div>      
      </div>
        
      <div class="lower-half">
        <div class="note-options">
          <span v-if="!trashIsOpen" @click="toggleFontDropdown" class="font-select-button">
            Font family
            <svg :style="rotateArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
          </span>

          <!-- Image upload button -->
          <button v-if="!trashIsOpen" @click.prevent="uploadButtonClicked" title="Image">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/></svg>
          </button>

          <!-- Theme change button -->
          <button v-if="!trashIsOpen" @click.prevent="togglePalette" title="Background colour">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><g><rect fill="none" height="24" width="24"/></g><g><g><g><g><path d="M12,22C6.49,22,2,17.51,2,12S6.49,2,12,2s10,4.04,10,9c0,3.31-2.69,6-6,6h-1.77c-0.28,0-0.5,0.22-0.5,0.5 c0,0.12,0.05,0.23,0.13,0.33c0.41,0.47,0.64,1.06,0.64,1.67C14.5,20.88,13.38,22,12,22z M12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8 c0.28,0,0.5-0.22,0.5-0.5c0-0.16-0.08-0.28-0.14-0.35c-0.41-0.46-0.63-1.05-0.63-1.65c0-1.38,1.12-2.5,2.5-2.5H16 c2.21,0,4-1.79,4-4C20,7.14,16.41,4,12,4z"/><circle cx="6.5" cy="11.5" r="1.5"/><circle cx="9.5" cy="7.5" r="1.5"/><circle cx="14.5" cy="7.5" r="1.5"/><circle cx="17.5" cy="11.5" r="1.5"/></g></g></g></g></svg>
          </button>

          <!-- Delete note button -->
          <button v-if="!trashIsOpen" @click.prevent="removeNote" :disabled="$store.state.isNoteEmpty" title="Delete" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
          </button>

          <button v-if="trashIsOpen" @click.prevent="deleteSingleNote" title="Delete forever">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
          </button>

          <button v-if="trashIsOpen" @click.prevent="restoreNote" title="Restore">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
          </button>

          <ul v-if="fontDropdownVisible" class="font-selection-dropdown">
            <li v-for="(fontStyle, index) in fontStyles"
            :key="index"
            :class="fontClasses(fontStyle.class)"
            @click="fontChange(fontStyle.class)">
              {{ fontStyle.name }}
            </li>
          </ul>

          <!-- Theme colour palette -->
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
export default {
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

  emits: ["toggle-font-dropdown",
          "hide-font-dropdown",
          "toggle-palette",
          "hide-palette",
          "delete-note",
          "is-theme-gradient"],

  data() {
    return {
      fontStyles: [
        {
          name: "Roboto",
          class: "roboto"
        },

        {
          name: "Montserrat",
          class: "montserrat"
        },

        {
          name: "Comfortaa",
          class: "comfortaa"
        },

        {
          name: "Major Mono",
          class: "major-mono-display"
        },

        {
          name: "Source Code Pro",
          class: "source-code-pro"
        },

        {
          name: "Poppins",
          class: "poppins"
        },

        {
          name: "Raleway",
          class: "raleway"
        },

        {
          name: "Pacifico",
          class: "pacifico"
        },

        {
          name: "Hi Melody",
          class: "hi-melody"
        },

        {
          name: "Patrick Hand",
          class: "patrick-hand"
        },

        {
          name: "Freckle Face",
          class: "freckle-face"
        },

        {
          name: "Permanent Marker",
          class: "permanent-marker"
        },
      ],
      themeColours: ["dark", "pink", "orange", "green", "purple", "brown", "gray"],
      themeGradients: ["greenery", "sublime-vivid", "dimigo", "reef", "light-purple", "witching-hour", "titanium"],
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
      this.$store.commit("formVisibility", false);
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
      let classes = [this.$store.state.noteTheme, //theme
                    this.$store.state.noteFont, //font
                    this.$store.state.isFormVisible ? "form-visible" : ""]; //visibility      
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

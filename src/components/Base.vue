<template>
  <div>
    <nav class="navbar">
      <div class="page-label">
        <slot name="page-label">
          <span class="logo"><b>Notes</b><b>Mini</b></span>
        </slot>
      </div>

      <div>
        <slot name="action-button">
          <button class="create-note-btn comical-shadow-clickable" @click="showForm" :disabled="activePage === 'favourites'">
            <span class="rising-background">
              <svg viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"/></g></svg>
              New note
            </span>
            <!-- Reason for choosing empty span tags over ::before, ::after 👇 -->
            <!-- Hover effect ka chakkar hai babu bhaiya, hover effect ka chakkar 😩 -->
            <span></span>
            <span></span>
          </button>
        </slot>
      </div>
    </nav>

    <div v-if="notesUnavailable" class="notes-unavailable">
      <slot name="notes-unavailable">
        <img class="desktop-home" src="@/assets/empty.svg" alt="No notes found">
        <h2 class="desktop-home">No notes found</h2>
      
        <h2 class="mobile-home">No notes found Please create one
          <img class="emoji" src="data:image/png;base64,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">
        </h2>
      </slot>
    </div>

    <div @click="closeNote" :class="['overlay', overlayVisible]"></div>
    <div :class="['background-blur', blurOverlayClasses]"></div>
    <slot name="confirm-deletion"></slot>

    <create-note
      :activePageName="activePage"
      :fontDropdownVisible="isFontDropdownVisible"
      :paletteVisible="isPaletteVisible"
      @toggle-font-dropdown="toggleFontSelect"
      @hide-font-dropdown="hideFontSelect"
      @toggle-palette="toggleThemeSelect"
      @hide-palette="hideThemeSelect"
      @delete-note="confirmDeleteAmount"
      @is-theme-gradient="themeIsGradient">
    </create-note>

    <div class="notes">
      <note
        v-for="note in notes"
        :key="note.id"
        :id="note.id"
        :title="note.title"
        :text="note.text"
        :images="note.images"
        :theme="note.theme"
        :font="note.font"
        :favourite="note.favourite">
      </note>
    </div>

    <footer>
      <p>
        Created by <a class="rising-background" href="https://zakariyaq313.github.io/my_website/" target="_blank" rel="noopener">Muhammad Zakariya</a>
      </p>
    </footer>
  </div>
</template>

<script>
import CreateNote from "./CreateNote.vue";
import Note from "./Note.vue";

export default {
  name: "Base",

  components: {
    "create-note": CreateNote,
    "note": Note,
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
      let classes = [this.$store.state.noteTheme, //theme colour
                    this.$store.state.isFormVisible && this.isThemeGradient ? "blur-visible" : ""]; //visibility      
      return classes;
    }
  }
};
</script>

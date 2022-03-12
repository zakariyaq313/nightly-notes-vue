<template>
  <main>
    <nav class="navbar">
      <div>
        <span v-if="activePage === 'home'" class="logo"><b>Notes</b><b>Mini</b></span>
        <b v-if="activePage === 'favourites'">Favourites</b>
        <b v-if="activePage === 'trash'">Trash</b>
      </div>

      <div v-if="activePage !== 'trash'">
        <button class="create-note-btn comical-shadow-clickable" @click="showForm" :disabled="activePage === 'favourites'">
          <span>
            <svg viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"/></g></svg>
            New note
          </span>
          <!-- Pseudo elements misbehave during transition, hence empty span -->
          <span></span>
          <span></span>
        </button>
      </div>

      <div v-if="activePage === 'trash'">
        <button class="empty-trash comical-shadow-clickable" @click="confirmDeletion('delete-all')" :disabled="$store.state.trashedNotes.length <= 0">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
            Empty trash
          </span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <nav :class="['navigation-buttons', focusPage]">
      <button class="home" title="Home" @click="switchPage('home')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24"><rect fill="none" height="24" width="24"/><path d="M12,3L1,11.4l1.21,1.59L4,11.62V21h16v-9.38l1.79,1.36L23,11.4L12,3z M18,19H6v-8.9l6-4.58l6,4.58V19z M9,14 c0,0.55-0.45,1-1,1s-1-0.45-1-1c0-0.55,0.45-1,1-1S9,13.45,9,14z M12,13c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1 C11,13.45,11.45,13,12,13z M15,14c0-0.55,0.45-1,1-1s1,0.45,1,1c0,0.55-0.45,1-1,1S15,14.55,15,14z"/></svg>
      </button>

      <button class="favourites" title="Favourites" @click="switchPage('favourites')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.66 3.99c-2.64-1.8-5.9-.96-7.66 1.1-1.76-2.06-5.02-2.91-7.66-1.1-1.4.96-2.28 2.58-2.34 4.29-.14 3.88 3.3 6.99 8.55 11.76l.1.09c.76.69 1.93.69 2.69-.01l.11-.1c5.25-4.76 8.68-7.87 8.55-11.75-.06-1.7-.94-3.32-2.34-4.28zM12.1 18.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
      </button>

      <button class="trash" title="Trash" @click="switchPage('trash')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
      </button>
    </nav>

    <div v-if="notesUnavailable" class="notes-unavailable">
      <img v-if="activePage === 'home'" class="desktop-home" src="@/assets/empty.svg" alt="No notes found">
      <h2 v-if="activePage === 'home'" class="desktop-home">No notes found</h2>
      
      <h2 v-if="activePage === 'home'" class="mobile-home">You have no notes 
        <img class="emoji" src="data:image/png;base64,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">
      </h2>

      <h2 v-else-if="activePage === 'favourites'">No favourite notes 
        <img class="emoji" src="data:image/png;base64,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">
      </h2>

      <h2 v-else>Trash is empty 
        <img class="emoji" src="data:image/png;base64,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">
      </h2>
    </div>

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

    <div @click="closeNote" :class="['overlay', overlayVisible]"></div>
    <div :class="['background-blur', blurOverlayClasses]"></div>

    <div @click="closeNote" :class="['delete-confirm', deleteConfirmVisible]">
      <div class="confirmation-dialog">
        <strong>{{ deletionWarningText }}</strong>
        <div class="delete-confirm-buttons">
          <button @click="cancelDelete">Cancel</button>
          <button @click="deleteConfirmed">{{ deleteButtonText }}</button>
        </div>
      </div>
    </div>
    
    <create-note
      :activePageName="activePage"
      :fontDropdownVisible="isFontDropdownVisible"
      :paletteVisible="isPaletteVisible"
      @toggle-font-dropdown="toggleFontSelect"
      @hide-font-dropdown="hideFontSelect"
      @toggle-palette="toggleThemeSelect"
      @hide-palette="hideThemeSelect"
      @delete-note="confirmDeletion"
      @is-theme-gradient="themeIsGradient">
    </create-note>

    <footer>
      <p>
        Created by <a href="https://zakariyaq313.github.io/my_website/" target="_blank" rel="noopener">Muhammad Zakariya</a>
      </p>
    </footer>
  </main>
</template>

<script>
import CreateNote from "./components/CreateNote.vue";
import Note from "./components/Note.vue";

export default {
  name: "App",
  components: {
    "create-note": CreateNote,
    "note": Note,
  },

  data() {
    return {
      activePage: "home",
      focusPage: "focus-home",
      isPaletteVisible: false,
      isFontDropdownVisible: false,
      isThemeGradient: false,
      confirmDeleteToggle: false,
      deleteAmount: "",
      deletionWarningText: "",
      deleteButtonText: ""
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
      this.confirmDeleteToggle = false;
      this.$store.dispatch("exitNote", this.activePage);
    },

    confirmDeletion(amount) {
      this.confirmDeleteToggle = true;
      this.deleteAmount = amount;
    },

    deleteConfirmed() {
      this.$store.dispatch("emptyTrash", this.deleteAmount);
      this.confirmDeleteToggle = false;
    },

    cancelDelete() {
      this.confirmDeleteToggle = false;
      this.$store.commit("resetNote");
    },

    switchPage(page) {
      switch (page) {
        case "favourites":
          this.activePage = "favourites";
          this.focusPage = "focus-favourites";
          break;
        case "trash":
          this.activePage = "trash";
          this.focusPage = "focus-trash";
          break;
        default:
          this.activePage = "home";
          this.focusPage = "focus-home";
          break;
      }
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
    },

    deleteConfirmVisible() {
      return this.confirmDeleteToggle ? "delete-confirm-visible" : "";
    }
  },

  watch: {
    deleteAmount() {
      if (this.deleteAmount === "delete-one") {
        this.deletionWarningText = "Are you sure you want to delete this note?";
        this.deleteButtonText = "Delete";
      } else {
        this.deletionWarningText = "Are you sure you want to delete all notes?";
        this.deleteButtonText = "Delete all"
      }
    }
  }
};
</script>

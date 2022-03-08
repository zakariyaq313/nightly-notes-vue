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
      <img v-if="activePage === 'home'" src="@/assets/empty.svg" alt="No notes found">
      <h2 v-if="activePage === 'home'">No notes found</h2>
      <h2 v-else-if="activePage === 'favourites'">No favourite notes <img class="emoji" src="@/assets/broken-heart.png"></h2>
      <h2 v-else>Trash is empty <img class="emoji" src="@/assets/sparkles.png"></h2>
      <h2></h2>
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

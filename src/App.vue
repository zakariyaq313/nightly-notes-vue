<template>
  <main>
    <nav>
      <div>
        <img src="@/assets/notes.png" alt="Notes icon">
        <b>Notes</b>
      </div>

      <div>
        <button class="create-note-btn" @click="showForm">
          <svg viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"/></g></svg>
          New note
        </button>

        <button class="search-note">
          <svg viewBox="0 0 513.749 513.749" style="enable-background:new 0 0 513.749 513.749;" xml:space="preserve"><g><path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z"/></g></svg>
        </button>
      </div>
    </nav>

    <div v-if="notesUnavailable" class="notes-unavailable">
      <img src="@/assets/empty.svg" alt="No notes found">
      <h2>No notes found</h2>
    </div>
    
    <div class="notes">
      <user-note
        v-for="userNote in userNotes"
        :key="userNote.id"
        :id="userNote.id"
        :title="userNote.title"
        :note="userNote.note"
        :images="userNote.images"
        :theme="userNote.theme"
        @edit-note="editUserNote">
      </user-note>
    </div>

    <div :class="isFormVisible ? ['overlay'] : []"></div>

    <create-note
      @hide-form="hideForm"
      @note-created="createNewNote"
      @note-updated="updateCurrentNote"
      @delete-note="deleteUserNote"
      :formVisibility="isFormVisible"
      :creatingNewNote="isNewNote"
      :id="noteId"
      :existingTitle="noteTitle"
      :existingNote="noteContent"
      :existingImages="noteImages"
      :existingTheme="noteTheme">
    </create-note>
  </main>
</template>

<script>
import CreateNote from "./components/CreateNote.vue";
import UserNote from "./components/Note.vue";

export default {
  name: "App",
  components: {
    "create-note": CreateNote,
    "user-note": UserNote,
  },

  data() {
    return {
      userNotes: [],
      isFormVisible: false,
      isNewNote: false,
      noteId: "",
      noteTitle: "",
      noteContent: "",
      noteImages: [],
      noteTheme: ""
    };
  },

  methods: {
    showForm() {
      this.isFormVisible = true;
      this.isNewNote = true;
    },

    hideForm(id, noteHasContent) {
      this.isFormVisible = false;
      if (!noteHasContent) {
        this.deleteUserNote(id);
      }
    },

    createNewNote(title, note, images, theme) {
      if (this.isNewNote) {
        if (title.trim() !== "" || note.trim() !== "" || images.length > 0) {
          this.userNotes.unshift({
            id: new Date().toISOString(),
            title: title,
            note: note,
            images: [...images],
            theme: theme
          });
          this.isFormVisible = false;
        } else {
          this.isFormVisible = false;
        }
      }
    },

    findNote(id) {
      let noteFound = this.userNotes.find((note) => note.id === id);
      return noteFound;
    },

    editUserNote(id) {
      this.isNewNote = false;
      this.noteId = id;
      this.noteTitle = this.findNote(id).title;
      this.noteContent = this.findNote(id).note;
      this.noteImages = this.findNote(id).images;
      this.noteTheme = this.findNote(id).theme;
      this.isFormVisible = true;
    },

    deleteUserNote(id) {
      this.userNotes = this.userNotes.filter((note) => note.id !== id);
      this.isFormVisible = false;
    },

    updateCurrentNote(id, updatedTitle, updatedNote, updatedImages, updatedTheme) {
      let noteToUpdate = this.findNote(id);
      Object.assign(noteToUpdate, {
        title: updatedTitle, 
        note: updatedNote, 
        images: updatedImages, 
        theme: updatedTheme
      });
      this.isFormVisible = false;
    },
  },

  computed: {
    notesUnavailable() {
      if(this.userNotes.length <= 0 && !this.isFormVisible ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 62.5%;
  --lighter: #dfe4ec;
  --light: #a6b5c9;
  --dark: #131820;
  --darker-1: #0f141a;
  --darker-2: #0b0f13;
  --red: #F94144;
  --pink: #EF476F;
  --blue: #118AB2;
  --purple: #8338EC;
  --brown: #B56576;
  --green: #00a896;
  --orange: #f2542d;
  --yellow: #ff9f1c;
  --gray: #8a817c;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: var(--dark);
  color: #fff;
}

// Theme colours
.default {
  background-color: var(--dark);
}

.red {
  background-color: var(--red);
}

.pink {
  background-color: var(--pink);
}

.purple {
  background-color: var(--purple);
}

.blue {
  background-color: var(--blue);
}

.green {
  background-color: var(--green);
}

.yellow {
  background-color: var(--yellow);
}

.orange {
  background-color: var(--orange);
}

.brown {
  background-color: var(--brown);
}

.gray {
  background-color: var(--gray);
}

// theme colours end

button {
  cursor: pointer;
  line-height: 0;
}

nav {
  width: 100vw;
  justify-content: space-between;
  padding: 3rem;

  svg {
    height: 1.2rem;
  }
}

nav div {
  &:first-of-type {
    gap: 0.8rem;
  }

  &:last-of-type {
    gap: 1rem;
  }

  img {
    height: 3rem;
  }

  b {
    font-size: 2rem;
    font-weight: 400;
  }
}

nav, nav div,
.create-note-btn, 
.search-note {
  display: flex;
  align-items: center;
}

.create-note-btn {
  gap: 0.5rem;
  padding: 0 2rem;
}

.search-note {
  width: 3.5rem;
}

.create-note-btn, .search-note {
    border: none;
    color: #131820;
    background-color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    height: 3.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    justify-content: center;
}

.notes-unavailable {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    height: 35rem;
  }

  h2 {
    font-size: 2.4rem;
    font-weight: 300;
  }
}

.notes {
  padding: 5rem 10rem;
  columns: 4;
  column-gap: 2rem;
  row-gap: 2rem;
}

.overlay {
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
}
</style>

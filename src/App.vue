<template>
  <main>
    <button class="create-note-btn" @click="showForm">
      <i class="material-icons">add_circle</i>
    </button>

    <user-note
      v-for="(userNote, index) in userNotes"
      :key="index"
      :id="index"
      :title="userNote.title"
      :note="userNote.note"
      :image="userNote.image"
      @edit-note="editUserNote">
    </user-note>

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
      :existingImage="noteImage">
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
      noteId: null,
      noteTitle: "",
      noteContent: "",
      noteImage: ""
    };
  },

  methods: {
    showForm() {
      this.isFormVisible = true;
      this.isNewNote = true;
    },

    hideForm() {
      this.isFormVisible = false;
    },

    createNewNote(title, note, image) {
      if (this.isNewNote) {
        if (title.trim() !== "" || note.trim() !== "" || image.trim() !== "") {
          this.userNotes.push({title: title, note: note, image: image});
          this.isFormVisible = false;
        } else {
          this.isFormVisible = false;
        }
      }
    },

    editUserNote(index) {
      this.isNewNote = false;
      this.noteId = index;
      this.noteTitle = this.userNotes[index].title;
      this.noteContent = this.userNotes[index].note;
      this.noteImage = this.userNotes[index].image;
      this.isFormVisible = true;
    },

    deleteUserNote(index) {
      this.userNotes.splice(index, 1);
      this.isFormVisible = false;
    },

    updateCurrentNote(updatedTitle, updatedNote, updatedImage, index) {
      let noteFound = this.userNotes.find(note => this.userNotes.indexOf(note) === index);
      Object.assign(noteFound, {title: updatedTitle, note: updatedNote, image: updatedImage});
      this.isFormVisible = false;
    }
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 62.5%;
}

body {
  font-family: "Open Sans", sans-serif;
}

main {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: self-start;
  align-items: center;
  padding: 2rem;
}

.create-note-btn {
    background-color: #000;
    padding: 5.2rem 3.2rem;
    line-height: 0;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    border: 1px solid #000;
}

.create-note-btn:hover {
    filter: invert(1);
    border-color: #fff;
}

.create-note-btn i {
    font-size: 6.2rem;
}
</style>

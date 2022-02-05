<template>
    <form v-if="formVisibility">
        <i v-if="noteHasContent" class="material-icons delete" @click="deleteNote">delete</i>
        <input type="text" name="" id="" placeholder="Title" v-model="titleText">
        <textarea name="" id="" cols="30" rows="10" placeholder="Your note" v-model="noteText"></textarea>
        <input type="file" name="" id="" accept="image/*" @change="imageUploaded">
        
        <img v-if="imageUrl !== ''" :src="imageUrl">
        <div>
            <button @click="hideForm">Cancel</button>
            <button class="add-note-btn" 
                    :disabled="!noteHasContent" 
                    @click.prevent="creatingNewNote ? createNote() : updateNote()">
                    Save
            </button>
        </div>
    </form>
</template>

<script>
export default {
  name: "CreateNote",
  props: {
    formVisibility: {
      type: Boolean,
      required: true
    },

    creatingNewNote: {
      type: Boolean
    },

    id: {
      type: Number
    },

    existingTitle: {
      type: String
    },

    existingNote: {
      type: String
    },

    existingImage: {
      type: String
    }
  },
  emits: [
    "hide-form",
    "note-created",
    "note-updated",
    "delete-note"
  ],
  data() {
    return {
      titleText: "",
      noteText: "",
      imageUrl: "",
    }
  },

  methods: {
    hideForm() {
      this.$emit("hide-form");
    },

    createNote() {
      this.$emit("note-created", this.titleText, this.noteText, this.imageUrl);
    },

    updateNote() {
      this.$emit("note-updated", this.titleText, this.noteText, this.imageUrl, this.id);
    },

    deleteNote() {
      this.$emit("delete-note", this.id);
    },

    imageUploaded(e) {
      this.imageUrl = URL.createObjectURL(e.target.files[0]);
    },
  },

  computed: {
    noteHasContent() {
      if (this.titleText.trim() !== "" || this.noteText.trim() !== "" || this.imageUrl.trim() !== "") {
        return true;
      } else {
        return false;
      }
    }
  },

  watch: {
    formVisibility() {
      if (this.creatingNewNote) {
        this.titleText = "";
        this.noteText = "";
        this.imageUrl = "";
      } else {
        this.titleText = this.existingTitle;
        this.noteText = this.existingNote;
        this.imageUrl = this.existingImage;
      }
    }
  }
}
</script>

<style lang="scss">
form {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  background-color: pink;

  input,
  textarea,
  button {
    font-family: inherit;
  }

  button[disabled] {
    opacity: 0.8;
    cursor: not-allowed;
  }
}

img {
  height: 100px;
}
</style>

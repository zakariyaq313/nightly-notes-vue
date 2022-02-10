<template>
    <form :class="formVisibility ? ['form-visible'] : []">
      <div class="upper-half">
        <div class="action-buttons">
          <button @click.prevent="hideForm">
            <svg viewBox="0 0 512.021 512.021" style="enable-background:new 0 0 512.021 512.021;" xml:space="preserve"><g><path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"/></g></svg>
          </button>

          <button @click.prevent="creatingNewNote ? createNote() : updateNote()"
            :disabled="!noteHasContent"
            class="add-note-button">
            Save
          </button>
        </div>

        <div v-if="imagesPresent" class="images" :style="imageColumn">
          <div v-for="(imageBlob, index) in imageBlobs" :key="index" class="image">
            <img :src="imageBlob" :style="imageWidth">

            <button @click.prevent="creatingNewNote ? deleteNewImage(index) : deleteExistingImage(index)" class="delete-image">
              <svg viewBox="0 0 24 24"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
            </button>
          </div>
        </div>

        <div class="user-inputs">
          <input type="text" placeholder="Title" v-model="titleText">
          <textarea placeholder="Your note" v-model="noteText"></textarea>
          <input ref="uploadImage" type="file" accept="image/*" @change="imageUploaded">
        </div>      
      </div>
        
      <div class="lower-half">
        <div class="note-options">
          <button @click.prevent class="undo" title="Undo">
            <!-- <svg viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M448,468.245c0-53.019-42.981-96-96-96H231.083v35.84c-0.05,26.085-21.237,47.191-47.322,47.141  c-13.054-0.025-25.516-5.452-34.427-14.992L16.597,297.408c-22.124-24.02-22.124-60.994,0-85.013L149.333,69.568  c17.742-19.122,47.627-20.241,66.749-2.499c9.639,8.943,15.113,21.499,15.107,34.648v35.861h78.144  C421.209,137.708,511.871,228.369,512,340.245v128c0,17.673-14.327,32-32,32S448,485.918,448,468.245z M448,340.245L448,340.245  c-0.094-76.544-62.122-138.573-138.667-138.667H199.083c-17.673,0-32-14.327-32-32v-25.6L63.509,253.867l103.573,111.531v-25.152  c0-17.673,14.327-32,32-32H352c34.637-0.043,68.342,11.214,96,32.064V340.245z"/></svg> -->
            <svg viewBox="0 0 24 24"><path d="M23,24a1,1,0,0,1-1-1,6.006,6.006,0,0,0-6-6H10.17v1.586A2,2,0,0,1,6.756,20L.877,14.121a3,3,0,0,1,0-4.242L6.756,4A2,2,0,0,1,10.17,5.414V7H15a9.01,9.01,0,0,1,9,9v7A1,1,0,0,1,23,24ZM8.17,5.414,2.291,11.293a1,1,0,0,0,0,1.414L8.17,18.586V16a1,1,0,0,1,1-1H16a7.984,7.984,0,0,1,6,2.714V16a7.008,7.008,0,0,0-7-7H9.17a1,1,0,0,1-1-1Z"/></svg>
          </button>

          <button @click.prevent class="redo" title="Redo">
            <!-- <svg viewBox="0 0 24 24"><path d="M1.5,23.449a1.5,1.5,0,0,1-1.5-1.5v-6a9.511,9.511,0,0,1,9.5-9.5h3.664V4.768A2.214,2.214,0,0,1,17,3.261l6.217,6.695a2.941,2.941,0,0,1,0,3.985L17,20.636a2.214,2.214,0,0,1-3.837-1.507v-1.68H7.5a4.5,4.5,0,0,0-4.5,4.5A1.5,1.5,0,0,1,1.5,23.449Zm6-9h7.164a1.5,1.5,0,0,1,1.5,1.5v1.179L21.019,11.9,16.164,6.747v1.2a1.5,1.5,0,0,1-1.5,1.5H9.5a6.508,6.508,0,0,0-6.5,6.5v0A7.458,7.458,0,0,1,7.5,14.449ZM14.8,5.3l.008.008Z"/></svg> -->
            <svg viewBox="0 0 24 24"><path d="M0,23V16A9.01,9.01,0,0,1,9,7h4.83V5.414A2,2,0,0,1,17.244,4l5.88,5.879a3,3,0,0,1,0,4.242L17.244,20a2,2,0,0,1-3.414-1.414V17H8a6.006,6.006,0,0,0-6,6,1,1,0,0,1-2,0ZM15.83,8a1,1,0,0,1-1,1H9a7.008,7.008,0,0,0-7,7v1.714A7.984,7.984,0,0,1,8,15h6.83a1,1,0,0,1,1,1v2.586l5.879-5.879a1,1,0,0,0,0-1.414L15.83,5.414Z"/></svg>
          </button>

          <button @click.prevent="uploadButtonClicked" title="Image">
            <!-- <svg viewBox="0 0 24 24"><path d="M19.5,0H4.5A4.505,4.505,0,0,0,0,4.5v15A4.505,4.505,0,0,0,4.5,24h15A4.505,4.505,0,0,0,24,19.5V4.5A4.505,4.505,0,0,0,19.5,0ZM4.5,3h15A1.5,1.5,0,0,1,21,4.5v15a1.492,1.492,0,0,1-.44,1.06l-8.732-8.732a4,4,0,0,0-5.656,0L3,15V4.5A1.5,1.5,0,0,1,4.5,3Z"/><circle cx="15.5" cy="7.5" r="2.5"/></svg> -->
            <svg viewBox="0 0 24 24"><path d="M19,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V5A5.006,5.006,0,0,0,19,0ZM5,2H19a3,3,0,0,1,3,3V19a2.951,2.951,0,0,1-.3,1.285l-9.163-9.163a5,5,0,0,0-7.072,0L2,14.586V5A3,3,0,0,1,5,2ZM5,22a3,3,0,0,1-3-3V17.414l4.878-4.878a3,3,0,0,1,4.244,0L20.285,21.7A2.951,2.951,0,0,1,19,22Z"/><path d="M16,10.5A3.5,3.5,0,1,0,12.5,7,3.5,3.5,0,0,0,16,10.5Zm0-5A1.5,1.5,0,1,1,14.5,7,1.5,1.5,0,0,1,16,5.5Z"/></svg>
          </button>

          <button @click.prevent class="palette" title="Background">
            <!-- <svg viewBox="0 0 24 24"><circle cx="16" cy="8" r="2"/><circle cx="9" cy="8" r="2"/><circle cx="8" cy="15" r="2"/><path d="M24.036,10.928A12.144,12.144,0,0,0,12.5.008,12,12,0,1,0,12.083,24c.338,0,.669-.022,1-.049a1.5,1.5,0,0,0,1.376-1.508l-.03-3.425a2.859,2.859,0,0,1,4.88-2.047l.1.1a2.38,2.38,0,0,0,2.19.644A2.344,2.344,0,0,0,23.3,16.25,11.909,11.909,0,0,0,24.036,10.928Zm-3.249,3.366a5.86,5.86,0,0,0-9.359,4.75l.017,1.933A9,9,0,0,1,12.082,3c.1,0,.212,0,.318.006a9.105,9.105,0,0,1,8.648,8.185A8.964,8.964,0,0,1,20.787,14.294Z"/></svg> -->
            <svg viewBox="0 0 24 24"><path d="M17.115,8.05A1.5,1.5,0,1,0,18.95,9.115,1.5,1.5,0,0,0,17.115,8.05Z"/><path d="M12.115,5.05A1.5,1.5,0,1,0,13.95,6.115,1.5,1.5,0,0,0,12.115,5.05Z"/><path d="M7.115,8.05A1.5,1.5,0,1,0,8.95,9.115,1.5,1.5,0,0,0,7.115,8.05Z"/><path d="M7.115,14.05A1.5,1.5,0,1,0,8.95,15.115,1.5,1.5,0,0,0,7.115,14.05Z"/><path d="M12.5.007A12,12,0,0,0,.083,12a12.014,12.014,0,0,0,12,12c.338,0,.67-.022,1-.05a1,1,0,0,0,.916-1l-.032-3.588A3.567,3.567,0,0,1,20.057,16.8l.1.1a1.912,1.912,0,0,0,1.769.521,1.888,1.888,0,0,0,1.377-1.177A11.924,11.924,0,0,0,24.08,11.7,12.155,12.155,0,0,0,12.5.007Zm8.982,15.4-.014-.014a5.567,5.567,0,0,0-9.5,3.985L11.992,22a10,10,0,0,1,.09-20c.117,0,.235,0,.353.006a10.127,10.127,0,0,1,9.645,9.743A9.892,9.892,0,0,1,21.485,15.4Z"/></svg>
          </button>

          <button @click.prevent class="pin" title="Pin">
            <!-- <svg viewBox="0 0 24 24"><path d="M1.5,24.008a1.492,1.492,0,0,0,1.061-.44l5.95-5.954.728.753a5.291,5.291,0,0,0,3.7,1.64,4.241,4.241,0,0,0,1.417-.241,3.932,3.932,0,0,0,2.606-3.334,8.337,8.337,0,0,0-.213-2.94l-.042-.2,3.388-3.387.452.453a2.049,2.049,0,0,0,2.621.292,1.992,1.992,0,0,0,.254-3.026L16.455.641A2.049,2.049,0,0,0,13.834.349a1.992,1.992,0,0,0-.254,3.026L14.1,3.9,10.72,7.281a8.382,8.382,0,0,0-3.009-.227A4.1,4.1,0,0,0,4.253,9.8a4.221,4.221,0,0,0,.977,4.423l1.2,1.236L.439,21.448A1.5,1.5,0,0,0,1.5,24.008ZM7.081,10.8a1.112,1.112,0,0,1,.942-.762,5.45,5.45,0,0,1,1.955.15l.829.211a1.5,1.5,0,0,0,1.431-.393L16.22,6.022l1.754,1.76L14.01,11.747a1.5,1.5,0,0,0-.407,1.369l.225,1.063a5.437,5.437,0,0,1,.148,1.942.909.909,0,0,1-.625.817,1.961,1.961,0,0,1-1.973-.675L7.37,12.118A1.252,1.252,0,0,1,7.081,10.8Z"/></svg> -->
            <svg viewBox="0 0 24 24"><path d="M1,24a1,1,0,0,0,.707-.293l6.619-6.619L9.574,18.38a5.169,5.169,0,0,0,3.605,1.614,3.991,3.991,0,0,0,1.339-.227,3.63,3.63,0,0,0,2.435-3.122,8.486,8.486,0,0,0-.222-3.027l-.214-1.042a1,1,0,0,1,.264-.943l1.587-1.588a.34.34,0,0,1,.236-.1.17.17,0,0,1,.167.065,3.077,3.077,0,0,0,3.971.432,3,3,0,0,0,.379-4.565L18.2.954a3.085,3.085,0,0,0-3.938-.4,3,3,0,0,0-.38,4.565l.076.076a.308.308,0,0,1,0,.434l-1.6,1.6a1,1,0,0,1-.954.261l-.817-.209a8.632,8.632,0,0,0-3.082-.233A3.863,3.863,0,0,0,4.25,9.634a4,4,0,0,0,.928,4.2l1.758,1.82L.293,22.293A1,1,0,0,0,1,24ZM6.135,10.3A1.856,1.856,0,0,1,7.713,9.036,6.7,6.7,0,0,1,8.406,9a6.622,6.622,0,0,1,1.681.217l.823.21a3.01,3.01,0,0,0,2.862-.785l1.6-1.6a2.31,2.31,0,0,0,0-3.262l-.076-.076a1,1,0,0,1,.134-1.528,1.084,1.084,0,0,1,1.356.19l4.924,4.924h0a1,1,0,0,1-.134,1.528,1.085,1.085,0,0,1-1.368-.2,2.212,2.212,0,0,0-1.584-.672,2.4,2.4,0,0,0-1.667.684l-1.586,1.587a3,3,0,0,0-.8,2.8l.219,1.058a6.646,6.646,0,0,1,.181,2.366,1.655,1.655,0,0,1-1.115,1.444,2.8,2.8,0,0,1-2.85-.9l-4.4-4.55A2.027,2.027,0,0,1,6.135,10.3Z"/></svg>
          </button>

          <button @click.prevent="deleteNote" :disabled="!noteHasContent" class="delete" title="Delete">
            <!-- <svg viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M490.667,96c0-17.673-14.327-32-32-32h-80.555C364.632,25.757,328.549,0.13,288,0h-64   c-40.549,0.13-76.632,25.757-90.112,64H53.333c-17.673,0-32,14.327-32,32l0,0c0,17.673,14.327,32,32,32H64v266.667   C64,459.468,116.532,512,181.333,512h149.333C395.468,512,448,459.468,448,394.667V128h10.667   C476.34,128,490.667,113.673,490.667,96z M384,394.667C384,424.122,360.122,448,330.667,448H181.333   C151.878,448,128,424.122,128,394.667V128h256V394.667z"/><path d="M202.667,384c17.673,0,32-14.327,32-32V224c0-17.673-14.327-32-32-32s-32,14.327-32,32v128   C170.667,369.673,184.994,384,202.667,384z"/><path d="M309.333,384c17.673,0,32-14.327,32-32V224c0-17.673-14.327-32-32-32s-32,14.327-32,32v128   C277.333,369.673,291.66,384,309.333,384z"/></g></svg> -->
            <svg viewBox="0 0 24 24"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
          </button>
        </div>
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
      type: String
    },

    existingTitle: {
      type: String
    },

    existingNote: {
      type: String
    },

    existingImages: {
      type: Array
    },
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
      imageBlobs: [],
    }
  },

  methods: {
    hideForm() {
      this.$emit("hide-form");
    },

    createNote() {
      this.$emit("note-created", this.titleText, this.noteText, this.imageBlobs);
    },

    updateNote() {
      this.$emit("note-updated", this.id, this.titleText, this.noteText, this.imageBlobs);
    },

    deleteNote() {
      this.$emit("delete-note", this.id);
    },

    uploadButtonClicked() {
      this.$refs.uploadImage.click();
    },

    imageUploaded(e) {
      this.imageBlobs.push(URL.createObjectURL(e.target.files[0]));
    },

    deleteExistingImage(index) {
      this.$emit("delete-image", this.id, index);
    },

    deleteNewImage(index) {
      this.imageBlobs.splice(index, 1);
    },
  },

  computed: {
    noteHasContent() {
      if (this.titleText.trim() !== "" || this.noteText.trim() !== "" || this.imageBlobs.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    imagesPresent() {
      return this.imageBlobs.length > 0;
    },

    imageColumn() {
      if (this.imageBlobs.length === 1) {
        return "columns: 1";
      } else {
        return "columns: 2";
      }
    },

    imageWidth() {
      if (this.imageBlobs.length === 1) {
        return "width: 50rem";
      } else {
        return "width: 24rem"
      }
    }
  },

  watch: {
    formVisibility() {
      if (this.creatingNewNote) {
        this.titleText = "";
        this.noteText = "";
        this.imageBlobs = [];
      } else {
        this.titleText = this.existingTitle;
        this.noteText = this.existingNote;
        this.imageBlobs = this.existingImages;
      }
    },
  }
}
</script>

<style lang="scss">
form {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  box-shadow: 0 2px 8px var(--darker-2);
  justify-content: space-between;
  min-width: 54rem;
  min-height: 46rem;
  max-height: 90vh;
  overflow: auto;
  padding: 2rem;
  border-radius: 0.5rem;
  opacity: 0;
  transition: opacity 0.5s;
  z-index: -1;

  &,
  .upper-half,
  .lower-half,
  .user-inputs {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }

  .upper-half,
  .action-buttons,
  .user-inputs {
    width: 100%;
  }

  input,
  textarea,
  button {
    font-family: inherit;
    background-color: transparent;
    border: none;
  }

  button[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  svg {
    fill: var(--light);
  }
}

.form-visible {
  opacity: 1;
  z-index: 100;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  button {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--light);

    svg {
      height: 1.4rem;
    }
  }

  .add-note-button {
    padding: 2rem;
    color: var(--dark);
    background-color: #fff;
    border-radius: 10rem;
  }
}

.user-inputs {
  input, textarea {
    width: 100%;
    resize: none;
    color: var(--lighter);

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--light);
    }
  }

  input {
    font-size: 2rem;
  }

  textarea {
    font-size: 1.6rem;
    height: 30rem;
  }

  input[type=file] {
    display: none;
  }
}

.images {
  .image {
    position: relative;
    margin-bottom: 1rem;

    img {
      // max-width: 46rem;

      &:hover ~ .delete-image {
        transform: scale(1);
      }
    }

    .delete-image {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: rgba($color: #131820, $alpha: 0.5);
      transform: scale(0);
      transition: transform 0.2s;

      &:hover {
        transform: scale(1);
      }

      svg {
        height: 2rem;
        fill: var(--lighter);
      }
    }
  }
}

.note-options {
  display: flex;
  gap: 2rem;

  button svg {
    height: 1.6rem;
  }
}
</style>

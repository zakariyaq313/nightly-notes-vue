<template>
  <base-component :activePage="'trash'" @confirm-deletion="confirmDeletion">
    <template v-slot:page-label>
      <b>Trash</b>
    </template>

    <template v-slot:action-button>
      <div>
        <button class="empty-trash comical-shadow-clickable" @click="confirmDeletion('delete-all')" :disabled="$store.state.trashedNotes.length <= 0">
          <span class="rising-background">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
            Empty trash
          </span>
          <span></span>
          <span></span>
        </button>
      </div>
    </template>

    <template v-slot:notes-unavailable>
      <h2>Trash is empty 
        <img class="emoji" src="data:image/png;base64,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">
      </h2>
    </template>

    <template v-slot:confirm-deletion>
      <div @click="closeNote" :class="['delete-confirm', deleteConfirmVisible]">
        <div class="confirmation-dialog">
          <strong>{{ deletionWarningText }}</strong>
          <div class="delete-confirm-buttons">
            <button class="rising-background" @click="cancelDelete">Cancel</button>
            <button class="rising-background" @click="deleteConfirmed">{{ deleteButtonText }}</button>
          </div>
        </div>
      </div>
    </template>
  </base-component>
</template>

<script>
import Base from "../Base.vue";

export default {
  name: "Trash",
  components: {
    "base-component": Base
  },

  data() {
    return {
      confirmDeleteToggle: false,
      deleteAmount: "",
      deletionWarningText: "",
      deleteButtonText: ""
    }
  },

  methods: {
    closeNote() {
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
  },

  computed: {
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
}
</script>
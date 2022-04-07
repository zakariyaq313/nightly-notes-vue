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
      <h2 class="trash-info">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" x="0" y="0" viewBox="0 0 512.736 512.736" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path xmlns="http://www.w3.org/2000/svg" d="M238,512.736c0-76.8-128.544-205.344-205.344-205.344c76.8,0,205.344-128.544,205.344-205.344  c0,76.8,128.544,205.344,205.344,205.344C366.544,307.392,238,435.936,238,512.736z" fill="#ffd83b" data-original="#ffd83b"></path><path xmlns="http://www.w3.org/2000/svg" d="M238,388.272c0-30.24-50.64-80.88-80.88-80.88c30.24,0,80.88-50.64,80.88-80.88  c0,30.24,50.64,80.88,80.88,80.88C288.624,307.392,238,358.016,238,388.272z" fill="#f3c432" data-original="#f3c432"></path><g xmlns="http://www.w3.org/2000/svg"><path d="M381.168,226.512c0-36.992-61.92-98.912-98.912-98.912c36.992,0,98.912-61.92,98.912-98.912   c0,36.992,61.92,98.912,98.912,98.912C443.088,127.6,381.168,189.52,381.168,226.512z" fill="#ffd83b" data-original="#ffd83b"></path><path d="M92.976,505.36c0-19.056-31.888-50.944-50.944-50.944c19.056,0,50.944-31.888,50.944-50.944   c0,19.056,31.888,50.944,50.944,50.944C124.864,454.432,92.976,486.32,92.976,505.36z" fill="#ffd83b" data-original="#ffd83b"></path><path d="M158.688,141.408c0-26.448-44.256-70.704-70.704-70.704c26.448,0,70.704-44.256,70.704-70.704   c0,26.448,44.256,70.704,70.704,70.704C202.944,70.704,158.688,114.96,158.688,141.408z" fill="#ffd83b" data-original="#ffd83b"></path></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>
        <span>Trash is empty</span>
      </h2>
    </template>

    <template v-slot:confirm-deletion>
      <div :class="['delete-confirm', deleteConfirmVisible]">
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
      isConfirmDeleteVisible: false,
      deleteAmount: "",
      deletionWarningText: "",
      deleteButtonText: ""
    }
  },

  methods: {
    confirmDeletion(amount) {
      this.isConfirmDeleteVisible = true;
      this.deleteAmount = amount;
    },

    deleteConfirmed() {
      this.$store.dispatch("emptyTrash", this.deleteAmount);
      this.isConfirmDeleteVisible = false;
    },

    cancelDelete() {
      this.isConfirmDeleteVisible = false;
      this.$store.commit("resetNote");
    },
  },

  computed: {
    deleteConfirmVisible() {
      return this.isConfirmDeleteVisible ? "delete-confirm-visible" : "";
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
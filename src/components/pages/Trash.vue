<template>
	<BaseComponent :activePage="'trash'" @confirm-deletion="confirmDeletion">
		<template v-slot:page-label>
			<b>Trash</b>
		</template>

		<template v-slot:action-button>
			<button class="empty-trash comical-shadow-clickable"
				:disabled="$store.state.trashedNotes.length === 0"
				@click="confirmDeletion('all')">
					<span><Trash/>Empty Trash</span>
					<span></span>
					<span></span>
			</button>
		</template>

		<template v-slot:notes-unavailable>
			<span class="trash-info">
				<Sparkles />
				<h2>Trash is empty</h2>
			</span>
		</template>

		<template v-slot:confirm-deletion>
			<div @click.self="cancelDelete" :class="['delete-confirm', deleteConfirmVisible]">
				<div class="confirmation-dialog">
					<strong>{{ deleteWarningText }}</strong>
					<div class="delete-confirm-buttons">
						<button class="rising-background" @click="cancelDelete">Cancel</button>
						<button class="rising-background" @click="deleteConfirmed">{{ deleteButtonText }}</button>
					</div>
				</div>
			</div>
		</template>
	</BaseComponent>
</template>

<script>
import BaseComponent from "../Base.vue";
import Sparkles from '../icons/Sparkles.vue';
import Trash from '../icons/Trash.vue';

export default {
	name: "Trash",
	components: {
		BaseComponent, Trash, Sparkles
	},

	data() {
		return {
			isConfirmDeleteVisible: false,
			deleteAmount: "",
			deleteWarningText: "",
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
			this.$store.commit("noteDialogIsVisible", false);
			this.isConfirmDeleteVisible = false;
		},
		cancelDelete() {
			this.isConfirmDeleteVisible = false;
		},
	},

	computed: {
		deleteConfirmVisible() {
			return this.isConfirmDeleteVisible ? "delete-confirm-visible" : "";
		}
	},

	watch: {
		deleteAmount() {
			if (this.deleteAmount === "one") {
				this.deleteWarningText = "Are you sure you want to delete this note?";
				this.deleteButtonText = "Delete";
			} else {
				this.deleteWarningText = "Are you sure you want to delete all notes?";
				this.deleteButtonText = "Delete all"
			}
		}
	}
}
</script>

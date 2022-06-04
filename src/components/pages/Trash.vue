<template>
	<BaseComponent :activePage="'trash'" @confirm-deletion="confirmDeletion">
		<template v-slot:page-label>
			<b>Trash</b>
		</template>

		<template v-slot:action-button>
			<div>
				<button
					class="empty-trash comical-shadow-clickable"
					@click="confirmDeletion('delete-all')"
					:disabled="$store.state.trashedNotes.length <= 0">
					<span>
						<TrashIcon />
						Empty Trash
					</span>
					<span></span>
					<span></span>
				</button>
			</div>
		</template>

		<template v-slot:notes-unavailable>
			<h2 class="trash-info">
				<SparklesIcon />
				<span>Trash is empty</span>
			</h2>
		</template>

		<template v-slot:confirm-deletion>
			<div @click.self="cancelDelete" :class="['delete-confirm', deleteConfirmVisible]">
				<div class="confirmation-dialog">
					<strong>{{ deletionWarningText }}</strong>
					<div class="delete-confirm-buttons">
						<button
							class="rising-background"
							@click="cancelDelete">
								Cancel
						</button>
						<button
							class="rising-background"
							@click="deleteConfirmed">
								{{ deleteButtonText }}
						</button>
					</div>
				</div>
			</div>
		</template>
	</BaseComponent>
</template>

<script>
import BaseComponent from "../Base.vue";
import SparklesIcon from '../icons/SparklesIcon.vue';
import TrashIcon from '../icons/TrashIcon.vue';

export default {
	name: "Trash",
	components: {
		BaseComponent, TrashIcon, SparklesIcon
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
			this.$store.commit("formVisibility", false);
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

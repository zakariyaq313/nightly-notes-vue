<template>
	<div v-if="noteNotEmpty" @click="editNote" :class="['note', theme, font]">
		<div v-if="noteImagesPresent" :style="imageColumns" class="images">
			<img v-for="image in images" :key="image" :src="image" class="image" />
		</div>

		<h3 v-if="title" class="title">{{ title }}</h3>
		<p class="text">{{ text }}</p>
	</div>
</template>

<script>
export default {
	name: "Note",
	props: {
		id: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		images: {
			type: Array,
			required: true,
		},
		theme: {
			type: String,
			required: true
		},
		font: {
			type: String,
			required: true
		},
		favourite: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		editNote() {
			this.$store.commit({
				type: "editNote",
				id: this.id,
				title: this.title,
				text: this.text,
				images: this.images,
				theme: this.theme,
				font: this.font,
				favourite: this.favourite
			})

			this.$store.commit("noteIsNew", false);
			this.$store.commit("noteDialogIsVisible", true);
		},
	},
	computed: {
		noteNotEmpty() {
			if (this.title !== "" || this.text !== "" || this.images.length > 0) {
				return true;
			}
			return false;
		},
		noteImagesPresent() {
			return this.images.length > 0;
		},
		imageColumns() {
			return this.images.length === 1 ? "columns: 1" : "columns: 2";
		}
	}
};
</script>

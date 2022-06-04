<template>
	<div
		v-if="noteNotEmpty"
		:class="['note', theme, font]"
		@click="editNote">
		
		<div
			class="note-images"
			v-if="noteImagesPresent"
			:style="imageColumns">
			
			<img
				v-for="(image, index) in images"
				:key="index"
				:src="image"
			/>
		</div>
		
		<h3 v-if="title">{{ title }}</h3>
		<p>{{ text }}</p>
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
			this.$store.dispatch({
				type: "fillNoteContent",
				id: this.id,
				title: this.title,
				text: this.text,
				images: this.images,
				theme: this.theme,
				font: this.font,
				favourite: this.favourite
			})

			this.$store.commit("newNote", false);
			this.$store.commit("formVisibility", true);
		},
	},

	computed: {
		noteNotEmpty() {
			if (this.title !== "" || this.text !== "" || this.images.length > 0) {
				return true;
			} else {
				return false;
			}
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

import { createStore } from "vuex";
import { filterNotes, findNote } from "./helperFunctions";

export const store = createStore({
	strict: true,
	state() {
		return {
			userNotes: [],
			favouriteNotes: [],
			trashedNotes: [],
			isNoteEmpty: true,
			isNoteNew: true,
			isNoteDialogVisible: false,
			noteId: "",
			noteTitle: "",
			noteText: "",
			noteImages: [],
			noteTheme: "dark",
			noteFont: "glacial",
			noteIsFavourite: false
		}
	},

	mutations: {
		noteDialogVisibility(state, payload) {
			state.isNoteDialogVisible = payload;
		},
		
		currentTitle(state, payload) {
			state.noteTitle = payload;
		},

		currentNote(state, payload) {
			state.noteText = payload;
		},

		imageUploaded(state, payload) {
			state.noteImages.push(payload);
		},

		createOrTrash(state, payload) {
			const newNote = {
				id: new Date().toISOString(),
				title: state.noteTitle.trim(),
				text: state.noteText,
				images: state.noteImages,
				theme: state.noteTheme,
				font: state.noteFont,
				favourite: state.noteIsFavourite
			}

			if (payload === "create") {
				state.userNotes.unshift(newNote);
			} else if(payload === "trash"){
				state.trashedNotes.unshift(newNote);
			}
		},

		editingNote(state, payload) {
			state.noteId = payload.id;
			state.noteTitle = payload.title;
			state.noteText = payload.text;
			state.noteImages = payload.images;
			state.noteTheme = payload.theme;
			state.noteFont = payload.font;
			state.noteIsFavourite = payload.favourite;
		},

		updateNote(state, payload) {
			const noteFound = payload;
			Object.assign(noteFound, {
				title: state.noteTitle.trim(),
				text: state.noteText,
				images: state.noteImages,
				theme: state.noteTheme,
				font: state.noteFont,
				favourite: state.noteIsFavourite
			});
		},

		resetNote(state) {
			state.noteId = "";
			state.noteTitle = "";
			state.noteText = "";
			state.noteImages = [];
			state.noteTheme = "dark";
			state.noteFont = "glacial";
			state.noteIsFavourite = false;
		},

		trashNote(state, payload) {
			state.trashedNotes.unshift(payload);
			state.favouriteNotes = filterNotes(state.favouriteNotes, payload.id);
			state.userNotes = filterNotes(state.userNotes, payload.id);
		},

		removeEmptyNote(state) {
			state.userNotes = filterNotes(state.userNotes, state.noteId);
		},

		restoreNote(state) {
			const noteFound = findNote(state.trashedNotes, state.noteId);
			state.userNotes.unshift(noteFound);
			state.trashedNotes = filterNotes(state.trashedNotes, noteFound.id);
		},

		deleteNotes(state, payload) {
			if (payload === "one") {
				state.trashedNotes = filterNotes(state.trashedNotes, state.noteId);
			} else if (payload === "all") {
				state.trashedNotes = [];
			}
		},

		setTheme(state, payload) {
			state.noteTheme = payload;
		},

		setFont(state, payload) {
			state.noteFont = payload;
		},

		noteEmpty(state, payload) {
			state.isNoteEmpty = payload;
		},

		newNote(state, payload) {
			state.isNoteNew = payload;
		},

		deleteImages(state, payload) {
			state.noteImages.splice(payload, 1);
		},

		toggleFavouriteStatus(state) {
			state.noteIsFavourite = !state.noteIsFavourite;
		},

		addFavouriteNotes(state) {
			state.favouriteNotes = state.userNotes.filter(note => note.favourite === true);
		},
	},

	actions: {
		fillNoteContent({commit}, payload) {
			commit("editingNote", payload);
		},

		moveToTrash({state, commit}) {
			if (state.isNoteNew) {
				commit("createOrTrash", "trash");
				commit("resetNote");
			} else {
				const noteToTrash = findNote(state.userNotes, state.noteId);
				commit("updateNote", noteToTrash);
				commit("trashNote", noteToTrash);
			}

			commit("resetNote");
			commit("noteDialogVisibility", false);
		},

		moveOutOfTrash({commit}) {
			commit("restoreNote");
			commit("resetNote");
			commit("noteDialogVisibility", false);
			commit("addFavouriteNotes");
		},

		exitNote({state, commit}, page) {
			if (page !== "trash") {
				if (!state.isNoteEmpty) {
					if (state.isNoteNew) {
						commit("createOrTrash", "create");
					} else {
						commit("updateNote", findNote(state.userNotes, state.noteId));
					}
					commit("addFavouriteNotes");
				} else {
					if (!state.isNoteNew) {
						commit("removeEmptyNote");
						commit("addFavouriteNotes");
					}
				}
			}

			commit("resetNote");
			commit("noteDialogVisibility", false);
		},

		emptyTrash({commit}, payload) {
			commit("deleteNotes", payload);
			commit("resetNote");
		},
	}
})

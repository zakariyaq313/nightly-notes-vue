import { createStore } from "vuex";

export const store = createStore({
    strict: true,
    state() {
        return {
            userNotes: [],
            favouriteNotes: [],
            trashedNotes: [],
            isNoteEmpty: true,
            isNoteNew: true,
            isFormVisible: false,
            noteId: "",
            noteTitle: "",
            noteText: "",
            noteImages: [],
            noteTheme: "dark",
            noteFont: "roboto",
            noteIsFavourite: false
        }
    },

    mutations: {
        formVisibility(state, payload) {
            state.isFormVisible = payload;
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
            let collection;
            if (payload === "create") {
                collection = state.userNotes;
            } else if(payload === "trash"){
                collection = state.trashedNotes;
            }

            collection.unshift({
                id: new Date().toISOString(),
                title: state.noteTitle,
                text: state.noteText,
                images: state.noteImages,
                theme: state.noteTheme,
                font: state.noteFont,
                favourite: state.noteIsFavourite
            })
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
            let noteFound = payload;
            Object.assign(noteFound, {
                title: state.noteTitle,
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
            state.noteImages = [],
            state.noteTheme = "dark",
            state.noteFont = "roboto",
            state.noteIsFavourite = false
        },

        trashNote(state, payload) {
            state.trashedNotes.unshift(payload);
            state.favouriteNotes = state.favouriteNotes.filter(note => note.id !== payload.id);
            state.userNotes = state.userNotes.filter(note => note.id !== payload.id);
        },

        removeEmptyNote(state) {
            state.userNotes = state.userNotes.filter(note => note.id !== state.noteId);
        },

        restoreNote(state) {
            let noteFound = state.trashedNotes.find(note => note.id === state.noteId);
            state.userNotes.unshift(noteFound);
            state.trashedNotes = state.trashedNotes.filter(note => note.id !== noteFound.id);
        },

        deleteNotes(state, payload) {
            if (payload === "delete-one") {
                state.trashedNotes = state.trashedNotes.filter(note => note.id !== state.noteId);
            } else if (payload === "delete-all") {
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

    getters: {
        findNote(state) {
            return state.userNotes.find((note) => note.id === state.noteId);
        }
    },

    actions: {
        fillNoteContent({commit}, payload) {
            commit("editingNote", payload);
        },

        moveToTrash({state, getters, commit}) {
            if (state.isNoteNew) {
                commit("createOrTrash", "trash");
                commit("resetNote");
            } else {
                let noteToTrash = getters.findNote;
                commit("updateNote", noteToTrash);
                commit("trashNote", noteToTrash);
            }

            commit("resetNote");
            commit("formVisibility", false);
        },

        moveOutOfTrash({commit}) {
            commit("restoreNote");
            commit("resetNote");
            commit("formVisibility", false);
            commit("addFavouriteNotes");
        },

        exitNote({state, commit, getters}, page) {
            if (page !== "trash") {
                if (!state.isNoteEmpty) {
                    if (state.isNoteNew) {
                      commit("createOrTrash", "create");
                    } else {
                      commit("updateNote", getters.findNote);
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
            commit("formVisibility", false);
        },

        emptyTrash({commit}, payload) {
            commit("deleteNotes", payload);
            commit("resetNote");
        },
    }
})

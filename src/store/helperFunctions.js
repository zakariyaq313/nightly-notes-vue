export function findNote(notes, id) {
    return notes.find(note => note.id === id);
};

export function filterNotes (notes, id) {
    return notes.filter(note => note.id !== id);
};

import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
	state: () => ({
		notes: [],
	}),
	getters: {
		getNotes: ({ notes }) => notes,
		getHasNotes: ({ notes }) => notes.length > 0,
		getNote: ({ notes }) => {
			return (noteID) => notes.find(({ id }) => id === noteID);
		},
	},
	actions: {
		setNotes(notes) {
			this.notes = notes;
		},
		clearNotes() {
			this.$reset();
		},
	},
});

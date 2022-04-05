import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
	state: () => ({
		notes: [],
	}),
	getters: {
		getNotes: ({ notes }) => notes,
		getHasNotes: ({ notes }) => notes.length > 0,
		getNote: ({ notes }) => {
			const result = (noteID) => notes.find(({ id }) => id === noteID);
			return result;
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

import { defineStore } from 'pinia';

export const useEventsStore = defineStore('events', {
	state: () => ({
		events: [],
	}),
	getters: {
		getEvents: ({ events }) => events,
		getEvent: ({ events }) => {
			return (eventID) => events.find(({ id }) => id === eventID);
		},
	},
	actions: {
		setEvents(events) {
			this.events = events;
		},
		clearEvents() {
			this.$reset();
		},
	},
});

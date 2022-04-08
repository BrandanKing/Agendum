import { addDoc, collection, deleteDoc, doc, onSnapshot, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import { db } from 'boot/firebase';
import { useEventsStore } from 'stores/useEventsStore';
import { useUserStore } from 'stores/useUserStore';
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { LoadingBar } from 'quasar';
import { errorToast, successToast } from 'src/utils/NotifyUtil';

export const useEvents = () => {
	const store = useEventsStore();
	const userStore = useUserStore();
	const uid = userStore.getID;

	const getEvents = () => {
		const q = query(collection(db, 'events'), where('uid', '==', uid));

		return new Promise((resolve) => {
			const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
				const events = [];

				querySnapshot.forEach((eventDoc) => {
					const { start: startTimestamp, end: endTimestamp, event, colour } = eventDoc.data();

					const start = new Timestamp(startTimestamp.seconds, startTimestamp.nanoseconds).toMillis();

					const end = new Timestamp(endTimestamp.seconds, endTimestamp.nanoseconds).toMillis();

					const eventObject = {
						id: eventDoc.id,
						title: event,
						start,
						end,
						backgroundColor: colour,
						borderColor: colour,
					};

					events.push(eventObject);
				});

				store.setEvents(events);
				resolve(unsubscribe);
			});
		});
	};

	const createEvent = (event) => {
		let { start, end } = event;

		start = Timestamp.fromDate(new Date(start));
		end = Timestamp.fromDate(new Date(end));

		const newEvent = {
			uid,
			...event,
			start,
			end,
		};
		addDoc(collection(db, 'events'), newEvent);
		successToast(`${event.event} has been added`);
	};

	const updateEvent = (id, values) => {
		const { start, end, ...updatedEvent } = values;

		if (start) updatedEvent.start = Timestamp.fromDate(new Date(start));
		if (end) updatedEvent.end = Timestamp.fromDate(new Date(end));

		const eventRef = doc(db, 'events', id);
		updateDoc(eventRef, updatedEvent);
		successToast('Event successfully Updated');
	};

	const deleteEvent = (id) => {
		deleteDoc(doc(db, 'events', id));
		errorToast('Successfully Deleted');
	};

	return {
		getEvents,
		createEvent,
		updateEvent,
		deleteEvent,
	};
};

export const EventProvider = defineComponent({
	setup(props, { slots }) {
		let unsubscribe;
		const { getEvents } = useEvents();

		LoadingBar.start();

		onMounted(async () => {
			unsubscribe = await getEvents();

			LoadingBar.stop();
		});

		onUnmounted(() => {
			unsubscribe();
		});
		return () => slots.default();
	},
});

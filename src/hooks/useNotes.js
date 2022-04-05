import { defineComponent, onUnmounted, onMounted } from 'vue';
import {
	collection,
	onSnapshot,
	query,
	Timestamp,
	where,
	orderBy,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { date, LoadingBar } from 'quasar';
import { db } from 'src/boot/firebase';
import { useNotesStore } from 'src/stores/useNotesStore';
import { useUserStore } from 'src/stores/useUserStore';
import { errorToast, successToast } from 'src/utils/NotifyUtil';

export const useNotes = () => {
	const store = useNotesStore();
	const userStore = useUserStore();

	const uid = userStore.getID;

	const getNotes = () => {
		const q = query(collection(db, 'notes'), where('uid', '==', uid), orderBy('created', 'desc'));
		return new Promise((resolve) => {
			const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
				const notes = [];
				querySnapshot.forEach((noteDoc) => {
					const { title, note, created } = noteDoc.data();
					const createdDate = new Timestamp(created.seconds, created.nanoseconds).toMillis();
					const formattedDate = date.formatDate(createdDate, 'Do MMM YYYY');

					const noteObject = {
						id: noteDoc.id,
						title,
						note,
						date: formattedDate,
						local: noteDoc.metadata.hasPendingWrites,
					};
					notes.push(noteObject);
				});
				store.setNotes(notes);
				resolve(unsubscribe);
			});
		});
	};

	const addNote = (note) => {
		const newNote = {
			uid,
			...note,
			created: Timestamp.now(),
		};
		addDoc(collection(db, 'notes'), newNote);
		successToast('New Note Added');
	};

	const updateNote = (id, values) => {
		const noteRef = doc(db, 'notes', id);
		updateDoc(noteRef, values);
		successToast('Note successfully Updated');
	};

	const deleteNote = (id) => {
		deleteDoc(doc(db, 'notes', id));
		errorToast('Successfully Deleted');
	};

	return { getNotes, addNote, updateNote, deleteNote };
};

export const NotesProvider = defineComponent({
	setup(props, { slots }) {
		let unsubscribe;
		const { getNotes } = useNotes();
		LoadingBar.setDefaults({
			color: 'accent',
		});
		LoadingBar.start();

		onMounted(async () => {
			unsubscribe = await getNotes();
			LoadingBar.stop();
		});

		onUnmounted(() => {
			unsubscribe();
		});
		return () => slots.default();
	},
});

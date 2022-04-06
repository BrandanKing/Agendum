import { defineComponent, onMounted, onUnmounted } from 'vue';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	Timestamp,
	updateDoc,
	where,
} from 'firebase/firestore';
import { LoadingBar } from 'quasar';
import { db } from 'boot/firebase';
import { useTasksStore } from 'stores/useTasksStore';
import { useUserStore } from 'stores/useUserStore';
import { successToast, errorToast } from 'src/utils/NotifyUtil';

export const useTasks = () => {
	const store = useTasksStore();
	const userStore = useUserStore();
	const uid = userStore.getID;

	const getTasks = () => {
		const q = query(collection(db, 'tasks'), where('uid', '==', uid), orderBy('dueDate', 'desc'));

		return new Promise((resolve) => {
			const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
				const tasks = [];
				querySnapshot.forEach((taskDoc) => {
					const { dueDate, ...rest } = taskDoc.data();
					delete rest.uid;
					let date = null;

					if (dueDate) date = new Timestamp(dueDate.seconds, dueDate.nanoseconds).toMillis();

					const noteObject = {
						id: taskDoc.id,
						...rest,
						date,
						local: taskDoc.metadata.hasPendingWrites,
					};
					tasks.push(noteObject);
				});

				store.setTasks(tasks);
				resolve(unsubscribe);
			});
		});
	};

	const getCategoryTasks = (category) => {
		const q = query(
			collection(db, 'tasks'),
			where('uid', '==', uid),
			where('category', '==', category),
			orderBy('dueDate', 'desc')
		);

		return new Promise((resolve) => {
			const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
				const tasks = [];
				querySnapshot.forEach((taskDoc) => {
					const { dueDate, ...rest } = taskDoc.data();
					delete rest.uid;
					let date = null;

					if (dueDate) date = new Timestamp(dueDate.seconds, dueDate.nanoseconds).toMillis();

					const noteObject = {
						id: taskDoc.id,
						...rest,
						date,
						local: taskDoc.metadata.hasPendingWrites,
					};
					tasks.push(noteObject);
				});

				store.setTasks(tasks);
				resolve(unsubscribe);
			});
		});
	};

	const createTask = (task) => {
		let { dueDate } = task;

		if (dueDate) dueDate = Timestamp.fromDate(new Date(dueDate));

		const newTask = {
			uid,
			...task,
			dueDate,
			complete: false,
		};

		addDoc(collection(db, 'tasks'), newTask);
		successToast(`${task.task} succefully added`);
	};

	const updateTask = (id, task) => {
		const taskRef = doc(db, 'tasks', id);
		const values = { ...task };

		let { dueDate } = task;
		if (dueDate) {
			dueDate = Timestamp.fromDate(new Date(dueDate));
			values.dueDate = dueDate;
		}

		updateDoc(taskRef, values);
		successToast('Task Updated');
	};

	const deleteTask = (id) => {
		deleteDoc(doc(db, 'tasks', id));
		errorToast('Successfully Deleted');
	};

	return {
		getTasks,
		getCategoryTasks,
		createTask,
		updateTask,
		deleteTask,
	};
};

export const TasksProvider = defineComponent({
	setup(_props, { slots }) {
		let unsubscribe;
		const { getTasks } = useTasks();

		LoadingBar.start();

		onMounted(async () => {
			unsubscribe = await getTasks();

			LoadingBar.stop();
		});

		onUnmounted(() => {
			unsubscribe();
		});
		return () => slots.default();
	},
});

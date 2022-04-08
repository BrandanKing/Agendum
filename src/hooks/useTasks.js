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

	const getTasks = (currentCategory = null) => {
		let q;

		if (currentCategory) {
			q = query(
				collection(db, 'tasks'),
				where('uid', '==', uid),
				where('category', '==', currentCategory),
				orderBy('completeby', 'desc')
			);
		} else {
			q = query(collection(db, 'tasks'), where('uid', '==', uid), orderBy('completeby', 'desc'));
		}

		return new Promise((resolve) => {
			const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
				const tasks = [];

				querySnapshot.forEach((taskDoc) => {
					const { task, category, complete, completeby: date } = taskDoc.data();

					const completeby = date ? new Timestamp(date.seconds, date.nanoseconds).toMillis() : null;

					const taskObject = {
						id: taskDoc.id,
						task,
						category,
						complete,
						completeby,
						local: taskDoc.metadata.hasPendingWrites,
					};

					tasks.push(taskObject);
				});

				store.setTasks(tasks);
				resolve(unsubscribe);
			});
		});
	};

	const createTask = (task) => {
		let { completeby } = task;

		if (completeby) completeby = Timestamp.fromDate(new Date(completeby));

		const newTask = {
			uid,
			...task,
			completeby,
			complete: false,
		};

		addDoc(collection(db, 'tasks'), newTask);
		successToast(`${task.task} succefully added`);
	};

	const updateTask = (id, task) => {
		const taskRef = doc(db, 'tasks', id);
		if (task?.completeby) task.completeby = Timestamp.fromDate(new Date(task.completeby));

		updateDoc(taskRef, task);
		successToast('Task Updated');
	};

	const completeTask = (id, task) => {
		const taskRef = doc(db, 'tasks', id);
		updateDoc(taskRef, task);
	};

	const deleteTask = (id) => {
		deleteDoc(doc(db, 'tasks', id));
		errorToast('Successfully Deleted');
	};

	return {
		getTasks,
		createTask,
		updateTask,
		completeTask,
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

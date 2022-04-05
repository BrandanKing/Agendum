import { collection, orderBy, query, where } from 'firebase/firestore';
import { db } from 'boot/firebase';
// import { useTasksStore } from 'stores/useTasksStore';
import { useUserStore } from 'stores/useUserStore';

export const useTasks = () => {
	// const store = useTasksStore();
	const userStore = useUserStore();
	const uid = userStore.getID;

	const getTasks = () => {
		const q = query(collection(db, 'tasks'), where('uid', '==', uid), orderBy());
		console.log(q);
	};

	return { getTasks };
};

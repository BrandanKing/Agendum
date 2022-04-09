import { addDoc, collection } from 'firebase/firestore';
import { db } from 'boot/firebase';
import { useUserStore } from 'stores/useUserStore';

export const usePushNotifications = () => {
	const store = useUserStore();

	const createPushNotification = async (subscription) => {
		const newSub = {
			uid: store.getID,
			...subscription,
		};
		addDoc(collection(db, 'subscriptions'), newSub);
	};

	return {
		createPushNotification,
	};
};

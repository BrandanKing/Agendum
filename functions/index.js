const functions = require('firebase-functions');
const admin = require('firebase-admin');
const webpush = require('web-push');

admin.initializeApp();

const db = admin.firestore();

webpush.setVapidDetails(
	'mailto:noreply@agendum.co.uk',
	'BDgstXsk8HUOZIUnZYQ1zNLVE9-NSq_3Gxd-rTgRd9zjd08V8J8qJa6x-dQIuJKSS5Qwyu2OuxdvWSAUJec89mw',
	'Ft0MJUS3-MlqEu8U3EJxmqibVJ8SwPHshd0Duh2GwB8'
);

const sendPushNotification = async (uid, pushContent) => {
	const snapshot = await db.collection('subscriptions').where('uid', '==', uid).get();

	if (snapshot.empty) return false;

	snapshot.forEach((doc) => {
		const subscription = doc.data();
		const pushSubscription = {
			endpoint: subscription.endpoint,
			keys: {
				auth: subscription.keys.auth,
				p256dh: subscription.keys.p256dh,
			},
		};
		const pushContentStringified = JSON.stringify(pushContent);
		webpush.sendNotification(pushSubscription, pushContentStringified);
	});
	return true;
};

exports.taskCreated = functions.firestore.document('tasks/{docId}').onCreate((change) => {
	const { uid } = change.data();

	const pushContent = {
		title: 'New Agendum Task',
		body: 'New task Added! Check it out!',
		icon: 'icons/icon-128x128.png',
		data: {
			openUrl: '/tasks',
		},
	};

	return sendPushNotification(uid, pushContent);
});

exports.eventsCreated = functions.firestore.document('events/{docId}').onCreate((change, context) => {
	const { uid } = change.data();

	const pushContent = {
		title: 'New Agendum Event',
		body: 'New Event Added! Check it out!',
		icon: 'icons/icon-128x128.png',
		data: {
			openUrl: `/events/${context.params.colId}`,
		},
	};

	return sendPushNotification(uid, pushContent);
});

exports.notesCreated = functions.firestore.document('notes/{docId}').onCreate((change, context) => {
	const { uid } = change.data();

	const pushContent = {
		title: 'New Agendum Note',
		body: 'New Note Added! Check it out!',
		icon: 'icons/icon-128x128.png',
		data: {
			openUrl: `/events/${context.params.colId}`,
		},
	};

	return sendPushNotification(uid, pushContent);
});

exports.scheduledFunctionCrontab = functions.pubsub
	.schedule('* 11 * * *')
	.timeZone('Europe/London')
	.onRun(async () => {
		const { users } = await admin.auth().listUsers();
		const today = new Date();
		const tomorrow = new Date(today);
		today.setHours(0, 0, 0, 0);
		tomorrow.setDate(tomorrow.getDate() + 1);
		tomorrow.setHours(0, 0, 0, 0);

		users.forEach(async (user) => {
			const { uid } = user;
			const snapshot = await db
				.collection('tasks')
				.where('uid', '==', uid)
				.where('completeby', '>', today)
				.where('completeby', '<', tomorrow)
				.get();

			if (snapshot.empty) return false;

			const pushContent = {
				title: 'Daily Tasks',
				body: `You have ${snapshot.size} tasks due today`,
				icon: 'icons/icon-128x128.png',
				data: {
					openUrl: '/tasks',
				},
			};

			return sendPushNotification(uid, pushContent);
		});
	});

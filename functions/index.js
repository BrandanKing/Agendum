// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const _ = require('lodash');

admin.initializeApp();

const db = admin.firestore();
const app = express();

app.get('/events/:uid', (request, response) => {
	response.set('Access-Control-Allow-Origin', '*');
	const { uid } = request.params;
	const events = [];
	db.collection('events')
		.where('uid', '==', uid)
		.get()
		.then((snapshot) => {
			if (snapshot.empty) throw new Error('No Events Found');

			snapshot.forEach((snaps) => {
				const {
					colour,
					start: { _seconds: start },
					end: { _seconds: end },
					...data
				} = snaps.data();
				const event = {
					id: snaps.id,
					...data,
					colour,
					start,
					end,
				};
				events.push(event);
			});
			response.send(events);
		})
		.catch((error) => {
			response.status(204).send(error);
		});
});

app.get('/events/:uid/:category', async (request, response) => {
	response.set('Access-Control-Allow-Origin', '*');

	const { uid, category } = request.params;
	const events = [];

	db.collection('tasks')
		.where('uid', '==', uid)
		.where('category', '==', category)
		.get()
		.then((snapshot) => {
			if (snapshot.empty) throw new Error('No Events Found');

			snapshot.forEach((snaps) => {
				const event = {
					id: snaps.id,
					...snaps.data(),
				};
				events.push(event);
			});
			response.send(events);
		})
		.catch((error) => {
			response.status(204).send(error);
		});
});

app.get('/categories/:uid', async (request, response) => {
	response.set('Access-Control-Allow-Origin', '*');
	const { uid } = request.params;
	const tasks = [];
	try {
		const tasksSnapshot = await db.collection('tasks').where('uid', '==', uid).get();

		if (tasksSnapshot.empty) throw new Error('No Events Found');

		tasksSnapshot.forEach((snaps) => tasks.push(snaps.data()));

		const groupedCategories = _.groupBy(tasks, (task) => task.category);
		const categories = [];

		_.forEach(groupedCategories, (value, key) => {
			const category = {
				name: key,
				total: value.length,
				// eslint-disable-next-line no-plusplus
				completed: value.reduce((acc, cur) => (cur.complete ? ++acc : acc), 0),
			};
			categories.push(category);
		});

		response.send(categories);
	} catch (error) {
		response.status(204).send(error);
	}
});

exports.app = functions.https.onRequest(app);

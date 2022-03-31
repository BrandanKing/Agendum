// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
import { db } from '../db.js';

export const getEvents = async (request, response) => {
	const events = [];
	db.collection('events')
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
};

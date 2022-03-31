// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { getEvents } from './events/index.js';

const app = express();

app.use(cors({ origin: true }));

app.get('/events/:uid', getEvents);

export const api = functions.https.onRequest(app);

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence, disableNetwork } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAriVP2RJ9d5CRBkqaV1jdFhsfG0Lnasrc',
	authDomain: 'agendum-6285e.firebaseapp.com',
	projectId: 'agendum-6285e',
	storageBucket: 'agendum-6285e.appspot.com',
	messagingSenderId: '110725071912',
	appId: '1:110725071912:web:b867559568fa716565611d',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
connectFirestoreEmulator(db, 'localhost', 8080);

enableIndexedDbPersistence(db, { synchronizeTabs: true }).catch((err) => {
	if (err.code === 'failed-precondition') {
		// Multiple tabs open, persistence can only be enabled
		// in one tab at a a time.
		// ...
	} else if (err.code === 'unimplemented') {
		// The current browser does not support all of the
		// features required to enable persistence
		// ...
	}
});

const disable = async () => {
	await disableNetwork(db);
};

disable();

export { firebaseAuth, db };

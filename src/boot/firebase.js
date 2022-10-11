import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'xxxxxxxx',
	authDomain: 'xxxxxx',
	projectId: 'xxxxx',
	storageBucket: 'xxxxx',
	messagingSenderId: 'xxxxxx',
	appId: 'xxxxx',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

enableIndexedDbPersistence(db, { synchronizeTabs: true });

export { auth, db };

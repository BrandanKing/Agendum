import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAriVP2RJ9d5CRBkqaV1jdFhsfG0Lnasrc',
	authDomain: 'agendum-6285e.firebaseapp.com',
	projectId: 'agendum-6285e',
	storageBucket: 'agendum-6285e.appspot.com',
	messagingSenderId: '110725071912',
	appId: '1:110725071912:web:b867559568fa716565611d',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

enableIndexedDbPersistence(db, { synchronizeTabs: true });

export { auth, db };

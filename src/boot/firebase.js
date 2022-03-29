import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

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

connectAuthEmulator(firebaseAuth, 'http://localhost:9099');

export { firebaseAuth };

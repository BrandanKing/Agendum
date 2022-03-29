import { firebaseAuth } from 'src/boot/firebase';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateEmail,
	updateProfile,
} from 'firebase/auth';
import { useUserStore } from 'src/stores/useUserStore';
import { errorToast, successToast } from 'src/utils/NotifyUtil';
import router from 'src/router';

export const useAuth = () => {
	const store = useUserStore();

	const registerUser = async ({ email, password, displayName }) => {
		try {
			await createUserWithEmailAndPassword(firebaseAuth, email, password);
			await updateProfile(firebaseAuth.currentUser, { displayName });
			store.setUser(firebaseAuth.currentUser);
			router.push({ name: 'Dashboard' });

			return { success: true, message: 'User successfully created' };
		} catch (error) {
			errorToast(error.message);
			return { success: false, message: error.message };
		}
	};

	const loginUser = async ({ email, password }) => {
		try {
			const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
			store.setUser(user);
			router.push({ name: 'Dashboard' });
			return { success: true, message: 'User successfully logged in' };
		} catch (error) {
			errorToast(error.message);
			return { success: false, message: error.message };
		}
	};

	const googleAuthentication = async (authType) => {
		const provider = new GoogleAuthProvider();
		try {
			const { user } = await signInWithPopup(firebaseAuth, provider);
			store.setUser(user);
			router.push({ name: 'Dashboard' });
		} catch (error) {
			const errorCode = error.code;
			let errorMessage = error.message;

			if (errorCode === 'auth/account-exists-with-different-credential') {
				errorMessage = `Unable to ${authType}, account exists with different credentials`;
			}

			errorToast(errorMessage);
		}
	};

	const logoutUser = async () => {
		try {
			await signOut(firebaseAuth);
			return { success: true, message: 'User successfully logged out' };
		} catch (error) {
			errorToast(error.message);
			return { success: false, message: error.message };
		}
	};

	const updateDisplayName = async ({ displayName }) => {
		try {
			await updateProfile(firebaseAuth.currentUser, { displayName });
			store.setDisplayName(displayName);
			successToast(`Display name updated to ${displayName}`);
			return { success: true, message: `User display name updated to ${displayName}` };
		} catch (error) {
			errorToast(error.message);
			return { success: false, message: error.message };
		}
	};
	const updateUserEmail = async ({ email }) => {
		try {
			await updateEmail(firebaseAuth.currentUser, email);
			store.setEmail(email);
			successToast(`User Email updated to ${email}`);
			return { success: true, message: `User Email updated to ${email}` };
		} catch (error) {
			errorToast(error.message);
			return { success: false, message: error.message };
		}
	};

	const onStateChange = async () => {
		const state = new Promise((resolve) => {
			onAuthStateChanged(firebaseAuth, (user) => {
				if (user) store.setUser(user);
				else store.clearUser();

				resolve();
			});
		});
		return state;
	};

	return {
		registerUser,
		loginUser,
		googleAuthentication,
		logoutUser,
		updateDisplayName,
		updateUserEmail,
		onStateChange,
	};
};

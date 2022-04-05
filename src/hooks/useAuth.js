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
import { auth } from 'boot/firebase';
import { useUserStore } from 'stores/useUserStore';
import { errorToast, successToast } from 'src/utils/NotifyUtil';
import router from 'src/router';

export const useAuth = () => {
	const store = useUserStore();

	const loginUser = async ({ email, password }) => {
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			store.setUser(user);
			router.push({ name: 'Dashbord' });
			successToast('Login Successful');
			return { success: true, message: 'User successfully created' };
		} catch (error) {
			errorToast(error.message);
			return { success: false, message: error.message };
		}
	};

	const registerUser = async ({ email, password, displayName }) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(auth.currentUser, { displayName });
			store.setUser(auth.currentUser);
			router.push({ name: 'Dashbord' });
			successToast('Account Successfully Created');
			return { success: true, message: 'User successfully created' };
		} catch (error) {
			errorToast(error.message);
			return { success: false, message: error.message };
		}
	};

	const logoutUser = async () => {
		try {
			await signOut(auth);
			successToast('Successfully logged out');
			return { success: true, message: 'User successfully logged out' };
		} catch (error) {
			errorToast(error.message);
			return { success: false, message: error.message };
		}
	};

	const googleAuthentication = async (authType) => {
		const provider = new GoogleAuthProvider();
		try {
			const { user } = await signInWithPopup(auth, provider);
			store.setUser(user);
			router.push({ name: 'Dashboard' });
			successToast(`${authType} Successful`);
		} catch (error) {
			const errorCode = error.code;
			let errorMessage = error.message;

			if (errorCode === 'auth/account-exists-with-different-credential') {
				errorMessage = `Unable to ${authType}, account exists with different credentials`;
			}

			errorToast(errorMessage);
		}
	};

	const watchAuthState = async () => {
		return new Promise((resolve) => {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					store.setUser(user);
				} else {
					store.clearUser();
				}

				resolve();
			});
		});
	};

	const updateDisplayName = async ({ displayName }) => {
		try {
			await updateProfile(auth.currentUser, { displayName });
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
			await updateEmail(auth.currentUser, email);
			store.setEmail(email);
			successToast(`User Email updated to ${email}`);
			return { success: true, message: `User Email updated to ${email}` };
		} catch (error) {
			errorToast(error.message);
			return { success: false, message: error.message };
		}
	};

	return {
		loginUser,
		registerUser,
		logoutUser,
		googleAuthentication,
		watchAuthState,
		updateDisplayName,
		updateUserEmail,
	};
};

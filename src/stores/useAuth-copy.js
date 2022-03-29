import { defineStore } from 'pinia';
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	updateProfile,
	updateEmail,
	onAuthStateChanged,
	signOut,
	signInWithEmailAndPassword,
} from 'firebase/auth';

import { firebaseAuth } from 'src/boot/firebase';
import { errorToast, successToast } from 'src/utils/NotifyUtil';
import router from 'src/router';

export const useAuth = defineStore('user', {
	state: () => ({
		uid: null,
		displayName: null,
		email: null,
		isAuthenticated: null,
	}),
	getters: {
		getDisplayName: ({ displayName }) => displayName,
		getEmail: ({ email }) => email,
		getIsAuthenticated: ({ isAuthenticated }) => isAuthenticated,
	},
	actions: {
		async registerUser({ email, password, displayName }) {
			try {
				const { uid } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
				await updateProfile(firebaseAuth.currentUser, { displayName });
				this.setUser({ displayName, email, uid });
				router.push({ name: 'Dashboard' });
				return true;
			} catch (error) {
				errorToast(error.message);
				return false;
			}
		},
		async googleAuthentication(authType) {
			const provider = new GoogleAuthProvider();
			try {
				const { user } = await signInWithPopup(firebaseAuth, provider);
				this.setUser(user);
				router.push({ name: 'Dashboard' });
			} catch (error) {
				const errorCode = error.code;
				let errorMessage = error.message;

				if (errorCode === 'auth/account-exists-with-different-credential') {
					errorMessage = `Unable to ${authType}, account exists with different credentials`;
				}

				errorToast(errorMessage);
			}
		},
		async loginUser({ email, password }) {
			try {
				const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
				this.setUser(user);
				router.push({ name: 'Dashboard' });
				return true;
			} catch (error) {
				const errorCode = error.code;
				let errorMessage = error.message;

				if (errorCode === 'auth/user-not-found') {
					errorMessage = 'Invalid user';
				} else {
					errorMessage = 'Invalid Email / Password';
				}

				errorToast(errorMessage);
				return false;
			}
		},
		async logoutUser() {
			try {
				await signOut(firebaseAuth);
			} catch (error) {
				errorToast(error.message);
			}
		},
		async handleAuthStateChange() {
			return new Promise((resolve) => {
				onAuthStateChanged(firebaseAuth, (user) => {
					if (user) this.setUser(user);
					else {
						router.push({ name: 'Login' });
						this.clearUser();
					}
					resolve(true);
				});
			});
		},
		async updateDisplayName({ displayName }) {
			try {
				await updateProfile(firebaseAuth.currentUser, { displayName });
				this.setDisplayName(displayName);
				successToast('Display Name updated');
				return true;
			} catch (error) {
				errorToast(error.message);
				return false;
			}
		},
		async updateEmail({ email }) {
			try {
				await updateEmail(firebaseAuth.currentUser, email);
				this.setEmail(email);
				successToast('Email Updated');
				return true;
			} catch (error) {
				errorToast(error.message);
				return false;
			}
		},
		setUser({ uid, displayName, email }) {
			this.uid = uid;
			this.displayName = displayName;
			this.email = email;
			this.isAuthenticated = true;
		},
		setDisplayName(displayName) {
			this.displayName = displayName;
		},
		setEmail(email) {
			this.email = email;
		},
		clearUser() {
			this.$reset();
		},
	},
});

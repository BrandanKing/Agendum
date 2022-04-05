import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		user: null,
	}),
	getters: {
		getUser: ({ user }) => user,
		getID: ({ user: { uid } }) => uid,
		getDisplayName: ({ user }) => user?.displayName,
		getEmail: ({ user: { email } }) => email,
	},
	actions: {
		setUser({ email, displayName, uid }) {
			this.user = { uid, email, displayName };
		},
		setDisplayName(displayName) {
			this.user.displayName = displayName;
		},
		setEmail(email) {
			this.user.email = email;
		},
		clearUser() {
			this.$reset();
		},
	},
});

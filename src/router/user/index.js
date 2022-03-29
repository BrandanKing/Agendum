const AccountPage = () => import('src/pages/user/AccountPage.vue');

export const AccountRoute = {
	name: 'Account',
	path: 'account',
	component: AccountPage,
};

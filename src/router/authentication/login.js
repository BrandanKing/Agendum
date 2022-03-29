const LoginPage = () => import('src/pages/authentication/LoginPage.vue');

export const LoginRoute = {
	name: 'Login',
	path: '/login',
	component: LoginPage,
	meta: { requiresAuth: false },
};

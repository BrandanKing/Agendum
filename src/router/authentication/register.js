const RegisterPage = () => import('src/pages/authentication/RegisterPage.vue');

export const RegisterRoute = {
	name: 'Register',
	path: '/register',
	component: RegisterPage,
	meta: { requiresAuth: false },
};

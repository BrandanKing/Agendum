import { LoginRoute } from './login';
import { RegisterRoute } from './register';

const AuthLayout = () => import('layouts/authentication/TheLayout.vue');

export const AuthRoutes = {
	name: 'Authentication',
	path: '/',
	component: AuthLayout,
	children: [LoginRoute, RegisterRoute],
};

const HomePage = () => import('pages/IndexPage.vue');

export const DashboardRoute = {
	name: 'Dashboard',
	path: '',
	component: HomePage,
};

const Page404 = () => import('pages/ErrorNotFound.vue');

export const Route404 = {
	path: '/:catchAll(.*)*',
	component: Page404,
};

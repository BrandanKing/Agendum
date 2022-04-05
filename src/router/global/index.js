import { NotesRoutes } from '../notes';
import { TasksRoute } from '../tasks';
import { AccountRoute } from '../user';
import { DashboardRoute } from './dashboard';

const layout = () => import('src/layouts/base/TheLayout.vue');

export const GlobalRoutes = {
	path: '/',
	component: layout,
	children: [DashboardRoute, AccountRoute, NotesRoutes, TasksRoute],
};

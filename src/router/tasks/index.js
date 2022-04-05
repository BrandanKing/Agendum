const TasksPage = () => import('src/pages/tasks/TasksPage.vue');

export const TasksRoute = {
	name: 'Tasks',
	path: 'tasks',
	component: TasksPage,
};

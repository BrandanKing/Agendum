const MainLayout = () => import('layouts/MainLayout.vue');
const AuthLayout = () => import('layouts/AuthLayout.vue');

const Dashboard = () => import('pages/IndexPage.vue');

const LoginPage = () => import('pages/auth/LoginPage.vue');
const RegisterPage = () => import('pages/auth/RegisterPage.vue');

const AccountPage = () => import('pages/auth/AccountPage.vue');

const NotesPage = () => import('pages/notes/NotesPage.vue');
const UpdateNote = () => import('components/notes/UpdateNote.vue');

const TasksPage = () => import('pages/tasks/TasksPage.vue');
const TaskPage = () => import('pages/tasks/TaskPage.vue');

const routes = [
	{
		path: '/',
		component: MainLayout,
		children: [
			{ name: 'Dashboard', path: '', component: Dashboard },
			{
				name: 'Account',
				path: 'account',
				component: AccountPage,
			},
			{
				name: 'Notes',
				path: 'notes',
				component: NotesPage,
				children: [{ name: 'Note', path: ':id', component: UpdateNote, props: true }],
			},
			{
				name: 'Tasks',
				path: 'tasks',
				component: TasksPage,
			},
			{
				name: 'Task',
				path: 'tasks/:category',
				component: TaskPage,
				props: true,
			},
		],
	},
	{
		name: 'Authentication',
		path: '/',
		component: AuthLayout,
		children: [
			{
				name: 'Login',
				path: '/login',
				component: LoginPage,
			},
			{
				name: 'Register',
				path: '/register',
				component: RegisterPage,
			},
		],
	},
	{
		name: '404',
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue'),
	},
];

export default routes;

const NotesPage = () => import('src/pages/notes/NotesPage.vue');
const UpdateNote = () => import('src/components/notes/UpdateNote.vue');

export const NotesRoutes = {
	name: 'Notes',
	path: 'notes',
	component: NotesPage,
	children: [{ name: 'Note', path: ':id', component: UpdateNote, props: true }],
};

import { computed, watch } from 'vue';
import { boot } from 'quasar/wrappers';
import { useUserStore } from 'stores/useUserStore';
import { useTasksStore } from 'stores/useTasksStore';

export default boot(async ({ router }) => {
	const store = useUserStore();
	const tasksStore = useTasksStore();

	const user = computed(() => store.getUser);

	watch(user, () => {
		if (user.value === null) router.replace({ name: 'Login' });
	});

	router.beforeEach((to, _from, next) => {
		if (to.name !== 'Login' && to.name !== 'Register' && !user.value) {
			next({ name: 'Login' });
		} else if ((to.name === 'Login' || to.name === 'Register') && user.value) {
			next({ name: 'Dashboard' });
		} else if (to.name === 'Task' && !tasksStore.getCategory(to.params.category)) {
			next({ name: '404' });
		} else {
			next();
		}
	});
});

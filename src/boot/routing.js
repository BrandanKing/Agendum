import { boot } from 'quasar/wrappers';
import { useAuth } from 'src/hooks/useAuth';
import { useUserStore } from 'src/stores/useUserStore';
import { computed, watch } from 'vue';

export default boot(async ({ router }) => {
	const store = useUserStore();
	const { isLoggedIn } = useAuth();
	const user = computed(() => store.getUser);

	watch(user, () => {
		if (user.value === null) router.replace({ name: 'Login' });
	});

	router.beforeEach((to, _from, next) => {
		isLoggedIn();
		if (to.name !== 'Login' && to.name !== 'Register' && !user.value) {
			next({ name: 'Login' });
		} else if ((to.name === 'Login' || to.name === 'Register') && user.value) {
			next({ name: 'Dashboard' });
		} else {
			next();
		}
	});
});

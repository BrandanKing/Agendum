import { boot } from 'quasar/wrappers';
import { LoadingBar } from 'quasar';
import { useAuth } from 'src/hooks/useAuth';

export default boot(async () => {
	const { watchAuthState } = useAuth();
	LoadingBar.start();
	await watchAuthState();
	LoadingBar.stop();
});

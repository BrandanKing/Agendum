import { LoadingBar } from 'quasar';
import { boot } from 'quasar/wrappers';
import { useAuth } from 'src/hooks/useAuth';

export default boot(async () => {
	const { onStateChange } = useAuth();
	LoadingBar.setDefaults({
		color: 'accent',
	});
	LoadingBar.start();

	await onStateChange();

	LoadingBar.stop();
});

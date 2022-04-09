<template>
	<div
		class="flex full-width justify-between items-center text-body2"
		v-if="!show && pushNotificationSupport && serviceWorkerSupported">
		Enable Push Notifications
		<q-btn @click="enableNotifications" no-caps unelevated color="accent">Enable</q-btn>
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { useQuasar } from 'quasar';
	import { usePushNotifications } from 'src/hooks/usePushNotifications';

	export default {
		setup() {
			const $q = useQuasar();
			const { createPushNotification } = usePushNotifications();
			const show = computed(() => $q.localStorage.getItem('PushNotificationsShow'));

			const pushNotificationSupport = computed(() => {
				if ('PushManager' in window) return true;
				return false;
			});

			const serviceWorkerSupported = computed(() => {
				if ('serviceWorker' in navigator) return true;
				return false;
			});

			const isSubscribed = async () => {
				if (pushNotificationSupport.value && serviceWorkerSupported.value) {
					const swreg = await navigator.serviceWorker.ready;
					let subscription = await swreg.pushManager.getSubscription();

					const options = {
						userVisibleOnly: true,
						applicationServerKey:
							'BDgstXsk8HUOZIUnZYQ1zNLVE9-NSq_3Gxd-rTgRd9zjd08V8J8qJa6x-dQIuJKSS5Qwyu2OuxdvWSAUJec89mw',
					};

					if (!subscription) {
						subscription = await swreg.pushManager.subscribe(options);
						subscription = subscription.toJSON();
						createPushNotification(subscription);
					}
				}
			};

			const enableNotifications = () => {
				if (pushNotificationSupport.value && serviceWorkerSupported.value) {
					Notification.requestPermission(() => {
						$q.localStorage.set('PushNotificationsShow', true);
						show.value = false;
						isSubscribed();
					});
				}
			};

			return {
				show,
				enableNotifications,
				pushNotificationSupport,
				serviceWorkerSupported,
			};
		},
	};
</script>

<style></style>

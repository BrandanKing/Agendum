<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<q-page-sticky position="bottom" :offset="[18, 18]" v-if="show">
			<div class="q-pa-md q-gutter-sm">
				<q-banner dense inline-actions rounded class="bg-dark">
					Install Agendum

					<template v-slot:action>
						<q-btn flat label="Yes" @click="install" />
						<q-btn flat label="Later" />
						<q-btn flat label="Never" @click="never" />
					</template>
				</q-banner>
			</div>
		</q-page-sticky>
	</transition>
</template>

<script>
	import { useQuasar } from 'quasar';
	import { onMounted, ref } from 'vue';

	export default {
		setup() {
			const show = ref(false);
			const $q = useQuasar();
			let deferredPrompt;

			const never = () => {
				show.value = false;
				$q.localStorage.set('neverShowAppInstallBanner', true);
			};

			const install = () => {
				deferredPrompt.prompt();
				show.value = false;
			};

			onMounted(() => {
				const neverShowAppInstallBanner = $q.localStorage.getItem('neverShowAppInstallBanner');
				if (!neverShowAppInstallBanner) {
					window.addEventListener('beforeinstallprompt', (e) => {
						e.preventDefault();
						deferredPrompt = e;

						setTimeout(() => {
							show.value = true;
						}, 3000);
					});
				}
			});

			window.addEventListener('appinstalled', () => {
				show.value = false;
				deferredPrompt = null;
			});

			return {
				show,
				never,
				install,
			};
		},
	};
</script>

<style></style>

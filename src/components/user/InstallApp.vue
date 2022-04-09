<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<q-page-sticky position="bottom" :offset="[18, 18]" v-if="show">
			<q-banner inline-actions rounded class="text-weight-bold q-px-lg">
				<div class="text-weight-bold">Install Agendum</div>

				<template v-slot:action>
					<div class="q-gutter-sm full-width">
						<q-btn flat label="No" @click="setShow(false)" no-caps />
						<q-btn label="Yes" color="primary" @click="install" no-caps />
					</div>
				</template>
			</q-banner>
		</q-page-sticky>
	</transition>
</template>

<script>
	import { onMounted, ref } from 'vue';

	export default {
		setup() {
			const show = ref(false);
			let deferredPrompt;

			const setShow = (value) => {
				show.value = value;
			};
			const install = () => {
				deferredPrompt.prompt();
				setShow(false);
			};

			onMounted(() => {
				window.addEventListener('beforeinstallprompt', (e) => {
					deferredPrompt = e;
					setShow(true);
				});
			});

			window.addEventListener('appinstalled', () => {
				setShow(false);
				deferredPrompt = null;
			});

			return {
				setShow,
				show,
				install,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.q-page-sticky--shrink {
		> :deep(div) {
			display: block;
			width: 100%;
			> div {
				margin: 0 auto;
				max-width: 575px;
			}
		}
		:deep(.q-banner__actions) {
			padding-left: 0;
		}
		.q-banner {
			background: var(--q-dark-page);
		}
	}
</style>

<template>
	<q-layout view="hHh lpR fFf">
		<TheHeader />
		<q-page-container>
			<q-page padding>
				<q-img src="~assets/wave.svg" class="wave" alt="" position="50% 0px" />
				<router-view v-slot="slotProps">
					<transition
						appear
						enter-active-class="animated fadeIn"
						leave-active-class="animated fadeOut"
						mode="out-in">
						<component :is="slotProps.Component"></component>
					</transition>
				</router-view>
			</q-page>
		</q-page-container>
		<InstallApp />
	</q-layout>
</template>

<script>
	import TheHeader from 'components/header/TheHeader.vue';
	import InstallApp from 'components/user/InstallApp.vue';

	export default {
		components: { TheHeader, InstallApp },
	};
</script>

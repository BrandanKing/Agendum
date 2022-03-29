<template>
	<q-layout view="hHh lpR fFf">
		<TheHeader />
		<q-page-container>
			<q-page padding>
				<q-img src="~assets/wave.svg" class="wave" alt="" />
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
	</q-layout>
</template>

<script>
	import TheHeader from 'src/components/header/TheHeader.vue';

	export default {
		components: { TheHeader },
	};
</script>

<style lang="scss" scoped>
	.wave {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: -1;
		max-height: 300px;
		opacity: 0.8;
	}
</style>

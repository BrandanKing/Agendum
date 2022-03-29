<template>
	<q-layout>
		<q-page-container class="container">
			<q-page padding class="row q-col-gutter-md">
				<q-img src="~assets/wave.svg" class="wave" alt="login-wave" />
				<div class="col-12 col-md-4 col-lg-6 flex justify-center content-center desktop-only" padding>
					<q-img src="~assets/unlock.svg" class="responsive" alt="login-image" height="600px" fit="contain" />
				</div>
				<div class="col-12 col-md-8 col-lg-6 col-md flex justify-center content-center">
					<router-view v-slot="slotProps">
						<transition
							appear
							enter-active-class="animated zoomIn"
							leave-active-class="animated zoomOut"
							mode="out-in">
							<component :is="slotProps.Component"></component>
						</transition>
					</router-view>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
	export default {};
</script>
<style lang="scss" scoped>
	.wave {
		position: fixed;
		height: 50%;
		left: 0;
		bottom: 0;
		z-index: -1;
		padding: 0;
		@media (max-width: $breakpoint-sm-max) {
			height: 320px;
		}
	}
</style>

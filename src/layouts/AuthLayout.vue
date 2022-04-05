<template>
	<q-layout>
		<q-page-container class="container">
			<q-page padding class="row q-col-gutter-md">
				<q-img src="~assets/wave.svg" class="wave" alt="" position="50% 0px" />
				<div class="col-12 col-md-4 col-lg-6 flex justify-center content-center gt-sm">
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

<template>
	<router-view v-slot="slotProps">
		<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
			<component :is="slotProps.Component"></component>
		</transition>
	</router-view>
</template>

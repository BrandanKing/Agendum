<template>
	<DatePicker v-model="date" :model-config="modelConfig" color="purple" />
</template>

<script>
	import { computed } from 'vue';
	import { DatePicker } from 'v-calendar';

	export default {
		components: {
			DatePicker,
		},
		props: ['modelValue'],
		emits: ['update:modelValue'],
		setup(props, { emit }) {
			const date = computed({
				get() {
					return props.modelValue;
				},
				set(value) {
					emit('update:modelValue', value);
				},
			});
			const modelConfig = {
				type: 'string',
				mask: 'iso',
			};
			return {
				date,
				modelConfig,
			};
		},
	};
</script>

<style lang="scss">
	@import 'v-calendar/dist/style.css';
</style>

<style lang="scss" scoped>
	:deep(.on-right),
	:deep(.on-left) {
		margin: 0;
	}
	.vc-container {
		background-color: var(--q-dark);
		border: none;
	}
	:deep(.vc-nav-popover-container) {
		background-color: var(--q-dark-page);
		color: white;
		border: none;
	}
	:deep(.vc-nav-title) {
		color: white;
	}
	:deep(.vc-day-content),
	:deep(.vc-weekday) {
		// color: white !important;
	}
	:deep(.vc-weeks) {
		padding-left: 0;
		padding-right: 0;
	}
</style>

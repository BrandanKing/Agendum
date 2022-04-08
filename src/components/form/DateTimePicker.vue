<template>
	<q-popup-proxy transition-show="scale" transition-hide="scale">
		<q-card>
			<q-card-section class="q-px-none q-pb-none">
				<DatePicker v-model="date" :model-config="modelConfig" color="purple" v-bind="$attrs" timezone="UTC" />
			</q-card-section>
			<q-card-actions align="right">
				<q-btn label="Clear" color="white" flat @click="clearDate" />
				<q-btn label="OK" color="primary" flat v-close-popup />
			</q-card-actions>
		</q-card>
	</q-popup-proxy>
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

			const clearDate = () => {
				date.value = null;
			};
			return {
				date,
				modelConfig,
				clearDate,
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
	:deep(.vc-weeks) {
		padding-left: 0;
		padding-right: 0;
	}
</style>

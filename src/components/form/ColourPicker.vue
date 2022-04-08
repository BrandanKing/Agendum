<template>
	<div class="flex items-center">
		<p class="q-mb-none q-mr-sm text-subtitle1 gt-xs">Colour:</p>
		<VSwatches v-model="colour" :swatches="swatches" v-bind="$attrs" />
	</div>
</template>

<script>
	import { computed, onMounted } from 'vue';
	import VSwatches from 'vue3-swatches';

	export default {
		props: {
			modelValue: {
				required: true,
				default() {
					return '#f44336';
				},
			},
		},
		emits: ['update:modelValue'],
		components: { VSwatches },
		setup(props, { emit }) {
			const colour = computed({
				get() {
					return props.modelValue;
				},
				set(value) {
					emit('update:modelValue', value);
				},
			});

			onMounted(() => {
				emit('update:modelValue', colour.value);
			});

			const swatches = [
				'#1565c0',
				'#0288d1',
				'#f44336',
				'#3f51b5',
				'#00e676',
				'#f4511e',
				'#673ab7',
				'#1de9b6',
				'#e91e63',
			];
			return {
				colour,
				swatches,
			};
		},
	};
</script>

<style lang="scss">
	.vue-swatches {
		&__container {
			background: $dark !important;
		}
		&__swatch {
			border-radius: 100% !important;
			width: 30px !important;
			height: 30px !important;

			@media (max-width: $breakpoint-xs-max) {
				margin-bottom: 8px;
			}
		}
	}
</style>

<template>
	<q-select borderless hide-dropdown-icon v-model="category" :options="categories" behavior="dialog">
		<template v-slot:selected-item>
			<q-icon
				size="20px"
				:name="category?.icon"
				:style="`background:${category?.colour}`"
				class="q-pa-sm rounded-borders text-white shadow-2" />
			<label class="q-px-md text-body1">{{ category?.label }}</label>
		</template>
	</q-select>
</template>
<script>
	import { computed, onMounted } from 'vue';
	import { useTasksStore } from 'stores/useTasksStore';

	const store = useTasksStore();

	export default {
		props: {
			modelValue: {
				required: true,
				default() {
					return 'work';
				},
			},
		},
		emits: ['update:modelValue'],
		setup(props, { emit }) {
			const categories = computed(() => store.getCatgories);

			const category = computed({
				get() {
					if (typeof props.modelValue === 'string' || props.modelValue instanceof String) {
						return store.getCategory(props.modelValue);
					}
					return props.modelValue;
				},
				set(value) {
					emit('update:modelValue', value);
				},
			});

			onMounted(() => {
				emit('update:modelValue', category.value);
			});

			return {
				categories,
				category,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.q-select {
		label {
			display: none;
		}
		&__dialog {
			label {
				display: block;
			}
		}
	}
</style>

<template>
	<form @submit="onSubmit">
		<InputValidation name="task" placeholder="Add Task" class="add-task" no-error-icon borderless>
			<template v-slot:prepend>
				<q-btn
					padding="xs"
					icon="mdi-plus"
					flat
					class="rounded-borders"
					:style="`background:${selectedCategory?.colour}`"
					@click="onSubmit" />
			</template>

			<template v-slot:append>
				<q-btn
					round
					flat
					:icon="time ? 'mdi-alarm-check' : 'mdi-alarm'"
					:color="time ? 'green-13' : 'white'"
					padding="8px">
					<q-popup-proxy cover transition-show="scale" transition-hide="scale">
						<q-time v-model="time" now-btn>
							<div class="row items-center justify-end q-gutter-sm">
								<q-btn label="Clear" color="primary" flat @click="clearTime" />
								<q-btn label="OK" color="primary" flat v-close-popup />
							</div>
						</q-time>
					</q-popup-proxy>
				</q-btn>
				<q-select
					borderless
					hide-dropdown-icon
					v-model="selectedCategory"
					:options="categories"
					class="q-ml-sm"
					v-if="!category">
					<template v-slot:selected>
						<q-icon
							size="20px"
							:name="selectedCategory?.icon"
							:style="`background:${selectedCategory?.colour}`"
							class="q-pa-sm rounded-borders text-white" />
					</template>
				</q-select>
			</template>
		</InputValidation>
	</form>
</template>

<script>
	import { computed, ref } from 'vue';
	import { useForm } from 'vee-validate';
	import { object, string } from 'yup';
	import InputValidation from 'components/form/InputValidation.vue';
	import { useTasksStore } from 'stores/useTasksStore';

	export default {
		components: { InputValidation },
		props: { category: { type: String } },
		setup(props) {
			const store = useTasksStore();
			const categories = computed(() => store.getCatgories);
			const time = ref(null);
			let selectedCategory;

			if (props.category) {
				selectedCategory = computed(() => store.getCategory(props.category));
			} else {
				selectedCategory = ref(categories.value[0]);
			}

			const schema = object({
				task: string().required().label('Task'),
			});

			const { handleSubmit } = useForm({
				validationSchema: schema,
			});

			const clearTime = () => {
				time.value = null;
			};

			const onSubmit = handleSubmit(async (values) => {
				const createTask = { ...values, categroy: selectedCategory.value?.value };
				console.log(createTask);
			});

			return {
				selectedCategory,
				categories,
				time,
				clearTime,
				onSubmit,
			};
		},
	};
</script>

<style lang="scss">
	.add-task {
		padding: 0 12px;
		border-radius: 12px;
		border: 2px solid $dark;
	}
</style>

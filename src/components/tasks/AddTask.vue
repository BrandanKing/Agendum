<template>
	<form @submit="onSubmit">
		<InputValidation name="task" placeholder="Add Task" class="add-task" no-error-icon borderless>
			<template v-slot:prepend>
				<q-btn
					flat
					padding="xs"
					icon="mdi-plus"
					class="rounded-borders"
					:style="`background:${selectedCategory?.colour}`"
					@click="onSubmit" />
			</template>

			<template v-slot:append>
				<q-btn
					round
					flat
					padding="8px"
					:icon="dueDate ? 'mdi-alarm-check' : 'mdi-alarm'"
					:color="dueDate ? 'green-13' : 'white'">
					<q-popup-proxy transition-show="scale" transition-hide="scale">
						<q-card>
							<q-card-section class="q-px-none q-pb-none">
								<DateTimePicker v-model="dueDate" is-dark mode="dateTime" :min-date="new Date()" />
							</q-card-section>
							<q-card-actions align="right">
								<q-btn label="Clear" color="white" flat @click="clearDueDate" />
								<q-btn label="OK" color="primary" flat v-close-popup />
							</q-card-actions>
						</q-card>
					</q-popup-proxy>
				</q-btn>
				<q-select
					v-if="!category"
					v-model="selectedCategory"
					:options="categories"
					borderless
					hide-dropdown-icon
					class="q-ml-sm"
					behavior="dialog">
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
	import { computed, defineAsyncComponent, ref } from 'vue';
	import { useForm } from 'vee-validate';
	import { object, string } from 'yup';
	import { useTasksStore } from 'stores/useTasksStore';
	import { useTasks } from 'src/hooks/useTasks';
	import InputValidation from 'components/form/InputValidation.vue';

	const DateTimePicker = defineAsyncComponent(() => import('components/form/DateTimePicker.vue'));

	export default {
		components: { InputValidation, DateTimePicker },
		props: { category: { type: String } },
		setup(props) {
			const store = useTasksStore();
			const { createTask } = useTasks();
			const categories = computed(() => store.getCatgories);
			const dueDate = ref(null);
			let selectedCategory;

			if (props.category) {
				selectedCategory = computed(() => store.getCategory(props.category));
			} else {
				selectedCategory = ref(categories.value[0]);
			}

			const schema = object({
				task: string().required().label('Task'),
			});

			const { handleSubmit, resetForm } = useForm({
				validationSchema: schema,
			});

			const clearDueDate = () => {
				dueDate.value = null;
			};

			const onSubmit = handleSubmit(async (values) => {
				const task = { ...values, category: selectedCategory.value?.value, dueDate: dueDate.value };
				createTask(task);
				resetForm();
				clearDueDate();
			});

			return {
				selectedCategory,
				categories,
				dueDate,
				clearDueDate,
				onSubmit,
			};
		},
	};
</script>

<style lang="scss">
	.add-task {
		background: $dark-page;
		padding: 0 12px;
		border-radius: 12px;
		border: 2px solid $dark;
	}
</style>

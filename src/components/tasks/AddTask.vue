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
					:icon="date ? 'mdi-alarm-check' : 'mdi-alarm'"
					:color="date ? 'green-13' : 'white'">
					<DateTimePicker is-dark v-model="date" mode="dateTime" :min-date="new Date()" />
				</q-btn>

				<SelectCategory v-show="!category" v-model="selectedCategory" />
			</template>
		</InputValidation>
	</form>
</template>

<script>
	import { defineAsyncComponent, ref } from 'vue';
	import { useForm } from 'vee-validate';
	import { object, string } from 'yup';
	import { useTasks } from 'src/hooks/useTasks';
	import InputValidation from 'components/form/InputValidation.vue';
	import SelectCategory from '../form/SelectCategory.vue';

	const DateTimePicker = defineAsyncComponent(() => import('components/form/DateTimePicker.vue'));

	export default {
		components: { InputValidation, DateTimePicker, SelectCategory },
		props: { category: { type: String } },
		setup(props) {
			const date = ref(null);
			const selectedCategory = ref(props.category);
			const { createTask } = useTasks();

			const schema = object({
				task: string().required().label('Task'),
			});

			const { handleSubmit, resetForm } = useForm({
				validationSchema: schema,
			});

			const onSubmit = handleSubmit(async (values) => {
				const task = {
					...values,
					category: selectedCategory.value?.value,
					completeby: date.value,
				};
				createTask(task);
				resetForm();
				date.value = null;
			});

			return {
				date,
				selectedCategory,
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

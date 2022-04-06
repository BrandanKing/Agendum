<template>
	<form>
		<q-item tag="label" class="bg-dark rounded-borders q-pa-xs">
			<q-item-section avatar>
				<q-checkbox v-model="isComplete" :style="`--q-primary:${category?.colour}`" />
			</q-item-section>
			<q-item-section>
				<q-item-label>
					<InputValidation
						v-if="edit"
						name="task"
						autogrow
						dense
						square
						autofocus
						borderless
						hide-bottom-space
						error-message="">
						<template v-slot:append>
							<q-btn round flat padding="8px" icon="mdi-alarm-check">
								<q-popup-proxy transition-show="scale" transition-hide="scale">
									<q-card>
										<q-card-section class="q-px-none q-pb-none">
											<DateTimePicker
												v-model="completionDate"
												is-dark
												mode="dateTime"
												:min-date="new Date()" />
										</q-card-section>
										<q-card-actions align="right">
											<q-btn label="Clear" color="white" flat />
											<q-btn label="OK" color="primary" flat v-close-popup />
										</q-card-actions>
									</q-card>
								</q-popup-proxy>
							</q-btn>
							<q-select
								borderless
								hide-dropdown-icon
								v-model="category"
								:options="categories"
								class="q-ml-sm">
								<template v-slot:selected>
									<q-icon
										size="18px"
										:name="category?.icon"
										:style="`background:${category?.colour}`"
										class="q-pa-xs rounded-borders text-white" />
								</template>
							</q-select>
						</template>
					</InputValidation>
					<div v-else>
						<p class="q-mb-none">{{ task.task }}</p>
						<p class="q-mb-none text-caption">
							<q-icon name="mdi-calendar-blank-outline" style="vertical-align: top" />
							{{ displayDate }}
						</p>
					</div>
				</q-item-label>
			</q-item-section>

			<q-item-section side>
				<div class="text-grey-13 q-gutter-xs">
					<q-btn size="12px" flat dense round icon="mdi-delete" @click="deleteDialog" />
					<q-btn
						size="12px"
						flat
						dense
						round
						:icon="edit ? 'mdi-check' : 'mdi-pencil'"
						v-on="edit ? { click: onSubmit } : { click: toggleEdit }" />
				</div>
			</q-item-section>
		</q-item>
	</form>
</template>

<script>
	import { computed, defineAsyncComponent, ref, watch } from 'vue';
	import { date } from 'quasar';
	import { isEmpty } from 'lodash';
	import { useForm } from 'vee-validate';
	import { object, string } from 'yup';
	import { diff } from 'deep-object-diff';
	import { useTasksStore } from 'stores/useTasksStore';
	import { useTasks } from 'src/hooks/useTasks';
	import { deleteContent } from 'src/utils/DialogUtil';

	import InputValidation from 'components/form/InputValidation.vue';

	const DateTimePicker = defineAsyncComponent(() => import('components/form/DateTimePicker.vue'));

	export default {
		components: { DateTimePicker, InputValidation },
		props: {
			task: {
				type: Object,
				required: true,
			},
		},
		setup(props) {
			const { formatDate } = date;
			const { updateTask, deleteTask } = useTasks();

			const store = useTasksStore();

			const edit = ref(false);
			const isComplete = ref(props.task?.complete);
			const category = ref(store.getCategory(props.task?.category));

			const completionDate = ref(props.task?.date);

			const categories = computed(() => store.getCatgories);
			const displayDate = computed(() => formatDate(props.task?.date, 'Do MMM YYYY'));

			const toggleEdit = () => {
				edit.value = !edit.value;
			};

			const deleteDialog = () => {
				deleteContent(props.task?.task).then((response) => {
					if (response) deleteTask(props.task?.id);
				});
			};

			watch(isComplete, async (complete) => {
				const values = {
					complete,
				};

				updateTask(props.task?.id, values);
			});

			const schema = object({
				task: string().required().label('Task'),
			});

			const { handleSubmit } = useForm({
				validationSchema: schema,
				initialValues: {
					task: props.task?.task,
				},
			});

			const onSubmit = handleSubmit((values) => {
				const initialValues = {
					task: props.task?.task,
					dueDate: props.task?.date,
					category: props.task?.category,
				};
				const updatedValues = {
					...values,
					category: category.value.value,
					dueDate: completionDate.value,
				};
				const updated = diff(initialValues, updatedValues);

				if (!isEmpty(updated)) updateTask(props.task?.id, updated);
				toggleEdit();
			});

			return {
				displayDate,
				completionDate,
				edit,
				isComplete,
				categories,
				category,
				toggleEdit,
				deleteDialog,
				onSubmit,
			};
		},
	};
</script>

<style></style>

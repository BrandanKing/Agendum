<template>
	<form class="task">
		<q-item tag="label" class="bg-dark rounded-borders q-pa-sm" style="min-height: 0">
			<q-item-section side class="q-pr-sm">
				<q-checkbox v-model="isComplete" dense />
			</q-item-section>
			<q-item-section class="full-height">
				<q-item-label class="text-body2">
					<InputValidation
						v-if="edit"
						name="task"
						autogrow
						dense
						square
						autofocus
						borderless
						hide-bottom-space
						input-style="padding:0;" />
					<div v-else>
						{{ task.task }}
						<span v-if="displayDate" class="block text-caption q-mt-sm">
							<q-icon name="mdi-calendar-blank-outline" style="vertical-align: top" />
							{{ displayDate }}
						</span>
					</div>
				</q-item-label>
			</q-item-section>

			<q-item-section side>
				<div class="text-grey-13 q-gutter-xs">
					<q-btn v-if="edit" size="12px" flat dense icon="mdi-dots-vertical">
						<q-menu
							anchor="top middle"
							self="bottom middle"
							transition-show="jump-up"
							transition-hide="jump-down"
							style="box-shadow: none; background: transparent">
							<q-list>
								<q-btn
									class="time-btn shadow-2"
									padding="8px"
									color="dark"
									round
									:icon="completionDate ? 'mdi-alarm-check' : 'mdi-alarm'"
									:text-color="completionDate ? 'green-13' : 'white'">
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
												<q-btn label="Clear" color="white" flat @click="clearDate" />
												<q-btn label="OK" color="primary" flat v-close-popup />
											</q-card-actions>
										</q-card>
									</q-popup-proxy>
								</q-btn>

								<q-select
									v-model="category"
									:options="categories"
									borderless
									hide-dropdown-icon
									behavior="dialog">
									<template v-slot:selected>
										<q-icon
											size="20px"
											:name="category?.icon"
											:style="`background:${category?.colour}; border-radius:100%`"
											class="q-pa-sm text-white shadow-2" />
									</template>
								</q-select>
							</q-list>
						</q-menu>
					</q-btn>
					<q-btn v-else flat dense icon="mdi-delete" size="12px" @click="deleteDialog" />
					<q-btn
						flat
						dense
						size="12px"
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

	const InputValidation = defineAsyncComponent(() => import('components/form/InputValidation.vue'));
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
			const taskID = ref(props.task?.id);
			const completionDate = ref(props.task?.date);

			const displayDate = computed(() => formatDate(completionDate.value, 'Do MMM YYYY'));

			const clearDate = () => {
				completionDate.value = null;
			};

			const category = ref(store.getCategory(props.task?.category));

			const categories = computed(() => store.getCatgories);

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
				updateTask(taskID.value, values);
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
				edit,
				displayDate,
				completionDate,
				isComplete,
				category,
				categories,
				deleteDialog,
				toggleEdit,
				clearDate,
				onSubmit,
			};
		},
	};
</script>

<style lang="scss">
	.task {
		.q-item__section {
			&--side {
				justify-content: flex-start;
			}
			&--main ~ .q-item__section--side {
				padding-left: 8px;
			}
		}
	}
	.time-btn {
		.q-icon {
			font-size: 20px;
		}
	}
	.q-textarea.q-field--dense .q-field__control,
	.q-textarea.q-field--dense .q-field__native {
		min-height: fit-content;
	}
</style>

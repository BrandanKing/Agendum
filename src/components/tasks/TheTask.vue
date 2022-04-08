<template>
	<form class="task">
		<q-item tag="label" class="bg-dark rounded-borders q-pa-md" style="min-height: 0">
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
					<p v-else class="q-mb-none">
						{{ task.task }}
						<span v-if="displayDate" class="block text-caption q-mt-sm">
							<q-icon name="mdi-calendar-blank-outline" style="vertical-align: top" />
							{{ displayDate }}
						</span>
					</p>
				</q-item-label>
			</q-item-section>
			<q-item-section side v-if="!isComplete">
				<div class="text-grey-13 q-gutter-xs">
					<q-btn v-if="edit" size="12px" flat dense icon="mdi-dots-vertical" padding="0">
						<q-menu
							anchor="top middle"
							self="bottom middle"
							transition-show="jump-up"
							transition-hide="jump-down"
							class="no-shadow"
							style="background: transparent">
							<q-list>
								<q-btn
									round
									class="time-btn shadow-2"
									padding="8px"
									color="dark"
									:icon="completionDate ? 'mdi-alarm-check' : 'mdi-alarm'"
									:text-color="completionDate ? 'green-13' : 'white'">
									<DateTimePicker
										is-dark
										mode="dateTime"
										:min-date="new Date()"
										v-model="completionDate" />
								</q-btn>
								<SelectCategory v-model="category" class="selected-category" />
							</q-list>
						</q-menu>
					</q-btn>
					<q-btn v-else flat dense icon="mdi-delete" size="12px" @click="confirmTaskDeletion" padding="0" />
					<q-btn
						flat
						dense
						size="12px"
						:icon="edit ? 'mdi-check' : 'mdi-pencil'"
						v-on="edit ? { click: onSubmit } : { click: toggleEdit }"
						padding="0" />
				</div>
			</q-item-section>
		</q-item>
	</form>
</template>

<script>
	import { computed, ref, defineAsyncComponent, watch } from 'vue';
	import { date } from 'quasar';
	import { isEmpty } from 'lodash';
	import { useForm } from 'vee-validate';
	import { object, string } from 'yup';
	import { diff } from 'deep-object-diff';
	import { useTasks } from 'src/hooks/useTasks';
	import { deleteContent } from 'src/utils/DialogUtil';
	import SelectCategory from 'components/form/SelectCategory.vue';

	const InputValidation = defineAsyncComponent(() => import('components/form/InputValidation.vue'));
	const DateTimePicker = defineAsyncComponent(() => import('components/form/DateTimePicker.vue'));

	export default {
		components: { DateTimePicker, InputValidation, SelectCategory },
		props: {
			task: {
				type: Object,
				required: true,
			},
		},
		setup(props) {
			const { formatDate } = date;
			const { completeTask, updateTask, deleteTask } = useTasks();

			const edit = ref(false);
			const taskID = ref(props.task?.id);
			const isComplete = ref(props.task?.complete);
			const completionDate = ref(props.task?.completeby);
			const category = ref(props.task?.category);

			const displayDate = computed(() => formatDate(completionDate.value, 'Do MMM YYYY'));

			const toggleEdit = () => {
				edit.value = !edit.value;
			};

			watch(isComplete, async (complete) => {
				const values = { complete };
				completeTask(taskID.value, values);
			});

			const confirmTaskDeletion = () => {
				deleteContent(props.task?.task).then((response) => {
					if (response) deleteTask(taskID.value);
				});
			};

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
					completeby: props.task?.completeby,
					category: props.task?.category,
				};
				const updatedValues = {
					...values,
					completeby: completionDate.value,
					category: category.value?.value || props.task?.category,
				};
				const updated = diff(initialValues, updatedValues);
				if (!isEmpty(updated)) updateTask(props.task?.id, updated);
				toggleEdit();
			});

			return {
				edit,
				isComplete,
				completionDate,
				displayDate,
				toggleEdit,
				category,
				confirmTaskDeletion,
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
		.q-textarea.q-field--dense .q-field__control,
		.q-textarea.q-field--dense .q-field__native {
			min-height: fit-content;
		}
		.q-textarea .q-field__control-container {
			padding: 0;
		}
	}
	.time-btn {
		.q-icon {
			font-size: 20px;
		}
	}
	.selected-category {
		.q-icon {
			border-radius: 100%;
		}
	}
</style>

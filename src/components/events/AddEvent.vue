<template>
	<!-- notice dialogRef here -->
	<q-dialog
		@hide="onDialogHide"
		persistent
		ref="dialogRef"
		:full-width="$q.screen.lt.sm"
		:position="$q.screen.lt.sm ? 'bottom' : 'standard'">
		<q-card class="q-dialog-plugin full-width overflow-visible">
			<q-card-section>
				<div class="row q-col-gutter-sm q-mb-md">
					<div class="col-12">
						<InputValidation
							autofocus
							square
							hide-bottom-space
							no-error-icon
							name="event"
							placeholder="Event Title"
							input-class="text-h5 text-weight-bold" />
					</div>
				</div>
				<div class="row q-col-gutter-sm q-mb-md">
					<div class="col-12 col-sm-6">
						<InputValidation
							dense
							square
							readonly
							hide-bottom-space
							no-error-icon
							name="start"
							mask="datetime"
							placeholder="Start Date">
							<template v-slot:prepend>
								<q-icon name="mdi-calendar" />
							</template>
							<template v-slot:append>
								<div class="absolute-full cursor-pointer toggle"></div>
							</template>
						</InputValidation>
					</div>
					<div class="col-12 col-sm-6">
						<InputValidation
							dense
							square
							readonly
							hide-bottom-space
							no-error-icon
							name="end"
							mask="datetime"
							placeholder="End Date">
							<template v-slot:prepend>
								<q-icon name="mdi-calendar" />
							</template>
							<template v-slot:append>
								<div class="absolute-full cursor-pointer toggle"></div>
							</template>
						</InputValidation>
					</div>
					<DateTimePicker v-model="date" mode="datetime" is-dark is-range />
				</div>
				<div class="row q-col-gutter-sm">
					<div class="col-12">
						<ColourPicker v-model="colour" inline />
					</div>
				</div>
			</q-card-section>
			<q-card-actions align="right">
				<q-btn color="white" flat label="Cancel" @click="dialogClose" />
				<q-btn color="positive" label="Add" @click="onSubmit" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script>
	import { ref, defineAsyncComponent, watch } from 'vue';
	import { useDialogPluginComponent } from 'quasar';
	import { useForm } from 'vee-validate';
	import { object, string } from 'yup';
	import { useEvents } from 'src/hooks/useEvents';

	import InputValidation from 'components/form/InputValidation.vue';
	import ColourPicker from 'components/form/ColourPicker.vue';
	import { discardContent } from 'src/utils/DialogUtil';

	const DateTimePicker = defineAsyncComponent(() => import('components/form/DateTimePicker.vue'));

	export default {
		components: { InputValidation, ColourPicker, DateTimePicker },
		props: ['selectedDate'],
		emits: [...useDialogPluginComponent.emits],
		setup(props) {
			const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
			const { createEvent } = useEvents();

			const colour = ref();
			const date = ref({
				start: props.selectedDate,
				end: props.selectedDate,
			});

			const schema = object({
				event: string().required().label('Event Title'),
				start: string().required().label('Start Date'),
				end: string().required().label('End Date'),
			});

			const { handleSubmit, setFieldValue, meta } = useForm({
				validationSchema: schema,
				initialValues: {
					start: date.value.start,
					end: date.value.end,
				},
			});

			watch(date, (newDate) => {
				setFieldValue('start', newDate?.start);
				setFieldValue('end', newDate?.end);
			});

			const dialogClose = () => {
				if (meta.value.dirty) {
					discardContent().then((response) => {
						if (!response) onDialogCancel();
					});
				} else {
					onDialogOK();
				}
			};

			const onSubmit = handleSubmit(async (values) => {
				values.colour = colour.value;
				createEvent(values);
				onDialogOK();
			});

			return {
				colour,
				date,
				dialogRef,
				onDialogHide,
				dialogClose,
				onSubmit,
				onDialogOK,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.q-field--readonly {
		:deep(.q-field__control:before) {
			border-bottom: 1px solid rgba(255, 255, 255, 0.6);
		}
	}
</style>

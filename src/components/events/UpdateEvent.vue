<template>
	<q-dialog
		ref="dialog"
		:full-width="$q.screen.lt.sm"
		:position="$q.screen.lt.sm ? 'bottom' : 'standard'"
		@hide="clearRoute">
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
				<q-btn color="negative" flat label="Delete" @click="deleteDialog" />
				<q-btn color="white" flat label="Cancel" @click="dialogClose" />
				<q-btn color="positive" label="Save" @click="onSubmit" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script>
	import { ref, onMounted, defineAsyncComponent, computed, watch } from 'vue';
	import { useRouter } from 'vue-router';
	import { useForm } from 'vee-validate';
	import { object, string } from 'yup';
	import { diff } from 'deep-object-diff';

	import { useEventsStore } from 'stores/useEventsStore';
	import { useEvents } from 'src/hooks/useEvents';
	import { deleteContent, discardContent } from 'src/utils/DialogUtil';

	import InputValidation from 'components/form/InputValidation.vue';
	import ColourPicker from 'components/form/ColourPicker.vue';

	const DateTimePicker = defineAsyncComponent(() => import('components/form/DateTimePicker.vue'));

	export default {
		components: { InputValidation, ColourPicker, DateTimePicker },
		props: {
			id: {
				type: String,
				required: true,
			},
		},
		setup(props) {
			const dialog = ref(null);
			const router = useRouter();

			const { updateEvent, deleteEvent } = useEvents();

			const store = useEventsStore();
			const event = computed(() => store.getEvent(props.id));
			const colour = ref(event.value.backgroundColor);

			const date = ref({
				start: event.value.start,
				end: event.value.end,
			});

			const schema = object({
				event: string().required().label('Event Title'),
				start: string().required().label('Start Date'),
				end: string().required().label('End Date'),
			});

			const { setFieldValue, handleSubmit, meta } = useForm({
				validationSchema: schema,
				initialValues: {
					event: event.value.title,
					start: new Date(date.value.start).toISOString(),
					end: new Date(date.value.end).toISOString(),
					colour: colour.value,
				},
			});

			watch(date, (newDate) => {
				setFieldValue('start', newDate?.start);
				setFieldValue('end', newDate?.end);
			});

			onMounted(() => {
				dialog.value.show();
			});

			const clearRoute = () => {
				router.replace({ name: 'Events' });
			};

			const dialogClose = () => {
				if (meta.value.dirty) {
					discardContent().then((response) => {
						if (!response) dialog.value.hide();
					});
				} else {
					dialog.value.hide();
				}
			};

			const deleteDialog = () => {
				deleteContent(event.value.title).then((response) => {
					if (response) {
						deleteEvent(event.value?.id);
						dialog.value.hide();
					}
				});
			};

			const onSubmit = handleSubmit(async (values) => {
				values.colour = colour.value;
				const updated = diff(meta.value.initialValues, values);
				updateEvent(props.id, updated);
				dialog.value.hide();
			});

			return {
				dialog,
				clearRoute,
				colour,
				date,
				deleteDialog,
				dialogClose,
				onSubmit,
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

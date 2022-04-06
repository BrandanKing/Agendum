<template>
	<!-- notice dialogRef here -->
	<q-dialog
		ref="dialogRef"
		persistent
		@hide="onDialogHide"
		:full-width="$q.screen.lt.sm"
		:position="$q.screen.lt.sm ? 'bottom' : 'standard'">
		<q-card>
			<form @submit="onSubmit">
				<q-card-section class="row items-center q-col-gutter-sm">
					<div class="col-12">
						<InputValidation
							autofocus
							name="title"
							placeholder="Title"
							input-class="text-h5 text-weight-bold" />
					</div>
					<div class="col-12">
						<TextEditor name="note" placeholder="Add Note" dense square flat />
					</div>

					<q-card-actions class="col-12" align="right">
						<q-btn flat label="Cancel" color="grey-13" padding="6px 18px" no-caps @click="dialogClose" />
						<q-btn label="Add Note" color="accent" padding="6px 18px" no-caps type="submit" />
					</q-card-actions>
				</q-card-section>
			</form>
		</q-card>
	</q-dialog>
</template>

<script>
	import { useDialogPluginComponent } from 'quasar';
	import { useForm } from 'vee-validate';
	import { object, string } from 'yup';
	import { discardContent } from 'src/utils/DialogUtil';
	import { useNotes } from 'src/hooks/useNotes';
	import TextEditor from 'components/form/TextEditor.vue';
	import InputValidation from 'components/form/InputValidation.vue';

	export default {
		emits: [...useDialogPluginComponent.emits],
		components: { TextEditor, InputValidation },
		setup() {
			const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

			const { addNote } = useNotes();

			const schema = object({
				title: string().required().label('Title'),
				note: string().required().label('Note'),
			});

			const { handleSubmit, meta } = useForm({
				validationSchema: schema,
				initialValues: {
					title: '',
					note: '',
				},
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
				addNote(values);
				onDialogOK();
			});

			return {
				dialogRef,
				onDialogHide,
				dialogClose,
				onSubmit,
				onDialogOK,
			};
		},
	};
</script>

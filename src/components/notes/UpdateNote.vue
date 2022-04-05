<template>
	<q-dialog
		ref="dialog"
		:full-width="$q.screen.lt.sm"
		:position="$q.screen.lt.sm ? 'bottom' : 'standard'"
		persistent
		@hide="clearRoute">
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
						<q-btn
							label="Update Note"
							color="accent"
							padding="6px 18px"
							no-caps
							type="submit"
							:disabled="!meta.dirty" />
					</q-card-actions>
				</q-card-section>
			</form>
		</q-card>
	</q-dialog>
</template>

<script>
	import { ref, onMounted, computed } from 'vue';
	import { useRouter } from 'vue-router';
	import { useForm } from 'vee-validate';
	import { object, string } from 'yup';
	import { diff } from 'deep-object-diff';
	import { discardContent } from 'src/utils/DialogUtil';
	import { useNotesStore } from 'src/stores/useNotesStore';
	import { useNotes } from 'src/hooks/useNotes';
	import TextEditor from 'src/components/form/TextEditor.vue';
	import InputValidation from 'src/components/form/InputValidation.vue';

	export default {
		components: { TextEditor, InputValidation },
		props: {
			id: {
				type: String,
				required: true,
			},
		},
		setup(props) {
			const router = useRouter();
			const dialog = ref(null);

			const store = useNotesStore();
			const note = computed(() => store.getNote(props.id));

			const { updateNote } = useNotes();

			onMounted(() => {
				dialog.value.show();
			});

			const clearRoute = () => {
				router.replace({ name: 'Notes' });
			};
			const schema = object({
				title: string().required().label('Title'),
				note: string().required().label('Note'),
			});

			const initialValues = {
				title: note.value?.title,
				note: note.value?.note,
			};

			const { handleSubmit, meta } = useForm({
				validationSchema: schema,
				initialValues,
			});

			const dialogClose = () => {
				if (meta.value.dirty) {
					discardContent().then((response) => {
						if (!response) dialog.value.hide();
					});
				} else {
					dialog.value.hide();
				}
			};

			const onSubmit = handleSubmit(async (values) => {
				const updated = diff(initialValues, values);
				updateNote(props.id, updated);
				dialog.value.hide();
			});

			return {
				dialog,
				clearRoute,
				dialogClose,
				onSubmit,
				meta,
			};
		},
	};
</script>

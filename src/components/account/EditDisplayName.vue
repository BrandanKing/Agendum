<template>
	<form @submit="onSubmit">
		<InputValidation square dense name="displayName" :filled="edit" :borderless="!edit" :disable="!edit">
			<template v-slot:after>
				<q-btn
					no-caps
					unelevated
					color="grey-9"
					class="full-height"
					:label="meta.dirty && edit ? 'Save' : 'Edit'"
					v-on="meta.dirty && edit ? { click: onSubmit } : { click: toggleEdit }" />
			</template>
		</InputValidation>
	</form>
</template>
<script>
	import { ref } from 'vue';
	import { useForm } from 'vee-validate';
	import { object, string } from 'yup';

	import { useUserStore } from 'stores/useUserStore';
	import { useAuth } from 'src/hooks/useAuth';

	import InputValidation from 'components/form/InputValidation.vue';

	export default {
		components: { InputValidation },
		setup() {
			const store = useUserStore();
			const edit = ref(false);
			const displayName = store.getDisplayName;

			const { updateDisplayName } = useAuth();

			const toggleEdit = () => {
				edit.value = !edit.value;
			};

			const schema = object({
				displayName: string().required().label('Display Name'),
			});

			const { handleSubmit, resetForm, isSubmitting, meta } = useForm({
				validationSchema: schema,
				initialValues: {
					displayName,
				},
			});

			const onSubmit = handleSubmit(async (values) => {
				const { success } = await updateDisplayName(values);
				if (success) {
					resetForm({ values });
					toggleEdit();
				}
			});

			return {
				edit,
				toggleEdit,
				isSubmitting,
				meta,
				onSubmit,
			};
		},
	};
</script>

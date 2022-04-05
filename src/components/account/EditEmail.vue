<template>
	<form @submit="onSubmit">
		<InputValidation square dense name="email" :filled="edit" :borderless="!edit" :disable="!edit">
			<template v-slot:after>
				<q-btn
					no-caps
					unelevated
					color="grey-9"
					:label="meta.dirty && edit ? 'Save' : 'Edit'"
					class="full-height"
					v-on="meta.dirty && edit ? { click: onSubmit } : { click: toggleEdit }" />
			</template>
		</InputValidation>
	</form>
</template>
<script>
	import { ref } from 'vue';
	import { useForm } from 'vee-validate';
	import { object, string } from 'yup';
	import { useUserStore } from 'src/stores/useUserStore';
	import { useAuth } from 'src/hooks/useAuth';
	import InputValidation from 'src/components/form/InputValidation.vue';

	export default {
		components: { InputValidation },
		setup() {
			const store = useUserStore();
			const { updateUserEmail } = useAuth();

			const edit = ref(false);
			const toggleEdit = () => {
				edit.value = !edit.value;
			};

			const schema = object({
				email: string().required().email().label('Email Address'),
			});

			const email = store.getEmail;

			const { handleSubmit, resetForm, isSubmitting, meta } = useForm({
				validationSchema: schema,
				initialValues: {
					email,
				},
			});

			const onSubmit = handleSubmit(async (values) => {
				const { success } = await updateUserEmail(values);
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

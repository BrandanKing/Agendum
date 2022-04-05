<template>
	<q-input v-model="value" :error-message="errorMessage" :error="!!errorMessage">
		<template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
			<slot :name="slot" v-bind="scope || {}" />
		</template>
	</q-input>
</template>

<script>
	import { useField } from 'vee-validate';

	export default {
		props: {
			name: {
				type: String,
				required: true,
			},
		},
		setup(props) {
			const { errorMessage, value } = useField(props.name);

			return {
				errorMessage,
				value,
			};
		},
	};
</script>

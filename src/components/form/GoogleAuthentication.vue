<template>
	<q-btn
		no-caps
		color="primary"
		icon="mdi-google"
		label="Continue with Google"
		class="full-width"
		@click="googleAuthentication(type)" />
</template>

<script>
	import { useAuth } from 'src/hooks/useAuth';

	export default {
		props: {
			type: {
				type: String,
				required: true,
			},
		},
		setup() {
			const { googleAuthentication } = useAuth();

			return { googleAuthentication };
		},
	};
</script>

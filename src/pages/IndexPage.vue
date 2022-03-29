<template>
	<q-btn color="primary" @click="logoutUser">Logout</q-btn>
</template>

<script>
	import { useAuth } from 'src/hooks/useAuth';

	export default {
		setup() {
			const { logoutUser } = useAuth();

			return {
				logoutUser,
			};
		},
	};
</script>

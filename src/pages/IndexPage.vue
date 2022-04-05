<template>
	<Calendar />
</template>

<script>
	import { Calendar } from 'v-calendar';

	export default {
		components: {
			Calendar,
		},
		setup() {},
	};
</script>

<style lang="scss">
	@import 'v-calendar/dist/style.css';
</style>

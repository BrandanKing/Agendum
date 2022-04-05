<template>
	<p>{{ displayName }}</p>
</template>

<script>
	import { computed } from 'vue';
	import { useUserStore } from 'stores/useUserStore';

	export default {
		setup() {
			const store = useUserStore();
			const displayName = computed(() => store.getDisplayName);

			return {
				displayName,
			};
		},
	};
</script>

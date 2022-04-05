<template>
	<q-header elevated class="bg-dark">
		<q-toolbar>
			<q-btn flat round dense icon="mdi-menu" @click="toggleNav" />
			<div class="flex flex-center q-ml-lg">
				<q-icon size="xs" name="mdi-view-dashboard" class="q-mr-sm" />
				<p class="text-h6 q-mb-none">{{ title }}</p>
			</div>
			<q-space></q-space>
			<router-link :to="{ name: 'Account' }">
				<q-avatar>
					<q-img src="~assets/female_avatar.svg" alt="Account Settings" />
				</q-avatar>
			</router-link>
		</q-toolbar>
	</q-header>

	<TheNavigation v-model="drawer" />
</template>

<script>
	import { ref, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import TheNavigation from './TheNavigation.vue';

	export default {
		components: { TheNavigation },
		setup() {
			const drawer = ref(false);
			const route = useRoute();
			const title = computed(() => route.name);

			const toggleNav = () => {
				drawer.value = !drawer.value;
			};

			return {
				drawer,
				toggleNav,
				title,
			};
		},
	};
</script>

<style></style>

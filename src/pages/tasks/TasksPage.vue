<template>
	<div class="container-sm">
		<TasksProvider>
			<div class="row q-col-gutter-lg q-mb-lg">
				<div class="col-12">
					<h1 class="q-mb-none">Tasks</h1>
				</div>
				<div class="col-12">
					<AddTask />
				</div>
			</div>
			<div class="row q-col-gutter-md" v-if="hasTasks">
				<div v-for="category in categories" :key="category.value" class="col-6 col-md-3 col-xl-2">
					<CategoryOverview :category="category" />
				</div>
			</div>
			<div class="flex flex-center column" v-else>
				<q-img src="~assets/tasks.svg" class="q-my-md no-results-image" />
				<p class="text-h4 text-weight-bold">You currently don't have any tasks</p>
			</div>
		</TasksProvider>
	</div>
</template>

<script>
	import { computed } from 'vue';

	import { TasksProvider } from 'src/hooks/useTasks';
	import { useTasksStore } from 'stores/useTasksStore';

	import AddTask from 'components/tasks/AddTask.vue';
	import CategoryOverview from 'components/categories/CategoryOverview.vue';

	export default {
		components: { AddTask, TasksProvider, CategoryOverview },
		setup() {
			const store = useTasksStore();
			const categories = computed(() => store.getCategoryInfo);
			const hasTasks = computed(() => store.getHasTasks);

			return {
				hasTasks,
				categories,
			};
		},
	};
</script>

<style></style>

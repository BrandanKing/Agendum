<template>
	<div class="container overflow-hidden" :style="`--q-primary:${currentCategory?.colour}`">
		<div class="row q-col-gutter-lg q-mb-lg">
			<div class="col-12 flex items-center">
				<q-btn color="dark" padding="xs" size="16px" icon="mdi-chevron-left" :to="{ name: 'Tasks' }" />
				<h1 class="q-mb-none q-ml-lg">{{ currentCategory?.label }}</h1>
			</div>
			<div class="col-12">
				<AddTask :category="currentCategory?.value" />
			</div>
		</div>

		<p class="text-h5 text-weight-bold">Tasks - {{ totalRemainingTasks }}</p>

		<transition-group appear tag="div" name="fade" class="row q-col-gutter-md q-mb-md relative-position">
			<div class="col-12" v-for="task in tasks?.false" :key="task.id">
				<TheTask :task="task" />
			</div>
		</transition-group>

		<p class="text-h5 text-weight-bold">Completed - {{ totalCompletedTasks }}</p>

		<transition-group appear tag="div" name="fade" class="row q-col-gutter-md q-mb-md relative-position">
			<div class="col-12" v-for="task in tasks?.true" :key="task.id">
				<TheTask :task="task" />
			</div>
		</transition-group>
	</div>
</template>

<script>
	import { useTasks } from 'src/hooks/useTasks';
	import { useTasksStore } from 'stores/useTasksStore';
	import { computed, onMounted, onUnmounted } from 'vue';
	import AddTask from 'components/tasks/AddTask.vue';
	import TheTask from 'components/tasks/TheTask.vue';

	export default {
		props: {
			category: {
				type: String,
				required: true,
			},
		},
		setup(props) {
			const store = useTasksStore();
			const currentCategory = computed(() => store.getCategory(props.category));
			const tasks = computed(() => store.getCategoryTasks);
			const { getTasks } = useTasks();

			const totalCompletedTasks = computed(() => {
				return tasks.value?.true ? tasks.value?.true.length : 0;
			});
			const totalRemainingTasks = computed(() => {
				return tasks.value?.false ? tasks.value?.false.length : 0;
			});

			let unsubscribe;
			onMounted(async () => {
				unsubscribe = await getTasks(props.category);
			});
			onUnmounted(() => {
				unsubscribe();
			});
			return {
				tasks,
				totalRemainingTasks,
				totalCompletedTasks,
				currentCategory,
			};
		},
		components: { AddTask, TheTask },
	};
</script>
<style>
	/* 1. declare transition */
	.fade-move,
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
	}

	/* 2. declare enter from and leave to state */
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		transform: scaleY(0.01) translate(30px, 0);
	}

	/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
	.fade-leave-active {
		position: absolute;
	}
</style>

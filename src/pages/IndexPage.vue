<template>
	<div class="container-md">
		<TasksProvider>
			<NotesProvider>
				<EventProvider>
					<div class="row q-col-gutter-md">
						<div class="col-12">
							<h1 class="q-my-none text-h6 text-weight-bold">Welcome, {{ displayName }}</h1>
						</div>
						<div class="col-12 col-lg flex column">
							<div class="flex justify-between q-mb-md">
								<p class="q-my-none text-subtitle1">Monthly Overview</p>
								<q-btn
									color="purple-5"
									class="q-ml-xs"
									label="View Calendar"
									no-caps
									:to="{ name: 'Events' }"></q-btn>
							</div>
							<q-card class="flex-1">
								<q-card-section class="full-height q-pa-sm">
									<EventsCalendar :header="false" />
								</q-card-section>
							</q-card>
						</div>
						<div class="col-12 col-lg-5" v-if="hasTasks || hasNotes">
							<div class="row q-col-gutter-md">
								<div class="col-12 flex justify-between" v-if="hasTasks">
									<p class="q-my-none text-subtitle1">Task Overview</p>
									<q-btn
										color="accent"
										class="q-ml-sm"
										label="View All Tasks"
										no-caps
										:to="{ name: 'Tasks' }"></q-btn>
								</div>
								<div v-for="category in categories.slice(0, 4)" :key="category.value" class="col-6">
									<CategoryOverview :category="category" />
								</div>
								<div class="col-12 flex items-start justify-between" v-if="hasNotes">
									<p class="q-my-none text-subtitle1">Recent Notes</p>
									<q-btn
										color="accent"
										class="q-ml-sm"
										label="View All Notes"
										no-caps
										:to="{ name: 'Notes' }"></q-btn>
								</div>
								<div class="col-12" v-if="hasNotes">
									<q-card>
										<q-list padding separator>
											<q-item v-for="note in notes.slice(0, 2)" :key="note.id">
												<q-item-section avatar top>
													<q-avatar
														icon="mdi-book-edit-outline"
														color="secondary"
														text-color="white" />
												</q-item-section>

												<q-item-section>
													<q-item-label lines="1">{{ note.title }}</q-item-label>
													<q-item-label caption lines="1"
														>{{ note.date }} | {{ note.note }}</q-item-label
													>
												</q-item-section>
											</q-item>
										</q-list>
									</q-card>
								</div>
							</div>
						</div>
					</div>
				</EventProvider>
			</NotesProvider>
		</TasksProvider>
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { TasksProvider } from 'src/hooks/useTasks';
	import { NotesProvider } from 'src/hooks/useNotes';
	import { EventProvider } from 'src/hooks/useEvents';

	import { useUserStore } from 'stores/useUserStore';
	import { useTasksStore } from 'stores/useTasksStore';
	import { useNotesStore } from 'stores/useNotesStore';

	import EventsCalendar from 'src/components/calendar/EventsCalendar.vue';
	import CategoryOverview from 'components/categories/CategoryOverview.vue';

	export default {
		components: { TasksProvider, NotesProvider, EventProvider, EventsCalendar, CategoryOverview },
		setup() {
			const userStore = useUserStore();
			const taskStore = useTasksStore();
			const notesStore = useNotesStore();

			const categories = computed(() => taskStore.getCategoryInfo);
			const hasTasks = computed(() => taskStore.getHasTasks);
			const hasNotes = computed(() => notesStore.getHasNotes);

			const displayName = computed(() => userStore.getDisplayName);
			const notes = computed(() => notesStore.getNotes);

			return {
				displayName,
				categories,
				hasTasks,
				hasNotes,
				notes,
			};
		},
	};
</script>

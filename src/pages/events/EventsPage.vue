<template>
	<div class="container-md">
		<EventProvider>
			<div class="row">
				<div class="col-12 flex items-center justify-between">
					<h1>Calendar</h1>
				</div>
				<div class="col-12">
					<q-card>
						<q-card-section class="q-pa-sm">
							<EventsCalendar />
						</q-card-section>
					</q-card>
				</div>
			</div>
			<router-view v-if="!$q.loadingBar.isActive"></router-view>
		</EventProvider>
	</div>
</template>

<script>
	import { ref } from 'vue';
	import { EventProvider } from 'src/hooks/useEvents';
	import EventsCalendar from 'components/calendar/EventsCalendar.vue';

	export default {
		components: { EventsCalendar, EventProvider },
		setup() {
			const start = ref(1649410200000);

			return {
				start,
			};
		},
	};
</script>

<style></style>

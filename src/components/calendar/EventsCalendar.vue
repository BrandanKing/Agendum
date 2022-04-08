<template>
	<FullCalendar class="agendum-calendar" :options="calendarOptions" />
</template>
<script>
	import { computed, defineAsyncComponent } from 'vue';
	import { useQuasar } from 'quasar';
	import '@fullcalendar/core/vdom'; // solves problem with Vite
	import FullCalendar from '@fullcalendar/vue3';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';

	import { useEventsStore } from 'src/stores/useEventsStore';
	import { useRouter } from 'vue-router';

	const AddEvent = defineAsyncComponent(() => import('components/events/AddEvent.vue'));

	export default {
		props: {
			header: {
				type: Boolean,
				default: true,
			},
		},
		components: {
			FullCalendar,
		},
		setup(props) {
			const store = useEventsStore();
			const events = computed(() => store.getEvents);
			const $q = useQuasar();
			const router = useRouter();
			const headerToolbar = {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,dayGridWeek',
			};

			const configOptions = computed(() => {
				return {
					plugins: [dayGridPlugin, interactionPlugin],
					initialView: 'dayGridMonth',
					fixedWeekCount: false,
					displayEventTime: false,
					dayMaxEvents: 3,
					headerToolbar: props.header ? headerToolbar : props.header,
					events: events.value,
				};
			});

			const onDateClick = (payload) => {
				$q.dialog({
					component: AddEvent,
					componentProps: {
						selectedDate: payload.dateStr,
					},
				});
			};

			const onEventClick = ({ event }) => {
				router.push({ name: 'Event', params: { id: event.id } });
			};

			const eventHandlers = computed(() => {
				return {
					dateClick: onDateClick,
					eventClick: onEventClick,
				};
			});

			const calendarOptions = computed(() => {
				return {
					...configOptions.value,
					...eventHandlers.value,
				};
			});

			return {
				calendarOptions,
			};
		},
	};
</script>

<template>
	<div class="flex flex-center column">
		<h1 class="text-weight-regular">Your Notes</h1>
		<h5>You currently have no notes, get started today</h5>
		<q-img src="~assets/add_notes.svg" class="q-my-md no-results-image" />
		<q-btn color="primary" size="18px" no-caps ripple @click="addNoteDialog">Get Started</q-btn>
	</div>
</template>

<script>
	import { defineAsyncComponent } from 'vue';
	import { useQuasar } from 'quasar';

	const AddNote = defineAsyncComponent(() => import('components/notes/AddNote.vue'));

	export default {
		setup() {
			const $q = useQuasar();
			const addNoteDialog = () => {
				$q.dialog({
					component: AddNote,
				});
			};
			return {
				addNoteDialog,
			};
		},
	};
</script>

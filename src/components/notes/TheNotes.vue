<template>
	<div class="row">
		<div class="col-12 flex items-center justify-between">
			<h1>Notes</h1>
			<q-btn color="primary" round ripple icon="mdi-notebook-plus-outline" class="gt-xs" @click="addNoteDialog" />
		</div>
		<div class="col-12">
			<masonry-wall :items="notes" :ssr-columns="4" :column-width="250" :gap="16">
				<template #default="{ item }">
					<TheNote :note="item" />
				</template>
			</masonry-wall>
		</div>
		<q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn fab icon="mdi-notebook-plus-outline" color="accent" @click="addNoteDialog" />
		</q-page-sticky>
	</div>
</template>

<script>
	import { computed, defineAsyncComponent } from 'vue';
	import { useQuasar } from 'quasar';
	import MasonryWall from '@yeger/vue-masonry-wall';
	import TheNote from 'components/notes/TheNote.vue';
	import { useNotesStore } from 'stores/useNotesStore';

	const AddNote = defineAsyncComponent(() => import('components/notes/AddNote.vue'));

	export default {
		components: { MasonryWall, TheNote },
		setup() {
			const $q = useQuasar();
			const store = useNotesStore();

			const notes = computed(() => store.getNotes);

			const addNoteDialog = () => {
				$q.dialog({
					component: AddNote,
				});
			};

			return {
				addNoteDialog,
				notes,
			};
		},
	};
</script>

<style></style>

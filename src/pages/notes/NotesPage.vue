<template>
	<div class="container">
		<NotesProvider>
			<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
				<NoNotes v-if="!hasNotes" />
				<TheNotes v-else />
			</transition>
			<router-view v-if="!$q.loadingBar.isActive"></router-view>
		</NotesProvider>
	</div>
</template>

<script>
	import { computed, defineAsyncComponent } from 'vue';
	import { NotesProvider } from 'src/hooks/useNotes';
	import { useNotesStore } from 'src/stores/useNotesStore';

	const TheNotes = defineAsyncComponent(() => import('src/components/notes/TheNotes.vue'));
	const NoNotes = defineAsyncComponent(() => import('src/components/notes/NoNotes.vue'));

	export default {
		components: { NoNotes, NotesProvider, TheNotes },
		setup() {
			const store = useNotesStore();

			const hasNotes = computed(() => store.getHasNotes);

			return {
				hasNotes,
			};
		},
	};
</script>

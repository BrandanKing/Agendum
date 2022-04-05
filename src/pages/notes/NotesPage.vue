<template>
	<div class="container">
		<NotesProvider>
			<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
				<q-inner-loading v-if="$q.loadingBar.isActive" :showing="true" color="white" />
				<NoNotes v-else-if="!hasNotes" />
				<TheNotes v-else />
			</transition>
			<router-view v-if="!$q.loadingBar.isActive"></router-view>
		</NotesProvider>
	</div>
</template>

<script>
	import { computed, defineAsyncComponent } from 'vue';
	import { NotesProvider } from 'src/hooks/useNotes';
	import { useNotesStore } from 'stores/useNotesStore';

	const TheNotes = defineAsyncComponent(() => import('components/notes/TheNotes.vue'));
	const NoNotes = defineAsyncComponent(() => import('components/notes/NoNotes.vue'));

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

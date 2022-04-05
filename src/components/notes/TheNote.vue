<template>
	<router-link :to="{ name: 'Note', params: { id: note.id } }">
		<q-card :class="{ 'animated infinite shakeX': animate }" v-touch-hold:600:12:15.mouse="deleteDialog">
			<q-card-section v-ripple class="cursor-pointer">
				<q-badge color="red text-caption q-mb-sm" v-if="note.local">
					Stored Offline <q-icon name="mdi-alert" color="white" class="q-ml-sm" />
				</q-badge>
				<q-item class="q-px-none q-pb-md items-start">
					<q-item-section avatar>
						<q-avatar icon="mdi-notebook-edit-outline" color="accent" text-color="white" />
					</q-item-section>
					<q-item-section>
						<q-item-label class="text-h6 text-weight-bold ellipsis-2-lines" v-html="note.title" />
						<q-item-label caption>{{ note.date }}</q-item-label>
					</q-item-section>
				</q-item>
				<div class="text-grey-13 note-overview" v-html="note.note"></div>
			</q-card-section>
		</q-card>
	</router-link>
</template>

<script>
	import { ref } from 'vue';
	import { deleteContent } from 'src/utils/DialogUtil';
	import { useNotes } from 'src/hooks/useNotes';

	export default {
		props: {
			note: {
				type: Object,
				required: true,
			},
		},
		setup(props) {
			const animate = ref(false);
			const { deleteNote } = useNotes();

			const deleteDialog = () => {
				animate.value = true;
				deleteContent(props.note?.title)
					.then((response) => {
						if (response) deleteNote(props.note?.id);
					})
					.finally(() => {
						animate.value = false;
					});
			};

			return {
				deleteDialog,
				animate,
			};
		},
	};
</script>

<style lang="scss">
	.note-overview {
		overflow: hidden;
		-webkit-line-clamp: 8;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		@media (max-width: $breakpoint-xs) {
			-webkit-line-clamp: 6;
		}
	}
</style>

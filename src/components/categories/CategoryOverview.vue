<template>
	<router-link :to="{ name: 'Task', params: { category: category?.value } }">
		<q-card>
			<q-card-section>
				<div class="flex items-center q-mb-sm">
					<q-icon
						size="24px"
						:name="category?.icon"
						:style="`background:${category?.colour}`"
						class="q-mr-md q-pa-xs rounded-borders text-white" />
					<p class="text-weight-bold q-mb-none task-category text-h6">
						{{ category?.label }}
					</p>
				</div>
				<div class="flex flex-center no-wrap">
					<q-linear-progress
						rounded
						stripe
						size="5px"
						:style="`--q-primary:${category?.colour}`"
						:value="category?.percentage" />
					<q-badge
						rounded
						:label="`${category?.completed}/${category?.total}`"
						class="q-ml-sm q-px-sm text-caption"
						:style="`background:${category?.colour}`" />
				</div>
			</q-card-section>
		</q-card>
	</router-link>
</template>

<script>
	export default {
		props: {
			category: {
				type: Object,
				required: true,
			},
		},
	};
</script>

<style lang="scss">
	.task-category {
		@media (max-width: $breakpoint-xs-max) {
			font-size: 0.8rem;
		}
	}
</style>

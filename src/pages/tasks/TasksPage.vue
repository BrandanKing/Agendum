<template>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1>Tasks</h1>
			</div>
			<div class="col-12">
				<AddTask />
			</div>
		</div>
	</div>
</template>

<script>
	import AddTask from 'components/tasks/AddTask.vue';

	export default {
		components: { AddTask },
		setup() {},
	};
</script>

<style></style>

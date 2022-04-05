import { defineStore } from 'pinia';
import { taskCategories } from 'src/data';

export const useTasksStore = defineStore('tasks', {
	state: () => ({
		tasks: [],
		categories: taskCategories,
	}),
	getters: {
		getCatgories: ({ categories }) => categories,
		getCategory: ({ categories }) => {
			const result = (categoryValue) => categories.find(({ value }) => value === categoryValue);
			return result;
		},
	},
	actions: {
		clearTasks() {
			this.$reset();
		},
	},
});

import { defineStore } from 'pinia';
import { taskCategories } from 'src/data';
import { forEach, groupBy } from 'lodash';

export const useTasksStore = defineStore('tasks', {
	state: () => ({
		tasks: [],
		categories: taskCategories,
	}),
	getters: {
		getTasks: ({ tasks }) => tasks,
		getCategoryTasks: ({ tasks }) => groupBy(tasks, (task) => task.complete),
		getHasTasks: ({ tasks }) => tasks?.length > 0,
		getCatgories: ({ categories }) => categories,
		getCategory: ({ categories }) => {
			return (categoryValue) => categories.find(({ value }) => value === categoryValue);
		},
		getCategoryInfo({ tasks }) {
			const groupedCategories = groupBy(tasks, (task) => task.category);
			const catData = [];

			forEach(groupedCategories, (value, key) => {
				const totalCompleted = value.reduce((acc, cur) => {
					const complete = cur.complete ? (acc += 1) : acc;
					return complete;
				}, 0);

				let category = this.getCategory(key);

				category = {
					...category,
					total: value.length,
					completed: totalCompleted,
					percentage: Number((totalCompleted / value.length).toFixed(2)),
				};

				catData.push(category);
			});
			return catData;
		},
	},
	actions: {
		setTasks(tasks) {
			this.tasks = tasks;
		},
		clearTasks() {
			this.$reset();
		},
	},
});

import { Notify } from 'quasar';

export const errorToast = (message) => {
	Notify.create({
		type: 'negative',
		message,
		position: 'center',
		icon: 'mdi-alert-circle-outline',
		timeout: 2500,
	});
};

export const successToast = (message) => {
	Notify.create({
		type: 'positive',
		message,
		position: 'top',
		icon: 'mdi-alert-circle-outline',
		timeout: 2500,
	});
};

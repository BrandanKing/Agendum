import { Notify } from 'quasar';

export const errorToast = (message) => {
	Notify.create({
		type: 'negative',
		message,
		position: 'center',
	});
};

export const successToast = (message) => {
	Notify.create({
		type: 'positive',
		message,
		position: 'top',
	});
};

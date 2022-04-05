import { Dialog } from 'quasar';

export const discardContent = () => {
	const response = new Promise((resolve) => {
		Dialog.create({
			title: 'Confirm',
			message: 'Are you sure you want to discard the information you have entered?',
			ok: {
				flat: true,
				color: 'primary',
			},
			cancel: {
				flat: true,
				color: 'negative',
			},
		})
			.onOk(() => resolve(false))
			.onCancel(() => resolve(true));
	});
	return response;
};

export const deleteContent = (title) => {
	const response = new Promise((resolve) => {
		Dialog.create({
			title: 'Delete',
			message: `Are you sure you want to remove <strong>${title}</strong>`,
			html: true,
			ok: {
				label: 'Delete',
				color: 'negative',
			},
			cancel: {
				flat: true,
				color: 'white',
			},
		})
			.onOk(() => resolve(true))
			.onCancel(() => resolve(false));
	});
	return response;
};

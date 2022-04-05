<template>
	<q-field
		class="block-wrapper"
		borderless
		no-error-icon
		:dense="false"
		:error-message="errorMessage"
		:error="!!errorMessage">
		<q-editor v-model="value" :toolbar="toolbar" v-bind="$attrs" />
	</q-field>
</template>

<script>
	import { useQuasar } from 'quasar';
	import { useField } from 'vee-validate';

	export default {
		props: {
			name: {
				type: String,
				required: true,
			},
		},
		inheritAttrs: false,
		setup(props) {
			const { errorMessage, value } = useField(props.name);
			const $q = useQuasar();

			const toolbar = [
				[
					{
						icon: $q.iconSet.editor.align,
						fixedLabel: true,
						list: 'only-icons',
						options: ['left', 'center', 'right', 'justify'],
					},
					{
						icon: $q.iconSet.editor.fontSize,
						fixedLabel: true,
						fixedIcon: true,
						list: 'no-icons',
						options: ['size-2', 'size-3', 'size-5'],
					},
				],
				['bold', 'italic', 'strike'],
				['hr', 'link'],
				['unordered', 'ordered', 'outdent', 'indent'],
				['undo', 'redo', 'removeFormat'],
			];

			return {
				toolbar,
				errorMessage,
				value,
			};
		},
	};
</script>

<style lang="scss">
	.q-editor {
		/* width */
		::-webkit-scrollbar {
			height: 8px;
		}

		/* Track */
		::-webkit-scrollbar-track {
			background: var(--q-dark, #{$dark});
		}

		/* Handle */
		::-webkit-scrollbar-thumb {
			background: var(--q-dark-page, #{$dark-page});
			border-radius: $generic-border-radius;
			cursor: pointer;
		}
		&__content {
			cursor: text;
		}
		&__toolbars-container {
			border-bottom: 1px solid white;
		}
	}
	.q-menu .q-item:last-child {
		padding-bottom: 8px;
	}
	.block-wrapper {
		.q-field__control-container {
			display: block;
		}
	}
</style>

<template>
	<q-drawer v-model="toggled" show-if-above :width="215" dark>
		<q-scroll-area class="fit">
			<q-list>
				<template v-for="({ icon, separator, label, routeName }, index) in menuItems" :key="index">
					<q-item clickable v-ripple :to="{ name: routeName }" active-class="">
						<q-item-section avatar>
							<q-icon :name="icon" />
						</q-item-section>
						<q-item-section>
							{{ label }}
						</q-item-section>
					</q-item>
					<q-separator :key="`sep${index}`" v-if="separator" />
				</template>
				<q-item clickable v-ripple active-class="" @click="logoutUser">
					<q-item-section avatar>
						<q-icon name="mdi-exit-to-app" />
					</q-item-section>
					<q-item-section> Sign Out </q-item-section>
				</q-item>
			</q-list>
		</q-scroll-area>
	</q-drawer>
</template>

<script>
	import { computed } from 'vue';
	import { menuItems } from 'src/data';
	import { useAuth } from 'src/hooks/useAuth';

	export default {
		props: ['modelValue'],
		emits: ['update:modelValue'],
		setup(props, { emit }) {
			const toggled = computed({
				get() {
					return props.modelValue;
				},
				set(value) {
					emit('update:modelValue', value);
				},
			});
			const { logoutUser } = useAuth();
			return {
				toggled,
				menuItems,
				logoutUser,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.q-item {
		.q-icon {
			height: 32px;
			width: 32px;
			transition: all 0.3s ease;
			border-radius: 8px;
		}
		&__section--avatar {
			min-width: 0;
		}
		&.q-router-link--exact-active {
			.q-icon {
				background: var(--q-accent);
				font-size: 20px;
			}
		}
	}
</style>

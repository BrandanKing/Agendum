<template>
	<div class="container">
		<div class="row q-col-gutter-md">
			<div class="col-12 flex flex-center">
				<q-item>
					<q-item-section side>
						<q-avatar size="75px">
							<img src="~assets/female_avatar.svg" />
						</q-avatar>
					</q-item-section>
					<q-item-section>
						<q-item-label>
							<DisplayName class="text-h5 text-weight-bold q-mb-none" />
						</q-item-label>
					</q-item-section>
				</q-item>
			</div>
			<div class="col-12 offset-sm-2 col-sm-8 col-md-6 offset-md-3 col-lg-4 offset-lg-4 flex flex-center">
				<q-card class="full-width q-mb-md">
					<q-card-section>
						<EditDisplayName />
						<EditEmail />
					</q-card-section>
				</q-card>
				<q-btn no-caps color="grey-9" @click="logoutUser">Sign Out</q-btn>
			</div>
		</div>
	</div>
</template>

<script>
	import { useAuth } from 'src/hooks/useAuth';
	import DisplayName from 'src/components/user/DisplayName.vue';
	import EditDisplayName from 'src/components/account/EditDisplayName.vue';
	import EditEmail from 'src/components/account/EditEmail.vue';

	export default {
		components: {
			DisplayName,
			EditDisplayName,
			EditEmail,
		},
		setup() {
			const { logoutUser } = useAuth();
			return { logoutUser };
		},
	};
</script>

<style></style>

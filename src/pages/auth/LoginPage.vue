<template>
	<q-card class="loginForm">
		<q-card-section>
			<q-avatar size="90px" class="absolute-center shadow-10 bg-dark">
				<q-img src="~assets/female_avatar.svg" alt="Agendum" />
			</q-avatar>
		</q-card-section>

		<q-card-section>
			<h1 class="text-center q-pt-lg">Login</h1>
			<GoogleAuthentication type="login" />
			<q-separator size="1px" color="white" class="q-my-md" />

			<Form
				v-slot="{ isSubmitting, meta }"
				class="row q-col-gutter-sm"
				:validation-schema="schema"
				@submit="loginUser">
				<div class="col-12">
					<InputValidation filled square name="email" label="Email Address" />
				</div>
				<div class="col-12">
					<InputValidation filled square name="password" label="Password" type="password" />
				</div>
				<div class="col-12">
					<q-btn
						no-caps
						color="accent"
						label="Login"
						class="full-width"
						type="submit"
						:loading="isSubmitting"
						:disable="!meta.valid">
						<template v-slot:loading>
							<q-spinner-tail />
						</template>
					</q-btn>
				</div>
			</Form>

			<p class="text-center q-pt-lg q-my-0 text-grey-13 text-body2">
				Don't have an account?
				<router-link class="text-weight-bold" :to="{ name: 'Register' }"> Sign up </router-link>
			</p>
		</q-card-section>
	</q-card>
</template>

<script>
	import { Form } from 'vee-validate';
	import { object, string } from 'yup';
	import { useAuth } from 'src/hooks/useAuth';

	import InputValidation from 'components/form/InputValidation.vue';
	import GoogleAuthentication from 'components/auth/GoogleAuthentication.vue';

	export default {
		components: {
			Form,
			InputValidation,
			GoogleAuthentication,
		},
		setup() {
			const { loginUser } = useAuth();

			const schema = object({
				email: string().required().email().label('Email address'),
				password: string().required().min(6).label('Password'),
			});

			return {
				loginUser,
				schema,
			};
		},
	};
</script>

<style lang="scss">
	.loginForm {
		width: 100%;
		@media (min-width: $breakpoint-sm-min) {
			width: 80%;
		}
	}
</style>

<template>
	<div id="login" class="row m-0">
		<div
			class="
				col-12 col-md-6
				d-flex
				align-items-center
				justify-content-center
				left-side
			"
		>
			<form @keydown="$event.key === 'Enter' ? save() : null">
				<div class="row mx-auto">
					<div class="col-12">
						<InputText
							label="Email"
							:error="form.errors.get('email')"
							@change-value="(value) => (form.email = value)"
						/>
					</div>
					<div class="col-12 mt-4">
						<InputPassword
							label="Contraseña"
							:error="form.errors.get('password')"
							@change-value="(value) => (form.password = value)"
						/>
					</div>
					<div class="col-12 d-flex justify-content-end mt-4">
						<Button @click="save()" label="Guardar" :disabled="form.busy" />
					</div>
				</div>
			</form>
		</div>
		<div
			class="
				col-12 col-md-6
				d-flex
				align-items-center
				justify-content-center
				right-side
			"
		>
			<img src="@/assets/images/logotipo-sin-fondo.png" width="300" />
		</div>
	</div>
</template>

<script>
import Form from "vform";
import { mapActions } from "vuex";

export default {
	data: () => ({
		form: new Form({
			email: null,
			password: null,
		}),
	}),
	methods: {
		...mapActions(["login"]),
		save() {
			this.login({
				form: this.form,
				errors: this.errors,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
#login {
	height: 100vh;

	.left-side {
		position: relative;
		background-color: #f1f1f1;

		form {
			z-index: 5;
		}
	}

	.right-side {
		background-image: url("@/assets/images/login-background.jpg");
		background-size: cover;
		background-position: center;
	}

	// Mobiles
	@media only screen and (min-width: $mobile-min-width) and (max-width: $mobile-max-width) {
		.left-side {
			background-color: transparent;

			:deep(label) {
				color: white !important;
			}

			:deep(.text-danger) {
				color: white !important;
			}

			&::after {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.5);
			}

			.copyright {
				color: white !important;
			}

			.text-danger {
				color: white !important;
			}
		}

		.right-side {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
		}
	}
}
</style>

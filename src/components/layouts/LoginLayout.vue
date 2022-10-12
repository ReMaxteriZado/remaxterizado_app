<template>
	<div id="login" class="d-flex">
		<div class="left-side d-flex justify-content-center align-items-center h-100">
			<form
				@submit.prevent="save()"
				@keydown="form.onKeydown($event)"
			>
				<div class="row w-50 mx-auto">
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
						<Button
							@click="save()"
							label="Guardar"
							:disabled="form.busy"
						/>
					</div>
				</div>
			</form>
		</div>
		<div class="right-side d-none d-md-flex justify-content-center align-items-center h-100">
			<img src="@/assets/images/logotipo-sin-fondo.png" width="300"/>
		</div>
	</div>
</template>

<script>
	import Button from "primevue/button";
	import Form from "vform";
	import { mapActions } from "vuex";

	export default {
		components: {
			Button,
		},
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

<style
	lang="scss"
	scoped
>
	#login {
		height: 100vh;

		.left-side {
			background-color: #f1f1f1;
			width: 50%;
		}

		.right-side {
			width: 50%;
			background-image: url("@/assets/images/login-background.jpg");
			background-size: cover;
			background-position: center;
		}
	}
</style>

<template>
	<footer class="bg-secondary">
		<div class="container py-5">
			<div class="d-flex flex-column align-items-center">
				<h5 class="mb-0 bg-white text-secondary px-3 py-2 rounded">
					<b>Datos de contacto</b>
				</h5>
				<div class="d-flex align-items-center gap-4 mt-3">
					<img
						@click="go('linkedin')"
						class="linkedin cursor-pointer"
						src="@/assets/images/footer/linkedin.png"
						width="25"
					/>
					<img
						@click="go('gmail')"
						class="cursor-pointer"
						src="@/assets/images/footer/gmail.png"
						width="30"
					/>
					<img
						@click="go('github')"
						class="cursor-pointer"
						src="@/assets/images/footer/github.png"
						width="30"
					/>
					<img
						@click="go('whatsapp')"
						class="cursor-pointer"
						src="@/assets/images/footer/whatsapp.png"
						width="30"
					/>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		methods: {
			go(profile) {
				switch (profile) {
					case "linkedin":
						window.open("https://www.linkedin.com/in/aesppal/", "_blank");
						break;
					case "gmail":
						window.open("mailto:alejandro.espinopalma@gmail.com", "_blank");

						break;
					case "github":
						window.open("https://github.com/ReMaxteriZado", "_blank");
						break;
					case "whatsapp":
						window.open("https://wa.me/+34616974171", "_blank");
						break;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.linkedin {
		transform: translateY(-2px);
	}
</style>

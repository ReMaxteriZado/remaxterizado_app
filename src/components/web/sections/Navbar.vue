<template>
	<div class="position-sticky top-0 left-0 text-uppercase">
		<div class="container">
			<div class="row align-items-center py-4">
				<div class="col-6 d-flex">
					<div class="link cursor-pointer bg-white px-3 py-2 rounded text-secondary h5 mb-0">Alejandro Espino</div>
				</div>
				<div class="col-6 d-flex justify-content-end">
					<div class="links d-flex gap-3">
						<div class="link-line"></div>
						<a @click="updateCurrent(0)" href="#"
							class="link bg-white px-3 py-2 rounded text-secondary h5 mb-0">Sobre mí</a>
						<a @click="updateCurrent(1)" href="#"
							class="link bg-white px-3 py-2 rounded text-secondary h5 mb-0">Proyectos</a>
						<a @click="updateCurrent(2)" href="#"
							class="link bg-white px-3 py-2 rounded text-secondary h5 mb-0">Contacto</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
		};
	},
	methods: {
		updateCurrent(index) {
			this.current = index;

			const linkLine = document.querySelector(".link-line");
			const links = document.querySelectorAll("a");
			const link = links[index];

			linkLine.style.left = `${link.offsetLeft}px`;
			linkLine.style.width = `${link.offsetWidth}px`;
		},
	},
	mounted() {
		setTimeout(() => {
			this.updateCurrent(this.current);
		}, 100);
	},
};
</script>

<style lang="scss" scoped>
.position-sticky {
	background: rgba(255, 255, 255, 0.25);
	box-shadow: 0 8px 32px 0 rgba($secondary, 0.37);
	backdrop-filter: blur(4px);
	z-index: 1;

	.links {
		position: relative;

		.link-line {
			position: absolute;
			bottom: -10px;
			left: 0;
			width: 20px;
			height: 2px;
			background-color: $primary;
			transition: $transition;
		}
	}

	.link {
		letter-spacing: 2px;
		transition: $transition;

		&:hover {
			background-color: darken(white, 8%) !important;
		}
	}

	a {
		text-decoration: none;
	}
}
</style>
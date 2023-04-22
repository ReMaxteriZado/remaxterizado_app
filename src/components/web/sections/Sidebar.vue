<template>
	<div class="sidebar d-none">
		<div v-if="show" @click="show = false" class="overlay"></div>
		<div
			class="sidebar-content d-md-none bg-secondary text-white p-5"
			:class="[show ? 'show' : '']"
		>
			<div class="h-100 d-flex flex-column align-items-end justify-content-end">
				<div v-for="(link, index) in links" :key="index" class="h3 mt-4 mb-0">
					{{ link }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				links: ["Sobre mí", "Experiencia", "Contacto"],
			};
		},
		methods: {
			updateCurrent(index) {
				this.current = index;

				const linkLine = document.querySelector(".link-line");
				const links = document.querySelectorAll(".links .link");
				const link = links[index];

				linkLine.style.left = `${link.offsetLeft}px`;
				linkLine.style.width = `${link.offsetWidth}px`;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 5;

		.overlay {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
		}

		.sidebar-content {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 20rem;
			max-width: 90vw;
			transform: translateX(100%);
			transition: $transition;

			&.show {
				transform: translateX(0);
			}
		}
	}
</style>

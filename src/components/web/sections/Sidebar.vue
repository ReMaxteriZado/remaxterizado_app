<template>
	<div class="sidebar d-lg-none">
		<div v-if="showSidebar" @click="toggleSidebar(false)" class="overlay"></div>
		<div
			class="sidebar-content d-lg-none bg-secondary text-white p-3"
			:class="[showSidebar ? 'show' : '']"
		>
			<div
				class="h-100 d-flex flex-column align-items-end justify-content-end gap-3"
			>
				<div class="bg-white rounded px-3 py-2 w-100 text-end">
					<a
						@click="toggleSidebar(false)"
						href="#about-me"
						class="text-secondary h3 mt-4 mb-0"
						>Sobre mí</a
					>
				</div>
				<div class="bg-white rounded px-3 py-2 w-100 text-end">
					<a
						@click="toggleSidebar(false)"
						href="#experience"
						class="text-secondary h3 mt-4 mb-0"
						>Experiencia</a
					>
				</div>
				<div class="bg-white rounded px-3 py-2 w-100 text-end">
					<a
						@click="toggleSidebar(false)"
						href="#contact"
						class="text-secondary h3 mt-4 mb-0"
						>Contacto</a
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapMutations, mapState } from "vuex";

	export default {
		data() {
			return {};
		},
		computed: {
			...mapState(["showSidebar"]),
		},
		methods: {
			...mapMutations(["toggleSidebar"]),
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
		.overlay {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 4;
			touch-action: none;
		}

		.sidebar-content {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 5;
			width: 30rem;
			max-width: 80vw;
			transform: translateX(100%);
			transition: $transition;
			touch-action: none;

			a {
				text-decoration: none;
			}

			&.show {
				transform: translateX(0);
			}
		}
	}
</style>

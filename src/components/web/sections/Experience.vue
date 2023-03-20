<template>
	<div>
		<h3 class="title text-primary text-uppercase text-center mb-5">Experiencia</h3>
		<div class="timeline">
			<div class="line"></div>
			<Dot v-for="dot in dots" :key="dot.dotNumber" :class="dot.className" :dot="dot" />
		</div>
		<div v-if="selectedDot != null" class="hidden-section bg-primary text-white" style="height: 0px;">
			<div class="container py-4">
				<a :href="selectedDot.company_url" class="h1 text-white">{{ selectedDot.title }}</a>
				<div class="d-flex gap-2 mb-3">
					<div class="bg-white px-3 py-2 rounded text-primary"><b>{{ selectedDot.role }}</b></div>
					<div class="bg-white px-3 py-2 rounded text-primary"><b>{{ selectedDot.period }}</b></div>
				</div>
				<p class="text-white mb-0">{{ selectedDot.description }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import Dot from "@/components/web/partials/Dot.vue";

export default {
	components: {
		Dot,
	},
	data() {
		return {
			dotContent: 0,
			dots: [
				{
					className: "first-dot",
					dotNumber: 1,
					title: "Tca-tik",
					company: "Tca-tik",
					company_url: "https://tcatik.com/",
					role: "Fullstack Developer",
					period: "2020 Mayo - 2022 Junio",
					description: `Dos años de experiencia en el desarrollo de páginas webs y
					aplicaciones de gestión empresarial para diferentes clientes, con
					diferentes lenguajes, librerías y herramientas adecuadas a las
					necesidades de cada proyecto.`,
				},
				{
					className: "second-dot",
					dotNumber: 2,
					title: "Occam",
					company: "Occam",
					company_url: "https://www.occamagenciadigital.com/",
					role: "Fullstack Developer",
					period: "2022 Junio - Actualidad",
					description: `Actualmente me encuentro desarrollando numerosos proyectos de diversas áreas
                    focalizándome en el front con VueJS y Laravel como back.`,
				},
			],
			selectedDot: null,
			transitionDuration: 800,
		};
	},
	methods: {
		showDotContent(dotNumber) {
			let previousDot = this.selectedDot;
			this.selectedDot = this.dots.find((d) => d.dotNumber == dotNumber);

			this.$nextTick(() => {
				if (previousDot == null) {
					this.showContent();
				} else if (previousDot != null && previousDot.dotNumber != this.selectedDot.dotNumber) {
					this.hideContent();
					this.selectedDot = previousDot;

					setTimeout(() => {
						this.selectedDot = this.dots.find((d) => d.dotNumber == dotNumber);

						this.$nextTick(() => {
							this.showContent();
						});
					}, this.transitionDuration);
				} else if (previousDot != null && previousDot.dotNumber == this.selectedDot.dotNumber) {
					this.hideContent();

					setTimeout(() => {
						this.selectedDot = null;
					}, this.transitionDuration);
				}
			});

		},
		showContent() {
			const hiddenSection = document.querySelector(".hidden-section");
			const hiddenSectionContainer = document.querySelector(".hidden-section .container");

			hiddenSection.style.height = hiddenSectionContainer.scrollHeight + "px";
		},
		hideContent() {
			const hiddenSection = document.querySelector(".hidden-section");

			if (hiddenSection == null) return;

			hiddenSection.style.height = "0px";
		}
	},
};
</script>

<style lang="scss" scoped>
.title {
	font-size: 3rem;
	font-weight: bold;
	letter-spacing: 0.5rem;
}

.timeline {
	position: relative;
	height: 100px;
	width: 100%;

	.line {
		height: 3px;
		background-color: $primary;
		width: 0;
		animation: grow-up 4.5s ease-out forwards;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);

		@keyframes grow-up {
			0% {
				width: 0;
			}

			100% {
				width: 100%;
			}
		}
	}
}

.hidden-section {
	overflow: hidden;
	transition: $transition;
	transition-duration: 0.8s;

	a {
		text-decoration: none;
	}
}
</style>
<template>
	<div class="experience">
		<h3 class="title text-primary text-uppercase text-center mb-5">
			Experiencia
		</h3>
		<div class="timeline">
			<div class="line"></div>
			<Dot
				v-for="dot in dots"
				:key="dot.dotNumber"
				:class="dot.className"
				:dot="dot"
			/>
		</div>
		<div
			v-if="selectedDot != null"
			class="hidden-section bg-primary text-white"
			style="height: 0px"
		>
			<div class="container py-5">
				<div class="h1 text-white">
					{{ selectedDot.title }}
				</div>
				<div class="d-flex flex-column flex-md-row gap-2 mb-3">
					<div class="bg-white px-3 py-2 rounded text-primary">
						<b>{{ selectedDot.role }}</b>
					</div>
					<div class="bg-white px-3 py-2 rounded text-primary">
						<b>{{ selectedDot.period }}</b>
					</div>
				</div>
				<p
					class="text-white mb-0 description"
					v-html="selectedDot.description"
				></p>
				<a
					:href="selectedDot.company_url"
					target="_blank"
					class="text-white fw-bold"
					>Página web de la empresa
				</a>
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
						role: "FullStack Developer",
						period: "2020 Mayo - 2022 Junio",
						description: `<p>Dos años de experiencia en el desarrollo de páginas webs
						y aplicaciones de gestión empresarial para diferentes clientes, utilizando diversos
						lenguajes y tecnologías según las necesidades de cada proyecto.</p>
						<p>En estos años trabajé como desarrollador principal en más de 10 proyectos, y ayudé
							con otros muchos</p>`,
					},
					{
						className: "second-dot",
						dotNumber: 2,
						title: "Occam",
						company: "Occam",
						company_url: "https://www.occamagenciadigital.com/",
						role: "FullStack Developer",
						period: "2022 Junio - Actualidad",
						description: `<p>Desarrollador principal de todos los proyectos web de la empresa, ya sean
						páginas webs, paneles de administración o APIs para aplicaciones móviles.</p>
						<p>He creado numerosos proyectos como único desarrollador, siendo el más grande de ellos 
							un ERP con el que trabajan más de 100 personas todos los días</p>`,
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
					} else if (
						previousDot != null &&
						previousDot.dotNumber != this.selectedDot.dotNumber
					) {
						this.hideContent();
						this.selectedDot = previousDot;

						setTimeout(() => {
							this.selectedDot = this.dots.find(
								(d) => d.dotNumber == dotNumber
							);

							this.$nextTick(() => {
								this.showContent();
							});
						}, this.transitionDuration);
					} else if (
						previousDot != null &&
						previousDot.dotNumber == this.selectedDot.dotNumber
					) {
						this.hideContent();

						setTimeout(() => {
							this.selectedDot = null;
						}, this.transitionDuration);
					}
				});
			},
			showContent() {
				const hiddenSection = document.querySelector(".hidden-section");
				const hiddenSectionContainer = document.querySelector(
					".hidden-section .container"
				);

				hiddenSection.style.height = hiddenSectionContainer.scrollHeight + "px";
			},
			hideContent() {
				const hiddenSection = document.querySelector(".hidden-section");

				if (hiddenSection == null) return;

				hiddenSection.style.height = "0px";
			},
		},
	};
</script>

<style lang="scss" scoped>
	.experience {
		padding: 10rem 0;

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
				animation: grow-up 3s ease-out forwards;
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

			.description {
				font-style: italic;
			}
		}
	}

	@media (min-width: $mobile-min-width) and (max-width: $large-tablet-max-width) {
		.experience {
			padding: 5rem 0;

			.title {
				font-size: 2rem;
			}
		}
	}
</style>

<template>
	<div class="container">
		<div class="row">
			<div class="col-12 col-md-6">
				<h1 class="text-primary">Sobre mí</h1>
				<p>
					Programador Full Stack con conocimientos avanzados en VueJS, Laravel y
					PHP entre otros. Estoy especializado en Front-end, responsive y
					animaciones, y me gustaría focalizar mi carrera profesional en esta
					dirección.
				</p>
				<p>
					Me considero una persona responsable, trabajadora y con ganas de
					aprender. Con nivel B1 de inglés y con ganas de seguir mejorando.
				</p>
			</div>
			<div class="col-12 col-md-6">
				<h3 class="bg-primary rounded text-white p-2 text-end">Experiencia</h3>
				<div class="timeline">
					<div class="line"></div>
					<Dot
						v-for="n in dots"
						:key="n.dotNumber"
						:class="n.className"
						:dotNumber="n.dotNumber"
						:showContent="dotContent == n.dotNumber"
						:title="n.title"
						:company="n.company"
						:company_url="n.company_url"
						:role="n.role"
						:period="n.period"
						:description="n.description"
					/>
				</div>
			</div>
			<div class="col-12 d-flex justify-content-center">
				<div class="skills">
					<h3 class="text-center text-secondary">Habilidades</h3>
					<div class="d-flex flex-wrap justify-content-center gap-2">
						<div v-for="skill in skills" :key="skill" class="badge px-3 py-2">
							{{ skill }}
						</div>
					</div>
				</div>
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
					title: "Tca-tik (2020)",
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
					title: "Occam (Actual)",
					company: "Occam",
					company_url: "https://www.occamagenciadigital.com/",
					role: "Fullstack Developer",
					period: "2022 Junio - Actualidad",
					description: `Actualmente me encuentro desarrollando numerosos proyectos de diversas áreas
                    focalizándome en el front con VueJS y Laravel como back.`,
				},
			],
			skills: [
				"VueJS",
				"Laravel",
				"JavaScript",
				"PHP",
				"SASS",
				"CSS",
				"JQuery",
				"GIT",
				"HTML5",
				"Quasar",
				"SQL",
				"OOP",
				"Android",
				"Java",
			],
		};
	},
	methods: {
		showDotContent(dot) {
			if (this.dotContent == dot) {
				this.dotContent = 0;
			} else {
				this.dotContent = dot;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.skills {
	width: 100%;
	max-width: 800px;

	.badge {
		font-weight: normal;
		font-size: 1rem;
		background-color: $primary;
		color: white;
		border: 2px solid $primary;
		transition: $transition;
		cursor: default;

		&:hover {
			background-color: white;
			color: $primary;
		}
	}
}

.timeline {
	position: relative;
	height: 100px;
	width: 100%;

	.line {
		height: 3px;
		background-color: $secondary;
		width: 0;
		animation: grow-up 2.5s ease-out forwards;
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
</style>
<template>
	<div class="bg-secondary">
		<div class="container">
			<div class="about-content">
				<h1 class="text-white">Sobre mí</h1>
				<p class="text-white">
					Programador Full Stack con conocimientos avanzados en VueJS, Laravel y
					PHP entre otros. Estoy especializado en Front-end, responsive y
					animaciones, y me gustaría focalizar mi carrera profesional en esta
					dirección.
				</p>
				<p class="text-white mb-0">
					Me considero una persona responsable, trabajadora y con ganas de
					aprender. Con nivel B1 de inglés y con ganas de seguir mejorando.
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.about-content {
		position: relative;
		z-index: 1;
		padding: 10rem 0;

		h1 {
			font-size: 12rem;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			opacity: 0.1;
			font-weight: bolder;
			font-family: fantasy;
			letter-spacing: 1.5rem;
			text-align: center;
		}

		p {
			font-size: 1.5rem;
			font-style: italic;
		}
	}

	@media (min-width: $mobile-min-width) and (max-width: $large-tablet-max-width) {
		.about-content {
			padding: 5rem 0;

			h1 {
				font-size: 5rem;
			}

			p {
				font-size: 1.2rem;
				text-align: center;
			}
		}
	}
</style>

<template>
	<div class="bg-secondary py-5">
		<div class="container">
			<h2 class="text-white">AÑADIR PARALLAX AL "SOBRE MI"</h2>
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

	h1 {
		font-size: 12rem;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		opacity: 0.1;
		font-weight: bolder;
		font-family: fantasy;
		letter-spacing: 1.5rem;
	}
}
</style>
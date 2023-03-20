<template>
	<div class="container">
		<h2>Proyectos</h2>
		<h4>Que los proyectos se vayan filtrando según las skills seleccionadas</h4>
		<p>
			A lo largo de mi carrera profesional, he tenido la posibilidad de trabajar
			en numerosos proyectos de diferentes dimensiones, ámbitos, tecnologías y
			enfoques. A continuación, os dejo una pequeña muestra de aquellos que
			considero más interesantes.
		</p>
		<div class="row">
			<div v-for="n in 6" :key="n" class="col-12 col-md-6 gy-4">
				<ProjectExample />
			</div>
		</div>
	</div>
</template>

<script>
import ProjectExample from "@/components/web/partials/ProjectExample.vue";
export default {
	components: {
		ProjectExample,
	},
};
</script>

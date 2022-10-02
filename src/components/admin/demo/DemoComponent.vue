<template>
	<div>
		<TitleComponent title="Enlaces" />
		<DemosTable class="mt-4" />
		<DemosForm />
	</div>
</template>

<script>
	import TitleComponent from "@/components/admin/partials/TitleComponent.vue";
	import DemosTable from "./DemosTable.vue";
	import DemosForm from "./DemosForm.vue";

	export default {
		components: {
			TitleComponent,
			DemosTable,
			DemosForm,
		},
	};
</script>

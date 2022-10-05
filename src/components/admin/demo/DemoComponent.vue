<template>
	<div>
		<TitleComponent title="Enlaces" />
		<DemosTable
			class="mt-4"
			:route="route"
			:stateVariable="stateVariable"
		/>
		<DemosForm
			:route="route"
			:stateVariable="stateVariable"
		/>
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
		data() {
			return {
				route: "links",
				stateVariable: "links",
			};
		},
	};
</script>

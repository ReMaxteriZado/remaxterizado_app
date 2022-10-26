<template>
	<div>
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
	import DemosTable from "./DemosTable.vue";
	import DemosForm from "./DemosForm.vue";

	export default {
		components: {
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

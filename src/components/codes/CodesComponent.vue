<template>
	<div>
		<CodesTable
			class="mt-4"
			:route="route"
			:stateVariable="stateVariable"
		/>
		<CodesForm
			:route="route"
			:stateVariable="stateVariable"
		/>
	</div>
</template>

<script>
	import CodesTable from "./CodesTable.vue";
	import CodesForm from "./CodesForm.vue";

	export default {
		components: {
			CodesTable,
			CodesForm,
		},
		data() {
			return {
				route: "codes",
				stateVariable: "codes",
			};
		},
	};
</script>

<template>
	<div>
		<RolesTable
			:route="route"
			:stateVariable="stateVariable"
		/>
		<RolesForm
			:route="route"
			:stateVariable="stateVariable"
		/>
	</div>
</template>

<script>
	import RolesTable from "./RolesTable.vue";
	import RolesForm from "./RolesForm.vue";

	export default {
		components: {
			RolesTable,
			RolesForm,
		},
		data() {
			return {
				route: "roles",
				stateVariable: "roles",
			};
		},
	};
</script>

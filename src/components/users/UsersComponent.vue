<template>
	<div>
		<UsersTable
			:route="route"
			:stateVariable="stateVariable"
		/>
		<UsersForm
			:route="route"
			:stateVariable="stateVariable"
		/>
	</div>
</template>

<script>
	import UsersTable from "./UsersTable.vue";
	import UsersForm from "./UsersForm.vue";

	export default {
		components: {
			UsersTable,
			UsersForm,
		},
		data() {
			return {
				route: "users",
				stateVariable: "users",
			};
		},
	};
</script>

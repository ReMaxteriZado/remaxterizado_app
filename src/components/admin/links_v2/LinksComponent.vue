<template>
	<div>
		<LinksTable
			:route="route"
			:stateVariable="stateVariable"
		/>
		<LinksForm
			:route="route"
			:stateVariable="stateVariable"
		/>
	</div>
</template>

<script>
	import LinksTable from "./LinksTable.vue";
	import LinksForm from "./LinksForm.vue";

	export default {
		components: {
			LinksTable,
			LinksForm,
		},
		data() {
			return {
				route: "links",
				stateVariable: "links",
			};
		},
	};
</script>

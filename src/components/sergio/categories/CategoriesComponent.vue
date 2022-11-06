<template>
	<div>
		<CategoriesTable
			:route="route"
			:stateVariable="stateVariable"
		/>
		<CategoriesForm
			:route="route"
			:stateVariable="stateVariable"
		/>
	</div>
</template>

<script>
	import CategoriesTable from "./CategoriesTable.vue";
	import CategoriesForm from "./CategoriesForm.vue";

	export default {
		components: {
			CategoriesTable,
			CategoriesForm,
		},
		data() {
			return {
				route: "sergio-categories",
				stateVariable: "sergioCategories",
			};
		},
	};
</script>

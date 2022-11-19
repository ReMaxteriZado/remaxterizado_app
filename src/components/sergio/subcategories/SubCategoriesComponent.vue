<template>
	<div>
		<SubCategoriesTable
			:route="route"
			:stateVariable="stateVariable"
		/>
		<SubCategoriesForm
			:route="route"
			:stateVariable="stateVariable"
		/>
	</div>
</template>

<script>
	import SubCategoriesTable from "./SubCategoriesTable.vue";
	import SubCategoriesForm from "./SubCategoriesForm.vue";

	export default {
		components: {
			SubCategoriesTable,
			SubCategoriesForm,
		},
		data() {
			return {
				route: "sergio-subcategories",
				stateVariable: "sergioSubCategories",
			};
		},
	};
</script>

<template>
	<div>
		<CategoriesTree
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
	import CategoriesTree from "./CategoriesTree.vue";
	import CategoriesForm from "./CategoriesForm.vue";

	export default {
		components: {
			CategoriesTree,
			CategoriesForm,
		},
		data() {
			return {
				route: "categories",
				stateVariable: "categories",
			};
		},
	};
</script>

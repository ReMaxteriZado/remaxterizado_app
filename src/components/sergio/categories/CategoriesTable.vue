<template>
	<TableDefault
		:route="route"
		:stateVariable="stateVariable"
		:list="sergioCategories.list"
		:total="sergioCategories.listTotal"
		:filters="filters"
		:delete="'sergio-categories'"
	>
		<template #columns>
			<Column header="Nombre" field="name"></Column>
		</template>
	</TableDefault>
</template>

<script>
import Column from "primevue/column";
import { mapState, mapActions } from "vuex";

export default {
	components: {
		Column,
	},
	props: {
		route: {
			type: String,
			required: true,
		},
		stateVariable: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			filters: [
				{
					name: "name",
					value: null,
					type: "string",
					placeholder: "Nombre",
				},
			],
		};
	},
	methods: {
		...mapActions(["incrementViews"]),
	},
	computed: {
		...mapState(["sergioCategories"]),
	},
};
</script>

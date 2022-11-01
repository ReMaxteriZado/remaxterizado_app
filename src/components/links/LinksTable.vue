<template>
	<TableDefault
		:route="route"
		:stateVariable="stateVariable"
		:list="links.list"
		:total="links.listTotal"
		:filters="filters"
		:delete="'links'"
	>
		<template #columns>
			<Column header="Título" field="title"></Column>

			<Column header="Categoría">
				<template #body="slotProps">
					<span v-if="slotProps.data.category.parent != null"
						>{{ slotProps.data.category.parent.name }} /&nbsp;</span
					>{{ slotProps.data.category.name }}
				</template></Column
			>
			<Column header="Enlace">
				<template #body="slotProps">
					<a
						:href="slotProps.data.link"
						target="_blank"
						@click="incrementViews({ id: slotProps.data.id })"
						>Enlace</a
					>
				</template></Column
			>
			<Column header="Visto" field="views"></Column>
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
					name: "title",
					value: null,
					type: "string",
					placeholder: "Título",
				},
				{
					name: "category",
					value: null,
					type: "string",
					placeholder: "Categoría",
				},
				{
					name: "link",
					value: null,
					type: "string",
					placeholder: "Enlace",
				},
				{
					name: "tags",
					value: null,
					type: "string",
					placeholder: "Tags",
				},
			],
		};
	},
	methods: {
		...mapActions(["incrementViews"]),
	},
	computed: {
		...mapState(["links"]),
	},
};
</script>

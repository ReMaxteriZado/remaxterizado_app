<template>
	<div class="card">
		<TableDefault
			:route="route"
			:stateVariable="stateVariable"
			:list="codes.list"
			:total="codes.listTotal"
			:filters="filters"
			:delete="'codes'"
		>
			<template #columns>
				<Column header="Enlace">
					<template #body="slotProps">
						{{ slotProps.data.link.title }}
					</template>
				</Column>
				<Column header="URL">
					<template #body="slotProps">
						<a :href="slotProps.data.link.link" target="_blank">{{
							slotProps.data.link.link
						}}</a>
					</template>
				</Column>
				<Column header="Categoría">
					<template #body="slotProps">
						{{ slotProps.data.link.category.name }}
					</template>
				</Column>
				<Column header="Lenguage" field="language"> </Column>
			</template>
		</TableDefault>
	</div>
</template>

<script>
import Column from "primevue/column";
import { mapState } from "vuex";

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
					placeholder: "Enlace",
				},
				{
					name: "link",
					value: null,
					type: "string",
					placeholder: "URL",
				},
				{
					name: "category",
					value: null,
					type: "string",
					placeholder: "Categoría",
				},
				{
					name: "language",
					value: null,
					type: "dropdown",
					placeholder: "Lenguage",
					options: [],
				},
			],
		};
	},
	computed: {
		...mapState(["codes", "codeLanguages"]),
	},
	mounted() {
		this.filters[3].options = this.codeLanguages;
	},
};
</script>

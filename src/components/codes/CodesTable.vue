<template>
	<div class="card">
		<TableDefault
			:list="codes.list"
			:total="codes.listTotal"
			:filters="filters"
			:delete="'codes'"
			@getList="getList"
			@addRegister="addRegister"
			@showRegister="showRegister"
			@changeCurrentPage="getList"
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
import { mapState, mapActions, mapMutations } from "vuex";

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
	methods: {
		...mapActions(["getRegisters"]),
		...mapMutations([
			"changeCurrentTablePage",
			"toggleFormDialog",
			"changeFormDialogMode",
			"changeCurrentRegister",
		]),
		addRegister() {
			this.toggleFormDialog({
				stateVariable: this.stateVariable,
				show: true,
			});
		},
		showRegister(register, dialogMode) {
			this.changeCurrentRegister({
				stateVariable: this.stateVariable,
				register,
			});

			this.changeFormDialogMode({
				stateVariable: this.stateVariable,
				dialogMode,
			});

			this.toggleFormDialog({
				stateVariable: this.stateVariable,
				show: true,
			});
		},
		getList(event = null) {
			if (event != null) {
				this.changeCurrentTablePage({
					stateVariable: this.stateVariable,
					event,
				});
			}

			this.getRegisters({
				route: this.route,
				stateVariable: this.stateVariable,
				page: event?.page,
				rows: event?.rows,
			});
		},
	},
	computed: {
		...mapState(["codes", "codeLanguages"]),
	},
	mounted() {
		this.getList();

		this.filters[3].options = this.codeLanguages;
	},
};
</script>

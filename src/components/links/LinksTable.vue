<template>
	<TableDefault
		:list="links.list"
		:total="links.listTotal"
		:filters="filters"
		:delete="'links'"
		@getList="getList"
		@addRegister="addRegister"
		@showRegister="showRegister"
		@changeCurrentPage="getList"
	>
		<template #columns>
			<Column
				header="Título"
				field="title"
			></Column>

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
						>Enlace</a
					>
				</template></Column
			>
			<Column
				header="Visto"
				field="views"
			></Column>
		</template>
	</TableDefault>
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
						placeholder: "Título",
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
			...mapState(["links"]),
		},
		mounted() {
			this.getList();
		},
	};
</script>

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
			<Column header="Columna con formato">
				<template #body="slotProps">
					{{ slotProps.data.title }}
				</template></Column
			>
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
				// data = {
				// 	...data,
				// 	date: new Date(),
				// 	multi_category_id: [1, 2, 3],
				// 	description: "Lorem ipsum",
				// 	hour: [
				// 		{ label: "mañana", value: "morning" },
				// 		{ label: "noche", value: "night" },
				// 	],
				// 	active: ["water", "fire"],
				// 	nose: "nose2",
				// 	rules: true,
				// };

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

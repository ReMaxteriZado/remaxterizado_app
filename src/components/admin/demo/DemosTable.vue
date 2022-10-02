<template>
	<div>
		<TableDefault
			:list="links.list"
			:total="links.list_total"
			:filters="filters"
			:delete="'links'"
			@getList="getList"
			@addRegister="addRegister"
			@showRegister="showRegister"
			@changeCurrentPage="changeCurrentPage"
		>
			<template #columns>
				<Column
					header="Título"
					field="title"
				></Column>
			</template>
		</TableDefault>
	</div>
</template>

<script>
	import Column from "primevue/column";

	import TableDefault from "@/components/admin/partials/TableDefaultComponent.vue";

	import { mapState, mapActions, mapMutations } from "vuex";

	export default {
		components: {
			Column,
			TableDefault,
		},
		data() {
			return {
				route: "links",
				stateVariable: "links",
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
				"toggleLinksDialog",
				"changeCurrentLink",
				"changeLinksDialogMode",
				"changeCurrentPageLinks",
			]),
			addRegister() {
				this.toggleLinksDialog(true);
			},
			changeCurrentPage(event) {
				this.changeCurrentPageLinks(event);
				this.getList(event);
				this.lastPageChange = event;
			},
			showRegister(data, type) {
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

				this.changeCurrentLink(data);
				this.changeLinksDialogMode(type);
				this.toggleLinksDialog(true);
			},
			getList(event = null) {
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

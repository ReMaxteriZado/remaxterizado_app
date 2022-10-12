<template>
	<DataTable
		v-model:selection="selecteds_ids"
		stripedRows
		:value="list"
		:totalRecords="total"
		:paginator="datatableDefaults.paginator"
		:rows="datatableDefaults.rows"
		:rowsPerPageOptions="datatableDefaults.rowsPerPageOptions"
		:rowHover="datatableDefaults.rowHover"
		:loading="datatableDefaults.loading"
		:paginatorTemplate="datatableDefaults.paginatorTemplate"
		:currentPageReportTemplate="datatableDefaults.currentPageReportTemplate"
		:scrollable="datatableDefaults.scrollable"
		:scrollHeight="datatableDefaults.scrollHeight"
		:lazy="datatableDefaults.lazy"
		@page="changeCurrentPage($event)"
		@row-click="showRegister($event, 'show')"
	>
		<template #header>
			<div class="d-flex justify-content-between align-items-center">
				<TableFilters :filters="filters" />
				<div class="d-flex align-items-center justify-content-end gap-3 col">
					<Button
						:label="'Añadir registro'"
						class="bg-primary border-0 text-white"
						@click="$emit('addRegister')"
					/>
					<Button
						v-if="selecteds_ids.length > 0"
						label="Borrar seleccionados"
						class="bg-dark text-white"
						icon="pi pi-trash"
						@click="deleteCheckedRegisters()"
					/>
				</div>
			</div>
		</template>
		<template #empty>{{ datatableDefaults.noResults }}</template>
		<template #loading>
			<LoadingTable />
		</template>
		<Column
			selectionMode="multiple"
			headerStyle="width: 3em"
		></Column>

		<slot name="columns"></slot>

		<Column header="Acciones">
			<template #body="{ data }">
				<div class="d-flex align-items-center gap-2">
					<Button
						class="text-primary p-button-rounded p-button-text border-primary"
						icon="pi pi-pencil"
						@click="showRegister(data, 'edit')"
					/>
					<Button
						class="text-primary p-button-rounded p-button-text border-primary"
						icon="pi pi-trash"
						@click="deleteRegister(data.id)"
					/>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

<script>
	import DataTable from "primevue/datatable";
	import Column from "primevue/column";
	import Button from "primevue/button";

	import LoadingTable from "@/components/partials/LoadingTableComponent.vue";
	import TableFilters from "@/components/admin/partials/TableFilters.vue";

	import { mapState, mapActions } from "vuex";

	export default {
		components: {
			TableFilters,
			DataTable,
			Column,
			Button,
			LoadingTable,
		},
		props: {
			list: {
				type: Array,
				default: () => [],
			},
			total: {
				type: Number,
				default: 0,
			},
			filters: {
				type: Array,
				default: () => [],
			},
			delete: {
				type: String,
			},
		},
		data() {
			return {
				selecteds_ids: [],
				timeout: null,
				lastPageChange: null,
			};
		},
		methods: {
			...mapActions(["deleteRegisters"]),
			changeCurrentPage(event) {
				this.lastPageChange = event;
				this.$emit("changeCurrentPage", event);
			},
			showRegister(e, type) {
				this.$emit("showRegister", e.data != undefined ? e.data : e, type);
			},
			deleteRegister(id) {
				this.$confirm.require({
					message: "¿Desea borrar el registro?",
					header: "Borrar registro",
					icon: "pi pi-exclamation-triangle",
					accept: () => {
						this.deleteRegisters({
							url: `/${this.delete}/${id}`,
						}).then(() => {
							this.$emit("getList", this.lastPageChange);
						});
					},
				});
			},
			deleteCheckedRegisters() {
				let ids = this.$helper.pushIdsToArray(
					this.selecteds_ids,
					this.lastPageChange != null ? this.lastPageChange.rows : this.datatableDefaults.rows
				);

				this.$confirm.require({
					message: "¿Desea borrar los registros seleccionados?",
					header: "Borrar registros",
					icon: "pi pi-exclamation-triangle",
					accept: () => {
						this.deleteRegisters({
							url: `/${this.delete}-multiple`,
							ids,
						}).then(() => {
							this.$emit("getList", this.lastPageChange);
							this.selecteds_ids = [];
						});
					},
				});
			},
		},
		computed: {
			...mapState(["datatableDefaults"]),
		},
		watch: {
			filters: {
				handler() {
					clearTimeout(this.timeout);

					this.timeout = setTimeout(() => {
						this.$emit("getList");
					}, 250);
				},
				deep: true,
			},
		},
	};
</script>

<template>
	<DataTable
		v-model:selection="selectedIds"
		stripedRows
		:value="list"
		:totalRecords="total"
		:rowHover="datatableDefaults.rowHover"
		:rows="datatableDefaults.rows"
		:rowsPerPageOptions="datatableDefaults.rowsPerPageOptions"
		:currentPageReportTemplate="datatableDefaults.currentPageReportTemplate"
		:paginator="datatableDefaults.paginator"
		:paginatorTemplate="datatableDefaults.paginatorTemplate"
		:loading="datatableDefaults.loading"
		:lazy="datatableDefaults.lazy"
		:responsiveLayout="datatableDefaults.responsiveLayout"
		:breakpoint="datatableDefaults.breakpoint"
		@page="changeCurrentPage($event)"
		@row-click="showRegister($event, 'show')"
	>
		<template #header>
			<div class="row gy-3">
				<div class="col-12 col-md-6">
					<TableFilters :filters="filters" />
				</div>
				<div class="col-12 col-md-6">
					<div
						class="
							action-buttons
							d-flex
							gap-3
							align-items-center
							justify-content-md-end
							pb-1
						"
					>
						<Button
							:label="'Añadir registro'"
							class="bg-primary border-0 text-white"
							@click="$emit('addRegister')"
						/>
						<Button
							v-if="selectedIds.length > 0"
							label="Borrar seleccionados"
							class="bg-dark text-white"
							icon="pi pi-trash"
							@click="deleteCheckedRegisters()"
						/>
					</div>
				</div>
			</div>
		</template>

		<template #empty>{{ datatableDefaults.noResults }}</template>

		<template #loading>
			<LoadingTable />
		</template>

		<Column
			class="select-multiple"
			selectionMode="multiple"
			headerStyle="width: 3em"
		></Column>

		<slot name="columns"></slot>

		<Column header="Acciones">
			<template #body="slotProps">
				<div class="d-flex align-items-center gap-2">
					<Button
						class="
							p-button-rounded p-button-text
							border-primary
							bg-primary
							text-white
						"
						icon="pi pi-pencil"
						@click="showRegister(slotProps.data, 'edit')"
					/>
					<Button
						class="
							p-button-rounded p-button-text
							border-primary
							bg-primary
							text-white
						"
						icon="pi pi-trash"
						@click="deleteRegister(slotProps.data.id)"
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
import TableFilters from "@/components/partials/TableFilters.vue";

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
			selectedIds: [],
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
				this.selectedIds,
				this.lastPageChange != null
					? this.lastPageChange.rows
					: this.datatableDefaults.rows
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
						this.selectedIds = [];
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

<style lang="scss" scoped>
.action-buttons {
	button {
		min-width: fit-content;
	}
}

// Mobiles
@media only screen and (min-width: $mobile-min-width) and (max-width: $mobile-max-width) {
	:deep(.p-paginator-current) {
		text-align: center;
	}

	:deep(.select-multiple) {
		display: none !important;
	}

	.action-buttons {
		overflow-x: auto;
	}
}
</style>

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
						class="action-buttons d-flex gap-3 align-items-center justify-content-md-end pb-1"
					>
						<Button
							v-if="
								$helper.checkUserHasPermission(route, 'create') ||
								$route.name === 'Demo'
							"
							:label="'Añadir registro'"
							class="bg-primary border-0 text-white"
							@click="addRegister()"
						/>
						<Button
							v-if="
								(selectedIds.length > 0 &&
									$helper.checkUserHasPermission(route, 'delete')) ||
								$route.name === 'Demo'
							"
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
			v-if="
				$helper.checkUserHasPermission(route, 'delete') ||
				$route.name === 'Demo'
			"
			class="select-multiple"
			selectionMode="multiple"
			headerStyle="width: 3em"
		></Column>

		<slot name="columns"></slot>

		<Column header="Acciones">
			<template #body="slotProps">
				<div class="d-flex align-items-center gap-2">
					<Button
						v-if="
							$helper.checkUserHasPermission(route, 'update') ||
							$route.name === 'Demo'
						"
						class="p-button-rounded p-button-text border-primary bg-primary text-white"
						icon="pi pi-pencil"
						@click="showRegister(slotProps.data, 'edit')"
					/>
					<Button
						v-if="
							$helper.checkUserHasPermission(route, 'delete') ||
							$route.name === 'Demo'
						"
						class="p-button-rounded p-button-text border-primary bg-primary text-white"
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

	import LoadingTable from "@/components/partials/tables/LoadingTable.vue";
	import TableFilters from "@/components/partials/tables/TableFilters.vue";

	import { mapState, mapActions, mapMutations } from "vuex";

	export default {
		components: {
			TableFilters,
			DataTable,
			Column,
			LoadingTable,
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
			...mapActions(["getRegisters", "deleteRegisters"]),
			...mapMutations([
				"changeCurrentTablePage",
				"toggleFormDialog",
				"changeFormDialogMode",
				"changeCurrentRegister",
			]),
			getList(event = null) {
				if (
					this.$helper.checkUserHasPermission(this.route) ||
					this.$route.name === "Demo"
				) {
					this.getRegisters({
						route: this.route,
						stateVariable: this.stateVariable,
						page: event?.page,
						rows: event?.rows,
					});
				} else {
					this.$router.push({ name: "Dashboard" });
				}
			},
			changeCurrentPage(event) {
				this.lastPageChange = event;

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

				this.$emit("changeCurrentPage", event);
			},
			addRegister() {
				this.toggleFormDialog({
					stateVariable: this.stateVariable,
					show: true,
				});

				this.$emit("addRegister");
			},
			showRegister(e, type) {
				const register = e.data != undefined ? e.data : e;

				this.changeCurrentRegister({
					stateVariable: this.stateVariable,
					register,
				});

				this.changeFormDialogMode({
					stateVariable: this.stateVariable,
					dialogMode: type,
				});

				this.toggleFormDialog({
					stateVariable: this.stateVariable,
					show: true,
				});

				this.$emit("showRegister", register, type);
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
							this.getList(this.lastPageChange);
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
							this.getList(this.lastPageChange);

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
						this.getList();
					}, 250);
				},
				deep: true,
			},
		},
		mounted() {
			this.getList();
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

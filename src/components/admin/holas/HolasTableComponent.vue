<template>
    <DataTable ref="datatable" v-model:selection="selecteds_ids" stripedRows :value="links.list"
        :totalRecords="links.list_total" :paginator="datatableDefaults.paginator" :rows="datatableDefaults.rows"
        :rowsPerPageOptions="datatableDefaults.rowsPerPageOptions" :rowHover="datatableDefaults.rowHover"
        :loading="datatableDefaults.loading" :paginatorTemplate="datatableDefaults.paginatorTemplate"
        :currentPageReportTemplate="
            datatableDefaults.currentPageReportTemplate
        " :scrollable="datatableDefaults.scrollable" :scrollHeight="datatableDefaults.scrollHeight"
        :lazy="datatableDefaults.lazy" @page="changeCurrentPage($event)" @row-click="showModel($event)">
        <template #header>
            <div class="d-flex justify-content-between align-items-center">
                <TableFilters :filters="filters" />
                <div class="d-flex align-items-center justify-content-end gap-3 col">
                    <Button label="Añadir área" class="bg-secondary border-0 text-white" @click="addRegister()" />
                    <Button v-if="
                        selecteds_ids.length > 0
                    " label="Borrar seleccionados" class="text-white" icon="pi pi-trash"
                        @click="deleteCheckedRegisters()" />
                </div>
            </div>
        </template>
        <template #empty>{{ datatableDefaults.noResults }}</template>
        <template #loading>
            <LoadingTable />
        </template>
        <Column selectionMode="multiple" headerStyle="width: 3em"></Column>

        <Column header="Título" field="title"></Column>
        <Column header="Acciones">
            <template #body="{ data }">
                <Button class="text-primary p-button-rounded p-button-text" icon="pi pi-pencil"
                    @click="showRegister(data, 'edit')" v-tooltip.bottom="'Editar registro'" />
                <Button class="text-primary p-button-rounded p-button-text" icon="pi pi-trash"
                    @click="deleteRegister(data.id)" v-tooltip.bottom="'Borrar registro'" />
            </template>
        </Column>
    </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

import LoadingTable from "../partials/LoadingTableComponent.vue";
import TableFilters from "../partials/TableFiltersComponent.vue";

import { mapState, mapActions, mapMutations } from "vuex";

export default {
    components: {
        TableFilters,
        DataTable,
        Column,
        Button,
        LoadingTable,
    },
    data() {
        return {
            selecteds_ids: [],
            timeout: null,
            filters: [
                {
                    name: "name",
                    value: null,
                    type: "string",
                    placeholder: "Nombre",
                },
            ],
            lastPageChange: null,
            route: "links",
            state_variable: "links"
        };
    },
    methods: {
        ...mapActions([
            "getRegisters",
            "sendDeleteRequest",
            "sendDeleteMultipleForm",
        ]),
        ...mapMutations([
            "toggleFormDialog",
            "changeCurrentRegister",
            "changeFormDialogMode",
            "changeCurrentTablePage",
        ]),
        changeCurrentPage(event) {
            this.changeCurrentTablePage(event);
            this.getRegisters({...event, 
            route:this.route,
            state_variable: this.state_variable
        });
            this.lastPageChange = event;
        },
        addRegister() {
            this.toggleFormDialog({
            state_variable: this.state_variable,
            show: true
            });
        },
        showRegister(data, type) {
            this.changeCurrentRegister(data);
            this.changeFormDialogMode(type);
            this.toggleFormDialog(this.state_variable, true);
        },
        deleteRegister(id) {
            this.$confirm.require({
                message: "¿Está segur@ de que desea borrar el registro?",
                header: "Borrar registro",
                icon: "pi pi-exclamation-triangle",
                accept: () => {
                    this.sendDeleteRequest({
                        url: "/links/" + id,
                    }).then(() => {
                        this.getRegisters(this.links.currentPage);
                    });
                },
            });
        },
        deleteCheckedRegisters() {
            let ids = this.$helper.pushIdsToArray(
                this.selecteds_ids,
                this.lastPageChange != null
                    ? this.lastPageChange.rows
                    : this.datatableDefaults.rows
            );

            this.$confirm.require({
                message:
                    "¿Está segur@ de que desea borrar los registros seleccionados?",
                header: "Borrar registros",
                icon: "pi pi-exclamation-triangle",
                accept: () => {
                    this.sendDeleteMultipleForm({
                        url: "/links-multiple",
                        params: ids,
                    }).then(() => {
                        this.getRegisters(this.links.currentPage);
                        this.selecteds_ids = [];
                    });
                },
            });
        },
        showModel(e) {
            this.showRegister(e.data, "show");
        },
    },
    computed: {
        ...mapState(["datatableDefaults", "links"]),
    },
    mounted() {
        this.getRegisters({
            route:this.route,
            state_variable: this.state_variable
        });
    },
    watch: {
        filters: {
            handler() {
                clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                    this.getRegisters();
                }, 250);
            },
            deep: true,
        },
    },
};
</script>

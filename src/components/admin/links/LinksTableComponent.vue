<template>
    <DataTable
        stripedRows
        ref="datatable"
        v-model:selection="selecteds_incidences_types"
        :value="links"
        :totalRecords="total_incidences_types"
        :paginator="datatable_defaults.paginator"
        :rows="datatable_defaults.rows"
        :rowsPerPageOptions="datatable_defaults.rowsPerPageOptions"
        :rowHover="datatable_defaults.rowHover"
        :loading="datatable_defaults.loading"
        :paginatorTemplate="datatable_defaults.paginatorTemplate"
        :currentPageReportTemplate="
            datatable_defaults.currentPageReportTemplate
        "
        :scrollable="datatable_defaults.scrollable"
        :scrollHeight="datatable_defaults.scrollHeight"
        :lazy="datatable_defaults.lazy"
        @page="changeCurrentPage($event)"
        @row-click="showModel($event)"
    >
        <template #header>
            <div
                class="d-flex justify-content-between align-items-incidence_type"
            >
                <TableFilters :filters="filters" />
                <div class="d-flex align-items-incidence_type gap-3">
                    <Button
                        label="Add link"
                        class="bg-secondary border-0 text-white"
                        @click="addLink()"
                    />
                    <Button
                        label="Delete selected links"
                        class="text-white"
                        icon="pi pi-trash"
                        @click="deleteSelectedsLinks()"
                    />
                </div>
            </div>
        </template>
        <template #empty>{{ datatable_defaults.no_results }}</template>
        <template #loading>
            <LoadingTable />
        </template>
        <Column selectionMode="multiple" headerStyle="width: 3em"></Column>

        <Column :sortable="true" header="Title" field="title"></Column>
        <Column :sortable="true" header="Category">
            <template #body="{ data }">
                <span v-if="data.category.parent != null"
                    >{{ data.category.parent.name }} >
                </span>
                <span>{{ data.category.name }}</span>
            </template></Column
        >
        <Column header="Link">
            <template #body="{ data }">
                <a @click="increment(data)" target="_blank" :href="data.link"
                    >Link</a
                >
            </template></Column
        >
        <Column :sortable="true" header="Views" field="views"></Column>
        <Column header="Actions">
            <template #body="{ data }">
                <Button
                    class="text-white p-button-rounded me-3"
                    icon="pi pi-pencil"
                    @click="editLink(data)"
                />
                <Button
                    class="text-white p-button-rounded me-3"
                    icon="pi pi-trash"
                    @click="deleteLink(data.id)"
                />
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
        DataTable,
        Column,
        Button,
        LoadingTable,
        TableFilters,
    },
    props: ["links_v"],
    data() {
        return {
            search: null,
            timeout: null,
        };
    },
    methods: {
        ...mapActions(["getLinks", "sendDeleteRequest", "incrementViews"]),
        ...mapMutations([
            "toggleNewItemSidebar",
            "changeFormComponent",
            "changeEditModel",
        ]),
        addLink() {
            this.changeFormComponent("NewLinkComponent");
            this.toggleNewItemSidebar(true);
        },
        editLink(link) {
            this.changeEditModel(link);
            this.changeFormComponent("NewLinkComponent");
            this.toggleNewItemSidebar(true);
        },
        deleteLink(id) {
            this.$confirm.require({
                message: "Are you sure you want to proceed?",
                header: "Delete item",
                icon: "pi pi-exclamation-triangle",
                accept: () => {
                    this.sendDeleteRequest({ url: "/links/" + id }).then(() => {
                        this.getLinks();
                    });
                },
            });
        },
        increment(link) {
            this.incrementViews(link.id).then(() => {
                this.getLinks();
            });
        },
    },
    computed: {
        ...mapState(["datatable_defaults", "links"]),
    },
    mounted() {
        this.getLinks();
    },
    watch: {
        search() {
            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                this.getLinks(this.search);
            }, 250);
        },
    },
};
</script>

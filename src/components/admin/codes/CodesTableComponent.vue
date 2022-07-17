<template>
    <DataTable
        :value="codes"
        :paginator="datatableDefaults.paginator"
        :rows="datatableDefaults.rows"
        :rowHover="datatableDefaults.rowHover"
        :loading="datatableDefaults.loading"
        :paginatorTemplate="datatableDefaults.paginatorTemplate"
        :currentPageReportTemplate="datatableDefaults.currentPageReportTemplate"
        class="datatable p-0"
    >
        <template #header>
            <div class="d-flex justify-content-between align-items-center">
                <Button
                    label="Add Code"
                    class="text-white"
                    icon="pi pi-plus"
                    @click="addCode()"
                />
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="search" placeholder="Search codes..." />
                </span>
            </div>
        </template>
        <template #empty>No results found</template>
        <template #loading>Loading results. Please wait.</template>
        <Column
            :sortable="true"
            header="Link title"
            field="link.title"
        ></Column>
        <Column header="Link">
            <template #body="{ data }">
                <a target="_blank" :href="data.link.link">Link</a>
            </template></Column
        >
        <Column
            :sortable="true"
            header="Category"
            field="link.category.name"
        ></Column>
        <Column :sortable="true" header="Language" field="language"></Column>
        <Column header="Code">
            <template #body="{ data }">
                <div class="cursor-pointer view-code" @click="viewCode(data)">
                    View code
                </div>
            </template></Column
        >
        <Column header="Actions">
            <template #body="{ data }">
                <Button
                    class="text-white p-button-rounded me-3"
                    icon="pi pi-pencil"
                    @click="editCode(data)"
                />
                <Button
                    class="text-white p-button-rounded me-3"
                    icon="pi pi-trash"
                    @click="deleteCode(data.id)"
                />
            </template>
        </Column>
    </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import { mapState, mapActions, mapMutations } from "vuex";

export default {
    components: {
        DataTable,
        Column,
        InputText,
        Button,
    },
    data() {
        return {
            search: null,
            timeout: null,
        };
    },
    methods: {
        ...mapActions(["getCodes", "sendDeleteRequest"]),
        ...mapMutations([
            "toggleNewItemSidebar",
            "changeFormComponent",
            "changeEditModel",
            "toggleCodeDialog",
            "changeViewCode",
        ]),
        addCode() {
            this.changeFormComponent("NewCodeComponent");
            this.toggleNewItemSidebar(true);
        },
        editCode(code) {
            this.changeEditModel(code);
            this.changeFormComponent("NewCodeComponent");
            this.toggleNewItemSidebar(true);
        },
        deleteCode(id) {
            this.$confirm.require({
                message: "Are you sure you want to proceed?",
                header: "Delete item",
                icon: "pi pi-exclamation-triangle",
                accept: () => {
                    this.sendDeleteRequest({ url: "/codes/" + id }).then(() => {
                        this.getCodes();
                    });
                },
            });
        },
        viewCode(code) {
            this.changeViewCode(code);
            this.toggleCodeDialog(true);
        },
    },
    computed: {
        ...mapState(["datatableDefaults", "codes", "viewCode"]),
    },
    mounted() {
        this.getCodes();
    },
    watch: {
        search() {
            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                this.getCodes(this.search);
            }, 250);
        },
    },
};
</script>

<style lang="scss" scoped>
.datatable {
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: $smooth-box-shadow !important;

    .view-code {
        color: $primary;
    }
}
</style>

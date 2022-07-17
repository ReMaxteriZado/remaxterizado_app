<template>
    <DataTable
        :value="links"
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
                    label="Add Link"
                    class="text-white"
                    icon="pi pi-plus"
                    @click="addLink()"
                />
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="search" placeholder="Search links..." />
                </span>
            </div>
        </template>
        <template #empty>No results found</template>
        <template #loading>Loading results. Please wait.</template>
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
        ...mapState(["datatableDefaults", "links"]),
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

<style lang="scss" scoped>
.datatable {
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: $smooth-box-shadow !important;
}
</style>

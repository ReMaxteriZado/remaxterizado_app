<template>
    <div>
        <div
            class="d-flex flex-wrap align-items-center justify-content-between mb-3"
        >
            <div class="d-flex flex-wrap gap-3 align-items-center">
                <TitleComponent title="Categories" />
                <Button
                    :label="`Edit ${category_selected.label} category`"
                    icon="pi pi-pencil"
                    v-if="category_selected != null"
                    @click="edit()"
                />
                <Button
                    :label="`Add link to ${category_selected.label} category`"
                    icon="pi pi-plus"
                    v-if="category_selected != null"
                    @click="addLink()"
                />
            </div>
            <Button
                :label="`Delete ${category_selected.label} category`"
                icon="pi pi-trash"
                v-if="category_selected != null"
                @click="deleteCategory()"
            />
        </div>
        <PanelMenu :model="items" />
    </div>
</template>

<script>
import TitleComponent from "@/components/admin/partials/TitleComponent.vue";
import PanelMenu from "primevue/panelmenu";
import Button from "primevue/button";

import { mapActions, mapMutations, mapState } from "vuex";

export default {
    components: {
        TitleComponent,
        PanelMenu,
        Button,
    },
    data() {
        return {
            items: [],
            categories_added: [],
            category_selected: null,
        };
    },
    methods: {
        ...mapActions(["getCategories", "sendDeleteRequest"]),
        ...mapMutations([
            "toggleNewItemSidebar",
            "changeFormComponent",
            "changeEditModel",
            "setCategories",
            "changeNewLinkCategorySelected",
        ]),
        addLink() {
            this.changeNewLinkCategorySelected(this.category_selected);

            this.changeFormComponent("NewLinkComponent");
            this.toggleNewItemSidebar(true);
        },
        deleteCategory() {
            this.$confirm.require({
                message: "Are you sure you want to proceed?",
                header: "Delete category",
                icon: "pi pi-exclamation-triangle",
                accept: () => {
                    this.sendDeleteRequest({
                        url: "/categories/" + this.category_selected.id,
                    }).then(() => {
                        this.getCategories();
                    });
                },
            });
        },
        pushItem(items, category) {
            const children = this.findChildren(category);
            const links = this.findLinks(category);

            let item_children = [];

            if (children.length) {
                item_children.push(...children);
            }

            if (links.length) {
                item_children.push(...links);
            }

            items.push({
                id: category.id,
                category: category,
                label: category.name,
                icon: "pi pi-folder",
                items: item_children,
                command: () => {
                    this.changeItemIcon(this.items, category.id);
                },
            });
        },
        changeItemIcon(items, category_id) {
            items.forEach((item) => {
                if (item.id == category_id) {
                    this.category_selected = item;

                    if (item.items != undefined) {
                        if (item.icon == "pi pi-folder") {
                            item.icon = "pi pi-folder-open";
                        } else {
                            item.icon = "pi pi-folder";
                        }
                    }
                }

                if (item.items != undefined) {
                    this.changeItemIcon(item.items, category_id);
                }
            });
        },
        formatCategories(categories) {
            categories.forEach((category) => {
                if (category.parent_id == null) {
                    this.pushItem(this.items, category);
                }
            });
        },
        findChildren(parent) {
            let children = [];

            this.categories.forEach((category) => {
                if (category.parent_id == parent.id) {
                    const children2 = this.findChildren(category);
                    const links = this.findLinks(category);

                    const item = {
                        id: category.id,
                        category: category,
                        label: category.name,
                        icon: "pi pi-folder",
                        items: [],
                        command: () => {
                            this.changeItemIcon(this.items, category.id);
                        },
                    };

                    if (children2.length) {
                        item.items.push(...children2);
                    }

                    if (links.length) {
                        item.items.push(...links);
                    }

                    if (!item.items.length) {
                        delete item.items;
                    }

                    children.push(item);
                }
            });

            return children;
        },
        findLinks(parent) {
            let links = [];

            parent.links.forEach((link) => {
                links.push({
                    label: link.title,
                    icon: "pi pi-link",
                    command: () => {
                        window.open(link.link, "_blank").focus();
                    },
                });
            });

            return links;
        },
        edit() {
            this.changeEditModel(this.category_selected);
            this.changeFormComponent("NewCategoryComponent");
            this.toggleNewItemSidebar(true);
        },
    },
    computed: {
        ...mapState(["categories", "new_link_category_selected"]),
    },
    mounted() {
        this.getCategories(this.search);
    },
    watch: {
        categories() {
            this.items = [];
            this.categories_added = [];
            this.category_selected = null;

            this.formatCategories(this.categories);
        },
    },
};
</script>

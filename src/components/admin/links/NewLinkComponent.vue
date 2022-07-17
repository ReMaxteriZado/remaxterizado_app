<template>
    <div>
        <FormTitleComponentVue :title="title_component" />

        <form @submit.prevent="save()" @keydown="form.onKeydown($event)">
            <span class="p-float-label mt-4">
                <InputText
                    title="title"
                    type="text"
                    class="w-100"
                    v-model="form.title"
                />
                <label for="title">Title</label>
            </span>

            <div class="text-danger" v-if="form.errors.has('title')">
                {{ form.errors.get("title") }}
            </div>

            <span class="p-float-label mt-4">
                <InputText
                    title="link"
                    type="text"
                    class="w-100"
                    v-model="form.link"
                />
                <label for="title">Links</label>
            </span>

            <div class="text-danger" v-if="form.errors.has('link')">
                {{ form.errors.get("link") }}
            </div>

            <Dropdown
                v-model="form.category_id"
                :options="categories"
                optionValue="id"
                optionLabel="name"
                :filter="true"
                placeholder="Select a category"
                :showClear="true"
                class="w-100 mt-4"
            >
                <template #option="slotProps">
                    <div>{{ slotProps.option.categoryTree }}</div>
                </template>
            </Dropdown>

            <div class="text-danger" v-if="form.errors.has('category_id')">
                {{ form.errors.get("category_id") }}
            </div>

            <div class="d-flex flex-column gap-1 mt-3">
                <label for="">Tags</label>
                <Chips v-model="form.tags" />
            </div>

            <Button
                type="submit"
                label="Submit"
                class="text-white mt-4"
                :disabled="form.busy"
            />
        </form>
    </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Chips from "primevue/chips";

import FormTitleComponentVue from "@/components/admin/partials/FormTitleComponent.vue";

import Form from "vform";

import { mapActions, mapMutations, mapState } from "vuex";

export default {
    components: {
        FormTitleComponentVue,
        InputText,
        Button,
        Dropdown,
        Chips,
    },
    data: () => ({
        form: new Form({
            title: "",
            category_id: "",
            link: null,
            tags: null,
        }),
        errors: null,
        editing_link: null,
        title_component: "New Link",
    }),
    methods: {
        ...mapActions([
            "sendPostForm",
            "sendPutForm",
            "getCategories",
            "getLinks",
        ]),
        ...mapMutations(["toggleNewItemSidebar", "changeEditModel"]),

        save() {
            let url = "/links";

            if (this.editing_link != null) {
                url = "/links/" + this.editing_link;

                this.sendPutForm({
                    form: this.form,
                    url: url,
                    errors: this.errors,
                }).then((response) => {
                    if (response.status === 200) {
                        this.toggleNewItemSidebar(false);
                        this.getLinks();
                        this.getCategories();
                    }
                });
            } else {
                this.sendPostForm({
                    form: this.form,
                    url: url,
                    errors: this.errors,
                }).then((response) => {
                    if (response.status === 200) {
                        this.toggleNewItemSidebar(false);
                        this.getLinks();
                        this.getCategories();
                    }
                });
            }
        },
        clearForm() {
            this.form.reset();
            this.editing_link = null;
            this.changeEditModel(null);
        },
    },
    mounted() {
        this.errors = this.form.errors;
        this.title_component = "New link";
        this.getCategories();

        if (this.editModel != null) {
            // Title section
            this.title_component = "Edit link";

            // Get model ID from editing object
            this.editing_link = this.editModel.id;

            // Load data from editing model
            this.form.title = this.editModel.title;
            this.form.link = this.editModel.link;
            this.form.category_id = this.editModel.category_id;
            this.form.tags = JSON.parse(this.editModel.tags);
        }

        if (this.newLinkCategorySelected != null) {
            this.form.category_id = this.newLinkCategorySelected.id;
        }
    },
    computed: {
        ...mapState([
            "editModel",
            "categories",
            "showNewItemSidebar",
            "newLinkCategorySelected",
        ]),
    },
    watch: {
        showNewItemSidebar() {
            if (!this.showNewItemSidebar) {
                this.clearForm();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
:deep(.p-chips .p-inputtext) {
    width: 100%;
    gap: 1rem;
}
:deep(.p-chips .p-inputtext .p-chips-token) {
    margin-right: 0;
}
</style>

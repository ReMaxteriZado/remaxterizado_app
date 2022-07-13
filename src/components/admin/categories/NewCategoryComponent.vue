<template>
    <div>
        <FormTitleComponentVue title="New category" />

        <form @submit.prevent="save()" @keydown="form.onKeydown($event)">
            <span class="p-float-label mt-4">
                <InputText
                    name="name"
                    type="text"
                    class="w-100"
                    v-model="form.name"
                />
                <label for="name">Name</label>
            </span>

            <div class="text-danger" v-if="form.errors.has('name')">
                {{ form.errors.get("name") }}
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
                    <div>{{ slotProps.option.category_tree }}</div>
                </template>
            </Dropdown>

            <div class="text-danger" v-if="form.errors.has('category_id')">
                {{ form.errors.get("category_id") }}
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
import FormTitleComponentVue from "@/components/admin/partials/FormTitleComponent.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";

import Form from "vform";

import { mapActions, mapMutations, mapState } from "vuex";

export default {
    components: {
        FormTitleComponentVue,
        InputText,
        Button,
        Dropdown,
    },
    data: () => ({
        form: new Form({
            name: "",
            category_id: "",
        }),
        errors: null,
        editing_category: null,
    }),
    methods: {
        ...mapActions(["sendPostForm", "sendPutForm", "getCategories"]),
        ...mapMutations(["toggleNewItemSidebar", "changeEditModel"]),

        save() {
            let url = "/categories";

            if (this.editing_category != null) {
                url = "/categories/" + this.editing_category;

                this.sendPutForm({
                    form: this.form,
                    url: url,
                    errors: this.errors,
                }).then((response) => {
                    if (response.status === 200) {
                        this.toggleNewItemSidebar(false);
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
                        this.getCategories();
                    }
                });
            }
        },
        clearForm() {
            this.form.reset();
            this.editing_category = null;
            this.changeEditModel(null);
        },
    },
    mounted() {
        this.errors = this.form.errors;
        this.getCategories();

        if (this.editModel != null) {
            this.editing_category = this.editModel.id;
            this.form.name = this.editModel.label;
            this.form.category_id = this.editModel.category.parent_id;
        }
    },
    computed: {
        ...mapState(["editModel", "categories", "showNewItemSidebar"]),
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

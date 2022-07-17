<template>
    <div>
        <FormTitleComponentVue :title="title_component" />

        <form @submit.prevent="save()" @keydown="form.onKeydown($event)">
            <Dropdown
                v-model="form.link_id"
                :options="links"
                optionValue="id"
                optionLabel="title"
                :filter="true"
                placeholder="Select a link"
                :showClear="true"
                class="w-100 mt-4"
            >
                <template #option="slotProps">
                    <div>
                        {{ slotProps.option.category.name }} >
                        {{ slotProps.option.title }}
                    </div>
                </template>
            </Dropdown>

            <div class="text-danger" v-if="form.errors.has('link_id')">
                {{ form.errors.get("link_id") }}
            </div>

            <div class="d-flex flex-column gap-1 mt-3">
                <label for="">Comment</label>
                <Textarea
                    v-model="form.comment"
                    :autoResize="true"
                    class="w-100"
                />
            </div>

            <Dropdown
                v-model="form.code_language"
                :options="codeLanguages"
                :filter="true"
                placeholder="Select a language"
                :showClear="true"
                class="w-100 mt-4"
            >
            </Dropdown>

            <div class="text-danger" v-if="form.errors.has('code_language')">
                {{ form.errors.get("code_language") }}
            </div>

            <CodeEditor
                v-if="form.code_language != null"
                class="mt-3"
                :language="form.code_language"
                :load_code="load_code"
                :readonly="false"
            ></CodeEditor>

            <div
                class="text-danger"
                v-if="form.errors.has('code') && form.code_language != null"
            >
                {{ form.errors.get("code") }}
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
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Textarea from "primevue/textarea";

import FormTitleComponentVue from "@/components/admin/partials/FormTitleComponent.vue";
import CodeEditor from "@/components/admin/partials/CodeEditorComponent.vue";

import Form from "vform";

import { mapActions, mapMutations, mapState } from "vuex";

export default {
    components: {
        FormTitleComponentVue,
        Dropdown,
        CodeEditor,
        Button,
        Textarea,
    },
    data: () => ({
        form: new Form({
            link_id: "",
            code_language: null,
            code: null,
            comment: null,
        }),
        errors: null,
        editing_code: null,
        title_component: "New Code",
        load_code: null,
    }),
    methods: {
        ...mapActions(["sendPostForm", "sendPutForm", "getLinks", "getCodes"]),
        ...mapMutations(["toggleNewItemSidebar", "changeEditModel"]),

        save() {
            let url = "/codes";

            if (this.editing_code != null) {
                url = "/codes/" + this.editing_code;

                this.sendPutForm({
                    form: this.form,
                    url: url,
                    errors: this.errors,
                }).then((response) => {
                    if (response.status === 200) {
                        this.toggleNewItemSidebar(false);
                        this.getCodes();
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
                        this.getCodes();
                    }
                });
            }
        },
        clearForm() {
            this.form.reset();
            this.editing_code = null;
            this.changeEditModel(null);
        },
    },
    mounted() {
        this.errors = this.form.errors;
        this.title_component = "New code";
        this.getLinks();

        if (this.editModel != null) {
            // Title section
            this.title_component = "Edit code";

            // Get model ID from editing object
            this.editing_code = this.editModel.id;

            // Load data from editing model
            this.form.link_id = this.editModel.link_id;
            this.form.code_language = this.editModel.language;
            this.form.comment = this.editModel.comment;
            this.form.code = this.editModel.code;
            this.load_code = this.editModel.code;
        }
    },
    computed: {
        ...mapState([
            "editModel",
            "links",
            "codeLanguages",
            "showNewItemSidebar",
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

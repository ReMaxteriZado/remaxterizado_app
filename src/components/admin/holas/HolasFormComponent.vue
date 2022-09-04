<template>
    <Dialog
        v-model:visible="$store.state.links.dialog"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '30vw' }"
        :modal="dialog_defaults.modal"
        :closeOnEscape="dialog_defaults.closeOnEscape"
        :dismissableMask="dialog_defaults.dismissableMask"
        @after-hide="clearForm()"
        @show="fillForm()"
    >
        <template #header>
            <img src="/images/icons/añadir-incidencia.svg" alt="" width="60" />
        </template>

        <Title :title="title_component" />

        <form
            class="custom-form"
            @submit.prevent="save()"
            @keydown="form.onKeydown($event)"
        >
            <div class="row">
                <div class="col-12 col-md-6">
                    <InputText
                        label="Nombre"
                        v-model="form.name"
                        :disabled="disabled"
                        :error="
                            form.errors.has('name')
                                ? form.errors.get('name')
                                : null
                        "
                        @change-value="form.name = value"
                    />
                </div>
                <div class="col-12 d-flex justify-content-end" v-if="!disabled">
                    <Button
                        type="submit"
                        label="Guardar"
                        class="text-white mt-4"
                        :disabled="form.busy"
                    />
                </div>
            </div>
        </form>
    </Dialog>
</template>

<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";

import Title from "../partials/TitleComponent.vue";
import InputText from "../partials/forms/InputTextComponent.vue";

import Form from "vform";

import { mapActions, mapMutations, mapState } from "vuex";

export default {
    components: {
        Dialog,
        Title,
        Button,
        InputText,
    },
    data: () => ({
        form: new Form({
            name: "",
            color: "ff0000",
        }),
        title_component: "Nueva área",
        disabled: false,
    }),
    methods: {
        ...mapActions(["sendPostForm", "sendPutForm", "getLinks"]),
        ...mapMutations(["toggleLinksModal", "changeCurrentLink"]),
        save() {
            let url = "/links";

            if (this.links.register != null) {
                url += `/${this.links.register.id}`;

                this.sendPutForm({
                    form: this.form,
                    url: url,
                    errors: this.form.errors,
                }).then((response) => {
                    if (response.status === 200) {
                        this.toggleLinksModal(false);
                        this.getLinks(this.links.current_page);
                    }
                });
            } else {
                this.sendPostForm({
                    form: this.form,
                    url: url,
                    errors: this.form.errors,
                }).then((response) => {
                    if (response.status === 200) {
                        this.toggleLinksModal(false);
                        this.getLinks(this.links.current_page);
                    }
                });
            }
        },
        clearForm() {
            this.form.update({
                name: "",
                color: "ff0000",
            });
            this.form.clear();

            this.changeCurrentLink(null);
            this.title_component = "Nueva área";
            this.disabled = false;
        },
        fillForm() {
            this.$nextTick(() => {
                if (this.links.register != null) {
                    this.form.update({ ...this.links.register });

                    if (this.links.mode_modal == "edit") {
                        this.title_component = "Editar área";
                        this.disabled = false;
                    } else {
                        this.title_component = "Ver área";
                        this.disabled = true;
                    }
                }
            });
        },
    },
    computed: {
        ...mapState(["dialog_defaults", "links"]),
    },
};
</script>

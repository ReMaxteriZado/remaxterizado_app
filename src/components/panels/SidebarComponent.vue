<template>
    <Sidebar
        v-model:visible="$store.state.showSidebar"
        position="right"
        class="p-sidebar-sm"
        id="web-sidebar"
    >
        <form
            @submit.prevent="doLogin()"
            @keydown="form.onKeydown($event)"
            class="d-flex flex-column align-items-center justify-content-sart"
        >
            <img class="mb-3" src="@/assets/images/logo.png" alt="" />

            <div class="mb-3 w-100">
                <span class="p-input-icon-left w-100">
                    <i class="pi pi-at" />
                    <InputText
                        type="text"
                        class="w-100"
                        v-model="form.email"
                        placeholder="Email"
                    />
                </span>
                <div class="text-white" v-if="form.errors.has('email')">
                    {{ form.errors.get("email") }}
                </div>
            </div>

            <div class="mb-3 w-100">
                <span class="p-input-icon-left w-100">
                    <i class="pi pi-shield"></i>
                    <InputText
                        type="password"
                        class="w-100"
                        v-model="form.password"
                        placeholder="Password"
                    />
                </span>
                <div class="text-white" v-if="form.errors.has('password')">
                    {{ form.errors.get("password") }}
                </div>
            </div>

            <div class="w-100">
                <Button
                    type="submit"
                    label="Login"
                    class="text-white"
                    :disabled="form.busy"
                />
            </div>
        </form>
    </Sidebar>
</template>

<script>
import Sidebar from "primevue/sidebar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Form from "vform";

import { mapActions } from "vuex";

export default {
    components: {
        InputText,
        Sidebar,
        Button,
    },
    data: () => ({
        form: new Form({
            email: "",
            password: "",
        }),
        errors: null,
    }),
    methods: {
        ...mapActions(["login"]),
        doLogin() {
            this.login({
                form: this.form,
                errors: this.errors,
            });
        },
    },
    mounted() {
        this.errors = this.form.errors;
    },
};
</script>

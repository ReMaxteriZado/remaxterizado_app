<template>
    <Sidebar
        v-model:visible="$store.state.showSidebar"
        position="right"
        class="p-sidebar-sm"
        id="web-sidebar"
    >
        <form
            @submit.prevent="login()"
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
        login() {
            this.$store.dispatch("login", {
                form: this.form,
                url: "/login",
                errors: this.errors,
            });
            // .then((response) => {
            //     if (response.data?.message) {
            //         this.errors.set("email", response.data.message);
            //     }
            // });
        },
        // async login() {
        //     try {
        //         const response = await this.form.post(
        //             this.$store.state.defaultApiRoute + "/login"
        //         );

        //         localStorage.setItem("access_token", response.data.token);

        //         this.$store.commit("toggleSidebar", false);

        //         this.$router.push("/admin/dashboard");
        //     } catch (error) {
        //         if (!error.response.data?.errors) {
        //             this.errors.set("email", error.response.data.message);
        //         }
        //         console.error(error.response);
        //     }
        // },
    },
    mounted() {
        this.errors = this.form.errors;
    },
};
</script>

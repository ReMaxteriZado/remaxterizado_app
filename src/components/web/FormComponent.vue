<template>
    <section id="contact-form" class="form container">
        <div class="row">
            <div class="col-12">
                <h2>Contact form</h2>
            </div>
        </div>
        <div class="row">
            <form class="col-12">
                <div class="form-group mb-3">
                    <label for="email">Email address</label>
                    <input v-model="email" type="email" class="form-control" placeholder="Enter email" />
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputPassword1">Name</label>
                    <input v-model="name" type="text" class="form-control" placeholder="Name" />
                </div>
                <div class="form-group d-flex align-items-center mb-3">
                    <input type="checkbox" v-model="checked" />
                    <label for="checkbox" class="ms-2">I accept the terms and conditions</label>
                </div>
                <div class="errors mb-3">
                    <div v-for="(error, index) in formErrors" :key="index" class="text-danger">
                        {{ error }}
                    </div>
                </div>
                <div v-if="formSuccess" class="alert alert-success">Thank you!</div>
                <button v-on:click="submitForm" type="button" class="btn">Submit</button>
            </form>
        </div>
    </section>
</template>

<script>

    export default {
        data() {
            return {
                email: "",
                name: "",
                checked: "",
                formErrors: [],
                formSuccess: false,
            };
        },
        methods: {
            submitForm() {
                if (this.checkForm()) {
                    const data = {
                        email: this.email,
                        name: this.name,
                        checked: this.checked,
                    };

                    this.$http.post("/submit-form", data).then(() => {
                        this.formSuccess = true;
                    });
                }
            },
            checkForm() {
                this.formErrors = [];
                this.formSuccess = false;

                if (!this.email) {
                    this.formErrors.push("Email is required");
                }

                if (this.email && !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) {
                    this.formErrors.push("Email is not valid");
                }

                if (!this.name) {
                    this.formErrors.push("Name is required");
                }

                // name min length
                if (this.name && this.name.length < 3) {
                    this.formErrors.push("Name is too short. Minimun length is 3");
                }

                if (!this.checked) {
                    this.formErrors.push("You must accept the terms and conditions");
                }

                return this.formErrors.length === 0;
            },
        },
    };
</script>

<style lang="scss" scoped></style>

<template>
    <div>
        <label
            for="input"
            class="w-100 text-primary text-bold"
            :class="label_class"
            >{{ label }}</label
        >
        <InputSwitch v-model="getModel" :disabled="disabled" />

        <div class="text-danger" v-if="error != null">
            {{ error }}
        </div>
    </div>
</template>

<script>
import InputSwitch from "primevue/inputswitch";

export default {
    components: {
        InputSwitch,
    },
    props: [
        "form",
        "model",
        "modelName",
        "label",
        "error",
        "disabled",
        "label_class",
    ],
    data: () => ({
        getModel: true,
    }),
    mounted() {
        this.getModel = this.model == 1 ? true : false;
    },
    watch: {
        getModel(newValue) {
            this.form[this.modelName] = newValue;
        },
        model() {
            this.getModel = this.model == 1 ? true : false;
        },
    },
};
</script>

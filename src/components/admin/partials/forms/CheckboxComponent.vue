<template>
    <div
        class="d-flex flex-column align-items-start justify-content-center field-checkbox"
    >
        <label class="control control-checkbox custom-checkbox">
            <span class="text-primary text-bold">{{ label }}</span>

            <input
                type="checkbox"
                :disabled="disabled"
                v-model="getModel"
                :checked="getModel"
            />
            <div class="control-indicator"></div>
        </label>

        <div class="text-danger" v-if="error != null">
            {{ error }}
        </div>
    </div>
</template>

<script>
export default {
    props: ["form", "model", "modelName", "label", "error", "disabled"],
    data: () => ({
        getModel: null,
    }),
    mounted() {
        this.getModel = this.model;
    },
    watch: {
        getModel(newValue) {
            this.form[this.modelName] = newValue;
        },
        model() {
            this.getModel = this.model;
        },
    },
};
</script>

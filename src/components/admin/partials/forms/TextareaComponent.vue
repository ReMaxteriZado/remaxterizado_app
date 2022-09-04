<template>
    <div>
        <label for="input" class="text-primary text-bold">{{ label }}</label>
        <Textarea
            class="w-100"
            v-model="getModel"
            :disabled="disabled"
            :placeholder="label"
        />

        <div class="text-danger" v-if="error != null">
            {{ error }}
        </div>
    </div>
</template>

<script>
import Textarea from 'primevue/textarea';

export default {
    components: {
        Textarea,
    },
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

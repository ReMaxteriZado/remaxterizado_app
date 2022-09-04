<template>
    <div>
        <label for="basic" class="text-primary text-bold">{{
            placeholder
        }}</label>
        <MultiSelect
            v-model="getModel"
            :options="options"
            :optionValue="optionValue"
            :optionLabel="optionLabel"
            :filter="filter"
            :placeholder="placeholder"
            :showClear="showClear"
            :class="classes"
            :disabled="disabled || options.length == 0"
            class="w-100"
        >
            <template #option="slotProps">
                <div>{{ slotProps.option[displayText] }}</div>
            </template>
        </MultiSelect>

        <div class="text-danger" v-if="error != null">
            {{ error }}
        </div>
    </div>
</template>

<script>
import MultiSelect from "primevue/multiselect";

export default {
    components: {
        MultiSelect,
    },
    props: [
        "model",
        "modelName",
        "options",
        "optionValue",
        "optionLabel",
        "filter",
        "placeholder",
        "showClear",
        "classes",
        "error",
        "displayText",
        "disabled",
        "form",
    ],
    data: () => ({
        getModel: null,
    }),
    mounted() {
        this.getModel = this.model;
    },
    watch: {
        getModel(newValue) {
            // If we are in a modal
            if (this.$parent.form == undefined) {
                this.form[this.modelName] = newValue;
            } else {
                // If we are in a page with a form
                this.$parent.form[this.modelName] = newValue;
            }
        },
        model() {
            this.getModel = this.model;
        },
    },
};
</script>

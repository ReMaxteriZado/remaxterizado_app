<template>
    <div>
        <label for="basic" class="text-primary text-bold">{{
            placeholder
        }}</label>
        <Dropdown
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
                <span v-if="Array.isArray(displayText)">
                    <span v-for="(text, index) in displayText" :key="index">
                        {{ formatText(slotProps.option, text, index) }}
                    </span>
                </span>
                <span v-else>{{ slotProps.option[displayText] }}</span>
            </template>
        </Dropdown>

        <div class="text-danger" v-if="error != null">
            {{ error }}
        </div>
    </div>
</template>

<script>
import Dropdown from "primevue/dropdown";

export default {
    components: {
        Dropdown,
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
        "displayTextSeparator",
        "disabled",
        "form",
    ],
    data: () => ({
        getModel: null,
    }),
    mounted() {
        this.getModel = this.model;
    },
    methods: {
        formatText(option, text, index) {
            let result = option[text];

            if (
                this.displayTextSeparator != null &&
                index != this.displayText.length - 1 &&
                (option[index + 1] != null || option[index + 1] != "")
            ) {
                result += this.displayTextSeparator;
            } else {
                result += " ";
            }

            return result;
        },
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

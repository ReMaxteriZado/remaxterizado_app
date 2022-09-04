<template>
    <div>
        <label for="input" class="text-primary text-bold">{{ label }}</label>
        <InputText
            type="text"
            class="w-100"
            v-model="model"
            :disabled="disabled"
            :placeholder="label"
        />

        <div class="text-danger" v-if="error != null">
            {{ error }}
        </div>
    </div>
</template>

<script>
import InputText from "primevue/inputtext";

export default {
    components: {
        InputText,
    },
    props: [
        "label",
        "error",
        "disabled",
        "isNumber",
    ],
    data: () => ({
        model: null,
    }),
    watch: {
        model(newValue) {
            let value = null

            if (this.isNumber && !isNaN(parseInt(newValue))) {
                value = parseInt(newValue);
            } else {
                value = newValue;
            }

            this.$emit('change-value', value)
        },
    },
};
</script>

<template>
    <div>
        <label for="basic" class="text-primary text-bold">{{
            placeholder
        }}</label>
        <Calendar
            v-model="getModel"
            :class="classes"
            :disabled="disabled"
            class="w-100"
            dateFormat="dd/mm/yy"
            :showButtonBar="true"
            :placeholder="placeholder"
            :showTime="showTime"
        >
        </Calendar>

        <div class="text-danger" v-if="error != null">
            {{ error }}
        </div>
    </div>
</template>

<script>
import Calendar from "primevue/calendar";

export default {
    components: {
        Calendar,
    },
    props: [
        "model",
        "modelName",
        "placeholder",
        "classes",
        "error",
        "displayText",
        "disabled",
        "form",
        "showTime",
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

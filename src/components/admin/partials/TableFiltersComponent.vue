<template>
    <form id="filters" class="d-flex align-items-start gap-3">
        <div v-for="(filter, index) in filters" :key="index">
            <div v-if="filter.type == 'string'" class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                    :name="filter.name"
                    v-model="filter.value"
                    :placeholder="filter.placeholder"
                />
            </div>
            <div v-if="filter.type == 'date'">
                <Calendar
                    :name="filter.name"
                    v-model="filter.value"
                    dateFormat="dd/mm/yy"
                    :placeholder="filter.placeholder"
                />
            </div>
        </div>
    </form>
</template>

<script>
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";

export default {
    components: {
        InputText,
        Calendar,
    },
    props: {
        filters: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

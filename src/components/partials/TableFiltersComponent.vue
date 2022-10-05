<template>
    <form
        :id="id"
        class="d-flex align-items-center gap-3 overflow-auto"
        :class="columns"
    >
        <div v-for="(filter, index) in filters" :key="index" class="filter">
            <div v-if="filter.type == 'string'" class="p-input-icon-left w-100">
                <i class="pi pi-search" />
                <InputText
                    :name="filter.name"
                    v-model="filter.value"
                    :placeholder="filter.placeholder"
                />
            </div>
            <div v-if="filter.type == 'select'" class="p-input-icon-left w-100">
                <i class="pi pi-search" />
                <Dropdown
                    v-model="filter.value"
                    :options="filter.options"
                    optionLabel="label"
                    optionValue="value"
                    :placeholder="filter.placeholder"
                    :showClear="true"
                />
                <input
                    hidden
                    type="text"
                    :name="filter.name"
                    :value="filter.value"
                />
            </div>
            <div v-if="filter.type == 'date'" class="p-input-icon-left w-100">
                <i class="pi pi-search" />
                <Calendar
                    :name="filter.name"
                    v-model="filter.value"
                    dateFormat="dd/mm/yy"
                    :placeholder="filter.placeholder"
                    :manualInput="true"
                />
            </div>
        </div>
    </form>
</template>

<script>
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";

export default {
    components: {
        InputText,
        Calendar,
        Dropdown,
    },
    props: {
        id: {
            type: String,
            default: "filters",
        },
        filters: {
            type: Array,
            default: () => [],
        },
        columns: {
            type: String,
            default: "col-8",
        },
    },
};
</script>

<style lang="scss" scoped>
.p-input-icon-left > i:first-of-type {
    z-index: 50;
}

:deep(.p-calendar .p-inputtext) {
    padding-left: 2.5rem;
}

:deep(.p-dropdown .p-dropdown-label) {
    padding-left: 2.5rem;
}

.filter {
    min-width: 10rem;
}

:deep(.p-dropdown) {
    width: 10rem;
}

:deep(input) {
    width: 10rem;
}

::-webkit-scrollbar {
    height: 12px;
}
</style>

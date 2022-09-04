<template>
    <div>
        <Dropdown
            v-model="center"
            :options="centers.list"
            optionValue="id"
            optionLabel="name"
            :filter="false"
            :placeholder="'Seleccione un centro'"
            class="w-100"
        >
            <template #option="slotProps">
                <div>{{ slotProps.option.name }}</div>
            </template>
        </Dropdown>
    </div>
</template>

<script>
import Dropdown from "primevue/dropdown";

import { mapActions, mapState, mapMutations } from "vuex";

export default {
    components: {
        Dropdown,
    },
    data() {
        return {
            center: null,
        };
    },
    methods: {
        ...mapActions(["getCenters"]),
        ...mapMutations(["changeCurrentcenter"]),
    },
    mounted() {
        this.getCenters();
        this.center = this.current_center;
    },
    computed: {
        ...mapState(["current_center", "centers"]),
    },
    watch: {
        center() {
            this.changeCurrentcenter(this.center);
        },
    },
};
</script>

<style lang="scss" scoped>

:deep(.p-dropdown) {
    border: none;
    background-color: white;
    color: $text;

    &:not(.p-disabled).p-focus {
        box-shadow: none;
    }
}
</style>

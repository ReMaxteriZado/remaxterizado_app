<template>
    <div>
        <div class="d-flex flex-wrap gap-3 align-items-center mb-3">
            <TitleComponent title="Links" />
        </div>
        <Table />
    </div>
</template>

<script>
import TitleComponent from "@/components/admin/partials/TitleComponent.vue";
import Table from "@/components/admin/links/LinksTableComponent.vue";

export default {
    components: {
        TitleComponent,
        Table,
    },
};
</script>

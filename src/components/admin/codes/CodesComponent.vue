<template>
    <div>
        <div class="d-flex flex-wrap gap-3 align-items-center mb-3">
            <TitleComponent title="Codes" />
        </div>
        <Table />

        <CodeDialog />
    </div>
</template>

<script>
import TitleComponent from "@/components/admin/partials/TitleComponent.vue";
import Table from "@/components/admin/codes/CodesTableComponent.vue";
import CodeDialog from "@/components/admin/dialogs/CodeDialogComponent.vue";

export default {
    components: {
        TitleComponent,
        Table,
        CodeDialog,
    },
};
</script>

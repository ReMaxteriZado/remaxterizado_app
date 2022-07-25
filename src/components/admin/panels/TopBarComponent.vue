<template>
    <div class="p-4">
        <Card class="mb-4 no-custom-card">
            <template #content>
                <div class="d-flex justify-content-end">
                    <CurrentUser />
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import Card from "primevue/card";
import CurrentUser from "./CurrentUserComponent.vue";

export default {
    components: {
        Card,
        CurrentUser,
    },
    data: () => ({
        home: {
            icon: "pi pi-home",
            url: "/admin/dashboard",
        },
    }),
};
</script>

<style lang="scss" scoped>
.link {
    text-decoration: none;
}

:deep(.p-breadcrumb) {
    background-color: white;
    border: none;
}

:deep(.p-card .p-card-body) {
    padding: 0;
}

:deep(.p-card .p-card-content) {
    padding: 0;
}
</style>

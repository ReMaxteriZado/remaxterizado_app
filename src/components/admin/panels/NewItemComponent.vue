<template>
    <Sidebar v-model:visible="$store.state.showNewItemSidebar" position="right">
        <component :is="formComponent"></component>
    </Sidebar>
</template>

<script>
import Sidebar from "primevue/sidebar";

import NewCategoryComponent from "@/components/admin/categories/NewCategoryComponent.vue";
import NewLinkComponent from "@/components/admin/links/NewLinkComponent.vue";
import NewCodeComponent from "@/components/admin/codes/NewCodeComponent.vue";

import { mapState } from "vuex";

export default {
    components: {
        Sidebar,
        NewCategoryComponent,
        NewLinkComponent,
        NewCodeComponent,
    },
    computed: mapState(["formComponent"]),
};
</script>

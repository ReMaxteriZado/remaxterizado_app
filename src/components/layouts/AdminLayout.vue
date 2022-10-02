<template>
    <!-- <div id="admin-layout">
        <Toast />
        <ConfirmDialog />
        <LoadingComponent />
        <NewItemComponent id="new-item-sidebar" />

        <div class="logo-section">
            <LogoComponent />
        </div>

        <div class="sidebar-section">
            <SidebarComponent />
        </div>

        <div class="top-bar-section">
            <TopBar />
        </div>
        <div class="content-section p-4 pt-0">
            <router-view v-slot="{ Component }">
                <transition name="slide" mode="out-in">
                    <component :is="Component" :key="$route.path" />
                </transition>
            </router-view>
        </div>
    </div> -->
    <LinksComponent />
</template>

<script>
// import LogoComponent from "../admin/panels/LogoComponent.vue";
// import SidebarComponent from "../admin/panels/SidebarComponent.vue";
// import NewItemComponent from "../admin/panels/NewItemComponent.vue";
// import TopBar from "../admin/panels/TopBarComponent.vue";
// import LoadingComponent from "../admin/partials/LoadingComponent.vue";

// import Toast from "primevue/toast";
// import ConfirmDialog from "primevue/confirmdialog";
import LinksComponent from "@/components/admin/links/LinksComponent.vue";

import {  mapActions } from "vuex";

export default {
    components: {
        // LogoComponent,
        // SidebarComponent,
        // NewItemComponent,
        // LoadingComponent,
        // TopBar,
        // Toast,
        // ConfirmDialog,
        LinksComponent
    },
    // computed: {
    //     ...mapState(["showNotLoggedToast", "showFormGeneralErrorToast"]),
    // },
    methods: {
        ...mapActions(["setFormAccessToken"]),
    },
    mounted() {
        this.setFormAccessToken();
    },
    // watch: {
    //     showNotLoggedToast(value) {
    //         if (value) {
    //             this.$toast.add({
    //                 severity: "error",
    //                 summary: "You are not logged in",
    //                 detail: "Please login to continue",
    //                 life: 3000,
    //             });
    //         }
    //     },
    //     showFormGeneralErrorToast(value) {
    //         if (value) {
    //             this.$toast.add({
    //                 severity: "error",
    //                 summary: "An error has appeared",
    //                 detail: "Please try again",
    //                 life: 3000,
    //             });
    //         }
    //     },
    // },
};
</script>

<style lang="scss" scoped>
#admin-layout {
    height: 100vh;
    display: grid;
    grid-template-columns: 15.5% 1fr;
    grid-template-rows: 10% 1fr;
    gap: 0px 0px;
    grid-template-areas:
        "logo-section top-bar-section"
        "sidebar-section content-section";
    background-color: rgb(245, 245, 245);

    .logo-section {
        grid-area: logo-section;
        z-index: 20;
    }

    .top-bar-section {
        grid-area: top-bar-section;
        z-index: 20;
    }

    .sidebar-section {
        grid-area: sidebar-section;
        z-index: 20;
    }

    .content-section {
        grid-area: content-section;
        z-index: 50;
        overflow: auto;
    }

    .close-session-section {
        grid-area: close-session-section;
        z-index: 20;
    }

    .bottom-bar-section {
        grid-area: bottom-bar-section;
        z-index: 20;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: all 0.2s ease;
    }

    .slide-enter-from,
    .slide-leave-to {
        transform: translateX(30%);
        opacity: 0;
    }
}
</style>

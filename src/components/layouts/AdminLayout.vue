<template>
    <div id="admin-layout">
        <Toast />
        <ConfirmDialog />

        <div class="admin-sidebar">
            <SidebarComponent />
        </div>
        <div class="p-4 content">
            <transition name="slide" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <NewItemComponent id="new-item-sidebar" />
        <LoadingComponent />
    </div>
</template>

<script>
import SidebarComponent from "../admin/panels/SidebarComponent.vue";
import NewItemComponent from "../admin/panels/NewItemComponent.vue";
import LoadingComponent from "../admin/partials/LoadingComponent.vue";

import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";

import { mapState, mapActions } from "vuex";

export default {
    components: {
        SidebarComponent,
        NewItemComponent,
        LoadingComponent,
        Toast,
        ConfirmDialog,
    },
    mounted() {
        this.setFormAccessToken;
    },
    computed: {
        ...mapState(["showNotLoggedToast", "showFormGeneralErrorToast"]),
        ...mapActions(["setFormAccessToken"]),
    },
    watch: {
        showNotLoggedToast(value) {
            if (value) {
                this.$toast.add({
                    severity: "error",
                    summary: "You are not logged in",
                    detail: "Please login to continue",
                    life: 3000,
                });
            }
        },
        showFormGeneralErrorToast(value) {
            if (value) {
                this.$toast.add({
                    severity: "error",
                    summary: "An error has appeared",
                    detail: "Please try again",
                    life: 3000,
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#admin-layout {
    height: 100vh;
    max-width: 100vw;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 7fr;
    grid-template-rows: auto;
    grid-auto-flow: row;
    grid-template-areas: "sidebar content";
    background-color: rgb(245, 245, 245);

    .logo {
        grid-area: logo;
    }

    .admin-sidebar {
        grid-area: sidebar;
        z-index: 20;
    }

    .content {
        grid-area: content;

        .slide-enter-active,
        .slide-leave-active {
            transition: all .3s ease;
        }

        .slide-enter-from,
        .slide-leave-to {
            transform: translateX(30%);
            opacity: 0;
        }
    }
}
</style>

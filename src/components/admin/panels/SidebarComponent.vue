<template>
    <div class="h-100">
        <div class="avatar d-flex align-content-start gap-2">
            <div class="avatar-image">
                <Avatar
                    class="bg-white"
                    v-if="!userLogged.image"
                    :label="userLogged.name.charAt(0)"
                    size="xlarge"
                    shape="circle"
                />
                <Avatar
                    v-else
                    class="bg-transparent"
                    shape="circle"
                    :image="userLogged.image"
                    size="xlarge"
                />
                <div
                    class="actions"
                    @click="show_actions = !show_actions"
                    :class="{ show: show_actions }"
                >
                    <SpeedDialComponent />
                </div>
            </div>
            <div class="data d-flex flex-column gap-1">
                <span class="text-white">{{ userLogged.name }}</span>
                <small class="text-white">{{ userLogged.email }}</small>
            </div>
        </div>
        <hr />
        <Menu class="custom-menu" :model="items"> </Menu>
    </div>
</template>

<script>
import Menu from "primevue/menu";
import Avatar from "primevue/avatar";

import { mapActions, mapMutations, mapState } from "vuex";

import SpeedDialComponent from "./SpeedDialComponent.vue";

export default {
    components: {
        Menu,
        Avatar,
        SpeedDialComponent,
    },
    data() {
        return {
            items: [
                {
                    label: "Holas",
                    items: [
                        {
                            label: "Holas",
                            icon: "pi pi-fw pi-list",
                            to: "/admin/holas",
                        },
                    ],
                },
                {
                    label: "Categories",
                    items: [
                        {
                            label: "All categories",
                            icon: "pi pi-fw pi-list",
                            to: "/admin/categories/list",
                        },
                        {
                            label: "Add category",
                            icon: "pi pi-fw pi-plus",
                            command: () => {
                                this.changeForm("NewCategoryComponent");
                            },
                        },
                    ],
                },
                {
                    label: "Links",
                    items: [
                        {
                            label: "All links",
                            icon: "pi pi-fw pi-list",
                            to: "/admin/links/list",
                        },
                        {
                            label: "Add link",
                            icon: "pi pi-fw pi-plus",
                            command: () => {
                                this.changeForm("NewLinkComponent");
                            },
                        },
                    ],
                },
                {
                    label: "Codes",
                    items: [
                        {
                            label: "All codes",
                            icon: "pi pi-fw pi-list",
                            to: "/admin/codes/list",
                        },
                        {
                            label: "Add code",
                            icon: "pi pi-fw pi-plus",
                            command: () => {
                                this.changeForm("NewCodeComponent");
                            },
                        },
                    ],
                },
            ],
            show_actions: false,
        };
    },
    methods: {
        ...mapMutations(["changeFormComponent"]),
        ...mapActions(["logout"]),
        changeForm(component) {
            this.changeFormComponent(component);
            this.showSidebar();
        },
        showSidebar() {
            this.$store.commit("toggleNewItemSidebar", true);
        },
    },
    computed: {
        ...mapState(["userLogged"]),
    },
};
</script>

<style lang="scss" scoped>
.avatar-image {
    position: relative;
    height: 4rem;

    .actions {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: $transition;
        width: 100%;
        height: 100%;
        z-index: 50;

        &:hover {
            opacity: 1;
        }

        &.show {
            opacity: 1;
        }
    }
}

:deep(.p-speeddial-button) {
    transition: $transition;
    background-color: darken($primary, 5%);
    box-shadow: $smooth-box-shadow !important;
}

:deep(.p-speeddial-direction-down) {
    z-index: 50;
}

:deep(.p-speeddial-item .p-speeddial-action) {
    background-color: darken($primary, 10%);
    box-shadow: $smooth-box-shadow !important;
}

:deep(.p-speeddial-item a) {
    text-decoration: none;
}
</style>

import { createWebHistory, createRouter } from "vue-router";

// Layouts
import WebLayout from "/src/components/layouts/WebLayout.vue";
import AdminLayout from "/src/components/layouts/AdminLayout.vue";

// Web
import HomeComponent from "./components/web/HomeComponent.vue";

// Admin
import DashboardComponent from "@/components/admin/dashboard/DashboardComponent.vue";
import CategoriesComponent from "@/components/admin/categories/CategoriesComponent.vue";
import LinksComponent from "@/components/admin/links/LinksComponent.vue";
import CodesComponent from "@/components/admin/codes/CodesComponent.vue";
import Holas from "@/components/admin/holas/HolasComponent.vue";

import axios from "./axios.js";
import store from "./store";

const routes = [
    {
        path: "/",
        component: WebLayout,
        children: [
            {
                path: "",
                name: "home",
                component: HomeComponent,
            },
            {
                path: "/:pathMatch(.*)*",
                beforeEnter(to, from, next) {
                    next({ path: "/" });
                },
            },
        ],
    },
    {
        path: "/admin",
        component: AdminLayout,
        children: [
            {
                path: "dashboard",
                component: DashboardComponent,
                beforeEnter: checkAdminRights,
            },
            {
                path: "categories/list",
                component: CategoriesComponent,
                beforeEnter: checkAdminRights,
            },
            {
                path: "links/list",
                component: LinksComponent,
                beforeEnter: checkAdminRights,
            },
            {
                path: "codes/list",
                component: CodesComponent,
                beforeEnter: checkAdminRights,
            },
            {
                path: "holas",
                component: Holas,
                beforeEnter: checkAdminRights,
            },
            {
                path: "/admin/:pathMatch(.*)*",
                beforeEnter(to, from, next) {
                    next({ path: "/admin/dashboard" });
                },
            },
        ],
    },
];

function checkAdminRights(to, from, next) {
    if (localStorage.getItem("access_token") != null) {
        axios
            .post(
                "/check-user-admin",
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("access_token"),
                    },
                }
            )
            .then((response) => {
                store.commit("changeUserLogged", response.data.user);
                next();
            })
            .catch((error) => {
                console.log("🚀 ~ file: router.js ~ line 89 ~ checkAdminRights ~ error", error)
                if (
                    error.response.data.user_not_logged ||
                    !error.response.data.is_amdin
                ) {
                    // localStorage.removeItem("access_token");
                    next({ path: "/" });
                }
            });
    } else {
        next({ path: "/" });
    }
}

const router = new createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

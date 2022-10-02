import { createWebHistory, createRouter } from "vue-router";

// Layouts
import WebLayout from "/src/components/layouts/WebLayout.vue";
import AdminLayout from "/src/components/layouts/AdminLayout.vue";

// Web
import HomeComponent from "./components/web/HomeComponent.vue";

// Admin
import DashboardComponent from "@/components/admin/dashboard/DashboardComponent.vue";
import CategoriesComponent from "@/components/admin/categories/CategoriesComponent.vue";
import LinksComponent from "@/components/admin/links_v2/LinksComponent.vue";
import CodesComponent from "@/components/admin/codes/CodesComponent.vue";

import axios from "./axios";
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
				path: "categories",
				component: CategoriesComponent,
				beforeEnter: checkAdminRights,
			},
			{
				path: "links",
				component: LinksComponent,
				beforeEnter: checkAdminRights,
			},
			{
				path: "codes",
				component: CodesComponent,
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
	axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("access_token")}`;

	axios
		.post(
			"/check-user-role",
		)
		.then((response) => {
			store.commit("changeUserLogged", response.data.user);
			store.dispatch("setFormAccessToken");

			next();
		})
		.catch((error) => {
			if (error.response.data.user_not_logged || !error.response.data.is_amdin) {
				next({ path: "/" });
			}
		});
}

const router = new createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

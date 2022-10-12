import { createWebHistory, createRouter } from "vue-router";

// Layouts
import LoginLayout from "@/components/layouts/LoginLayout.vue";
import AdminLayout from "@/components/layouts/AdminLayout.vue";

// Admin
import DashboardComponent from "@/components/admin/dashboard/DashboardComponent.vue";
import CategoriesComponent from "@/components/admin/categories/CategoriesComponent.vue";
import LinksComponent from "@/components/admin/links/LinksComponent.vue";
import CodesComponent from "@/components/admin/codes/CodesComponent.vue";

const routes = [
	{
		path: "/",
		component: LoginLayout,
		children: [
			{
				path: "/:pathMatch(.*)*",
				beforeEnter(to, from, next) {
					next({ path: "/login" });
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
			},
			{
				path: "categories",
				component: CategoriesComponent,
			},
			{
				path: "links",
				name: "Enlaces",
				component: LinksComponent,
			},
			{
				path: "codes",
				component: CodesComponent,
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

const router = new createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

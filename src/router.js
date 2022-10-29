import { createWebHistory, createRouter } from "vue-router";

// Layouts
import LoginLayout from "@/components/layouts/LoginLayout.vue";
import AdminLayout from "@/components/layouts/AdminLayout.vue";

// Admin
import DashboardComponent from "@/components/dashboard/DashboardComponent.vue";
import CategoriesComponent from "@/components/categories/CategoriesComponent.vue";
import LinksComponent from "@/components/links/LinksComponent.vue";
import CodesComponent from "@/components/codes/CodesComponent.vue";
import DemoComponent from "@/components/demo/DemoComponent.vue";

const routes = [
	{
		path: "/login",
		component: LoginLayout,
	},
	{
		path: "/",
		component: LoginLayout,
		children: [
			{
				path: "/login",
			},
			{
				path: "/:pathMatch(.*)*",
				beforeEnter(to, from, next) {
					next({ path: "/login" });
				},
			},
		],
	},
	{
		path: "",
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
				path: "demo",
				component: DemoComponent,
			},
			{
				path: "/:pathMatch(.*)*",
				beforeEnter(to, from, next) {
					next({ path: "/dashboard" });
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

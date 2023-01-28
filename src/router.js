import { createWebHistory, createRouter } from "vue-router";

import axios from "./axios";
import store from "./store";

// Layouts
import LoginLayout from "@/components/layouts/LoginLayout.vue";
import AdminLayout from "@/components/layouts/AdminLayout.vue";
import NotFound from "@/components/layouts/NotFound.vue";

// Admin
import Dashboard from "@/components/dashboard/DashboardComponent.vue";
import Categories from "@/components/categories/CategoriesComponent.vue";
import Links from "@/components/links/LinksComponent.vue";
import Codes from "@/components/codes/CodesComponent.vue";
import Roles from "@/components/roles/RolesComponent.vue";
import Users from "@/components/users/UsersComponent.vue";
import Demo from "@/components/demo/DemosComponent.vue";

const routes = [
  {
    path: "/login",
    component: LoginLayout,
    beforeEnter: checkLogin,
    name: "login",
  },
  {
    path: "/admin",
    component: AdminLayout,
    beforeEnter: checkUserLogged,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "categories",
        name: "Categorías",
        component: Categories,
      },
      {
        path: "links",
        name: "Enlaces",
        component: Links,
      },
      {
        path: "codes",
        name: "Códigos",
        component: Codes,
      },
      {
        path: "roles",
        name: "Roles",
        component: Roles,
      },
      {
        path: "users",
        name: "Usuarios",
        component: Users,
      },
      {
        path: "demo",
        name: "Demo",
        component: Demo,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

function checkLogin(to, from, next) {
  if (localStorage.getItem("accessToken") != null) {
    next({ path: "/admin/dashboard" });
  } else {
    next();
  }

  return;
}

function checkUserLogged(to, from, next) {
  if (localStorage.getItem("accessToken") == null) {
    next({ path: "/login" });

    return;
  }

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;

  axios
    .post("/check-user-logged")
    .then((response) => {
      store.commit("changeUserLogged", response.data.user);

      if (to.path === "/login") {
        next({ path: "/admin/dashboard" });
      } else {
        next();
      }
    })
    .catch((error) => {
      console.error("Router JS ~ checkAdminRights", error.response);

      if (error.response.data.message === "CSRF token mismatch.") {
        location.reload();
      }

      if (
        error.response.data.message == "User not found" ||
        error.response.data.message == "Unauthorized" ||
        error.response.data.message == "Unauthenticated."
      ) {
        window.localStorage.clear();
        next({ path: "/login" });
      }
    });

  return;
}

const router = new createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

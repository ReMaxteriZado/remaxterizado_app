import { createWebHistory, createRouter } from "vue-router";

import axios from "./axios";
import store from "./store";

// Layouts
import LoginLayout from "@/components/layouts/LoginLayout.vue";
import AdminLayout from "@/components/layouts/AdminLayout.vue";
import WebLayout from "@/components/layouts/WebLayout.vue";

// Admin
import Dashboard from "@/components/dashboard/Dashboard.vue";
import Categories from "@/components/categories/Categories.vue";
import Links from "@/components/links/Links.vue";
import Codes from "@/components/codes/Codes.vue";
import Roles from "@/components/roles/Roles.vue";
import Users from "@/components/users/Users.vue";
import Demo from "@/components/demo/Demos.vue";

const routes = [
  {
    path: "/",
    component: WebLayout,
    name: "home",
    meta: {
      title: "Inicio",
    },
  },
  {
    path: "/login",
    component: LoginLayout,
    beforeEnter: checkLogin,
    name: "login",
    meta: {
      title: "Login",
    },
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
        meta: {
          title: "Dashboard",
        },
      },
      {
        path: "categories",
        name: "Categorías",
        component: Categories,
        meta: {
          title: "Categorías",
        },

      },
      {
        path: "links",
        name: "Enlaces",
        component: Links,
        meta: {
          title: "Enlaces",
        },
      },
      {
        path: "codes",
        name: "Códigos",
        component: Codes,
        meta: {
          title: "Códigos",
        },
      },
      {
        path: "roles",
        name: "Roles",
        component: Roles,
        meta: {
          title: "Roles",
        },
      },
      {
        path: "users",
        name: "Usuarios",
        component: Users,
        meta: {
          title: "Usuarios",
        },
      },
      {
        path: "demo",
        name: "Demo",
        component: Demo,
        meta: {
          title: "Demo",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
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
      console.error(
        "Router JS ~ checkAdminRights",
        error.response,
        error.response?.data?.message
      );

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

router.beforeEach((to, from, next) => {
  // Get the page title from the route meta data that we have defined
  // See further down below for how we setup this data
  const title = to.meta.title;

  //Take the title from the parameters
  const titleFromParams = to.params.pageTitle;
  // If the route has a title, set it as the page title of the document/page
  if (title) {
    document.title = title;
  }
  // If we have a title from the params, extend the title with the title
  // from our params
  if (titleFromParams) {
    document.title = `${titleFromParams} - ${document.title}`;
  }
  // Continue resolving the route
  next();
});

export default router;

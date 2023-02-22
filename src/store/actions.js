import Form from "vform";
import http from "../axios";
import { func } from "../helpers";

const actions = {
  // Auth actions
  async login({ state }, { form, errors }) {
    try {
      const response = await form.post(state.baseURL + "/login");

      localStorage.setItem("accessToken", response.data.token);

      window.location.href = "/admin/dashboard";
    } catch (error) {
      if (error.response?.data?.message) {
        errors.set("email", error.response.data.message);
      }
    }
  },
  setFormAccessToken() {
    const instance = http.create({
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });

    Form.axios = instance;
  },
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLogged");

    window.location.href = "/login";
  },

  // Helper actions
  copyToClipboard({ state }, data) {
    try {
      navigator.clipboard.writeText(data);
      state.successToast = "Texto copiado al portapapeles";
    } catch (error) {
      state.errorToast = "Error al copiar al portapapeles";
    }
  },
  async downloadFile({ state }, params) {
    try {
      const response = await http({
        method: "post",
        url: params.downloadRoute,
        params: {
          folder: params.folder,
          fileName: params.fileName,
          databaseFileColumn: params.databaseFileColumn,
          databaseFileNameColumn: params.databaseFileNameColumn,
        },
        responseType: !params.isFromDatabase ? "blob" : "",
      });

      let link = null;

      if (params.isFromDatabase) {
        link = document.createElement("a");
        link.href = response.data.fileData;

        link.setAttribute("download", response.data.fileName);

        document.body.appendChild(link);
        link.click();
      } else {
        const fileName =
          response.headers["content-disposition"].split("filename=")[1];

        const url = window.URL.createObjectURL(new Blob([response.data]));

        link = document.createElement("a");
        link.href = url;

        link.setAttribute("download", fileName);

        document.body.appendChild(link);
        link.click();
      }

      state.successToast = "Archivo descargado correctamente";

      if (link != null) {
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      console.error(error);
      state.errorToast = true;

      return error;
    }
  },

  // Registers functions
  async sendForm({ state }, { method = "post", form, url, errors }) {
    try {
      let response;

      state.loading = true;

      if (method == "post") {
        response = await form.post(state.baseURL + url);
      } else if (method == "put") {
        response = await form.put(state.baseURL + url);
      }

      state.successToast = "Registro guardado correctamente";
      state.loading = false;
      return response;
    } catch (error) {
      console.error(error);

      state.loading = false;

      if (error.response?.data?.message) {
        state.errorToast = error.response.data.message;
      }

      if (error.response?.data) {
        for (const key in error.response.data) {
          errors.set(key, error.response.data[key]);
        }
      }

      return error.response;
    }
  },
  async deleteRegisters({ state }, { url, ids = null }) {
    try {
      state.loading = true;

      const response = await http({
        method: "delete",
        url: url,
        data: {
          ids,
        },
      });

      state.loading = false;
      state.successToast = "Registro/s borrado/s correctamente";

      return response;
    } catch (error) {
      console.error(error);

      state.loading = false;

      if (error.response?.data?.message) {
        state.errorToast = error.response.data.message;
      }

      return error.response;
    }
  },
  async getRegisters({ state }, params) {
    try {
      if (
        params.showLoading == null ||
        params.showLoading == undefined ||
        params.showLoading
      ) {
        state.datatableDefaults.loading = true;
      }

      let formProps = func.formatFilters("filters");

      let httpParams = {
        ...formProps,
      };

      if (
        params.getAll == undefined ||
        (params.getAll != undefined && !params.getAll)
      ) {
        httpParams.pagination = {
          currentPage: params?.page != null ? params.page : 0,
          rows:
            params?.rows != null ? params.rows : state.datatableDefaults.rows,
        };
      }

      const response = await http({
        url: params.route,
        params: httpParams,
      });

      state.datatableDefaults.loading = false;
      state[params.stateVariable].list = response.data[params.stateVariable];
      state[params.stateVariable].listTotal = response.data.total;
    } catch (error) {
      console.error(error);

      if (error.response.data.message === "CSRF token mismatch.") {
        location.reload();
      }

      if (
        error.response.data?.message == "User not found" ||
        error.response.data?.message == "Unauthorized" ||
        error.response.data?.message == "Unauthenticated."
      ) {
        window.localStorage.clear();
        window.location.href = "/login";
      }

      state.showFormGeneralErrorToast = true;

      return error;
    }
  },

  // Dashboard
  async getStats() {
    try {
      const response = await http({
        url: "/stats",
      });

      return response;
    } catch (error) {
      console.error(error);

      return error;
    }
  },

  // Categories
  async getCategories({ dispatch, state }, search) {
    try {
      const response = await http({
        url: "/categories",
        params: {
          search,
        },
      });

      state.categories.customList = response.data.categories;

      state.categories.customList.forEach((category) => {
        category.categoryTree = "";
        state.categoryTree = "";

        if (category.parent_id != null) {
          dispatch("formatParentCategories", category);
          category.categoryTree = state.categoryTree + " > ";
        }

        category.categoryTree += category.name;
      });

      return response;
    } catch (error) {
      console.error(error);

      return error;
    }
  },
  formatParentCategories({ dispatch, state }, category) {
    state.categories.customList.forEach((category_2) => {
      if (category.parent_id == category_2.id) {
        state.categoryTree += category_2.name;

        if (category_2.parent_id != null) {
          state.categoryTree += " > ";
          dispatch("formatParentCategories", category_2);
        }
      }
    });
  },

  // Links
  async incrementViews(context, params) {
    try {
      const response = await http({
        method: "post",
        url: "/links/incremet-views/" + params.id,
      });

      return response;
    } catch (error) {
      console.error(error);

      return error;
    }
  },
};

export default actions;

import router from "/src/router";
import Form from "vform";
import axios from "../axios";
import { func } from "../helpers";

const actions = {
	async login({ dispatch, state }, { form, errors }) {
		try {
			const response = await form.post(state.baseURL + "/login");

			localStorage.removeItem("is_blocked");
			localStorage.setItem("access_token", response.data.token);
			localStorage.setItem(
				"user_permissions",
				JSON.stringify(response.data.user_permissions)
			);

			await dispatch("setFormAccessToken");

			router.push("/admin/dashboard");
			state.layout = "AdminLayout";
		} catch (error) {
			if (error.response?.data?.message) {
				errors.set("email", error.response.data.message);
			}
		}
	},
	async setFormAccessToken() {
		const instance = axios.create({
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
		});

		Form.axios = instance;
	},
	logout(params) {
		if (params?.isBlocked) {
			localStorage.setItem("is_blocked", true);
		}

		localStorage.removeItem("access_token");
		window.location.href = "/logout";
	},
	copyToClipboard({ state }, data) {
		try {
			navigator.clipboard.writeText(data);
			state.successToast = "Texto copiado al portapapeles";
		} catch (error) {
			state.errorToast = "Error al copiar al portapapeles";
		}
	},

	// VForm functions
	async sendPostForm({ state }, { form, url, errors }) {
		try {
			state.loading = true;

			const response = await form.post(state.baseURL + url);

			state.loading = false;
			return response;
		} catch (error) {
			console.error(error);

			state.loading = false;

			if (error.response?.data) {
				for (const key in error.response.data) {
					errors.set(key, error.response.data[key]);
				}
			}

			return error.response;
		}
	},
	async sendPutForm({ state }, { form, url, errors }) {
		try {
			state.loading = true;
			const response = await form.put(state.baseURL + url);

			state.loading = false;
			return response;
		} catch (error) {
			console.error(error);

			state.loading = false;

			if (error.response?.data) {
				for (const key in error.response.data) {
					errors.set(key, error.response.data[key]);
				}
			}

			return error.response;
		}
	},

	// Delete function
	async sendDeleteRequest({ state }, { url }) {
		try {
			state.loading = true;

			const response = await axios({
				method: "delete",
				url: url,
			});

			state.loading = false;

			return response;
		} catch (error) {
			console.error(error);

			state.loading = false;
			state.showFormGeneralErrorToast = true;

			return error;
		}
	},

	// Dashboard
	async getStats({ state }) {
		try {
			const response = await axios({
				url: "/stats",
			});

			return response;
		} catch (error) {
			console.error(error);
			state.showFormGeneralErrorToast = true;

			return error;
		}
	},

	// Categories
	async getCategories({ dispatch, state }, search) {
		try {
			const response = await axios({
				url: "/categories",
				params: {
					search,
				},
			});

			state.categories = response.data;

			state.categories.forEach((category) => {
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
			state.showFormGeneralErrorToast = true;

			return error;
		}
	},
	formatParentCategories({ dispatch, state }, category) {
		state.categories.forEach((category_2) => {
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
	async getLinks({ state }, params) {
		try {
			state.datatableDefaults.loading = true;

			const form = document.getElementById("filters");
			let formProps = null;

			if (form != undefined) {
				const formData = new FormData(form);

				formProps = Object.fromEntries(formData);
			}

			const response = await axios({
				url: "/links",
				params: {
					...formProps,
					pagination: {
						currentPage: params != null ? params.page : 0,
						rows: params != null ? params.rows : state.datatableDefaults.rows,
					},
				},
			});

			state.links.list = response.data.links;
			state.links.listTotal = response.data.total;

			state.datatableDefaults.loading = false;
			return response;
		} catch (error) {
			console.error(error);
			state.showFormGeneralErrorToast = true;

			return error;
		}
	},
	async incrementViews({ state }, id) {
		try {
			const response = await axios({
				method: "post",
				url: "/links/incremet-views/" + id,
			});

			return response;
		} catch (error) {
			console.error(error);
			state.showFormGeneralErrorToast = true;

			return error;
		}
	},

	// Codes
	async getCodes({ state }, search) {
		try {
			const response = await axios({
				url: "/codes",
				params: {
					search,
				},
			});

			state.codes = response.data;

			return response;
		} catch (error) {
			console.error(error);
			state.showFormGeneralErrorToast = true;

			return error;
		}
	},

	// Get registers
	async getRegisters({ state }, params) {
		try {
			state.datatableDefaults.loading = true;

			let formProps = func.formatFilters("filters");

			const response = await axios({
				url: params.route,
				params: {
					getAll: params.getAll != undefined ? params.getAll : false,
					...formProps,
					pagination: {
						currentPage: params?.page != null ? params.page : 0,
						rows:
							params?.rows != null ? params.rows : state.datatableDefaults.rows,
					},
				},
			});

			state.datatableDefaults.loading = false;
			state[params.stateVariable].list = response.data[params.stateVariable];
			state[params.stateVariable].listTotal = response.data.total;
		} catch (error) {
			console.error(error);
			state.showFormGeneralErrorToast = true;

			return error;
		}
	},
};

export default actions;

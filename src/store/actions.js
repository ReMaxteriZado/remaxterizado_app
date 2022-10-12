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
			localStorage.setItem("user_permissions", JSON.stringify(response.data.user_permissions));

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

	// Form functions
	async sendForm({ state }, { method = "post", form, url, errors }) {
		try {
			let response;

			state.loading = true;

			if (method == "post") {
				response = await form.post(state.baseURL + url);
			} else if (method == "put") {
				response = await form.put(state.baseURL + url);
			}

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
	async deleteRegisters({ state }, { url, ids = null }) {
		try {
			state.loading = true;

			const response = await axios({
				method: "delete",
				url: url,
				data: {
					ids,
				}
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
		// console.log("🚀 ~ file: actions.js ~ line 208 ~ getRegisters ~ params", params)
		try {
			if (params.showLoading == null || params.showLoading == undefined || params.showLoading) {
				state.datatableDefaults.loading = true;
			}

			let formProps = func.formatFilters("filters");

			const response = await axios({
				url: params.route,
				params: {
					getAll: params.getAll != undefined ? params.getAll : false,
					...formProps,
					pagination: {
						currentPage: params?.page != null ? params.page : 0,
						rows: params?.rows != null ? params.rows : state.datatableDefaults.rows,
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

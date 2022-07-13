import router from "/src/router";
import Form from "vform";
import axios from "axios";

const actions = {
    async login({ state, commit }, { form, url, errors }) {
        try {
            state.loading = true;

            const response = await form.post(state.defaultApiRoute + url);

            localStorage.setItem("access_token", response.data.token);

            commit("toggleSidebar", false);

            router.push("/admin/dashboard");

            const instance = axios.create({
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("access_token"),
                },
            });

            state.loading = false;

            Form.axios = instance;
        } catch (error) {
            state.loading = false;

            if (error.response?.data?.message) {
                errors.set("email", error.response.data.message);
            }
        }
    },
    setFormAccessToken() {
        const instance = axios.create({
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
        });

        Form.axios = instance;
    },
    logout() {
        localStorage.removeItem("access_token");
        router.push("/");
    },
    async sendPostForm({ state }, { form, url, errors }) {
        try {
            state.loading = true;

            const response = await form.post(state.defaultApiRoute + url);

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
    async sendPostRequest({ state }, { url, params }) {
        try {
            const response = await axios({
                method: "post",
                url: state.defaultApiRoute + url,
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("access_token"),
                },
                params,
            });

            return response;
        } catch (error) {
            console.error(error);
            state.showFormGeneralErrorToast = true;

            return error;
        }
    },
    async sendPutForm({ state }, { form, url, errors }) {
        try {
            state.loading = true;
            const response = await form.put(state.defaultApiRoute + url);

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
    async sendGetRequest({ state }, { url, params }) {
        try {
            const response = await axios({
                method: "get",
                url: state.defaultApiRoute + url,
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("access_token"),
                },
                params,
            });

            return response;
        } catch (error) {
            console.error(error);
            state.showFormGeneralErrorToast = true;

            return error;
        }
    },
    async sendDeleteRequest({ state }, { url }) {
        try {
            state.loading = true;
            const response = await axios({
                method: "delete",
                url: state.defaultApiRoute + url,
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("access_token"),
                },
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
                method: "get",
                url: state.defaultApiRoute + "/stats",
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("access_token"),
                },
            });

            return response;
        } catch (error) {
            console.error(error);
            state.showFormGeneralErrorToast = true;

            return error;
        }
    },

    // Categories
    getCategories({ dispatch, state }, search) {
        dispatch("sendGetRequest", {
            url: "/categories",
            params: {
                search,
            },
        }).then((response) => {
            state.categories = response.data;

            state.categories.forEach((category) => {
                category.category_tree = "";
                state.category_tree = "";

                if (category.parent_id != null) {
                    dispatch("formatParentCategories", category);
                    category.category_tree = state.category_tree + " > ";
                }

                category.category_tree += category.name;
            });
        });
    },
    formatParentCategories({ dispatch, state }, category) {
        state.categories.forEach((category_2) => {
            if (category.parent_id == category_2.id) {
                state.category_tree += category_2.name;

                if (category_2.parent_id != null) {
                    state.category_tree += " > ";
                    dispatch("formatParentCategories", category_2);
                }
            }
        });
    },

    // Links
    getLinks({ dispatch, state }, search) {
        dispatch("sendGetRequest", {
            url: "/links",
            params: {
                search,
            },
        }).then((response) => {
            state.links = response.data;
        });
    },
    getLink({ dispatch, state }, id) {
        dispatch("sendGetRequest", {
            url: "/link/" + id,
        }).then((response) => {
            state.links = response.data;
        });
    },

    // Codes
    getCodes({ dispatch, state }, search) {
        dispatch("sendGetRequest", {
            url: "/codes",
            params: {
                search,
            },
        }).then((response) => {
            state.codes = response.data;
        });
    },
    getCode({ dispatch, state }, id) {
        dispatch("sendGetRequest", {
            url: "/code/" + id,
        }).then((response) => {
            state.codes = response.data;
        });
    },
};

export default actions;

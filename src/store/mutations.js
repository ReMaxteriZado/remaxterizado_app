const mutations = {
    changeUserLogged(state, n) {
        state.userLogged = n;
    },
    changeLayout(state, n) {
        state.layout = n;
    },
    toggleSidebar(state, n) {
        state.showSidebar = n;
    },
    toggleLoading(state, n) {
        state.loading = n;
    },
    toggleNewItemSidebar(state, n) {
        state.showNewItemSidebar = n;
    },
    changeUserLoggedBearerToken(state, n) {
        state.user_logged_bearer_token = n;
    },
    changeFormComponent(state, n) {
        state.formComponent = n;
    },
    changeEditModel(state, n) {
        state.editModel = n;
    },
    setCategories(state, n) {
        state.categories = n;
    },
    toggleCodeDialog(state, n) {
        if (!n) {
            state.view_code = null;
        }
        state.displayCodeDialog = n;
    },
    changeViewCode(state, n) {
        state.view_code = n;
    },
    changeNewLinkCategorySelected(state, n) {
        state.new_link_category_selected = n;
    },
};

export default mutations;

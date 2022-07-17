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
            state.viewCode = null;
        }
        state.displayCodeDialog = n;
    },
    changeViewCode(state, n) {
        state.viewCode = n;
    },
    changeNewLinkCategorySelected(state, n) {
        state.newLinkCategorySelected = n;
    },
};

export default mutations;

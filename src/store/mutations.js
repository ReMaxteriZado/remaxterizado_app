const mutations = {
	// General
	changeUserLogged(state, n) {
		state.userLogged = n;
	},
	toggleSidebar(state, n) {
		state.showSidebar = n;
	},

	// Defaults
	changeCurrentTablePage(state, n) {
		state[n.stateVariable].currentPage = n.event.page;
		state[n.stateVariable].rows = n.event.rows;
	},
	toggleFormDialog(state, n) {
		state[n.stateVariable].dialog = n.show;
	},
	changeFormDialogMode(state, n) {
		state[n.stateVariable].dialogMode = n.dialogMode;
	},
	changeCurrentRegister(state, n) {
		state[n.stateVariable].register = n.register;
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

	// Categories
	toggleCategoriesDialog(state, n) {
		state.categories.dialog = n;
	},
	changeCategoriesDialogMode(state, n) {
		state.categories.dialogMode = n;
	},
	changeCurrentCategory(state, n) {
		state.categories.register = n;
	},
	changeCurrentPageCategories(state, n) {
		state.categories.currentPage = n;
	},
};

export default mutations;

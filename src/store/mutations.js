const mutations = {
	// General
	changeUserLogged(state, n) {
		state.userLogged = n;
	},
	toggleSidebar(state, n) {
		state.showSidebar = n;
	},

	// Toasts
	changeSuccessToast(state, n) {
		state.successToast = n;
	},
	changeErrorToast(state, n) {
		state.errorToast = n;
	},
	changeWarningToast(state, n) {
		state.warningToast = n;
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

	// Categories
	changeNewLinkCategorySelected(state, n) {
		state.newLinkCategorySelected = n;
	},
};

export default mutations;

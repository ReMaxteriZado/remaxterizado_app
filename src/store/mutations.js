const mutations = {
	changeUserLogged(state, n) {
		state.userLogged = n
	},
	changeLayout(state, n) {
		state.layout = n
	},
	toggleSidebar(state, n) {
		state.showSidebar = n
	},
	toggleLoading(state, n) {
		state.loading = n
	},
	toggleNewItemSidebar(state, n) {
		state.showNewItemSidebar = n
	},
	changeUserLoggedBearerToken(state, n) {
		state.user_logged_bearer_token = n
	},
	changeFormComponent(state, n) {
		state.formComponent = n
	},
	changeEditModel(state, n) {
		state.editModel = n
	},
	setCategories(state, n) {
		state.categories = n
	},
	toggleCodeDialog(state, n) {
		if (!n) {
			state.viewCode = null
		}
		state.displayCodeDialog = n
	},
	changeViewCode(state, n) {
		state.viewCode = n
	},
	changeNewLinkCategorySelected(state, n) {
		state.newLinkCategorySelected = n
	},

	changeCurrentTablePage(state, n) {
		state[n.state_variable].currentPage = n
	},
	toggleFormDialog(state, n) {
		state[n.state_variable].dialog = n.show
	},
	changeFormDialogMode(state, n) {
		state[n.state_variable].dialogMode = n
	},
	changeCurrentRegister(state, n) {
		state[n.state_variable].register = n
	},

	// Links
	toggleLinksDialog(state, n) {
		state.links.dialog = n
	},
	changeLinksDialogMode(state, n) {
		state.links.dialogMode = n
	},
	changeCurrentLink(state, n) {
		state.links.register = n
	},
	changeCurrentPageLinks(state, n) {
		state.links.currentPage = n
	},
}

export default mutations

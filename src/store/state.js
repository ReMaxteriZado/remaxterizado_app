const defaults = ["links", "categories"];

const state = {
	env: "local",

	// Admin
	baseURL: "http://remaxterizado_api.test/api",
	// baseURL: "https://api.remaxterizado.es/api",
	// loading: false,
	showSidebar: false,
	showNotLoggedToast: false,
	userLogged: null,

	// Forms
	showNewItemSidebar: false,
	showFormGeneralErrorToast: false,
	formComponent: "",
	editModel: null,

	// Categories
	categoryTree: "",

	// Codes
	codes: [],
	code_languages: ["PHP", "JavaScript", "CSS", "HTML", "SCSS"],
	viewCode: null,

	// Datatable defaults
	datatableDefaults: {
		noResults: "No hay resultados",
		lazy: true,
		loading: true,
		paginator: true,
		rows: 5,
		rowsPerPageOptions: [5, 10, 20],
		rowHover: true,
		scrollable: true,
		scrollHeight: "600px",
		currentPage: 0,
		paginatorTemplate:
			"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",
		currentPageReportTemplate:
			"Mostrando del {first} al {last} de un total de {totalRecords} registros",
		responsiveLayout: "stack",
		breakpoint: "960px",
	},

	// Dialogs defaults
	dialogDefaults: {
		modal: true,
		closeOnEscape: true,
		dismissableMask: true,
	},

	// Dialogs
	displayCodeDialog: false,
};

for (const item of defaults) {
	state[item] = {
		// Table
		list: [],
		listTotal: 0,
		currentPage: 0,
		rows: 5,

		// Form
		register: null,
		dialog: false,
		dialogMode: "show",
	}
}

export default state;

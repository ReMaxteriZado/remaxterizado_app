const state = {
	// Web
	layout: "web-layout",

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
	},

	// Dialogs defaults
	dialogDefaults: {
		modal: true,
		closeOnEscape: true,
		dismissableMask: true,
	},

	// Dialogs
	displayCodeDialog: false,

	// Links
	links: {
		// Table
		list: [],
		listTotal: 0,
		currentPage: null,

		// Form
		register: null,
		dialog: false,
		dialogMode: "show",
	},

	// Categories
	categories: {
		// Table
		list: [],
		listTotal: 0,
		currentPage: null,

		// Form
		register: null,
		dialog: false,
		dialogMode: "show",
	},
};

export default state;

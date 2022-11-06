const defaults = ["links", "codes", "categories", "sergioCategories", "sergioSubcategories", "sergioBooks", "sergioBooksPages"];

const state = {
	baseURL: "http://remaxterizado_api.test/api",
	// baseURL: "https://api.remaxterizado.es/api",
	showSidebar: false,
	userLogged: null,

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

	// Categories
	categoryTree: "",

	// Codes
	codeLanguages: [
		{
			label: "PHP",
			value: "PHP",
		},
		{
			label: "JavaScript",
			value: "JavaScript",
		},
		{
			label: "CSS",
			value: "CSS",
		},
		{
			label: "HTML",
			value: "HTML",
		},
		{
			label: "SCSS",
			value: "SCSS",
		},
	],
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

state.categories.customList = null

export default state;

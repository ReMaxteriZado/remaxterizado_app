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
  categories: [],
  categoryTree: "",

  // Codes
  codes: [],
  code_languages: ["PHP", "JavaScript", "CSS", "HTML", "SCSS"],
  viewCode: null,

  // Datatable defaults
  datatable_defaults: {
    no_results: "No results found",
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
      "Showing {first} to {last} of {totalRecords} entries",
  },

  // Dialogs defaults
  dialog_defaults: {
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
    list_total: 0,
    current_page: null,

    // Form
    register: null,
    dialog: false,
    dialog_mode: "show",
  },
};

export default state;

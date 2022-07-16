const state = {
    // Web
    layout: "web-layout",

    // Admin
    // defaultApiRoute: "http://remaxterizado_api.test/api",
    defaultApiRoute: "https://api.remaxterizado.es/api",
    loading: false,
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
    category_tree: "",

    // Links
    links: [],
    new_link_category_selected: null,

    // Codes
    codes: [],
    code_languages: ["PHP", "JavaScript", "CSS", "HTML", "SCSS"],
    view_code: null,

    // Datatable defaults
    datatable_defaults: {
        loading: false,
        paginator: true,
        rows: 5,
        rowHover: true,
        paginatorTemplate:
            "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",
        currentPageReportTemplate:
            "Showing {first} to {last} of {totalRecords} entries",
    },

    // Dialogs
    displayCodeDialog: false,
};

export default state;

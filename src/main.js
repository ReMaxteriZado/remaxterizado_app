// General
import { createApp } from "vue";
import App from "./components/App.vue";

// Store
import store from "././store/index.js";

// Axios
import http from "./axios";

// Router
import router from "./router";

// Import helpers
import { func } from "./helpers";

// Import styles
import "/src/assets/styles/app.scss";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";

library.add(fas);
library.add(fab);
library.add(far);
dom.watch();

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

// PrimeVue
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";

import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import Tooltip from "primevue/tooltip";
import Ripple from "primevue/ripple";

// Fonts
require("@/assets/fonts/Work_Sans/Work_Sans.css");

// Form fields
import InputText from "@/components/admin/partials/forms/InputText.vue";
import DropDown from "@/components/admin/partials/forms/DropDown.vue";
import Textarea from "@/components/admin/partials/forms/TextArea.vue";
import DatePicker from "@/components/admin/partials/forms/DatePicker.vue";
import CheckBox from "@/components/admin/partials/forms/CheckBox.vue";

const app = createApp(App);

app.directive("tooltip", Tooltip);
app.directive("ripple", Ripple);

app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("InputText", InputText);
app.component("DropDown", DropDown);
app.component("TextArea", Textarea);
app.component("DatePicker", DatePicker);
app.component("CheckBox", CheckBox);

app.config.globalProperties.$http = http;
app.config.globalProperties.$store = store;
app.config.globalProperties.$helper = func;

app.mount("#app");

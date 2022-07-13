// General
import { createApp } from "vue";
import App from "./components/App.vue";

// Store
import store from "././store/index.js";

// Axios
import axios from "./axios";

// Router
import router from "./router";

// Bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

// Fonts
require("@/assets/fonts/Work_Sans/Work_Sans.css");

const app = createApp(App);

app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app.component("font-awesome-icon", FontAwesomeIcon);

app.config.globalProperties.$http = axios;
app.config.globalProperties.$store = store;

app.mount("#app");

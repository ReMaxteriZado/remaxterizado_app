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
import Button from "primevue/button";
import Badge from 'primevue/badge';
import Dialog from "primevue/dialog";

// Fonts
require("@/assets/fonts/Work_Sans/Work_Sans.css");

// Auto animate
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

// Defaults
import TableDefault from "@/components/partials/TableDefault.vue";

// Form
import FormTitle from "@/components/partials/FormTitle.vue";
import InputText from "@/components/partials/forms/InputText.vue";
import InputPassword from "@/components/partials/forms/InputPassword.vue";
import DropDown from "@/components/partials/forms/DropDown.vue";
import Textarea from "@/components/partials/forms/TextArea.vue";
import DatePicker from "@/components/partials/forms/DatePicker.vue";
import CheckBox from "@/components/partials/forms/CheckBox.vue";
import RadioButton from "@/components/partials/forms/RadioButton.vue";
import MultiSelect from "@/components/partials/forms/MultiSelect.vue";
import InputSwitch from "@/components/partials/forms/InputSwitch.vue";
import SelectButton from "@/components/partials/forms/SelectButton.vue";
import FileUpload from "@/components/partials/forms/FileUpload.vue";

const app = createApp(App);

app.directive("tooltip", Tooltip);
app.directive("ripple", Ripple);

app.use(store);
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);
app.use(autoAnimatePlugin);

app.use(PrimeVue, {
	ripple: true,
	locale: {
		dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
		dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
		dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		monthNames: [
			"Enero",
			"Febrero",
			"Marzo",
			"Abril",
			"Mayo",
			"Junio",
			"Julio",
			"Agosto",
			"Septiembre",
			"Octubre",
			"Noviembre",
			"Diciembre",
		],
		monthNamesShort: [
			"Ene",
			"Feb",
			"Mar",
			"Abr",
			"May",
			"Jun",
			"Jul",
			"Ago",
			"Sep",
			"Oct",
			"Nov",
			"Dic",
		],
		today: "Hoy",
		firstDayOfWeek: 1,
		accept: "Aceptar",
		reject: "Rechazar",
		clear: "Limpiar",
		weak: "Débil",
		medium: "Medio",
		strong: "Fuerte",
		pending: "Pendiente",
	},
});

app.component("font-awesome-icon", FontAwesomeIcon);

// Defaults
app.component("TableDefault", TableDefault);

// Form
app.component("FormTitle", FormTitle);
app.component("InputText", InputText);
app.component("InputPassword", InputPassword);
app.component("DropDown", DropDown);
app.component("TextArea", Textarea);
app.component("DatePicker", DatePicker);
app.component("CheckBox", CheckBox);
app.component("RadioButton", RadioButton);
app.component("MultiSelect", MultiSelect);
app.component("InputSwitch", InputSwitch);
app.component("SelectButton", SelectButton);
app.component("FileUpload", FileUpload);
app.component("Button", Button);
app.component("Badge", Badge);
app.component("Dialog", Dialog);

app.config.globalProperties.$http = http;
app.config.globalProperties.$store = store;
app.config.globalProperties.$helper = func;

app.mount("#app");

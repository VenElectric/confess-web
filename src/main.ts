import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import PrimeVue from "primevue/config";
import BadgeDirective from "primevue/badgedirective";

const app = createApp(App).use(router);

app.directive("badge", BadgeDirective);
app.use(PrimeVue).mount("#app");

import { createApp } from "vue";

import store from "./frontend/store/index.js";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/js/bootstrap.bundle.js";

import "font-awesome/css/font-awesome.css";

import App from "./App.vue";
import router from "./frontend/router.js";
import globalMixin from "./frontend/mixins/globalMixin.js";

const app = createApp(App);

app.mixin(globalMixin);

app.use(router);

app.use(store);

app.mount("#app");

import { createApp } from "vue";
import { store } from "./store/store.js";
import { router } from "./router/router.js";
import App from "./App.vue";
import "./styles/main.scss";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

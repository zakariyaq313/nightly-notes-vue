import { createApp } from "vue";
import { store } from "./store/store.js";
import App from "./App.vue";
import "./styles/main.scss";

const app = createApp(App);
app.use(store);
app.mount("#app");

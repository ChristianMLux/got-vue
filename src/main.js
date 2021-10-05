import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import MainButton from "./components/Button/MainButton.vue";

const app = createApp(App).use(store).use(router);

app.component("main-btn", MainButton);

app.mount("#app");

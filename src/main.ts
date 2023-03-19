import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";

const program = createApp(App);
program.use(router);
program.mount("#app");

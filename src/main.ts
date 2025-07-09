import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useWeatherStore } from "./stores/weather";
import { watch } from "vue";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");

// --- Dark mode sync ---

const weatherStore = useWeatherStore();
weatherStore.getTheme(); // Ensure theme is loaded from localStorage

watch(
  () => weatherStore.isDark,
  (isDark) => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  },
  { immediate: true }
);

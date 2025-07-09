<template>
  <nav
    :class="[
      `w-full flex items-center justify-between px-4 py-3 shadow-md sticky top-0 z-[100] transition-colors duration-200 text-[#23272f] dark:text-[#e0e7ef]`,
      weatherStore.isDark
        ? 'from-[#0a0f1a] via-[#101a2b] to-[#0d1b24]'
        : 'from-sky-100 via-blue-200 to-emerald-200',
    ]"
  >
    <!-- Logo/Brand -->
    <div class="flex items-center gap-2 font-bold text-xl tracking-wide">
      <RouterLink
        :to="{ name: 'Home' }"
        :style="{
          textDecoration: 'none',
        }"
      >
        <div class="flex items-center gap-2 font-bold">
          <transition name="fade" mode="out-in">
            <component
              :is="isDark ? MoonIcon : SunIcon"
              class="h-7 w-7"
              :iconClass="isDark ? 'text-cyan-100' : 'text-yellow-400'"
              :color="isDark ? '#e0f7fa' : '#FFD600'"
              key="icon-mode"
            />
          </transition>
          <span>ClimateHub</span>
        </div>
      </RouterLink>
    </div>

    <!-- Dark/Light Toggle Button -->
    <button
      @click="toggleDark"
      class="px-4 py-2 rounded-full shadow-md border transition-all duration-200 cursor-pointer"
      :class="
        isDark
          ? 'bg-gray-800/80 text-white border-gray-700'
          : 'bg-cyan-100/80 text-cyan-700 border-cyan-300'
      "
    >
      {{ isDark ? "☀️ Light Mode" : "🌙 Dark Mode" }}
    </button>
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import SunIcon from "./SunIcon.vue";
import MoonIcon from "./MoonIcon.vue";
import { RouterLink } from "vue-router";
import { useWeatherStore } from "../stores/weather";
import { storeToRefs } from "pinia";

const weatherStore = useWeatherStore();
const { isDark } = storeToRefs(weatherStore);

const toggleDark = () => {
  weatherStore.toggleDark();
};

onMounted(() => {
  weatherStore.getTheme();
});
</script>

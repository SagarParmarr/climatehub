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
              :iconClass="[
                'h-7 w-7',
                isDark ? 'text-cyan-100' : 'text-yellow-400',
              ]"
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
      :style="{
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid',
        background: isDark ? 'rgba(31,41,55,0.8)' : 'rgba(207,250,254,0.8)',
        color: isDark ? '#fff' : '#0e7490',
        borderColor: isDark ? '#374151' : '#67e8f9',
        transition: 'all 0.2s',
      }"
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

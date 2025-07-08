<template>
  <div
    :class="[
      'flex flex-col min-h-screen font-Roboto bg-gradient-to-br',
      weatherStore.isDark
        ? 'from-[#0a0f1a] via-[#101a2b] to-[#0d1b24]'
        : 'from-sky-100 via-blue-200 to-emerald-200',
    ]"
    :style="{
      backgroundColor: weatherStore.isDark ? '#070c16' : undefined,
      // color: isDark ? '#e0f7fa' : '#006064',
    }"
  >
    <NavBarWithTheme />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NavBarWithTheme from "../components/NavBarWithTheme.vue";
import { useWeatherStore } from "../stores/weather";

const weatherStore = useWeatherStore();
</script>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '../stores/weather';
import router from '../router';

const props = defineProps({
  cityData: {
    type: Object,
    required: true,
  },
});
const weatherStore = useWeatherStore();
const { isDark } = storeToRefs(weatherStore);

const handleCityClick = () => {
  router.push({
    name: 'CityView',
    params: {
      city: props.cityData.name,
      state: props.cityData.state,
    },
    query: {
      lat: props.cityData.lat,
      lng: props.cityData.lng,
    },
  });
};
</script>

<template>
  <div
    class="relative flex flex-col items-center justify-center w-full bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-8 transition-all duration-300 group cursor-pointer"
    :style="{
      color: isDark ? '#e0e7ef' : '#23272f',
      background: isDark ? 'rgb(17 27 44)' : 'rgba(255,255,255,0.95)',
      minHeight: '260px',
    }"
    @click="handleCityClick"
  >
    <!-- Remove Button -->
    <button
      class="absolute top-3 right-3 z-10 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white/80 dark:bg-gray-800/80 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-300 opacity-80 hover:opacity-100 group-hover:opacity-100 cursor-pointer"
      style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)"
      @click.stop="$emit('remove')"
      title="Remove city"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <img
      v-if="cityData?.weather?.weather[0]"
      :src="`https://openweathermap.org/img/wn/${cityData.weather.weather[0].icon}@4x.png`"
      :alt="cityData.weather.weather[0].description"
      class="w-24 h-24 mb-4"
    />
    <div
      class="text-4xl font-extrabold mb-2 text-center"
      :style="{
        color: isDark ? '#67e8f9' : '#0ea5e9',
        letterSpacing: '0.02em',
      }"
    >
      {{ cityData.name }}
    </div>
    <div
      class="text-3xl font-extrabold mb-2"
      :style="{ color: isDark ? '#bae6fd' : '#0e293b' }"
    >
      {{ Math.round(cityData.weather.main.temp - 273.15) }}°C
    </div>
    <div class="flex gap-4 mb-2 text-base font-semibold">
      <span :style="{ color: isDark ? '#fca5a5' : '#dc2626' }">
        H: {{ Math.round(cityData.weather.main.temp_max - 273.15) }}°C
      </span>
      <span :style="{ color: isDark ? '#93c5fd' : '#2563eb' }">
        L: {{ Math.round(cityData.weather.main.temp_min - 273.15) }}°C
      </span>
    </div>
    <div
      class="capitalize text-xl font-semibold mb-2 text-center"
      :style="{ color: isDark ? '#e0e7ef' : '#334155' }"
    >
      {{ cityData.weather.weather[0]?.description }}
    </div>
    <div
      class="text-base mb-2 text-center"
      :style="{ color: isDark ? '#7dd3fc' : '#0e293b' }"
    >
      Feels like {{ Math.round(cityData.weather.main.feels_like - 273.15) }}°C
    </div>
  </div>
</template>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .group:hover .group-hover\:opacity-100 {
    opacity: 1 !important;
  }
}
</style>

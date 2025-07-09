<script setup lang="ts">
import CitySearch from "../components/CitySearch.vue";
import { storeToRefs } from "pinia";
import { useWeatherStore } from "../stores/weather";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
// import { onMounted, watch } from "vue";

const router = useRouter();
const weatherStore = useWeatherStore();
const { result: searchResult, isDark } = storeToRefs(weatherStore);

const handleCitySearch = async (payload: any) => {
  await weatherStore.searchCity(payload);
  if (!searchResult.value) return;
  const parts = searchResult.value.name.split(",").map((s: string) => s.trim());
  let city = parts[0] || "";
  let state = parts[1] || parts[0] || "";
  if (parts.length === 1) state = city;
  router.push({
    name: "CityView",
    params: { city, state },
    query: {
      lat: searchResult.value.full.geometry.location.lat,
      lng: searchResult.value.full.geometry.location.lng,
    },
  });
};
</script>

<template>
  <div class="min-h-screen w-full flex flex-col">
    <!-- Header Section -->
    <header
      class="w-full py-6 px-2 md:px-8 flex flex-col items-center bg-transparent"
    >
      <h1
        class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 tracking-tight drop-shadow-lg text-center"
        :style="{ color: isDark ? '#e5e7eb' : '#23272f' }"
      >
        Welcome to ClimateHub
      </h1>
      <p
        class="text-lg sm:text-xl md:text-2xl mb-1 transition-colors text-center"
        :style="{ color: isDark ? '#bfc9d1' : '#4b5563' }"
      >
        Get instant weather and location info for any city or address worldwide.
      </p>
      <p
        class="text-base transition-colors text-center"
        :style="{ color: isDark ? '#7dd3fc' : '#334155' }"
      >
        Start by searching for a city, landmark, or street address below.
      </p>
    </header>

    <!-- Search Section -->
    <section class="w-full flex justify-center py-2 px-2 md:px-8">
      <div class="w-full max-w-2xl">
        <CitySearch @search="handleCitySearch" />
      </div>
    </section>

    <CityList />
  </div>
</template>

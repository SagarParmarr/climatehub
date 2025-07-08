<script setup lang="ts">
import CitySearch from "../components/CitySearch.vue";
import { storeToRefs } from "pinia";
import { useWeatherStore } from "../stores/weather";
import { useRouter } from "vue-router";

const router = useRouter();
const weatherStore = useWeatherStore();
const {
  error: searchError,
  loading: isLoading,
  result: searchResult,
  isDark,
} = storeToRefs(weatherStore);

const handleCitySearch = async (payload: any) => {
  console.log("handleCitySearch: called ");
  console.log(" searchResult: ", searchResult.value);

  await weatherStore.searchCity(payload);

  if (!searchResult.value) {
    console.error("Search result is empty or does not contain a name.");
    return;
  }

  // Split by comma, but fallback to using the whole name for both params if not present
  const parts = searchResult.value.name.split(",").map((s: string) => s.trim());
  let city = parts[0] || "";
  let state = parts[1] || parts[0] || ""; // fallback to city if no state

  // If only one part (like "Poland" or "Dubai"), use it for both params
  if (parts.length === 1) {
    state = city;
  }

  router.push({
    name: "CityView",
    params: {
      city,
      state,
    },
    query: {
      lat: searchResult.value.full.geometry.location.lat,
      lng: searchResult.value.full.geometry.location.lng,
      preview: 1,
    },
  });
};
</script>

<template>
  <div>
    <main
      class="flex-1 flex flex-col items-center px-4 sm:px-8 md:px-16 py-8 w-full max-w-3xl mx-auto"
    >
      <div class="w-full my-42 max-w-2xl text-center mb-8">
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 tracking-tight drop-shadow-lg"
          :style="{
            color: isDark ? '#e5e7eb' : '#23272f', // softer white and softer dark
          }"
        >
          Welcome to ClimateHub
        </h1>
        <p
          class="text-lg sm:text-xl md:text-2xl mb-2 transition-colors"
          :style="{
            color: isDark ? '#bfc9d1' : '#4b5563', // softer gray for both modes
          }"
        >
          Get instant weather and location info for any city or address
          worldwide.
        </p>
        <p
          class="text-base mb-2 transition-colors"
          :style="{
            color: isDark ? '#7dd3fc' : '#334155', // softer cyan and blue-gray
          }"
        >
          Start by searching for a city, landmark, or street address below.
        </p>
      </div>
      <div class="w-full flex justify-center mb-2">
        <div class="w-full max-w-xl">
          <CitySearch @search="handleCitySearch" />
        </div>
      </div>
      <div
        v-if="isLoading"
        class="mt-6 text-center text-cyan-600 font-semibold"
      >
        Searching...
      </div>
      <div
        v-else-if="searchError"
        class="mt-6 p-4 rounded shadow bg-red-100 text-red-800 text-center"
      >
        {{ searchError }}
      </div>
    </main>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .max-w-md {
    max-width: 100%;
  }
  .max-w-2xl {
    max-width: 100vw;
  }
  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>

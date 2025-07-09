<script setup lang="ts">
import { useWeatherStore } from "../stores/weather";
import { storeToRefs } from "pinia";
import CityItem from "./CityItem.vue";
import { onMounted } from "vue";

const weatherStore = useWeatherStore();
const { isDark, loading, error, savedCities } = storeToRefs(weatherStore);

function removeCity(city: any) {
  weatherStore.deleteCity(city);
}

onMounted(async () => {
  await weatherStore.getCities();
});
</script>

<style lang="scss" scoped></style>

<template>
  <section
    v-if="savedCities.length > 0"
    class="w-full flex flex-col px-2 md:px-8 mt-2 flex-1"
  >
    <div
      class="w-full flex flex-col sm:flex-row sm:items-end sm:justify-between mb-4"
    >
      <h2
        class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 sm:mb-0 text-center sm:text-left relative"
        :class="isDark ? 'text-[#e5e7eb]' : 'text-[#23272f]'"
      >
        Your Cities
        <span
          class="block mx-auto sm:mx-0 mt-2 sm:mt-1 h-1 w-16 rounded-full"
          :style="{
            background: isDark
              ? 'linear-gradient(90deg,#67e8f9,#0ea5e9)'
              : 'linear-gradient(90deg,#06b6d4,#2563eb)',
          }"
        ></span>
      </h2>
    </div>
    <div
      class="w-full flex justify-center"
      :style="{
        background: isDark
          ? 'linear-gradient(135deg, #0a0f1a 0%, #101a2b 60%, #0d1b24 100%)'
          : 'linear-gradient(135deg, #e0f7fa 0%, #bae6fd 60%, #bbf7d0 100%)',
        minHeight: '60vh',
        padding: '2.5rem 0',
        borderRadius: '1.5rem',
        transition: 'background 0.3s',
      }"
    >
      <div class="w-full px-2 sm:px-6 lg:px-16">
        <div
          v-if="loading"
          :class="[
            'text-center py-4',
            isDark ? 'text-cyan-200' : 'text-cyan-700',
          ]"
        >
          <div
            :class="[
              'mt-6 text-center font-semibold rounded transition-colors',
              isDark ? 'bg-[#101a2b]' : 'bg-cyan-50',
            ]"
            style="padding: 1rem"
          >
            Loading...
          </div>
        </div>
        <div
          v-else-if="error"
          :class="[
            'text-center py-4',
            isDark ? 'text-red-200' : 'text-red-600',
          ]"
        >
          <div
            :class="[
              'mt-6 p-4 rounded shadow text-center transition-colors',
              isDark ? 'bg-[#2a1920]' : 'bg-red-100',
            ]"
          >
            {{ error }}
          </div>
        </div>
        <div v-else>
          <div
            v-if="savedCities.length === 0"
            :class="[
              'text-center py-4',
              isDark ? 'text-cyan-200' : 'text-cyan-700',
            ]"
          >
            <div
              :class="[
                'inline-block px-4 py-2 rounded-lg transition-colors',
                isDark ? 'bg-[#101a2b]' : 'bg-cyan-50',
              ]"
            >
              No cities found. Add a city to get started.
            </div>
          </div>
          <div
            v-else
            class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style="margin-top: 0.5rem"
          >
            <template v-for="city in savedCities" :key="city.id">
              <CityItem
                v-if="city.weather"
                :cityData="city"
                @remove="removeCity(city)"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<template>
  <div class="w-full max-w-xl">
    <div class="relative flex flex-col sm:flex-row gap-3 items-center">
      <div class="relative flex-1 w-full">
        <input
          ref="inputRef"
          v-model="cityQuery"
          type="text"
          placeholder="Search for an address..."
          class="peer w-full pl-16 pr-6 py-5 text-lg rounded-full border outline-none shadow-md transition-all duration-300 focus:ring-2 focus:ring-cyan-400 font-semibold tracking-wide"
          :class="
            isDark
              ? 'bg-[#101a2b] text-cyan-100 border-gray-700 placeholder-cyan-300 focus:border-cyan-500'
              : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400 focus:border-cyan-600'
          "
          autocomplete="off"
        />
        <span
          class="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 peer-focus:text-cyan-600 pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
      </div>
      <button
        @click="onSubmit"
        type="submit"
        class="cursor-pointer rounded-full px-6 py-3 font-semibold shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        :class="
          isDark
            ? 'bg-cyan-800 text-cyan-100 hover:bg-cyan-700'
            : 'bg-cyan-600 text-white hover:bg-cyan-700'
        "
      >
        Search
      </button>
    </div>
    <!-- Results and errors are now handled in the parent -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useWeatherStore } from "../stores/weather";
import { storeToRefs } from "pinia";

const weatherStore = useWeatherStore();
const { isDark } = storeToRefs(weatherStore);

const cityQuery = ref("");
const emit = defineEmits(["search"]);
const inputRef = ref<HTMLInputElement | null>(null);

// @ts-ignore
let autocomplete: any = null;
let programmaticInput = false; // Flag for programmatic input change

function emitSearch(payload: string) {
  emit("search", payload);
}

const handlePlaceChanged = () => {
  const place = autocomplete.getPlace();
  if (place.formatted_address) {
    programmaticInput = true;
    cityQuery.value = place.formatted_address;
    emitSearch(place.formatted_address); // Emit only the string
    // Reset the flag in the next tick (after DOM/input update)
    programmaticInput = false;
  }
};

function onSubmit() {
  if (programmaticInput) return; // Prevent double API call
  emitSearch(cityQuery.value.trim());
}

onMounted(() => {
  // @ts-ignore
  if (!window.google || !window.google.maps || !window.google.maps.places)
    return;
  if (inputRef.value) {
    // @ts-ignore
    autocomplete = new window.google.maps.places.Autocomplete(inputRef.value, {
      types: ["geocode"],
      fields: ["formatted_address", "geometry", "name", "place_id"],
    });
    autocomplete.addListener("place_changed", handlePlaceChanged);
  }
});

onUnmounted(() => {
  if (autocomplete) {
    // @ts-ignore
    google.maps.event.clearInstanceListeners(autocomplete);
  }
});
</script>

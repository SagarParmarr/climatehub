import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useWeatherStore = defineStore("weather", () => {
  const searchResult = ref<any | null>(null);
  const searchError = ref("");
  const isLoading = ref(false);
  const selectedPlace = ref<any | null>(null);
  const isDark = ref(false);

  const setSelectedPlace = (place: any) => {
    selectedPlace.value = place;
  };

  const searchCity = async (query: string) => {
    searchResult.value = null;
    searchError.value = "";
    if (!query) {
      searchError.value = "Please enter a city name.";
      return;
    }
    isLoading.value = true;
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        query
      )}&key=${apiKey}`;
      const res = await axios.get(url);
      const data = res.data;
      if (data && data.results && data.results.length > 0) {
        const result = data.results[0];
        searchResult.value = {
          name: result.formatted_address,
          country:
            (
              result.address_components.find((c: any) =>
                c.types.includes("country")
              ) || {}
            ).long_name || "",
          full: result,
        };
      } else {
        searchError.value = "City not found. Try another name.";
      }
    } catch (e) {
      searchError.value = "Error fetching city data.";
    } finally {
      isLoading.value = false;
    }
  };

  const toggleDark = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  const getTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      isDark.value = true;
    } else if (saved === "light") {
      isDark.value = false;
    }
  };

  const clearSearch = () => {
    searchResult.value = null;
    searchError.value = "";
    isLoading.value = false;
  };

  // Getters
  const result = computed(() => searchResult.value);
  const error = computed(() => searchError.value);
  const loading = computed(() => isLoading.value);

  return {
    searchResult,
    searchError,
    isLoading,
    selectedPlace,
    isDark,
    setSelectedPlace,
    searchCity,
    clearSearch,
    getTheme,
    toggleDark,
    result,
    error,
    loading,
  };
});

import { defineStore } from "pinia";
import { ref, computed } from "vue";
// Import API and localStorage utilities (to be created)
import { fetchWeatherByLatLng, searchCityByQuery } from "../api/weatherApi";
import {
  loadSavedCities,
  updateSavedCities,
  saveCity,
  removeCity,
  setTheme,
  getTheme as loadTheme,
} from "../utils/localStorageUtils";

export const useWeatherStore = defineStore("weather", () => {
  const searchResult = ref<any | null>(null);
  const searchError = ref("");
  const isLoading = ref(false);
  const selectedPlace = ref<any | null>(null);
  const isDark = ref(false);

  // Now each city in savedCities can have a 'weather' property
  const savedCities = ref<any[]>([]);

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
      const result = await searchCityByQuery(query);
      if (result) {
        searchResult.value = result;
      } else {
        searchError.value = "City not found. Try another name.";
      }
    } catch (e) {
      searchError.value = "Error fetching city data.";
    } finally {
      isLoading.value = false;
    }
  };

  // Fetch weather for each city and store in savedCities as 'weather' property
  const getCities = async () => {
    const loaded = loadSavedCities();
    if (!loaded.length) {
      savedCities.value = [];
      return [];
    }
    // Fetch weather for each city
    const weatherDataList = await Promise.all(
      loaded.map((city: any) => fetchWeatherByLatLng(city.lat, city.lng))
    );
    console.log("weatherDataList", weatherDataList);
    // Attach weather data to each city
    savedCities.value = loaded.map((city: any, idx: number) => ({
      ...city,
      weather: weatherDataList[idx],
    }));
    updateSavedCities(savedCities.value);
  };

  const addCity = (city: any) => {
    saveCity(city);
    savedCities.value = loadSavedCities();
  };

  const deleteCity = (city: any) => {
    removeCity(city);
    savedCities.value = loadSavedCities();
  };

  const toggleDark = () => {
    isDark.value = !isDark.value;
    setTheme(isDark.value ? "dark" : "light");
  };

  const getTheme = () => {
    const saved = loadTheme();
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
    getCities,
    addCity,
    deleteCity,
    savedCities,
    result,
    error,
    loading,
  };
});

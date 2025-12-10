<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
import { useWeatherStore } from '../stores/weather';
import { storeToRefs } from 'pinia';
import router from '../router';
import {
  formatTime,
  formatDay,
  transformOneCallWeatherData,
} from '../utils/formatters';
import { fetchOneCallWeather } from '../api/weatherApi';
import { uid } from 'uid';

const weatherStore = useWeatherStore();
const { isDark } = storeToRefs(weatherStore);

interface WeatherCurrent {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  wind_speed: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
}

interface WeatherHourly {
  dt: number;
  temp: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  [key: string]: any; // for currentTime and other dynamic fields
}

interface WeatherDaily {
  dt: number;
  temp: {
    min: number;
    max: number;
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
}

interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: WeatherCurrent;
  hourly: WeatherHourly[];
  daily: WeatherDaily[];
  currentTime?: number;
}
// --- End Types ---

const route = useRoute();
const city = route.params.city as string;
const state = route.params.state as string;
const lat = route.query.lat as string;
const lng = route.query.lng as string;

const loading = ref(false);
const errorMsg = ref('');
const weatherData = ref<WeatherData | null>(null);
const currentTime = ref('');
async function getWeatherData() {
  try {
    loading.value = true;
    if (!lat || !lng) {
      errorMsg.value = 'Latitude and longitude are required.';
      return;
    }
    // Use the modular API utility to fetch One Call weather data
    let data = await fetchOneCallWeather(parseFloat(lat), parseFloat(lng));
    if (!data || !data.current) {
      errorMsg.value = 'Weather data not available.';
      return;
    }
    // Transform data for local use
    weatherData.value = transformOneCallWeatherData(data);
  } catch (error) {
    errorMsg.value = 'Error fetching weather data.';
    console.error('Error fetching weather data:', error);
  } finally {
    loading.value = false;
  }
}

const updateCurrentTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const handleAddWeather = () => {
  try {
    weatherStore.addCity({
      id: uid(),
      name: city,
      state: state || '',
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });
    console.log('city added', weatherStore.savedCities);
    router.push('/');
  } catch (e) {
    console.log(e);
  }
};

let intervalForTimeUpdate: any;

onMounted(async () => {
  await getWeatherData();
  updateCurrentTime();
  intervalForTimeUpdate = setInterval(updateCurrentTime, 60000);
});

onUnmounted(() => {
  clearInterval(intervalForTimeUpdate);
});
</script>

<template>
  <div
    class="flex flex-col items-center min-h-screen w-full px-2 sm:px-6 py-8 transition-colors duration-300"
    :style="{
      background: isDark
        ? 'linear-gradient(135deg, #0a0f1a 0%, #101a2b 60%, #0d1b24 100%)'
        : 'linear-gradient(135deg, #e0f7fa 0%, #bae6fd 60%, #bbf7d0 100%)',
    }"
  >
    <div class="w-full max-w-4xl mx-auto">
      <h1
        class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-center drop-shadow-lg"
        :style="{ color: isDark ? '#e0e7ef' : '#23272f' }"
      >
        <span :style="{ color: isDark ? '#67e8f9' : '#06b6d4' }">{{
          city
        }}</span
        ><span v-if="state">, {{ state }}</span>
      </h1>

      <p
        class="text-2xl sm:text-base mb-4 text-center font-medium transition-colors duration-200"
        :class="isDark ? 'text-sky-300' : 'text-sky-800'"
      >
        {{ currentTime }}
      </p>

      <div class="mb-6 text-center">
        <button
          class="cursor-pointer px-5 py-2 rounded-xl font-semibold shadow-md transition-colors duration-300 border border-transparent text-sm sm:text-base"
          :class="
            isDark
              ? 'bg-sky-800 hover:bg-sky-700 text-white'
              : 'bg-sky-200 hover:bg-sky-300 text-sky-900'
          "
          @click="handleAddWeather"
        >
          + Add Weather
        </button>
      </div>

      <div
        v-if="loading"
        class="flex justify-center items-center h-40 text-lg"
        :style="{ color: isDark ? '#67e8f9' : '#0891b2' }"
      >
        Loading weather data...
      </div>
      <div
        v-else-if="errorMsg"
        class="flex justify-center items-center h-40 text-lg"
        :style="{ color: '#ef4444' }"
      >
        {{ errorMsg }}
      </div>

      <div
        v-else-if="weatherData"
        class="w-full flex flex-col items-center"
      >
        <!-- Current Weather (centered and bigger) -->
        <div
          class="flex flex-col items-center justify-center w-full max-w-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-10 mb-8"
          :style="{
            color: isDark ? '#e0e7ef' : '#23272f',
            background: isDark ? 'rgb(17 27 44)' : 'rgba(255,255,255,0.95)',
          }"
        >
          <img
            :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`"
            :alt="weatherData.current.weather[0].description"
            class="w-36 h-36 mb-4"
          />
          <div
            class="text-6xl font-extrabold mb-2"
            :style="{ color: isDark ? '#bae6fd' : '#0e293b' }"
          >
            {{ Math.round(weatherData.current.temp) }}°C
          </div>
          <div
            class="capitalize text-2xl font-semibold mb-2"
            :style="{ color: isDark ? '#e0e7ef' : '#334155' }"
          >
            {{ weatherData.current.weather[0].description }}
          </div>
          <div
            class="text-lg mb-4"
            :style="{ color: isDark ? '#7dd3fc' : '#0e293b' }"
          >
            Feels like {{ Math.round(weatherData.current.feels_like) }}°C
          </div>
          <div
            class="grid grid-cols-2 gap-x-8 gap-y-2 text-lg w-full max-w-md mx-auto"
          >
            <div>
              <span class="font-semibold">Humidity: </span>
              <span> {{ weatherData.current.humidity }}%</span>
            </div>
            <div>
              <span class="font-semibold">Pressure: </span>
              <span> {{ weatherData.current.pressure }} hPa</span>
            </div>
            <div>
              <span class="font-semibold">Wind: </span>
              <span> {{ weatherData.current.wind_speed }} mph</span>
            </div>
            <div>
              <span class="font-semibold">Sunrise: </span>
              <span>
                {{
                  formatTime(
                    weatherData.current.sunrise,
                    weatherData.timezone_offset
                  )
                }}
              </span>
            </div>
            <div>
              <span class="font-semibold">Sunset: </span>
              <span>
                {{
                  formatTime(
                    weatherData.current.sunset,
                    weatherData.timezone_offset
                  )
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- Next 12 Hours (separate div, full width) -->
        <div
          class="w-full max-w-4xl mb-10 bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-6"
          :style="{
            background: isDark ? 'rgb(17 27 44)' : 'rgba(255,255,255,0.85)',
            color: isDark ? '#e0e7ef' : '#23272f',
          }"
        >
          <h2
            class="text-xl font-semibold mb-4 text-center"
            :style="{ color: isDark ? '#67e8f9' : '#0e7490' }"
          >
            Next 12 Hours
          </h2>
          <div class="hourlyContainer flex overflow-x-auto gap-4 pb-2">
            <div
              v-for="hour in weatherData.hourly.slice(0, 12)"
              :key="hour.dt"
              class="flex flex-col items-center min-w-[70px] rounded-xl p-2 shadow"
              :style="{
                background: isDark
                  ? 'rgba(30,41,59,0.7)'
                  : 'rgba(236,254,255,0.7)',
                color: isDark ? '#bae6fd' : '#0e293b',
              }"
            >
              <div class="text-xs mb-1 font-semibold">
                {{ formatTime(hour.dt, weatherData.timezone_offset) }}
              </div>
              <img
                :src="`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`"
                :alt="hour.weather[0].description"
                class="w-8 h-8"
              />
              <div class="font-semibold">{{ Math.round(hour.temp) }}°C</div>
              <div
                class="text-xs capitalize"
                :style="{ color: isDark ? '#7dd3fc' : '#334155' }"
              >
                {{ hour.weather[0].main }}
              </div>
            </div>
          </div>
        </div>

        <!-- 7 Day Forecast -->
        <div
          class="w-full max-w-4xl mx-auto mt-4 rounded-3xl shadow-2xl p-8"
          :style="{
            background: isDark ? 'rgb(17 27 44)' : 'rgba(255,255,255,0.85)',
            color: isDark ? '#e0e7ef' : '#23272f',
          }"
        >
          <h2
            class="text-xl font-semibold mb-4 text-center"
            :style="{ color: isDark ? '#67e8f9' : '#0e7490' }"
          >
            7 Day Forecast
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="day in weatherData.daily.slice(0, 7)"
              :key="day.dt"
              class="flex flex-col items-center rounded-xl p-4 shadow"
              :style="{
                background: isDark
                  ? 'rgba(30,41,59,0.7)'
                  : 'rgba(236,254,255,0.7)',
                color: isDark ? '#bae6fd' : '#0e293b',
              }"
            >
              <div class="font-semibold mb-1 text-base">
                {{ formatDay(day.dt, weatherData.timezone_offset) }}
              </div>
              <img
                :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
                :alt="day.weather[0].description"
                class="w-14 h-14 mb-1"
              />
              <div
                class="text-sm capitalize mb-1"
                :style="{ color: isDark ? '#7dd3fc' : '#334155' }"
              >
                {{ day.weather[0].description }}
              </div>
              <div class="flex gap-2 items-center">
                <span class="font-bold text-lg"
                  >{{ Math.round(day.temp.max) }}°C</span
                >
                <span
                  class="text-xs"
                  :style="{ color: isDark ? '#7dd3fc' : '#334155' }"
                  >/ {{ Math.round(day.temp.min) }}°C</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hourlyContainer {
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(107, 114, 128, 0.5);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
}
</style>

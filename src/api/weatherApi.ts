import axios from "axios";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export async function fetchWeatherByLatLng(lat: number, lng: number) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
}

export async function searchCityByQuery(query: string) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    query
  )}&key=${GOOGLE_API_KEY}`;
  const res = await axios.get(url);
  const data = res.data;
  if (data && data.results && data.results.length > 0) {
    const result = data.results[0];
    return {
      name: result.formatted_address,
      country:
        (
          result.address_components.find((c: any) =>
            c.types.includes("country")
          ) || {}
        ).long_name || "",
      full: result,
    };
  }
  return null;
}

export async function fetchOneCallWeather(lat: number, lng: number) {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=minutely,alerts&appid=${WEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
}

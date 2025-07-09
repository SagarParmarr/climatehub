export function loadSavedCities() {
  return JSON.parse(localStorage.getItem("savedCities") || "[]");
}

export function saveCity(city: any) {
  let saved = loadSavedCities();
  // Avoid duplicates by lat/lng
  if (saved.some((c: any) => c.lat === city.lat && c.lng === city.lng)) {
    throw new Error("City already exists in saved cities.");
  } else {
    console.log("city", city);
    saved.push(city);
    updateSavedCities(saved);
  }
}

export function updateSavedCities(cities: any) {
  localStorage.setItem("savedCities", JSON.stringify(cities));
}

export function removeCity(city: any) {
  let saved = loadSavedCities();
  saved = saved.filter((c: any) => c.id !== city.id);
  updateSavedCities(saved);
}

export function setTheme(theme: string) {
  localStorage.setItem("theme", theme);
}

export function getTheme() {
  return localStorage.getItem("theme");
}

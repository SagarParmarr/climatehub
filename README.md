# ClimateHub - Weather Application

## 📋 Project Overview

ClimateHub is a modern, responsive weather application built with **Vue 3**, **TypeScript**, and **Vite**. It provides real-time weather information for multiple cities, dark mode support, and an intuitive user interface powered by **Tailwind CSS**. The application leverages **Google Maps Geocoding API** for location searches and **OpenWeatherMap API** for weather data, enabling users to discover and track weather conditions across different regions worldwide.

## 🎯 Key Features

- **🔍 Advanced City Search**: Powered by Google Maps Geocoding API, allowing users to search and discover cities globally with formatted addresses and country information
- **🌤️ Real-Time Weather Data**: Integrates OpenWeatherMap API to fetch comprehensive weather information including temperature, conditions, and hourly/daily forecasts
- **📍 Multiple City Management**: Save and manage favorite cities for quick weather monitoring
- **🌙 Dark Mode Support**: Toggle between light and dark themes with persistent storage
- **📱 Responsive Design**: Fully responsive UI that works seamlessly on desktop, tablet, and mobile devices
- **⚡ Fast Performance**: Built with Vite for optimized development and production builds
- **🎨 Modern UI Components**: Custom components for city search, city list, and weather display with elegant Sun and Moon icons

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 (Composition API with `<script setup>`)
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 7.0
- **State Management**: Pinia
- **Styling**: Tailwind CSS 4.1
- **HTTP Client**: Axios
- **Routing**: Vue Router 4.5
- **External APIs**:
  - **Google Maps Geocoding API**: For location search and address geocoding
  - **OpenWeatherMap API**: For weather data and forecasts

## 📁 Project Structure

```
src/
├── api/
│   └── weatherApi.ts          # API calls for weather and location services
├── components/
│   ├── CitySearch.vue         # Search component for city lookup
│   ├── CityList.vue           # Display list of saved cities
│   ├── CityItem.vue           # Individual city weather card
│   ├── AsyncCityView.vue      # Async city view component
│   ├── NavBarWithTheme.vue    # Navigation with theme toggle
│   ├── SiteNavigation.vue     # Site navigation menu
│   └── *Icon.vue              # SVG icon components
├── layouts/
│   └── DefaultLayout.vue      # Default page layout
├── router/
│   ├── index.ts               # Router configuration
│   ├── home.route.ts          # Home page route
│   └── city.route.ts          # City detail route
├── stores/
│   └── weather.ts             # Pinia weather store with state management
├── utils/
│   ├── formatters.ts          # Data formatting utilities
│   └── localStorageUtils.ts   # Local storage management
├── views/
│   ├── Home.vue               # Home page with city search
│   └── CityView.vue           # Detailed weather view for selected city
├── App.vue                    # Root component
├── main.ts                    # Application entry point
└── router.ts                  # Router setup
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd climatehub
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file and add your API keys:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_GOOGLE_API_KEY=your_google_maps_api_key
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🗺️ Google Maps API Integration

ClimateHub extensively utilizes the **Google Maps Geocoding API** as a core feature for its location discovery system:

### Current Implementation

- **Geocoding for City Search**: Users can search for any city worldwide, and the API returns formatted addresses, country information, and precise latitude/longitude coordinates
- **Location Validation**: Ensures searched locations are valid and provides structured location data
- **Address Formatting**: Displays complete, formatted addresses for better user context

### How It Works

The `searchCityByQuery()` function in `src/api/weatherApi.ts` processes user search queries through the Google Maps Geocoding API, extracting:

- Formatted address
- Country information
- Geographic coordinates (latitude/longitude)
- Full location details for further processing

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
VITE_GOOGLE_API_KEY=your_google_maps_api_key_here
```

**Note**: Ensure your Google Maps API key has the following APIs enabled:

- Geocoding API
- Maps JavaScript API (for future map features)
- Places API (for future enhancements)

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Happy weather tracking! 🌍⛅**

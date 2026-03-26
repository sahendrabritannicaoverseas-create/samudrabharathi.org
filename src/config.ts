// API Configuration
// Change this URL to switch between different backend servers
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://admin.samudrabharathi.org/api';
export const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || 'https://admin.samudrabharathi.org/storage';

export const API_ENDPOINTS = {
  GALLERY: `${API_BASE_URL}/gallery`,
  VIDEOS: `${API_BASE_URL}/videos`,
  ACTIVITIES: `${API_BASE_URL}/activities`,
  ACTIVITY_CATEGORIES: `${API_BASE_URL}/activity-categories`,
  EVENTS: `${API_BASE_URL}/events`,
  EVENT_CATEGORIES: `${API_BASE_URL}/event-categories`,
  // Dynamic endpoint helpers
  ACTIVITY_DETAIL: (slug: string) => `${API_BASE_URL}/activity/${slug}`,
  EVENT_DETAIL: (slug: string) => `${API_BASE_URL}/event/${slug}`,
  ACTIVITIES_BY_CATEGORY: (id: number | string) => `${API_BASE_URL}/activities/${id}`,
  EVENTS_BY_CATEGORY: (id: number | string) => `${API_BASE_URL}/events/${id}`,
};

export const OPENWEATHER_CONFIG = {
  API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  COASTAL_LOCATIONS: [
    { name: 'Chennai Coast', lat: 13.0827, lon: 80.2707 },
    { name: 'Tuticorin Harbor', lat: 8.7492, lon: 78.1348 },
    { name: 'Ennore Port', lat: 13.2500, lon: 80.3333 },
    { name: 'Cuddalore Harbor', lat: 11.7500, lon: 79.7667 }
  ],
  REGIONAL_LOCATIONS: [
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { name: 'New Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Madurai', lat: 9.9252, lon: 78.1198 },
    { name: 'Coimbatore', lat: 11.0168, lon: 76.9558 }
  ]
};

export const WEATHERAPI_CONFIG = {
  API_KEY: import.meta.env.VITE_WEATHERAPI_KEY,
  BASE_URL: 'https://api.weatherapi.com/v1'
};

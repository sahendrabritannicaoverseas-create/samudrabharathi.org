import axios from 'axios';
import type { WeatherData, WeatherAlert } from '../types/weather';
import { OPENWEATHER_CONFIG, WEATHERAPI_CONFIG } from '../config';

const CACHE_KEY = 'weather_data_cache';
const COASTAL_CACHE_KEY = 'coastal_weather_cache';
const CACHE_TIMEOUT = 15 * 60 * 1000; // 15 minutes

/**
 * Professional Weather Service using OpenWeather and Open-Meteo.
 * Open-Meteo provides specialized marine data (waves) without API keys.
 */

export const fetchWeatherData = async (ignoreCache = false): Promise<WeatherData[]> => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached && !ignoreCache) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TIMEOUT) {
      return data;
    }
  }

  try {
    const regionalData: WeatherData[] = await Promise.all(
      OPENWEATHER_CONFIG.REGIONAL_LOCATIONS.map(async (loc, index) => {
        const [{ data: owData, forecast, isLive }, alerts] = await Promise.all([
          fetchOpenWeatherData(loc.lat, loc.lon),
          fetchWeatherAPIAlerts(loc.lat, loc.lon)
        ]);
        
        return {
          id: `regional-${index}`,
          district: loc.name,
          state: getState(loc.name),
          temperature: owData.temperature || 28,
          feelsLike: owData.feelsLike,
          windSpeed: owData.windSpeed || 10,
          humidity: owData.humidity || 65,
          pressure: owData.pressure,
          visibility: owData.visibility,
          condition: owData.condition || 'Clear',
          rainfall: owData.rainfall || 0,
          lastUpdated: new Date().toLocaleString(),
          isLive: isLive,
          isCoastal: false,
          forecast: forecast,
          alerts: alerts
        };
      })
    );

    localStorage.setItem(CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      data: regionalData
    }));

    return regionalData;
  } catch (error) {
    console.warn('Error fetching regional weather data:', error);
    if (cached) return JSON.parse(cached).data;
    return [];
  }
};

export const fetchOpenWeatherData = async (lat: number, lon: number): Promise<{ data: Partial<WeatherData>, forecast?: any[], isLive: boolean }> => {
  if (!OPENWEATHER_CONFIG.API_KEY || OPENWEATHER_CONFIG.API_KEY.includes('PLACEHOLDER')) {
    return {
      data: {
        temperature: 26 + Math.random() * 8,
        feelsLike: 28 + Math.random() * 8,
        windSpeed: 5 + Math.random() * 15,
        humidity: 50 + Math.random() * 30,
        pressure: 1008 + Math.random() * 10,
        visibility: 8 + Math.random() * 4,
        condition: getRandomCondition(),
        rainfall: Math.random() > 0.7 ? Math.random() * 5 : 0
      },
      forecast: generateMockForecast(),
      isLive: false
    };
  }

  try {
    const [weatherRes, forecastRes] = await Promise.all([
      axios.get(`${OPENWEATHER_CONFIG.BASE_URL}/weather`, {
        params: { lat, lon, appid: OPENWEATHER_CONFIG.API_KEY.trim(), units: 'metric' },
        timeout: 8000
      }),
      axios.get(`${OPENWEATHER_CONFIG.BASE_URL}/forecast`, {
        params: { lat, lon, appid: OPENWEATHER_CONFIG.API_KEY.trim(), units: 'metric' },
        timeout: 8000
      })
    ]);

    const data = weatherRes.data;
    const forecastList = forecastRes.data.list;
    
    // Filter to get one forecast per day (around noon)
    const dailyForecast = forecastList
      .filter((item: any) => item.dt_txt.includes('12:00:00'))
      .map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main
      }))
      .slice(0, 4);

    return {
      data: {
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        windSpeed: data.wind.speed * 3.6,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, // Convert to km
        condition: data.weather[0].main,
        rainfall: data.rain ? (data.rain['1h'] || data.rain['3h']) : 0
      },
      forecast: dailyForecast,
      isLive: true
    };
  } catch (error) {
    console.warn('Individual location fetch failed:', error);
    return { data: {}, isLive: false };
  }
};

/**
 * Fetches specialized marine data from Open-Meteo (No API key required)
 */
export const fetchMarineData = async (lat: number, lon: number): Promise<{ waveHeight: number }> => {
  try {
    const response = await axios.get('https://marine-api.open-meteo.com/v1/marine', {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'wave_height',
        timezone: 'auto'
      },
      timeout: 5000
    });
    return {
      waveHeight: response.data.current?.wave_height || 0
    };
  } catch (error) {
    console.warn('Marine data fetch failed (Open-Meteo):', error);
    return { waveHeight: 0 };
  }
};

/**
 * WeatherAPI Alerts Integration
 */
export const fetchWeatherAPIAlerts = async (lat: number, lon: number): Promise<WeatherAlert[]> => {
  if (!WEATHERAPI_CONFIG.API_KEY || WEATHERAPI_CONFIG.API_KEY.includes('PLACEHOLDER')) {
    // Generate mock alert for Coastal or specific regions
    if (lat < 14 && Math.random() > 0.7) {
      return [{
        event: "Coastal Flood Advisory",
        headline: "Significant coastal flooding expected",
        description: "Coastal districts are advised to monitor tide levels. High waves and surface inundation are expected during peak hours.",
        severity: "Moderate",
        urgency: "Expected",
        instruction: "Secure loose equipment at harbors. Avoid coastal roads during high tide."
      }];
    }
    return [];
  }

  try {
    const response = await axios.get(`${WEATHERAPI_CONFIG.BASE_URL}/forecast.json`, {
      params: {
        key: WEATHERAPI_CONFIG.API_KEY,
        q: `${lat},${lon}`,
        alerts: 'yes',
        days: 1
      },
      timeout: 5000
    });

    const alerts = response.data.alerts?.alert || [];
    return alerts.map((a: any) => ({
      event: a.event,
      headline: a.headline,
      description: a.desc, // WeatherAPI uses 'desc'
      severity: a.severity,
      urgency: a.urgency,
      instruction: a.instruction
    }));
  } catch (error) {
    console.warn('WeatherAPI alerts fetch failed:', error);
    return [];
  }
};

export const fetchCoastalWeather = async (ignoreCache = false): Promise<WeatherData[]> => {
  const cached = localStorage.getItem(COASTAL_CACHE_KEY);
  if (cached && !ignoreCache) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TIMEOUT) {
      return data;
    }
  }

  const coastalData: WeatherData[] = await Promise.all(
    OPENWEATHER_CONFIG.COASTAL_LOCATIONS.map(async (loc, index) => {
      // Parallel fetch for weather, marine, and alerts
      const [owResult, marineResult, alerts] = await Promise.all([
        fetchOpenWeatherData(loc.lat, loc.lon),
        fetchMarineData(loc.lat, loc.lon),
        fetchWeatherAPIAlerts(loc.lat, loc.lon)
      ]);

      return {
        id: `coastal-${index}`,
        district: loc.name,
        state: 'Tamil Nadu',
        temperature: owResult.data.temperature || 30,
        feelsLike: owResult.data.feelsLike,
        windSpeed: owResult.data.windSpeed || 15,
        humidity: owResult.data.humidity || 75,
        pressure: owResult.data.pressure,
        visibility: owResult.data.visibility,
        condition: owResult.data.condition || 'Cloudy',
        rainfall: owResult.data.rainfall || 0,
        waveHeight: marineResult.waveHeight,
        lastUpdated: new Date().toLocaleString(),
        isCoastal: true,
        isLive: owResult.isLive,
        forecast: owResult.forecast,
        alerts: alerts
      };
    })
  );

  localStorage.setItem(COASTAL_CACHE_KEY, JSON.stringify({
    timestamp: Date.now(),
    data: coastalData
  }));

  return coastalData;
};

export const fetchUserDistrict = async (lat: number, lon: number): Promise<string | null> => {
  try {
    const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    return response.data.locality || response.data.city || response.data.principalSubdivision;
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    return null;
  }
};

const getRandomCondition = () => {
  const conditions = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy', 'Thunderstorm', 'Mist'];
  return conditions[Math.floor(Math.random() * conditions.length)];
};

const getState = (city: string): string => {
  const mapping: Record<string, string> = {
    'Mumbai': 'Maharashtra', 'Bangalore': 'Karnataka', 'New Delhi': 'Delhi', 
    'Kolkata': 'West Bengal', 'Chennai': 'Tamil Nadu', 'Madurai': 'Tamil Nadu', 'Coimbatore': 'Tamil Nadu'
  };
  return mapping[city] || 'India';
};

const generateMockForecast = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  return Array(4).fill(0).map((_, i) => ({
    date: days[(today + i + 1) % 7],
    temp: 24 + Math.round(Math.random() * 10),
    condition: getRandomCondition()
  }));
};

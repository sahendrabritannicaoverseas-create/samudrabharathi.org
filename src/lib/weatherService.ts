import axios from 'axios';
import type { WeatherData, ApiResponse } from '../types/weather';

const API_KEY = import.meta.env.VITE_DATA_GOV_API_KEY || 'DEMO_KEY';
const RESOURCE_ID = import.meta.env.VITE_WEATHER_RESOURCE_ID || '3b013a30-81f1-43e3-a664-90ea6598509c';
const BASE_URL = 'https://api.data.gov.in/resource';

const CACHE_KEY = 'weather_data_cache';
const CACHE_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export const fetchWeatherData = async (limit = 50): Promise<WeatherData[]> => {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TIMEOUT) {
      return data;
    }
  }

  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/${RESOURCE_ID}`, {
      params: {
        'api-key': API_KEY,
        format: 'json',
        limit: limit,
      },
    });

    const mappedData: WeatherData[] = response.data.records.map((record, index) => ({
      id: `${record.district_name}-${index}`,
      state: record.state_name,
      district: record.district_name,
      rainfall: record.rainfall_mm ? parseFloat(record.rainfall_mm) : undefined,
      temperature: record.temp_max ? parseFloat(record.temp_max) : Math.floor(Math.random() * (35 - 20) + 20), // Mock if missing
      condition: record.weather_condition || getRandomCondition(),
      lastUpdated: new Date().toLocaleString(),
    }));

    // Save to cache
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      data: mappedData
    }));

    return mappedData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // If API fails and we have any cache (even expired), return it as fallback
    if (cached) {
      return JSON.parse(cached).data;
    }

    // Fallback Mock Data
    const mockData: WeatherData[] = [
      { id: 'm1', state: 'Maharashtra', district: 'Mumbai', rainfall: 12.5, temperature: 28, condition: 'Rainy', lastUpdated: new Date().toLocaleString() },
      { id: 'm2', state: 'Karnataka', district: 'Bangalore', rainfall: 5.2, temperature: 24, condition: 'Cloudy', lastUpdated: new Date().toLocaleString() },
      { id: 'm3', state: 'Delhi', district: 'New Delhi', rainfall: 0.0, temperature: 32, condition: 'Sunny', lastUpdated: new Date().toLocaleString() },
      { id: 'm4', state: 'Tamil Nadu', district: 'Chennai', rainfall: 2.1, temperature: 30, condition: 'Partly Cloudy', lastUpdated: new Date().toLocaleString() },
      { id: 'm5', state: 'West Bengal', district: 'Kolkata', rainfall: 8.4, temperature: 27, condition: 'Mist', lastUpdated: new Date().toLocaleString() },
    ];
    
    return mockData;
  }
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

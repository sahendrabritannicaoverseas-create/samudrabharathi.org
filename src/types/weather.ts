export interface WeatherData {
  state: string;
  district: string;
  city?: string;
  temperature?: number;
  rainfall?: number;
  condition: string;
  lastUpdated: string;
  id: string;
}

export interface ApiResponse {
  index_name: string;
  title: string;
  desc: string;
  created: number;
  updated: number;
  count: number;
  limit: string;
  offset: string;
  fields: Array<{ id: string; name: string; type: string }>;
  records: Array<{
    state_name: string;
    district_name: string;
    rainfall_mm?: string;
    temp_max?: string;
    temp_min?: string;
    weather_condition?: string;
    date?: string;
    [key: string]: any;
  }>;
}

export interface GeolocationState {
  lat: number | null;
  lon: number | null;
  error: string | null;
  loading: boolean;
}

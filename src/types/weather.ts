export interface ForecastDay {
  date: string;
  temp: number;
  condition: string;
}

export interface WeatherAlert {
  event: string;
  headline: string;
  description: string;
  severity: string;
  urgency: string;
  instruction?: string;
}

export interface WeatherData {
  id: string;
  district: string;
  state: string;
  temperature: number;
  feelsLike?: number;
  condition: string;
  humidity: number;
  pressure?: number;
  visibility?: number;
  windSpeed: number;
  lastUpdated: string;
  isCoastal: boolean;
  waveHeight?: number;
  rainfall?: number;
  isLive?: boolean;
  forecast?: ForecastDay[];
  alerts?: WeatherAlert[];
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

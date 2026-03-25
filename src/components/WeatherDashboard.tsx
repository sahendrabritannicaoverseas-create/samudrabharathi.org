import { useState, useEffect, useMemo } from 'react'
import type { WeatherData, GeolocationState } from '../types/weather'
import { fetchWeatherData, fetchUserDistrict } from '../lib/weatherService'
import { 
  Search, 
  RefreshCw, 
  AlertCircle, 
  MapPin, 
  Wind, 
  Droplets, 
  Thermometer,
  Cloud, 
  CloudRain, 
  Sun, 
  CloudLightning, 
  CloudFog 
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Helper for Tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- SkeletonCard Component ---
const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-2xl p-6 bg-slate-800/20 border border-slate-800/50 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-slate-700 rounded-lg"></div>
          <div className="h-4 w-24 bg-slate-800 rounded-lg"></div>
        </div>
        <div className="p-2 h-12 w-12 bg-slate-800 rounded-xl"></div>
      </div>

      <div className="flex items-end justify-between mt-8">
        <div className="space-y-2">
          <div className="h-10 w-20 bg-slate-700 rounded-lg"></div>
          <div className="h-4 w-16 bg-slate-800 rounded-lg"></div>
        </div>
        <div className="space-y-1">
          <div className="h-6 w-16 bg-slate-800 rounded-lg ml-auto"></div>
          <div className="h-3 w-12 bg-slate-900 rounded-lg ml-auto"></div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between items-center">
        <div className="h-3 w-24 bg-slate-900 rounded-lg"></div>
        <div className="h-3 w-12 bg-slate-800 rounded-lg"></div>
      </div>
    </div>
  );
};

// --- WeatherCard Component ---
interface WeatherCardProps {
  data: WeatherData;
  isUserLocation?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, isUserLocation }) => {
  const getIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('sun') || c.includes('clear')) return <Sun className="w-8 h-8 text-yellow-400" />;
    if (c.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (c.includes('thunder')) return <CloudLightning className="w-8 h-8 text-purple-400" />;
    if (c.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-400" />;
    if (c.includes('mist') || c.includes('fog')) return <CloudFog className="w-8 h-8 text-slate-300" />;
    return <Cloud className="w-8 h-8 text-gray-400" />;
  };

  return (
    <div className={cn(
      "relative overflow-hidden group rounded-2xl p-6 bg-slate-800/50 backdrop-blur-md border border-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-500/10",
      isUserLocation && "ring-2 ring-blue-500 bg-blue-900/20"
    )}>
      {isUserLocation && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider animate-pulse">
          Your Location
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
            {data.district}
          </h3>
          <p className="text-sm text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {data.state}
          </p>
        </div>
        <div className="p-2 rounded-xl bg-slate-900/50">
          {getIcon(data.condition)}
        </div>
      </div>

      <div className="flex items-end justify-between mt-6">
        <div>
          <span className="text-4xl font-extrabold text-white tracking-tighter">
            {data.temperature}°C
          </span>
          <p className="text-sm font-medium text-slate-400 mt-1 capitalize">
            {data.condition}
          </p>
        </div>
        
        {data.rainfall !== undefined && (
          <div className="text-right">
            <span className="text-lg font-semibold text-blue-400">
              {data.rainfall} <span className="text-xs text-slate-500">mm</span>
            </span>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Rainfall</p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center">
        <span className="text-[10px] text-slate-500 italic">
          Refreshed: {data.lastUpdated.split(',')[1]}
        </span>
        <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">
          Details →
        </button>
      </div>
    </div>
  );
};

// --- Main WeatherDashboard Component ---
export const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [geoState, setGeoState] = useState<GeolocationState>({
    lat: null,
    lon: null,
    error: null,
    loading: true
  })
  const [userDistrict, setUserDistrict] = useState<string | null>(null)

  const loadData = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true)
      const data = await fetchWeatherData()
      setWeatherData(data)
      setError(null)
    } catch (err: any) {
      setError(err.response?.status === 429 ? 'API Limit Exceeded. Please try again later.' : 'Failed to fetch weather data.')
    } finally {
      setLoading(false)
    }
  }

  // Initial load and auto-refresh
  useEffect(() => {
    loadData()
    const interval = setInterval(() => loadData(true), 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoState(prev => ({ ...prev, error: 'Geolocation not supported', loading: false }))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoState({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          error: null,
          loading: false
        })
      },
      (err) => {
        setGeoState(prev => ({ ...prev, error: err.message, loading: false }))
      }
    )
  }, [])

  // Reverse geocode to get district name when coordinates are available
  useEffect(() => {
    const getDistrict = async () => {
      if (geoState.lat && geoState.lon) {
        const district = await fetchUserDistrict(geoState.lat, geoState.lon);
        if (district) {
          setUserDistrict(district);
        }
      }
    }
    getDistrict();
  }, [geoState.lat, geoState.lon])

  const filteredData = useMemo(() => {
    return weatherData.filter(item => 
      item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.state.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [weatherData, searchTerm])

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            Live Weather Updates
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Regional <span className="text-blue-500">Weather</span>
          </h2>
          <div className="flex items-center gap-2 text-slate-400">
            <p className="font-medium">Real-time insights across Indian districts</p>
            {geoState.lat && (
              <span className="flex items-center gap-1 text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20">
                <MapPin className="w-2.5 h-2.5" /> GPS Active
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search state or district..."
              className="pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-white w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => loadData(true)}
            disabled={loading}
            className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {/* Quick Stats Banner */}
      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Avg Temp', value: '28°C', icon: <Thermometer className="w-4 h-4" /> },
            { label: 'Humidity', value: '64%', icon: <Droplets className="w-4 h-4" /> },
            { label: 'Wind Speed', value: '12km/h', icon: <Wind className="w-4 h-4" /> },
            { label: 'Districts', value: weatherData.length, icon: <MapPin className="w-4 h-4" /> },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col gap-1">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                {stat.icon} {stat.label}
              </span>
              <span className="text-xl font-bold text-white">{stat.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-8 rounded-3xl bg-red-500/10 border border-red-500/20 flex flex-col items-center text-center gap-4 my-12">
          <div className="p-4 rounded-full bg-red-500/20 text-red-500">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Something went wrong</h2>
            <p className="text-slate-400 mt-1 max-w-md">{error}</p>
          </div>
          <button 
            onClick={() => loadData()}
            className="mt-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : filteredData.length > 0 ? (
          filteredData.map(data => (
            <WeatherCard 
              key={data.id} 
              data={data} 
              isUserLocation={userDistrict ? data.district.toLowerCase() === userDistrict.toLowerCase() : false}
            />
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center text-center">
            <p className="text-xl font-medium text-slate-500">No districts match your search.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-500 font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

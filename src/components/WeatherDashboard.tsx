import { useState, useEffect, useMemo } from 'react'
import type { WeatherData, GeolocationState } from '../types/weather'
import { fetchWeatherData, fetchUserDistrict, fetchCoastalWeather } from '../lib/weatherService'
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
  CloudFog,
  Anchor,
  Navigation,
  X,
  Eye,
  Gauge,
  AlertTriangle
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
  onClick: (data: WeatherData) => void;
}

const AlertBadge: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black uppercase tracking-tighter animate-pulse shadow-lg shadow-red-500/40 border border-red-400/50">
    <AlertTriangle size={10} />
    {count} Active {count === 1 ? 'Alert' : 'Alerts'}
  </div>
);

const WeatherCard: React.FC<WeatherCardProps> = ({ data, isUserLocation, onClick }) => {
  const getIcon = (condition: string, size: string = "w-8 h-8") => {
    const c = condition.toLowerCase();
    if (c.includes('sun') || c.includes('clear')) return <Sun className={`${size} text-yellow-400`} />;
    if (c.includes('rain')) return <CloudRain className={`${size} text-blue-400`} />;
    if (c.includes('thunder')) return <CloudLightning className={`${size} text-purple-400`} />;
    if (c.includes('cloud')) return <Cloud className={`${size} text-gray-400`} />;
    if (c.includes('mist') || c.includes('fog')) return <CloudFog className={`${size} text-slate-300`} />;
    return <Cloud className={`${size} text-gray-400`} />;
  };

  return (
    <div 
      onClick={() => onClick(data)}
      className={cn(
        "relative overflow-hidden group rounded-2xl p-6 bg-slate-800/50 backdrop-blur-md border border-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-500/10 cursor-pointer",
        isUserLocation && "ring-2 ring-blue-500 bg-blue-900/20",
        data.isCoastal && "border-orange-500/30 bg-orange-950/10",
        data.alerts && data.alerts.length > 0 && "border-red-500/40 bg-red-950/5 ring-1 ring-red-500/20"
      )}
    >
      <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
        {isUserLocation && (
          <div className="bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse whitespace-nowrap">
            Your District
          </div>
        )}
        {data.alerts && data.alerts.length > 0 && <AlertBadge count={data.alerts.length} />}
      </div>
      {data.isCoastal && (
        <div className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
          <Anchor size={10} /> Maritime
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
            {data.temperature?.toFixed(1)}°C
          </span>
          <p className="text-sm font-medium text-slate-400 mt-1 capitalize">
            {data.condition}
          </p>
        </div>
        
        <div className="text-right space-y-2">
          {data.windSpeed !== undefined && (
            <div>
              <span className="text-sm font-bold text-orange-400 flex items-center justify-end gap-1">
                <Wind size={14} /> {data.windSpeed.toFixed(1)} <span className="text-[10px] text-slate-500">km/h</span>
              </span>
            </div>
          )}
          {data.humidity !== undefined && (
            <div>
              <span className="text-sm font-medium text-blue-300 flex items-center justify-end gap-1">
                <Droplets size={14} /> {data.humidity}%
              </span>
            </div>
          )}
          {data.isCoastal && data.waveHeight !== undefined && (
            <div>
              <span className="text-sm font-bold text-cyan-400 flex items-center justify-end gap-1">
                <Navigation size={14} className="rotate-[-45deg]" /> {data.waveHeight.toFixed(1)}m
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Forecast Strip */}
      {data.forecast && data.forecast.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">5-Day Outlook</p>
          <div className="grid grid-cols-4 gap-2">
            {data.forecast.map((f, i) => (
              <div key={i} className="flex flex-col items-center bg-slate-900/30 rounded-lg py-2 border border-slate-800/50">
                <span className="text-[10px] font-bold text-slate-400 mb-1">{f.date}</span>
                {getIcon(f.condition, "w-4 h-4")}
                <span className="text-xs font-bold text-white mt-1">{f.temp}°</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center opacity-60">
        <span className="text-[9px] text-slate-500 italic">
          Refreshed: {data.lastUpdated.split(',')[1]}
        </span>
        {data.rainfall !== undefined && data.rainfall > 0 && (
          <span className="text-[9px] font-bold text-blue-400 flex items-center gap-1">
            <CloudRain size={10} /> {data.rainfall}mm
          </span>
        )}
      </div>
    </div>
  );
};

// --- DetailModal Component ---
interface DetailModalProps {
  data: WeatherData | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  const getDetailIcon = (condition: string, size: string = "w-16 h-16") => {
    const c = condition.toLowerCase();
    if (c.includes('sun') || c.includes('clear')) return <Sun className={`${size} text-yellow-400`} />;
    if (c.includes('rain')) return <CloudRain className={`${size} text-blue-400`} />;
    if (c.includes('thunder')) return <CloudLightning className={`${size} text-purple-400`} />;
    if (c.includes('cloud')) return <Cloud className={`${size} text-gray-400`} />;
    if (c.includes('mist') || c.includes('fog')) return <CloudFog className={`${size} text-slate-300`} />;
    return <Cloud className={`${size} text-gray-400`} />;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900/95 border border-slate-700/50 rounded-[2.5rem] shadow-2xl animate-in zoom-in duration-300" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-blue-500/10 blur-[100px] pointer-events-none" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-all z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <span className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-3 block">
                Detailed Diagnostic Report
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                {data.district}
              </h2>
              <p className="text-slate-400 flex items-center gap-1.5 mt-2 font-medium">
                <MapPin className="w-4 h-4" /> {data.state}, India
              </p>
            </div>
            <div className="flex items-center gap-6 bg-slate-800/30 p-6 rounded-3xl border border-slate-700/30">
              {getDetailIcon(data.condition)}
              <div>
                <span className="text-5xl font-black text-white block leading-none">
                  {data.temperature.toFixed(1)}°
                </span>
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  {data.condition}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {[
              { label: 'Feels Like', value: `${data.feelsLike?.toFixed(1) || '--'}°C`, icon: <Thermometer className="text-orange-400 w-4 h-4" /> },
              { label: 'Humidity', value: `${data.humidity}%`, icon: <Droplets className="text-blue-400 w-4 h-4" /> },
              { label: 'Wind Speed', value: `${data.windSpeed.toFixed(1)} km/h`, icon: <Wind className="text-teal-400 w-4 h-4" /> },
              { label: 'Pressure', value: `${data.pressure || '--'} hPa`, icon: <Gauge className="text-purple-400 w-4 h-4" /> },
              { label: 'Visibility', value: `${data.visibility?.toFixed(1) || '--'} km`, icon: <Eye className="text-emerald-400 w-4 h-4" /> },
              ...(data.isCoastal ? [{ label: 'Wave Height', value: `${data.waveHeight?.toFixed(1)}m`, icon: <Navigation className="text-cyan-400 w-4 h-4 rotate-[-45deg]" /> }] : [])
            ].map((m, i) => (
              <div key={i} className="bg-slate-800/20 border border-slate-800/50 p-5 rounded-2xl flex flex-col gap-1">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
                  {m.icon} {m.label}
                </span>
                <span className="text-xl font-bold text-white">{m.value}</span>
              </div>
            ))}
          </div>

          {/* 5-Day Forecast */}
          {data.forecast && data.forecast.length > 0 && (
            <div className="mb-12">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
                <div className="w-6 h-px bg-blue-500" />
                4-Day Forecast
              </h4>
              <div className="grid grid-cols-5 gap-3">
                {data.forecast.map((f, i) => (
                  <div key={i} className="flex flex-col items-center bg-slate-800/30 border border-slate-700/30 rounded-2xl py-4 px-2 hover:border-blue-500/30 transition-all">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">{f.date}</span>
                    {getDetailIcon(f.condition, "w-6 h-6")}
                    <span className="text-lg font-black text-white mt-2">{f.temp}°</span>
                    <span className="text-[9px] text-slate-500 capitalize mt-1">{f.condition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Alerts Section */}
          {data.alerts && data.alerts.length > 0 && (
            <div className="mb-12 space-y-4">
              <h4 className="text-red-500 font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle size={18} /> Active Advisories ({data.alerts.length})
              </h4>
              <div className="space-y-3">
                {data.alerts.map((alert, i) => (
                  <div key={i} className="bg-red-500/5 border border-red-500/20 p-6 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                    <h5 className="text-white font-black text-lg mb-1">{alert.event}</h5>
                    <p className="text-red-400 font-bold text-xs uppercase tracking-wider mb-3">{alert.headline}</p>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{alert.description}</p>
                    {alert.instruction && (
                      <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
                        <span className="text-white font-bold text-[10px] uppercase tracking-widest block mb-2 opacity-50">Instruction:</span>
                        <p className="text-blue-400 text-sm italic font-medium">"{alert.instruction}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

// --- Main WeatherDashboard Component ---
export const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [coastalData, setCoastalData] = useState<WeatherData[]>([])
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
  const [selectedWeather, setSelectedWeather] = useState<WeatherData | null>(null)

  const loadAllWeather = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true)
      const [regular, coastal] = await Promise.all([
        fetchWeatherData(),
        fetchCoastalWeather(isRefresh)
      ]);
      setWeatherData(regular)
      setCoastalData(coastal)
      setError(null)
    } catch (err: any) {
      setError(err.response?.status === 429 ? 'API Limit Exceeded. Please try again later.' : 'Failed to fetch weather data.')
    } finally {
      setLoading(false)
    }
  }

  // Initial load and auto-refresh
  useEffect(() => {
    loadAllWeather()
    const interval = setInterval(() => loadAllWeather(true), 10 * 60 * 1000)
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

  const allAlerts = useMemo(() => {
    const alerts: { district: string, event: string }[] = [];
    [...weatherData, ...coastalData].forEach(d => {
      d.alerts?.forEach(a => {
        alerts.push({ district: d.district, event: a.event });
      });
    });
    return alerts;
  }, [weatherData, coastalData]);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      {/* Global Alert Banner */}
      {allAlerts.length > 0 && (
        <div className="mb-8 p-1 rounded-3xl bg-gradient-to-r from-red-600/20 via-orange-600/20 to-red-600/20 border border-red-500/30 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="px-6 py-4 rounded-[1.4rem] bg-slate-900/40 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500 animate-pulse">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-white font-black uppercase tracking-wider text-sm flex items-center gap-2">
                  Critical Safety Advisory
                  <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] animate-bounce">
                    Live
                  </span>
                </h3>
                <p className="text-slate-400 text-xs font-medium">
                  {allAlerts.length} active {allAlerts.length === 1 ? 'alert' : 'alerts'} detected across monitored districts.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {allAlerts.slice(0, 3).map((alert, i) => (
                <div key={i} className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-red-500" />
                  {alert.district}: {alert.event}
                </div>
              ))}
              {allAlerts.length > 3 && (
                <div className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  +{allAlerts.length - 3} More
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            Live Weather Updates
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Maritime & Regional <span className="text-blue-500">Weather</span>
          </h2>
          <div className="flex items-center gap-2 text-slate-400">
            <p className="font-medium">Critical insights for coastal and inland districts</p>
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
            onClick={() => loadAllWeather(true)}
            disabled={loading}
            className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {/* Coastal Section */}
      {!loading && !error && coastalData.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-600/20 rounded-lg text-orange-500">
              <Anchor size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Coastal Maritime Watch</h2>
              <p className="text-sm text-slate-400">High-precision data for safe maritime operations</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coastalData.map(data => (
              <WeatherCard 
                key={data.id} 
                data={data} 
                onClick={setSelectedWeather}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats Banner */}
      {!loading && !error && weatherData.length > 0 && (
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            Regional Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                label: 'Avg Temp', 
                value: `${Math.round(weatherData.reduce((acc, curr) => acc + (curr.temperature || 0), 0) / weatherData.length)}°C`, 
                icon: <Thermometer className="w-4 h-4 text-orange-400" /> 
              },
              { 
                label: 'Avg Humidity', 
                value: `${Math.round(weatherData.reduce((acc, curr) => acc + (curr.humidity || 0), 0) / weatherData.length)}%`, 
                icon: <Droplets className="w-4 h-4 text-blue-400" /> 
              },
              { 
                label: 'Avg Wind', 
                value: `${Math.round(weatherData.reduce((acc, curr) => acc + (curr.windSpeed || 0), 0) / weatherData.length)} km/h`, 
                icon: <Wind className="w-4 h-4 text-green-400" /> 
              },
              { 
                label: 'Districts', 
                value: weatherData.length, 
                icon: <MapPin className="w-4 h-4 text-red-400" /> 
              },
            ].map((stat, i) => (
              <div key={i} className="group p-5 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-slate-800/50 hover:border-blue-500/30 transition-all duration-500 flex flex-col gap-1 relative overflow-hidden shadow-lg hover:shadow-blue-500/5">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500" />
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  {stat.icon} {stat.label}
                </span>
                <span className="text-2xl font-black text-white">{stat.value}</span>
              </div>
            ))}
          </div>
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
            onClick={() => loadAllWeather()}
            className="mt-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Main Grid Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MapPin className="text-blue-500" /> Regional Districts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : filteredData.length > 0 ? (
            filteredData.map(data => (
              <WeatherCard 
                key={data.id} 
                data={data} 
                isUserLocation={userDistrict ? data.district.toLowerCase() === userDistrict.toLowerCase() : false}
                onClick={setSelectedWeather}
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

      <DetailModal 
        data={selectedWeather} 
        onClose={() => setSelectedWeather(null)} 
      />
    </div>
  )
}

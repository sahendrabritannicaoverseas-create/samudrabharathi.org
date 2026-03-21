import React from 'react';
import type { WeatherData } from '../types/weather';
import { Cloud, CloudRain, Sun, CloudLightning, CloudFog, MapPin } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WeatherCardProps {
  data: WeatherData;
  isUserLocation?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, isUserLocation }) => {
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

import React from 'react';

export const SkeletonCard: React.FC = () => {
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

import React, { useState } from 'react';
import { UK_SERVICES } from '../data/mockData';
import { ServiceCategory, UKServiceItem } from '../types';
import { ShieldCheck, Zap, Flame, Clock, Sparkles, AlertTriangle, ArrowRight, CheckCircle, Search } from 'lucide-react';

interface ServiceExplorerProps {
  onSelectService: (service: UKServiceItem) => void;
  onOpenAIDiagnostics: () => void;
}

export const ServiceExplorer: React.FC<ServiceExplorerProps> = ({
  onSelectService,
  onOpenAIDiagnostics,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = UK_SERVICES.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.ukStandard && item.ukStandard.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Hero & AI Diagnostic Launcher Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Background Sparkles / Flame Effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 px-3 py-1 rounded-full text-xs text-blue-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>UK Certified • NICEIC Electrical & Gas Safe Registered</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Enterprise UK Electrical & Gas Services on Demand
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Instant 30-minute emergency dispatch, certified landlord EICR/CP12 compliance, fuse board upgrades, and boiler servicing across London, Manchester, Birmingham & all UK regions.
          </p>

          {/* AI Diagnostic Prompt Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-3">
            <button
              onClick={onOpenAIDiagnostics}
              className="flex-1 p-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-xl shadow-amber-900/30 flex items-center justify-center gap-2.5 transition transform hover:scale-[1.01]"
            >
              <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
              <span>Diagnose Fault with AI (Photo / Description)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-emerald-400">18 Engineers Active</span>
              <span className="text-slate-500">near London W8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shadow-md">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs font-semibold">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-2 rounded-xl transition ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            All UK Services
          </button>
          <button
            onClick={() => setActiveCategory('electrical')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
              activeCategory === 'electrical'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Electrical
          </button>
          <button
            onClick={() => setActiveCategory('gas')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
              activeCategory === 'gas'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Gas & Heating
          </button>
          <button
            onClick={() => setActiveCategory('certification')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
              activeCategory === 'certification'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            Landlord Certs
          </button>
          <button
            onClick={() => setActiveCategory('emergency')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
              activeCategory === 'emergency'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            24/7 Emergency
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search EICR, boiler, EV..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 text-white shadow-lg hover:shadow-2xl transition duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Badge Row */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  {service.requiresGasSafe && (
                    <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                      Gas Safe
                    </span>
                  )}
                  {service.requiresNICEIC && (
                    <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded">
                      NICEIC
                    </span>
                  )}
                </div>

                {service.popularTag && (
                  <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {service.popularTag}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold group-hover:text-blue-300 transition mb-1.5">
                {service.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {service.shortDesc}
              </p>

              {/* Key Features List */}
              <div className="space-y-1.5 mb-4 border-t border-slate-800/80 pt-3">
                {service.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="border-t border-slate-800 pt-3 mt-2 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Starting From</p>
                <p className="text-lg font-black text-amber-400">
                  £{service.startingPrice} <span className="text-[10px] text-slate-400 font-normal">+20% VAT</span>
                </p>
              </div>

              <button
                onClick={() => onSelectService(service)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-1.5 group-hover:translate-x-0.5"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

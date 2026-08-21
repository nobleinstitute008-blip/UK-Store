import React, { useState } from 'react';
import { MOCK_ENGINEERS, INITIAL_BOOKINGS } from '../data/mockData';
import { LayoutDashboard, TrendingUp, Users, ShieldCheck, Flame, Zap, AlertTriangle, FileText, CheckCircle2, Search, DollarSign } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<'All UK' | 'London' | 'Manchester' | 'Birmingham' | 'Scotland'>('All UK');

  const totalGrossRevenue = 14250.00;
  const totalVAT = 2850.00; // 20% VAT
  const totalNetRevenue = 11400.00;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded uppercase">
              Operations Control
            </span>
            <span className="text-xs text-slate-400">VoltSure UK Admin Dashboard</span>
          </div>
          <h2 className="text-xl font-black text-white">UK Central Dispatch & Financial Operations</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time telemetry across Gas Safe & NICEIC certified engineers nationwide.</p>
        </div>

        {/* Region Filter */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          {(['All UK', 'London', 'Manchester', 'Birmingham', 'Scotland'] as const).map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedRegion === region
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Revenue */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Monthly Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">£{totalGrossRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Net: £{totalNetRevenue.toLocaleString('en-GB')}</span>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              +24% vs last month
            </span>
          </div>
        </div>

        {/* UK VAT Ledger */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>20% UK VAT Ledger</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-amber-400">£{totalVAT.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
          <p className="text-[11px] text-slate-400">HMRC Digital VAT Ready</p>
        </div>

        {/* Active Emergency Queue */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Emergencies</span>
            <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
          </div>
          <p className="text-2xl font-black text-red-400">4 Active</p>
          <p className="text-[11px] text-slate-400">Avg Response Time: <span className="text-white font-bold">14.2 Mins</span></p>
        </div>

        {/* Verified Engineers */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Certified Engineers</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-white">48 Active</p>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded font-bold">Gas Safe: 32</span>
            <span className="text-blue-300 bg-blue-500/20 px-1.5 py-0.5 rounded font-bold">NICEIC: 40</span>
          </div>
        </div>
      </div>

      {/* Dispatch Queue Table & Engineer Verification Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Dispatch Jobs Queue */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Live UK Dispatch Queue</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Auto-Dispatch Active</span>
          </div>

          <div className="space-y-3">
            {INITIAL_BOOKINGS.map((job) => (
              <div
                key={job.id}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-blue-400 font-bold">{job.id}</span>
                    <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                      {job.urgency}
                    </span>
                  </div>
                  <p className="font-bold text-white">{job.serviceTitle}</p>
                  <p className="text-slate-400 text-[11px]">{job.address}, {job.postcode}</p>
                </div>

                <div className="text-right">
                  <p className="font-black text-amber-400 text-sm">£{job.totalCost.toFixed(2)}</p>
                  <p className="text-[10px] text-emerald-400 font-semibold">{job.engineerName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registered Engineers Verification Audit */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Engineer Registry & Compliance Audit</span>
            </h3>
            <span className="text-xs text-emerald-400 font-bold">All DBS Cleared</span>
          </div>

          <div className="space-y-3">
            {MOCK_ENGINEERS.map((eng) => (
              <div
                key={eng.id}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <img src={eng.avatar} alt="" className="w-9 h-9 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-white">{eng.name}</p>
                    <p className="text-[11px] text-slate-400">{eng.roleTitle}</p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-2">
                  {eng.gasSafeNo && (
                    <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-500/30">
                      Gas Safe
                    </span>
                  )}
                  {eng.niceicNo && (
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-500/30">
                      NICEIC
                    </span>
                  )}
                  <span className="text-emerald-400 font-bold">✓ Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { MOCK_LANDLORD_PROPERTIES, MOCK_CERTIFICATES } from '../data/mockData';
import { LandlordProperty, DigitalCertificate } from '../types';
import { Building2, ShieldCheck, Flame, Calendar, AlertCircle, Plus, FileText, CheckCircle2, RefreshCw } from 'lucide-react';

interface LandlordHubProps {
  onAutoBookInspection: (property: LandlordProperty, certType: 'EICR' | 'CP12') => void;
  onViewCert: (cert: DigitalCertificate) => void;
}

export const LandlordHub: React.FC<LandlordHubProps> = ({
  onAutoBookInspection,
  onViewCert,
}) => {
  return (
    <div className="space-y-6">
      {/* Landlord Top Hero */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded uppercase">
              Landlord & Agent Hub
            </span>
            <span className="text-xs text-slate-400">UK Compliance Automation</span>
          </div>
          <h2 className="text-xl font-black text-white">Multi-Property Portfolio Compliance</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Track 5-Year EICR and annual Gas Safety CP12 certificates across all rental units. Automated tenant notifications & instant Gas Safe dispatch.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 uppercase">Managed Units</p>
            <p className="text-xl font-black text-blue-400">3 Properties</p>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 uppercase">Compliance Score</p>
            <p className="text-xl font-black text-emerald-400">100% Legal</p>
          </div>
        </div>
      </div>

      {/* Properties List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>Your Registered UK Properties</span>
          </h3>

          <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition">
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Property</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_LANDLORD_PROPERTIES.map((prop) => (
            <div
              key={prop.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-lg space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-white leading-tight">{prop.propertyName}</h4>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    {prop.postcode}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1 mb-3">{prop.address}</p>

                {/* Tenant Info */}
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] space-y-1 mb-3">
                  <span className="text-slate-500 uppercase font-semibold text-[9px] block">Tenant Contact:</span>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>{prop.tenantName}</span>
                    <span className="font-mono text-slate-400">{prop.tenantPhone}</span>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="space-y-2 text-xs">
                  {/* EICR */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">EICR (5-Yr)</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        prop.eicrStatus === 'valid'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : prop.eicrStatus === 'expiring_soon'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      Due {prop.eicrExpiryDate}
                    </span>
                  </div>

                  {/* Gas Safety CP12 */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span className="text-slate-300">Gas Safe CP12</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        prop.gasSafetyStatus === 'valid'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : prop.gasSafetyStatus === 'expiring_soon'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      Due {prop.gasSafetyExpiryDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => onAutoBookInspection(prop, 'CP12')}
                  className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-[11px] transition shadow-md"
                >
                  Auto-Book CP12 (£75)
                </button>
                <button
                  onClick={() => onViewCert(MOCK_CERTIFICATES[0])}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[11px] font-bold transition"
                  title="View Certificates"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ShieldCheck, Zap, Flame, PhoneCall, Smartphone, Monitor, UserCheck, Wrench, LayoutDashboard } from 'lucide-react';
import { AppRole, ViewMode } from '../types';

interface NavbarProps {
  currentRole: AppRole;
  onRoleChange: (role: AppRole) => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onOpenEmergencyModal: () => void;
  onOpenAIChat: () => void;
  activeBookingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  viewMode,
  onToggleViewMode,
  onOpenEmergencyModal,
  onOpenAIChat,
  activeBookingCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-slate-800">
      {/* UK Compliance Notification Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-amber-600 px-4 py-1 text-xs text-center text-white font-medium flex items-center justify-center gap-2 flex-wrap">
        <span className="flex items-center gap-1 bg-blue-900/40 px-2 py-0.5 rounded border border-blue-400/30">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
          NICEIC Approved Electricians
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-1 bg-amber-900/40 px-2 py-0.5 rounded border border-amber-400/30">
          <Flame className="w-3.5 h-3.5 text-amber-300" />
          Gas Safe Register Verified (#589210)
        </span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline-flex items-center gap-1 text-blue-100">
          🇬🇧 24/7 Emergency Dispatch Across England, Scotland, Wales & NI
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onRoleChange('customer')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <Zap className="w-5 h-5 text-amber-400 absolute left-1.5 top-2" />
              <Flame className="w-4 h-4 text-blue-400 absolute right-1.5 bottom-2" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-blue-200">
                VoltSure
              </span>
              <span className="text-xs px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded font-semibold">
                UK
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Certified Electrical & Gas Services</p>
          </div>
        </div>

        {/* Role Switcher Tabs */}
        <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 text-xs font-medium">
          <button
            onClick={() => onRoleChange('customer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentRole === 'customer'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customer App</span>
            <span className="sm:hidden">App</span>
            {activeBookingCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => onRoleChange('engineer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentRole === 'engineer'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Engineer App</span>
            <span className="sm:hidden">Engineer</span>
          </button>

          <button
            onClick={() => onRoleChange('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentRole === 'admin'
                ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin Ops</span>
            <span className="sm:hidden">Admin</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* AI VoltBot Chat Button */}
          <button
            onClick={onOpenAIChat}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition"
            title="Ask VoltBot AI Advisor"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="hidden md:inline">VoltBot AI</span>
          </button>

          {/* Toggle Mobile Phone Frame */}
          <button
            onClick={onToggleViewMode}
            className={`p-2 rounded-lg border text-xs transition flex items-center gap-1 ${
              viewMode === 'mobile_frame'
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={viewMode === 'mobile_frame' ? 'Switch to Full Desktop View' : 'Simulate UK Mobile Phone App Frame'}
          >
            {viewMode === 'mobile_frame' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            <span className="hidden lg:inline">{viewMode === 'mobile_frame' ? 'Full Window' : 'Phone Preview'}</span>
          </button>

          {/* 24/7 Emergency Button */}
          <button
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-md shadow-red-900/30 transition transform hover:scale-[1.02]"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
            <span>0800 999 VOLT</span>
          </button>
        </div>
      </div>
    </header>
  );
};

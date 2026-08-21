import React, { useState } from 'react';
import { MOCK_ENGINEERS, INITIAL_BOOKINGS } from '../data/mockData';
import { Booking, Engineer } from '../types';
import { Wrench, Navigation, CheckCircle, ShieldCheck, Flame, Phone, DollarSign, Camera, FileCheck, Power, AlertCircle } from 'lucide-react';

interface EngineerPortalProps {
  onIssueCertificate: (bookingId: string) => void;
}

export const EngineerPortal: React.FC<EngineerPortalProps> = ({ onIssueCertificate }) => {
  const [engineer, setEngineer] = useState<Engineer>(MOCK_ENGINEERS[0]); // David Miller
  const [isOnline, setIsOnline] = useState(true);
  const [activeJob, setActiveJob] = useState<Booking>(INITIAL_BOOKINGS[0]);
  const [jobCompleted, setJobCompleted] = useState(false);
  const [proofPhoto, setProofPhoto] = useState<string | null>(null);
  const [signatureDone, setSignatureDone] = useState(false);

  const handleSimulatePhoto = () => {
    // Sample consumer unit completed job image
    setProofPhoto('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80');
  };

  const handleCompleteJob = () => {
    setJobCompleted(true);
    onIssueCertificate(activeJob.id);
  };

  return (
    <div className="space-y-6">
      {/* Engineer Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={engineer.avatar}
            alt={engineer.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-black text-white">{engineer.name}</h2>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                Gas Safe #{engineer.gasSafeNo}
              </span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded font-bold">
                NICEIC #{engineer.niceicNo}
              </span>
            </div>
            <p className="text-xs text-slate-400">{engineer.roleTitle} • Van: {engineer.vanReg}</p>
          </div>
        </div>

        {/* Online Emergency Dispatch Switch & Daily Earnings */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-right">
            <p className="text-[10px] text-slate-400 uppercase">Today's Earnings</p>
            <p className="text-lg font-black text-emerald-400">£340.00 <span className="text-[10px] text-slate-400 font-normal">(4 jobs)</span></p>
          </div>

          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg transition ${
              isOnline
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isOnline ? 'Online for Dispatch' : 'Offline'}</span>
          </button>
        </div>
      </div>

      {/* Active Dispatched Job Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <h3 className="text-base font-bold text-white">Active Dispatch Alert</h3>
            <span className="text-xs bg-red-500/20 text-red-300 px-2.5 py-0.5 rounded border border-red-500/30 font-bold">
              EMERGENCY 30-MIN
            </span>
          </div>

          <span className="text-xs font-mono text-slate-400">Dispatch ID: {activeJob.id}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Details Card */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Customer & Address</p>
              <p className="text-sm font-bold text-white">{activeJob.customerName}</p>
              <p className="text-xs text-slate-300 font-mono">{activeJob.address}, {activeJob.postcode}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Reported Issue / AI Fault Analysis</p>
              <p className="text-xs text-amber-300 font-medium mt-0.5">
                {activeJob.faultDiagnosis ? activeJob.faultDiagnosis.issueTitle : activeJob.serviceTitle}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{activeJob.notes}</p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeJob.postcode)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Navigation className="w-4 h-4" />
                <span>Open Turn-by-Turn GPS</span>
              </a>

              <a
                href={`tel:${activeJob.phone}`}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call Customer</span>
              </a>
            </div>
          </div>

          {/* Inspection Sign-Off & Certificate Issuance Console */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Digital Sign-Off & UK Compliance Certificate</span>
            </h4>

            {/* Photo Upload Simulation */}
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Completion Photo Proof</label>
              {!proofPhoto ? (
                <button
                  onClick={handleSimulatePhoto}
                  className="w-full py-3 border-2 border-dashed border-slate-800 hover:border-blue-500 rounded-xl bg-slate-900 text-xs text-slate-300 flex items-center justify-center gap-2 transition"
                >
                  <Camera className="w-4 h-4 text-blue-400" />
                  <span>Capture Photo of Installed Unit / Test Readings</span>
                </button>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-emerald-500/50 h-24">
                  <img src={proofPhoto} alt="Work proof" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-emerald-950/90 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold border border-emerald-500/40">
                    ✓ Photo Verified
                  </span>
                </div>
              )}
            </div>

            {/* Customer Digital Signature Simulation */}
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Customer On-Site Signature</label>
              <button
                onClick={() => setSignatureDone(true)}
                className={`w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                  signatureDone
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{signatureDone ? '✓ Customer Signature Saved (E. Vance)' : 'Tap to Obtain Customer Signature'}</span>
              </button>
            </div>

            {/* Final Issue Certificate Button */}
            <button
              onClick={handleCompleteJob}
              disabled={jobCompleted}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-200" />
              <span>{jobCompleted ? '✓ Certificate Issued & Job Closed' : 'Issue Official UK EICR Certificate (£114.00)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

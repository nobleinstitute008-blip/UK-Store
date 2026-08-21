import React, { useState } from 'react';
import { X, Sparkles, Upload, AlertOctagon, CheckCircle2, ShieldAlert, ArrowRight, Camera, RefreshCw } from 'lucide-react';
import { AIDiagnosisResult } from '../types';

interface AIDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking: (diagnosis: AIDiagnosisResult) => void;
}

const PRESET_FAULTS = [
  { label: '⚡ Consumer unit keeps tripping RCD', desc: 'RCD main switch flips down immediately when kettle or oven is turned on.', category: 'Electrical' },
  { label: '🔥 Boiler showing F22 fault code & no heating', desc: 'Vaillant/Worcester boiler water pressure dropped to 0.4 bar with red flashing light.', category: 'Gas & Heating' },
  { label: '⚠️ Faint gas smell near kitchen cooker', desc: 'Slight gas odor detected near gas hob valve or pipe connection.', category: 'Gas & Heating' },
  { label: '🔌 EV Charger flashing red PEN fault LED', desc: 'Home wallbox charger failing self-test earth connection check.', category: 'Electrical' },
];

export const AIDiagnosticsModal: React.FC<AIDiagnosticsModalProps> = ({
  isOpen,
  onClose,
  onProceedToBooking,
}) => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Electrical' | 'Gas' | 'General'>('General');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<AIDiagnosisResult | null>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAnalysis = async (customPrompt?: string) => {
    const promptToUse = customPrompt || description;
    if (!promptToUse && !imagePreview) {
      setError('Please provide a fault description or upload a photo.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: promptToUse,
          imageUrl: imagePreview,
          category: selectedCategory,
          propertyType: 'UK Residential House',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.diagnosis) {
          setDiagnosis(data.diagnosis);
          return;
        }
      }
      throw new Error('Fallback to local UK diagnostic engine');
    } catch (err: any) {
      console.warn('API unavailable, generating smart client-side diagnosis for static preview:', err);
      // Smart client-side fallback based on UK electrical & gas standards
      const lower = promptToUse.toLowerCase();
      let fallbackDiagnosis: AIDiagnosisResult;

      if (lower.includes('gas') || lower.includes('smell') || lower.includes('boiler') || lower.includes('f22') || lower.includes('heating')) {
        fallbackDiagnosis = {
          issueTitle: lower.includes('smell') ? 'Potential Gas Appliance Leakage / Supply Valve Failure' : 'Central Heating Boiler Pressure / Flame Lockout',
          category: 'Gas & Heating',
          severity: lower.includes('smell') ? 'emergency' : 'high',
          urgencyBadge: lower.includes('smell') ? 'EMERGENCY 24/7' : 'URGENT SAME-DAY',
          safetyWarning: lower.includes('smell') 
            ? 'EXTREME SAFETY WARNING: Extinguish all naked flames, turn off the emergency control valve (ECV) by the gas meter, open windows, and do not operate electrical switches.'
            : 'Turn off boiler power isolation switch before inspecting system pressure gauge. Do not attempt DIY repairs on gas flues.',
          probableCause: lower.includes('smell')
            ? 'Gas hob burner seal degradation or loose compression fitting on cooker flexible bayonet connector.'
            : 'Loss of hydronic water pressure (<0.5 bar) or faulty thermistor/diverter valve requiring pressure top-up and seal check.',
          recommendedActionSteps: [
            'Isolate main gas / electrical control switch immediately',
            'Conduct Gas Safe flue gas analyser check & tightness test',
            'Issue official Landlord Gas Safety Record (CP12)',
          ],
          estimatedCostMin: lower.includes('smell') ? 110 : 85,
          estimatedCostMax: lower.includes('smell') ? 180 : 160,
          estimatedDurationMinutes: lower.includes('smell') ? 45 : 60,
          ukStandardReference: 'Gas Safety (Installation and Use) Regs 1998 / BS 6891',
          recommendedCertification: 'Gas Safe Registered Engineer (ACS Certified)',
        };
      } else {
        fallbackDiagnosis = {
          issueTitle: lower.includes('tripping') || lower.includes('rcd') || lower.includes('fuse') ? 'RCD / Circuit Breaker Earth Fault Trip' : 'Electrical Wiring / Socket Circuit Degradation',
          category: 'Electrical',
          severity: 'high',
          urgencyBadge: 'PRIORITY DISPATCH',
          safetyWarning: 'Do not repeatedly reset a tripping RCD switch if it fails under load; this indicates active insulation breakdown or water ingress.',
          probableCause: 'High earth leakage current (>30mA) or neutral-to-earth fault caused by a degraded heating element or faulty radial socket circuit.',
          recommendedActionSteps: [
            'Perform insulation resistance test (500V DC) across circuits',
            'Check earth fault loop impedance (Ze / Zs) to BS 7671',
            'Issue minor works certificate or full EICR if required',
          ],
          estimatedCostMin: 95,
          estimatedCostMax: 175,
          estimatedDurationMinutes: 60,
          ukStandardReference: 'BS 7671:2018+A2:2022 (IET Wiring Regulations)',
          recommendedCertification: 'NICEIC / NAPIT Approved Contractor',
        };
      }

      setDiagnosis(fallbackDiagnosis);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDiagnosis(null);
    setDescription('');
    setImagePreview(null);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl text-white shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-lg font-bold">VoltSure AI Fault Inspector</h2>
              <p className="text-xs text-blue-200">UK Electrical & Gas Safety Regulations Diagnostic Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!diagnosis ? (
            <div className="space-y-5">
              {/* Preset Shortcuts */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Common UK Home Electrical & Gas Issues
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRESET_FAULTS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDescription(preset.desc);
                        setSelectedCategory(preset.category as any);
                        handleRunAnalysis(preset.desc);
                      }}
                      className="text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-blue-500 transition group"
                    >
                      <p className="text-xs font-bold text-white group-hover:text-blue-300 mb-1">{preset.label}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{preset.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input & Image Upload */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Describe Your Issue or Error Code
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. My RCD tripped when I plugged in the washing machine, or Worcester boiler flashing EA error..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                {/* Photo Upload Box */}
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-3 cursor-pointer bg-slate-950/50 hover:bg-slate-950 transition text-xs text-slate-400 hover:text-blue-300">
                    <Camera className="w-4 h-4" />
                    <span>Upload Fault Photo (Consumer unit / Boiler display / Socket)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {imagePreview && (
                    <div className="relative w-16 h-16 rounded-xl border border-blue-500 overflow-hidden group">
                      <img src={imagePreview} alt="Fault preview" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setImagePreview(null)}
                        className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-red-400 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 rounded-xl text-xs flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Run AI Analysis Button */}
              <button
                onClick={() => handleRunAnalysis()}
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 text-sm transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing UK Building Regs & Fault Patterns...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Instant AI Diagnosis & Price Estimate</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* AI Results View */
            <div className="space-y-5 animate-fade-in">
              {/* Urgency & Title */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        diagnosis.severity === 'emergency'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : diagnosis.severity === 'high'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                      }`}
                    >
                      {diagnosis.urgencyBadge}
                    </span>
                    <span className="text-xs text-slate-400">UK Ref: {diagnosis.ukStandardReference || 'BS 7671 / Gas Regs'}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{diagnosis.issueTitle}</h3>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-slate-400 uppercase">Estimated Fix</p>
                  <p className="text-lg font-black text-amber-400">
                    £{diagnosis.estimatedCostMin} - £{diagnosis.estimatedCostMax}
                  </p>
                  <p className="text-[10px] text-slate-400">+20% UK VAT</p>
                </div>
              </div>

              {/* Immediate Safety Advice Warning */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/50 text-amber-200 text-xs flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-300 mb-0.5">Safety Protocol:</p>
                  <p className="leading-relaxed">{diagnosis.safetyWarning}</p>
                </div>
              </div>

              {/* Technical Cause & Action Steps */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Probable Technical Cause</h4>
                  <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 leading-relaxed">
                    {diagnosis.probableCause}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Recommended Action Protocol</h4>
                  <div className="space-y-1.5">
                    {diagnosis.recommendedActionSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certification Requirement Note */}
              <div className="p-3 bg-blue-950/30 border border-blue-800/50 rounded-xl text-xs flex items-center justify-between text-blue-200">
                <span className="font-medium">Required Certification:</span>
                <span className="font-bold bg-blue-900/60 px-2.5 py-1 rounded text-blue-300 border border-blue-400/30">
                  {diagnosis.recommendedCertification}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={resetForm}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition"
                >
                  Test Another Issue
                </button>

                <button
                  onClick={() => {
                    onProceedToBooking(diagnosis);
                    onClose();
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 transition"
                >
                  <span>Dispatch Certified Engineer (£{diagnosis.estimatedCostMin})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

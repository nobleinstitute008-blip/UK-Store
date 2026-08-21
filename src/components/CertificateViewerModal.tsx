import React from 'react';
import { X, ShieldCheck, Flame, Download, CheckCircle, FileText, Printer } from 'lucide-react';
import { DigitalCertificate } from '../types';

interface CertificateViewerModalProps {
  certificate: DigitalCertificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  certificate,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !certificate) return null;

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl text-white shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {certificate.certType === 'CP12_GAS_SAFETY' ? (
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                <Flame className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
            )}
            <div>
              <h2 className="text-base font-bold text-white">
                Official UK Compliance Certificate ({certificate.certType})
              </h2>
              <p className="text-xs text-slate-400">Ref: {certificate.certNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintDownload}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Document Body */}
        <div className="p-6 bg-slate-950 text-slate-200 text-xs space-y-5 font-sans border-b border-slate-800">
          {/* Top Registry Header */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">United Kingdom Registry</span>
              <h3 className="text-lg font-black text-white">
                {certificate.certType === 'EICR'
                  ? 'Electrical Installation Condition Report'
                  : 'Landlord Gas Safety Inspection (CP12)'}
              </h3>
              <p className="text-xs text-slate-400">Issued under Building Regulations & Health and Safety at Work Act</p>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-black">
                {certificate.overallResult}
              </span>
            </div>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Property Address</p>
              <p className="font-bold text-white">{certificate.propertyAddress}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Issue Date</p>
              <p className="font-bold text-white">{certificate.issueDate}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Next Inspection Due</p>
              <p className="font-bold text-amber-400">{certificate.expiryDate}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Registered Inspector</p>
              <p className="font-bold text-white">{certificate.inspectorName}</p>
              <p className="text-[10px] text-slate-400">
                {certificate.gasSafeNo ? `Gas Safe #${certificate.gasSafeNo}` : `NICEIC #${certificate.niceicNo}`}
              </p>
            </div>
          </div>

          {/* Inspection Items Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Safety Inspection Line Items</h4>
            <div className="space-y-1.5">
              {certificate.summaryItems.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">{item.item}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.result === 'PASS'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : item.result.includes('ADVISORY')
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {item.result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Signature Block */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Inspector Digital Stamp</p>
              <p className="font-serif italic text-blue-400 text-sm font-bold mt-1">
                {certificate.engineerSignature}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Verification QR Token</span>
              <span className="font-mono text-[10px] text-slate-300">VK-CERT-88192-GB</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};

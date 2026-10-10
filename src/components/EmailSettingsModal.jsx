import React, { useState } from 'react';
import { Mail, Key, Check, Send, ExternalLink, X, AlertCircle } from 'lucide-react';
import { getEmailConfig, saveEmailConfig, sendOrderToGmail } from '../services/emailService';

export default function EmailSettingsModal({ isOpen, onClose }) {
  const [config, setConfig] = useState(getEmailConfig());
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    saveEmailConfig(config.targetEmail, config.web3FormsKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSendTestEmail = async () => {
    setTesting(true);
    setTestResult(null);

    const sampleOrder = {
      id: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
      customerName: 'Muhammad Hamza (Test Customer)',
      customerPhone: '0312-3456789',
      customerAddress: 'Saylani Mass IT Training, ASF Campus, Airport Road, Karachi',
      notes: 'Please add extra raita and mint chutney. Test order for SMIT Hackathon submission screenshot.',
      items: [
        { id: 'dish-1', name: 'Special Sindhi Dum Biryani', price: 550, quantity: 2 },
        { id: 'dish-4', name: 'Charcoal Seekh Kabab Platter', price: 750, quantity: 1 },
      ],
      itemsSummary: 'Special Sindhi Dum Biryani (x2), Charcoal Seekh Kabab Platter (x1)',
      total: 1850,
      status: 'Pending',
    };

    saveEmailConfig(config.targetEmail, config.web3FormsKey);
    const result = await sendOrderToGmail(sampleOrder);
    setTesting(false);
    setTestResult(result);

    if (result.method === 'gmail_direct' && result.gmailUrl) {
      window.open(result.gmailUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-750 max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-800 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-100">Gmail Order Configuration</h3>
              <p className="text-xs text-slate-400">SMIT Hackathon Requirement #3: Order goes to your Gmail</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 text-xs text-amber-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong>Submission Requirement:</strong> You need a screenshot of the order arriving in your Gmail. Set your Gmail below so incoming orders reach your personal inbox!
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Your Personal Gmail Address (Where orders will be sent) <span className="text-orange-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={config.targetEmail}
                  onChange={(e) => setConfig({ ...config, targetEmail: e.target.value })}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Web3Forms Access Key (Optional - for instant background delivery)
                </label>
                <a
                  href="https://web3forms.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  Get free key in 5s <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={config.web3FormsKey}
                  onChange={(e) => setConfig({ ...config, web3FormsKey: e.target.value })}
                  placeholder="Paste your Web3Forms Access Key here"
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-orange-500 transition"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Tip: If left blank, the app will automatically generate a direct 1-click Gmail composer with the full order preloaded!
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition"
              >
                {saved ? <Check className="w-4 h-4 text-emerald-400" /> : null}
                {saved ? 'Saved Successfully!' : 'Save Email Config'}
              </button>

              <button
                type="button"
                onClick={handleSendTestEmail}
                disabled={testing}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-lg shadow-orange-500/20 transition disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {testing ? 'Sending Test...' : 'Send Test Order to My Gmail'}
              </button>
            </div>
          </form>

          {testResult && (
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> {testResult.message}
              </p>
              {testResult.method === 'gmail_direct' && (
                <p className="text-slate-400 text-[11px]">
                  Gmail composer was triggered in a new tab. Check your Gmail window to click Send and take your screenshot!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


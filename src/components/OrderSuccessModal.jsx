import React, { useState } from 'react';
import { 
  CheckCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  Clock, 
  Phone, 
  MapPin, 
  User, 
  Mail,
  UtensilsCrossed
} from 'lucide-react';
import { formatOrderPlainText, getGmailComposeUrl, RECIPIENT_EMAIL } from '../services/emailService';

export default function OrderSuccessModal({ order, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  if (!isOpen || !order) return null;

  const gmailUrl = getGmailComposeUrl(order);
  const plainTextSummary = formatOrderPlainText(order);

  const copySummary = () => {
    navigator.clipboard.writeText(plainTextSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-750 max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 text-center relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-black tracking-tight">Order Placed Successfully!</h3>
          <p className="text-xs text-emerald-100 mt-1">
            Thank you, <strong>{order.customerName}</strong>! Your order has been received and forwarded to our kitchen.
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Dual Status Indicator Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-emerald-400">Kitchen Status</p>
                <p className="text-[11px] text-slate-400">
                  Status: <span className="text-amber-400 font-semibold font-mono">Pending (In Queue)</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-orange-500/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-orange-400">Estimated Delivery</p>
                <p className="text-[11px] text-slate-400">
                  30 - 40 Minutes (Cash on Delivery)
                </p>
              </div>
            </div>
          </div>

          {/* Customer & Order Details Breakdown */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-bold text-white text-sm">Order Receipt</span>
              <span className="text-[11px] text-slate-400 font-mono">
                Order Ref: #{order.id ? String(order.id).slice(0, 8) : 'NEW'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Customer: <strong>{order.customerName}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>Phone: <strong>{order.customerPhone}</strong></span>
              </div>
              <div className="flex items-start gap-2 sm:col-span-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>Address: <strong>{order.customerAddress}</strong></span>
              </div>
            </div>

            {/* Dishes Breakdown Table */}
            <div className="border-t border-slate-800 pt-3 space-y-2">
              <p className="font-semibold text-slate-400 text-[11px]">Items Ordered:</p>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 px-2 rounded bg-slate-900 text-xs">
                    <span className="text-white">
                      {item.name} <span className="text-orange-400 font-bold font-mono">× {item.quantity}</span>
                    </span>
                    <span className="font-mono text-amber-300 font-semibold">
                      Rs. {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-sm font-bold">
              <span className="text-slate-300">Total Payable (COD):</span>
              <span className="text-amber-400 font-extrabold text-base font-mono">
                Rs. {order.total.toLocaleString()} PKR
              </span>
            </div>
          </div>

          {/* Quick link to Gmail for testing/submission */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <a
              href={gmailUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-xs font-semibold hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Open Order Copy in Gmail</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => setShowEmailPreview(!showEmailPreview)}
              className="text-xs text-slate-500 hover:text-slate-300 transition"
            >
              {showEmailPreview ? 'Hide Receipt Text' : 'View Text Receipt'}
            </button>
          </div>

          {showEmailPreview && (
            <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 whitespace-pre-wrap max-h-40 overflow-y-auto">
              {plainTextSummary}
            </pre>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={copySummary}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-750 text-slate-200 px-3 py-2 rounded-xl border border-slate-700 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Receipt!' : 'Copy Receipt'}</span>
          </button>

          <button
            onClick={onClose}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-xl text-xs transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

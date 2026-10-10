import React, { useState } from 'react';
import { 
  Search, 
  X, 
  Clock, 
  CheckCircle, 
  ChefHat, 
  Bike, 
  MapPin, 
  Phone, 
  User, 
  RefreshCw, 
  AlertCircle,
  ShoppingBag
} from 'lucide-react';
import { trackOrderByRef } from '../supabaseClient';

export default function TrackOrderModal({ isOpen, onClose, initialRefId = '' }) {
  const [refInput, setRefInput] = useState(initialRefId);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!refInput.trim()) {
      setErrorMsg('Please enter your Order Reference ID.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    const result = await trackOrderByRef(refInput.trim());
    setLoading(false);

    if (result.success && result.order) {
      setOrder(result.order);
      setErrorMsg('');
    } else {
      setOrder(null);
      setErrorMsg(result.error || 'No order found with this Reference ID.');
    }
  };

  // Helper for status step index
  const getStatusStep = (status) => {
    if (status === 'Delivered') return 3;
    if (status === 'Preparing') return 2;
    return 1; // Pending
  };

  const currentStep = order ? getStatusStep(order.status) : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-750 max-w-xl w-full rounded-3xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="p-6 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Live Order Tracking</h3>
              <p className="text-xs text-slate-400">Track your meal in real-time using your Reference ID</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          <form onSubmit={handleTrack} className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">
              Enter Order Reference ID (e.g. 5b42078c or full ID)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={refInput}
                  onChange={(e) => setRefInput(e.target.value)}
                  placeholder="e.g. 5b42078c or #dc674df0"
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-orange-500/20 transition active:scale-95 disabled:opacity-50 cursor-pointer shrink-0"
              >
                {loading ? 'Searching...' : 'Track'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3.5 text-xs text-rose-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Order Details Found */}
          {order && (
            <div className="space-y-5 pt-2 animate-in fade-in">
              {/* Stepper Progress Bar */}
              <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Delivery Progress</span>
                  <button
                    onClick={handleTrack}
                    disabled={loading}
                    className="flex items-center gap-1 text-[11px] text-orange-400 hover:underline cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh Status</span>
                  </button>
                </div>

                {/* Steps Visual */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {/* Step 1: Pending */}
                  <div className={`p-3 rounded-xl border transition ${
                    currentStep >= 1
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}>
                    <Clock className={`w-5 h-5 mx-auto mb-1 ${currentStep === 1 ? 'animate-pulse text-amber-400' : ''}`} />
                    <p className="font-bold text-[11px]">Pending</p>
                    <p className="text-[10px] opacity-75">Order In Queue</p>
                  </div>

                  {/* Step 2: Preparing */}
                  <div className={`p-3 rounded-xl border transition ${
                    currentStep >= 2
                      ? 'bg-blue-500/10 border-blue-500/40 text-blue-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}>
                    <ChefHat className={`w-5 h-5 mx-auto mb-1 ${currentStep === 2 ? 'animate-pulse text-blue-400' : ''}`} />
                    <p className="font-bold text-[11px]">Preparing</p>
                    <p className="text-[10px] opacity-75">Cooking Fresh</p>
                  </div>

                  {/* Step 3: Delivered */}
                  <div className={`p-3 rounded-xl border transition ${
                    currentStep >= 3
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}>
                    <CheckCircle className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                    <p className="font-bold text-[11px]">Delivered</p>
                    <p className="text-[10px] opacity-75">Completed</p>
                  </div>
                </div>

                <div className="text-center pt-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-mono ${
                    order.status === 'Delivered'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : order.status === 'Preparing'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    Current Status: {order.status}
                  </span>
                </div>
              </div>

              {/* Order Info Card */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="font-bold text-white text-sm">Order Summary</span>
                  <span className="font-mono text-orange-400 font-bold">
                    Ref: #{String(order.id).slice(0, 8)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Customer: <strong>{order.customer_name}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>Phone: <strong>{order.customer_phone}</strong></span>
                  </div>
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <span>Address: <strong>{order.customer_address}</strong></span>
                  </div>
                </div>

                {/* Dishes Summary */}
                <div className="border-t border-slate-800 pt-2 space-y-1">
                  <p className="font-semibold text-slate-400 text-[11px]">Dishes:</p>
                  <p className="text-slate-200 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    {order.items_summary || (
                      Array.isArray(order.dishes)
                        ? order.dishes.map((d) => `${d.name} (x${d.quantity})`).join(', ')
                        : JSON.stringify(order.dishes)
                    )}
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-300">Total Bill (COD):</span>
                  <span className="text-amber-400 font-extrabold text-base font-mono">
                    Rs. {Number(order.total).toLocaleString()} PKR
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-750 text-white font-semibold px-5 py-2 rounded-xl text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { UtensilsCrossed, ShoppingBag, Mail, ShieldCheck, Clock, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Navbar({ cartCount, onOpenCart, onOpenEmailConfig, onOpenAdmin, activeView }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl transition-all">
      {/* Top micro bar */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white text-[11px] py-1 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wide flex items-center gap-1.5">
              <span>🚀</span> SMIT Hackathon 2026 · ASF Campus
            </span>
            <span className="hidden sm:inline opacity-75">|</span>
            <span className="hidden sm:flex items-center gap-1 opacity-90">
              <Clock className="w-3 h-3" /> Delivery in 30-40 mins · Karachi
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:+923001234567" className="hidden md:flex items-center gap-1 hover:underline opacity-95">
              <Phone className="w-3 h-3" /> Order Helpline: {RESTAURANT_INFO.phone}
            </a>
            <span className="bg-black/20 px-2 py-0.5 rounded font-mono font-medium">Part A & B Live</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg sm:text-xl text-white tracking-tight flex items-center gap-1.5">
              <span>{RESTAURANT_INFO.name}</span>
              <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/30 font-medium">HALAL</span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Royal Flavors & Desi Charcoal Grill</p>
          </div>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-orange-400 transition">Home</a>
          <a href="#menu" className="hover:text-orange-400 transition">Our Menu</a>
          <a href="#order-form" className="hover:text-orange-400 transition">Order Form</a>
          <a href="#reviews" className="hover:text-orange-400 transition">Reviews</a>
          <button
            onClick={onOpenEmailConfig}
            className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition text-xs bg-slate-800/60 px-2.5 py-1.5 rounded-lg border border-slate-700/60"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Gmail Setup</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Admin Login / Portal button */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition ${
              activeView === 'admin'
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/50'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-750'
            }`}
            title="Part B: Admin Dashboard & Order Status"
          >
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span className="hidden sm:inline">Admin Portal</span>
          </button>

          {/* Cart / Order Trigger button */}
          <a
            href="#order-form"
            className="relative flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-lg shadow-orange-500/25 transition active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Your Order</span>
            {cartCount > 0 && (
              <span className="bg-white text-orange-600 text-xs font-bold rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </header>
  );
}


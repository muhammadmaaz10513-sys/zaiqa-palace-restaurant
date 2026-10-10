import React from 'react';
import { UtensilsCrossed, ShoppingBag, Search } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Navbar({ cartCount, onOpenCart, onOpenTrack }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform shrink-0">
            <UtensilsCrossed className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-xl text-white tracking-tight flex items-center gap-1 sm:gap-1.5">
              <span>{RESTAURANT_INFO.name}</span>
              <span className="text-[9px] sm:text-[10px] bg-orange-500/20 text-orange-400 px-1 sm:px-1.5 py-0.5 rounded border border-orange-500/30 font-medium whitespace-nowrap">
                100% HALAL
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block">
              Royal Flavors & Desi Charcoal Grill
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-orange-400 transition">Home</a>
          <a href="#menu" className="hover:text-orange-400 transition">Our Menu</a>
          <a href="#order-form" className="hover:text-orange-400 transition">Order Online</a>
          <button 
            onClick={onOpenTrack}
            className="hover:text-orange-400 transition cursor-pointer flex items-center gap-1"
          >
            <span>Track Order</span>
          </button>
          <a href="#reviews" className="hover:text-orange-400 transition">Reviews</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Track Order Button */}
          <button
            onClick={onOpenTrack}
            className="flex items-center gap-1 sm:gap-1.5 text-xs font-semibold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 transition cursor-pointer"
            title="Track Order by Reference ID"
          >
            <Search className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="hidden sm:inline">Track Order</span>
            <span className="sm:hidden text-[11px]">Track</span>
          </button>

          {/* Cart / Order Trigger button */}
          <a
            href="#order-form"
            className="relative flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-3 py-1.5 sm:px-4.5 sm:py-2 rounded-xl text-xs sm:text-sm shadow-lg shadow-orange-500/25 transition active:scale-95 shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">Your Order</span>
            <span className="sm:hidden text-[11px]">Cart</span>
            {cartCount > 0 && (
              <span className="bg-white text-orange-600 text-[10px] sm:text-xs font-bold rounded-full h-4.5 min-w-4.5 sm:h-5 sm:min-w-5 px-1 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </header>
  );
}

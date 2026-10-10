import React from 'react';
import { UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Navbar({ cartCount, onOpenCart }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg sm:text-xl text-white tracking-tight flex items-center gap-1.5">
              <span>{RESTAURANT_INFO.name}</span>
              <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/30 font-medium">100% HALAL</span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Royal Flavors & Desi Charcoal Grill</p>
          </div>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-orange-400 transition">Home</a>
          <a href="#menu" className="hover:text-orange-400 transition">Our Menu</a>
          <a href="#order-form" className="hover:text-orange-400 transition">Order Online</a>
          <a href="#reviews" className="hover:text-orange-400 transition">Reviews</a>
        </nav>

        {/* Cart / Order Trigger button */}
        <div className="flex items-center gap-3">
          <a
            href="#order-form"
            className="relative flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-4.5 py-2.5 rounded-xl text-sm shadow-lg shadow-orange-500/25 transition active:scale-95"
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

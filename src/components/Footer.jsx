import React from 'react';
import { UtensilsCrossed, Phone, MapPin, Clock, Heart, Shield } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Footer({ onOpenAdmin, onOpenEmailConfig }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">{RESTAURANT_INFO.name}</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Authentic Pakistani dining with fresh charcoal grill, slow-cooked handi karahis, and traditional dum biryanis.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Certified Halal Meat</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#home" className="hover:text-orange-400 transition">Home & Hero</a></li>
              <li><a href="#menu" className="hover:text-orange-400 transition">Our Menu (At least 6 dishes)</a></li>
              <li><a href="#order-form" className="hover:text-orange-400 transition">Order Form</a></li>
              <li><a href="#reviews" className="hover:text-orange-400 transition">Customer Reviews</a></li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-orange-400 transition text-left">
                  Admin Dashboard (Part B)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Timings */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Delivery & Timings</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.timings}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>{RESTAURANT_INFO.phone}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Hackathon Notice */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-orange-400 text-xs">SMIT Hackathon 2026</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Saylani Mass IT Training (ASF Campus)
              <br />Modern Web & App Development with AI
              <br />Saturday: Part A (50 marks)
              <br />Sunday: Part B (50 marks)
            </p>
            <button
              onClick={onOpenEmailConfig}
              className="mt-2 w-full text-center text-xs bg-slate-800 hover:bg-slate-750 text-slate-200 py-1.5 rounded-lg border border-slate-700 transition"
            >
              Configure Gmail Address
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2026 {RESTAURANT_INFO.name}. Built for SMIT ASF Campus Restaurant Hackathon.</p>
          <p className="flex items-center gap-1">
            Built with React, Tailwind CSS, Supabase & Web3Forms
          </p>
        </div>
      </div>
    </footer>
  );
}


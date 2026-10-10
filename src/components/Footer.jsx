import React from 'react';
import { UtensilsCrossed, Phone, MapPin, Clock, Shield, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-12 sm:pt-16 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">{RESTAURANT_INFO.name}</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Authentic Pakistani dining with fresh charcoal grill, slow-cooked handi karahis, and traditional dum biryanis.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% Certified Halal Meat</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-orange-400 transition">Home</a></li>
              <li><a href="#menu" className="hover:text-orange-400 transition">Our Menu</a></li>
              <li><a href="#order-form" className="hover:text-orange-400 transition">Order Online</a></li>
              <li><a href="#reviews" className="hover:text-orange-400 transition">Customer Reviews</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & Timings */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Delivery & Timings</h4>
            <ul className="space-y-2.5 text-xs">
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
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:underline">
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality Commitment */}
          <div className="space-y-2.5 bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-orange-400 text-xs flex items-center gap-1.5">
              <Award className="w-4 h-4 shrink-0" /> Why Choose Us?
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400 leading-relaxed">
              <li>• Pure Desi Ghee & Fresh Ingredients</li>
              <li>• Charcoal Smoke Handcrafted BBQ</li>
              <li>• Express Hot Delivery (30-40 Mins)</li>
              <li>• Cash on Delivery across Karachi</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 text-center sm:text-left">
          <p>© 2026 {RESTAURANT_INFO.name}. All rights reserved.</p>
          <p>Authentic Pakistani Cuisine & Charcoal BBQ</p>
        </div>
      </div>
    </footer>
  );
}

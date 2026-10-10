import React from 'react';
import { ArrowRight, Star, Flame, Sparkles, Shield, Clock, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-orange-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Quality Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Authentic Flavors · 100% Charcoal Grilled</span>
            </div>

            {/* Main Big Restaurant Name and Top Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Welcome to <br />
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                  {RESTAURANT_INFO.name}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0">
                Fresh, sizzling clay-oven grills, aromatic dum biryanis, and rich handi karahis delivered hot straight to your doorstep.
              </p>
            </div>

            {/* Key Value Proposition Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>100% Fresh Charcoal BBQ</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>30-40 Mins Express Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>100% Halal Ingredients</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#order-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-xl shadow-orange-500/25 transition active:scale-95 text-base"
              >
                <span>Order Food Online</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-750 text-slate-200 hover:text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-600 transition text-base"
              >
                <span>Explore Full Menu</span>
              </a>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white text-sm">4.9 / 5</span>
              </div>
              <span className="text-slate-500 text-sm">|</span>
              <p className="text-xs text-slate-400">
                <span className="text-slate-200 font-semibold">{RESTAURANT_INFO.reviewsCount}</span> from food lovers in Karachi
              </p>
            </div>
          </div>

          {/* Right Column: Visual Food Montage & Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Featured Food Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-800/40 backdrop-blur-md group">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80"
                  alt="Special Sindhi Dum Biryani"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                  <div className="inline-flex items-center gap-1 bg-orange-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    <Award className="w-3 h-3" /> Chef's Signature Dish
                  </div>
                  <h3 className="text-2xl font-bold text-white">Special Sindhi Dum Biryani</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold text-amber-400">Rs. 550 PKR</span>
                    <a
                      href="#order-form"
                      className="text-xs bg-white text-slate-900 font-bold px-3.5 py-1.5 rounded-lg hover:bg-orange-400 hover:text-white transition"
                    >
                      Order Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating Miniature Tag 1 */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-slate-900/95 border border-slate-700 rounded-2xl p-3.5 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                  🔥
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Today's Special</p>
                  <p className="text-xs font-bold text-white">Mutton Shinwari Karahi</p>
                </div>
              </div>

              {/* Floating Miniature Tag 2 */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-slate-900/95 border border-slate-700 rounded-2xl p-3.5 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Doorstep Delivery</p>
                  <p className="text-xs font-bold text-emerald-400">Hot & Fresh in 30 Mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

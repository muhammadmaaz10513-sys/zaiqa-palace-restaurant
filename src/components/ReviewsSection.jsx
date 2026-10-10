import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Hamza Farooq',
    location: 'Gulshan-e-Iqbal, Karachi',
    rating: 5,
    date: '2 days ago',
    comment: 'The Special Sindhi Dum Biryani was exceptionally fragrant and the chicken was falling off the bone. Delivered within 32 minutes piping hot! Definitely ordering again.',
  },
  {
    name: 'Ayesha Siddiqui',
    location: 'DHA Phase 6, Karachi',
    rating: 5,
    date: 'Yesterday',
    comment: 'Best Mutton Shinwari Karahi I have had in Karachi in a long time. Not drowned in masala, authentic Pashtun taste with fresh green chilies and ginger. 10/10!',
  },
  {
    name: 'Bilal Qureshi',
    location: 'PECHS Block 2, Karachi',
    rating: 5,
    date: '3 days ago',
    comment: 'The online order system is so smooth and seamless. I received order confirmation and the Seekh Kababs were smoky, juicy, and delicious. Highly recommended!',
  },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-12 sm:py-16 lg:py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-2.5">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved By Thousands of Foodies
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Real reviews from our Karachi diners who appreciate authentic charcoal cooking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4 shadow-lg flex flex-col justify-between hover:border-slate-750 transition"
            >
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white flex items-center gap-1">
                    {rev.name}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </h4>
                  <p className="text-[11px] text-slate-400">{rev.location}</p>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

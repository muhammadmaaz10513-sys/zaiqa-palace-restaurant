import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, ShoppingCart, Check, Star, Clock, Flame } from 'lucide-react';
import { DISHES, MENU_CATEGORIES } from '../data/menuData';

export default function MenuSection({ cart, onAddToCart, onUpdateQuantity }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter dishes based on category and search query
  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      const matchesCategory =
        activeCategory === 'All' ||
        (activeCategory === 'Chef Specials' && dish.badge === "Chef's Special") ||
        dish.category === activeCategory;

      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getItemQuantityInCart = (dishId) => {
    const item = cart.find((i) => i.id === dishId);
    return item ? item.quantity : 0;
  };

  return (
    <section id="menu" className="py-12 sm:py-16 lg:py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold border border-orange-500/20">
            <Flame className="w-3.5 h-3.5 shrink-0" />
            <span>Chef's Handcrafted Specialties</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Handcrafted Menu
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Explore our rich collection of traditional Pakistani specialties, tandoori grills, and sweet delicacies. Each prepared fresh on order.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          {/* Category Tabs - smooth edge scroll on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or ingredients..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9.5 pr-4 py-2 sm:py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition"
            />
          </div>
        </div>

        {/* Dish Grid: 9 dishes displayed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredDishes.map((dish) => {
            const qtyInCart = getItemQuantityInCart(dish.id);

            return (
              <div
                key={dish.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-slate-700/80 shadow-lg hover:shadow-2xl hover:shadow-orange-500/5 transition-all overflow-hidden flex flex-col group"
              >
                {/* Image Container with Badges */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {dish.badge && (
                      <span className="bg-orange-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm shadow">
                        {dish.badge}
                      </span>
                    )}
                    <span className="bg-slate-900/80 text-slate-200 text-[10px] font-medium px-2 py-0.5 rounded-md backdrop-blur-sm border border-slate-700/50">
                      {dish.spicyLevel}
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-orange-500/40 text-amber-400 font-extrabold px-3 py-1 rounded-xl text-xs sm:text-sm shadow-lg backdrop-blur-md font-mono">
                    Rs. {dish.price} <span className="text-[10px] font-normal text-slate-400">PKR</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="text-orange-400 font-medium">{dish.category}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 shrink-0" />
                        <span>{dish.prepTime}</span>
                        <span className="text-slate-600">•</span>
                        <span className="flex items-center text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400 inline mr-0.5 shrink-0" />
                          {dish.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                      {dish.name}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Add to Order controls */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    {qtyInCart > 0 ? (
                      <div className="w-full flex items-center justify-between bg-slate-950 border border-orange-500/40 rounded-xl p-1">
                        <button
                          onClick={() => onUpdateQuantity(dish.id, qtyInCart - 1)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition active:scale-95 cursor-pointer"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <div className="text-center px-2">
                          <span className="text-xs font-bold text-orange-400">
                            {qtyInCart} in Cart
                          </span>
                          <span className="block text-[10px] text-slate-400 font-mono">
                            Rs. {qtyInCart * dish.price}
                          </span>
                        </div>

                        <button
                          onClick={() => onUpdateQuantity(dish.id, qtyInCart + 1)}
                          className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
                          title="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(dish)}
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-200 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition duration-200 active:scale-95 border border-slate-700/80 hover:border-orange-500 cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Order</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No dishes found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-3 text-xs text-orange-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

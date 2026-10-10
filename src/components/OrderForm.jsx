import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { DISHES } from '../data/menuData';

export default function OrderForm({ 
  cart, 
  onAddToCart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart,
  onPlaceOrder,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    address: false,
  });

  const [selectedQuickDishId, setSelectedQuickDishId] = useState('');
  const [quickDishQty, setQuickDishQty] = useState(1);
  const [formError, setFormError] = useState('');

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 1500 ? 0 : 120;
  const grandTotal = subtotal + deliveryFee;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleQuickAdd = () => {
    if (!selectedQuickDishId) return;
    const dish = DISHES.find((d) => d.id === selectedQuickDishId);
    if (dish) {
      onAddToCart(dish, quickDishQty);
      setSelectedQuickDishId('');
      setQuickDishQty(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, address: true });
    setFormError('');

    // All fields required
    if (!formData.name.trim()) {
      setFormError('Please enter your full name (required).');
      return;
    }

    if (!formData.phone.trim()) {
      setFormError('Please enter your phone number (required).');
      return;
    }

    if (!formData.address.trim()) {
      setFormError('Please enter your complete delivery address (required).');
      return;
    }

    // Must have at least 1 dish picked
    if (cart.length === 0) {
      setFormError('Please pick at least 1 dish and quantity before placing order.');
      return;
    }

    const itemsSummary = cart
      .map((item) => `${item.name} (x${item.quantity})`)
      .join(', ');

    onPlaceOrder({
      customerName: formData.name.trim(),
      customerPhone: formData.phone.trim(),
      customerAddress: formData.address.trim(),
      notes: formData.notes.trim(),
      items: cart,
      itemsSummary,
      subtotal,
      deliveryFee,
      total: grandTotal,
    });
  };

  return (
    <section id="order-form" className="py-12 sm:py-16 lg:py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold border border-orange-500/20">
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span>Quick & Easy Online Checkout</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Place Your Food Order
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Fill in your delivery address below, choose your favorite dishes and quantities, and click Place Order to enjoy freshly prepared food.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Order Items / Dish Picker (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950/90 rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-6 lg:p-7 space-y-5 sm:space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 sm:pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-orange-500/10 text-orange-400 rounded-xl">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">Selected Dishes</h3>
                  <p className="text-[11px] sm:text-xs text-slate-400">{cart.length} unique item(s) chosen</p>
                </div>
              </div>

              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-rose-500/10 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              )}
            </div>

            {/* Quick Dish Selector */}
            <div className="bg-slate-900/90 rounded-xl p-3 sm:p-3.5 border border-slate-800 space-y-2">
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-300">
                Quick Dish Picker (Choose & add to order)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={selectedQuickDishId}
                  onChange={(e) => setSelectedQuickDishId(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500 min-w-0"
                >
                  <option value="">-- Choose a dish from menu --</option>
                  {DISHES.map((dish) => (
                    <option key={dish.id} value={dish.id}>
                      {dish.name} (Rs. {dish.price})
                    </option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={quickDishQty}
                    onChange={(e) => setQuickDishQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 bg-slate-950 border border-slate-750 rounded-lg px-2 py-2 text-xs text-center text-slate-200 focus:outline-none focus:border-orange-500"
                    title="Quantity"
                  />

                  <button
                    type="button"
                    onClick={handleQuickAdd}
                    disabled={!selectedQuickDishId}
                    className="flex-1 sm:flex-initial bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-semibold px-3.5 py-2 rounded-lg text-xs transition cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Picked Dishes List */}
            {cart.length === 0 ? (
              <div className="text-center py-8 px-4 bg-slate-900/40 rounded-xl border border-dashed border-slate-800 space-y-2.5">
                <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">Your order tray is currently empty</p>
                <p className="text-[11px] sm:text-xs text-slate-500 max-w-xs mx-auto">
                  Pick dishes from the menu above or use the Quick Dish Picker.
                </p>
                <a
                  href="#menu"
                  className="inline-flex items-center gap-1 text-xs text-orange-400 font-semibold hover:underline pt-1"
                >
                  Browse Menu Dishes <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-750 transition space-y-2.5"
                  >
                    {/* Top Row: Dish Image, Name, Unit Price, Delete */}
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-11 h-11 rounded-lg object-cover bg-slate-950 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                          <p className="text-[11px] text-slate-400 font-mono">
                            Rs. {item.price} each
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition cursor-pointer shrink-0"
                        title="Remove dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bottom Row: Quantity Controls & Subtotal */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-slate-950 border border-slate-750 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center text-xs transition cursor-pointer"
                          title="Reduce"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="w-8 text-center font-bold text-xs text-orange-400 font-mono">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center text-xs transition cursor-pointer"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">Subtotal</span>
                        <p className="text-xs font-bold text-amber-400 font-mono">
                          Rs. {(item.quantity * item.price).toLocaleString()} PKR
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bill Summary */}
            <div className="bg-slate-900 rounded-xl p-3.5 sm:p-4 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Dishes Subtotal:</span>
                <span className="font-mono text-slate-200 font-semibold">Rs. {subtotal.toLocaleString()} PKR</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Standard Delivery:</span>
                <span className="font-mono text-slate-200">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-semibold">FREE (Over Rs. 1,500)</span>
                  ) : (
                    `Rs. ${deliveryFee} PKR`
                  )}
                </span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-sm font-bold text-white">
                <span>Grand Total:</span>
                <span className="text-base text-amber-400 font-mono font-extrabold">
                  Rs. {grandTotal.toLocaleString()} PKR
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Details Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/90 rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-6 lg:p-8 shadow-xl space-y-5 sm:space-y-6">
            <div className="border-b border-slate-800/80 pb-3 sm:pb-4">
              <h3 className="font-bold text-base sm:text-lg text-white">Customer Delivery Information</h3>
              <p className="text-xs text-slate-400">
                Please provide your delivery details below (<span className="text-orange-400 font-medium">* all fields required</span>).
              </p>
            </div>

            {formError && (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Customer Name */}
              <div>
                <label htmlFor="customer-name" className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Full Customer Name <span className="text-orange-400">* (required)</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 shrink-0" />
                  <input
                    id="customer-name"
                    name="name"
                    type="text"
                    required
                    aria-required="true"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={() => handleBlur('name')}
                    placeholder="e.g. Muhammad Hamza / Sarah Khan"
                    className={`w-full bg-slate-900 border rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                      touched.name && !formData.name.trim()
                        ? 'border-rose-500 bg-rose-950/20 focus:border-rose-400'
                        : 'border-slate-750 focus:border-orange-500'
                    }`}
                  />
                </div>
                {touched.name && !formData.name.trim() && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Name is required.
                  </p>
                )}
              </div>

              {/* Customer Phone */}
              <div>
                <label htmlFor="customer-phone" className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Phone / WhatsApp Number <span className="text-orange-400">* (required)</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 shrink-0" />
                  <input
                    id="customer-phone"
                    name="phone"
                    type="tel"
                    required
                    aria-required="true"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    onBlur={() => handleBlur('phone')}
                    placeholder="e.g. 0300-1234567 or 03123456789"
                    className={`w-full bg-slate-900 border rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                      touched.phone && !formData.phone.trim()
                        ? 'border-rose-500 bg-rose-950/20 focus:border-rose-400'
                        : 'border-slate-750 focus:border-orange-500'
                    }`}
                  />
                </div>
                {touched.phone && !formData.phone.trim() && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Phone number is required for delivery confirmation.
                  </p>
                )}
              </div>

              {/* Delivery Address */}
              <div>
                <label htmlFor="customer-address" className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Complete Delivery Address <span className="text-orange-400">* (required)</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 shrink-0" />
                  <textarea
                    id="customer-address"
                    name="address"
                    rows="3"
                    required
                    aria-required="true"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    onBlur={() => handleBlur('address')}
                    placeholder="House/Flat No., Street, Sector/Block, Area/Landmark, City (e.g. Flat 302, ASF Towers, Airport Road, Karachi)"
                    className={`w-full bg-slate-900 border rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                      touched.address && !formData.address.trim()
                        ? 'border-rose-500 bg-rose-950/20 focus:border-rose-400'
                        : 'border-slate-750 focus:border-orange-500'
                    }`}
                  />
                </div>
                {touched.address && !formData.address.trim() && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Delivery address is required.
                  </p>
                )}
              </div>

              {/* Special Notes (Optional) */}
              <div>
                <label htmlFor="order-notes" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Special Cooking / Delivery Instructions (Optional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 shrink-0" />
                  <input
                    id="order-notes"
                    name="notes"
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Less spicy, extra raita, ring bell twice"
                    className="w-full bg-slate-900 border border-slate-750 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Payment & Delivery Notice */}
              <div className="bg-slate-900 rounded-xl p-3 sm:p-3.5 border border-slate-800 text-[11px] sm:text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Payment: <strong className="text-slate-200">Cash on Delivery (COD)</strong></span>
                </span>
                <span className="text-emerald-400 font-medium">Est. Delivery: 30-40 Mins</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base shadow-xl shadow-orange-500/25 transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Placing Your Order...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Place Order (Rs. {grandTotal.toLocaleString()} PKR)</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-500">
                ⚡ Fast delivery across Karachi • Freshly prepared upon order
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

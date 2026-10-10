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
  Sparkles, 
  Mail, 
  Database,
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
  onOpenEmailConfig
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

    // Requirement 2: All fields must be filled (required)
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
    <section id="order-form" className="py-16 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold border border-orange-500/20">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Requirement 2, 3 & 4: Order Form · Gmail · Supabase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Place Your Food Order
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Fill in your delivery information below, pick your favorite dishes and quantities, and click Place Order. Your order is instantly saved to Supabase and dispatched to your Gmail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Order Items / Dish Picker (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Selected Dishes</h3>
                  <p className="text-xs text-slate-400">{cart.length} unique item(s) chosen</p>
                </div>
              </div>

              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 px-2 py-1 rounded hover:bg-rose-500/10 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              )}
            </div>

            {/* Quick Dish Selector (to pick dishes inside the form itself) */}
            <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Quick Dish Picker (Pick dishes directly in this form)
              </label>
              <div className="flex gap-2">
                <select
                  value={selectedQuickDishId}
                  onChange={(e) => setSelectedQuickDishId(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-750 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
                >
                  <option value="">-- Choose a dish from menu --</option>
                  {DISHES.map((dish) => (
                    <option key={dish.id} value={dish.id}>
                      {dish.name} (Rs. {dish.price})
                    </option>
                  ))}
                </select>

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
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-semibold px-3 py-2 rounded-lg text-xs transition"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Picked Dishes List */}
            {cart.length === 0 ? (
              <div className="text-center py-8 px-4 bg-slate-900/40 rounded-xl border border-dashed border-slate-800 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="text-sm text-slate-300 font-medium">Your order tray is currently empty</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Pick dishes from the menu above or use the Quick Dish Picker above.
                </p>
                <a
                  href="#menu"
                  className="inline-flex items-center gap-1 text-xs text-orange-400 font-semibold hover:underline pt-1"
                >
                  Browse Menu Dishes <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-750 transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-950 shrink-0"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                        <p className="text-[11px] text-slate-400 font-mono">
                          Rs. {item.price} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-slate-950 border border-slate-750 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center text-xs transition"
                          title="Reduce"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="w-7 text-center font-bold text-xs text-orange-400 font-mono">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center text-xs transition"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right min-w-[70px]">
                        <p className="text-xs font-bold text-amber-400 font-mono">
                          Rs. {item.quantity * item.price}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition"
                        title="Remove dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bill Summary */}
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-2 text-xs">
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
              <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-bold text-white">
                <span>Grand Total:</span>
                <span className="text-base text-amber-400 font-mono font-extrabold">
                  Rs. {grandTotal.toLocaleString()} PKR
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Details Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-white">Customer Delivery Information</h3>
                  <p className="text-xs text-slate-400">
                    Requirement 2: Name, Phone & Address must all be filled (<span className="text-orange-400 font-medium">required</span>).
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saves to Supabase</span>
                  <span className="text-slate-600">•</span>
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <span>Sends to Gmail</span>
                </div>
              </div>
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
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                    className={`w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition ${
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
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                    className={`w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition ${
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
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
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
                    className={`w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition ${
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
                  <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="order-notes"
                    name="notes"
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Less spicy, extra green raita, ring bell twice"
                    className="w-full bg-slate-900 border border-slate-750 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Integration status notice */}
              <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>
                  Destination: <strong className="text-slate-200">Your Gmail & Supabase DB</strong>
                </span>
                <button
                  type="button"
                  onClick={onOpenEmailConfig}
                  className="text-orange-400 hover:underline font-semibold"
                >
                  Change Email Settings
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold px-6 py-4 rounded-xl text-base shadow-xl shadow-orange-500/25 transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing & Dispatching Order...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Place Order (Rs. {grandTotal.toLocaleString()} PKR)</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-500">
                ⚡ Upon clicking Place Order, order is saved with status <span className="text-amber-400 font-semibold font-mono">Pending</span> in Supabase & dispatched to Gmail.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  LogOut, 
  RefreshCw, 
  Clock, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Share2, 
  ArrowLeft,
  Database
} from 'lucide-react';
import { fetchAllOrders, updateOrderStatus } from '../supabaseClient';
import SocialMediaScheduler from './SocialMediaScheduler';

export default function AdminDashboard({ onBackToWebsite }) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('smit_admin_logged_in') === 'true';
  });
  const [emailInput, setEmailInput] = useState('admin@zaiqa.com');
  const [passwordInput, setPasswordInput] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Dashboard navigation tab
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'social'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Pending' | 'Preparing' | 'Delivered'
  const [searchQuery, setSearchQuery] = useState('');

  // Orders data
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  // Load orders
  const loadOrders = async () => {
    setLoading(true);
    const result = await fetchAllOrders();
    setLoading(false);
    if (result.success) {
      setOrders(result.data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated]);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    const validEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@zaiqa.com';
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

    if (emailInput.trim() === validEmail && passwordInput.trim() === validPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('smit_admin_logged_in', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid admin email or password. Please use correct credentials.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('smit_admin_logged_in');
  };

  // Change order status: Pending -> Preparing -> Delivered
  const handleChangeStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    const result = await updateOrderStatus(orderId, newStatus);
    setUpdatingId(null);

    if (result.success) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      setActionMessage(`Order status updated to "${newStatus}" in Supabase.`);
      setTimeout(() => setActionMessage(null), 3000);
    } else {
      alert(`Could not update status in Supabase: ${result.error}`);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      order.customer_name?.toLowerCase().includes(q) ||
      order.customer_phone?.toLowerCase().includes(q) ||
      order.items_summary?.toLowerCase().includes(q) ||
      order.customer_address?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  // Render Login Form if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-slate-100">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">Restaurant Admin Portal</h2>
            <p className="text-xs text-slate-400">
              Authorized personnel only. Please sign in to manage orders.
            </p>
          </div>

          {loginError && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Admin Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Default test credentials notice */}
            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Admin Login Credentials:</p>
              <p>Email: <code className="text-orange-400 font-mono">admin@zaiqa.com</code></p>
              <p>Password: <code className="text-orange-400 font-mono">admin123</code></p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 rounded-xl text-xs transition active:scale-95 shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              Sign In to Dashboard
            </button>

            <button
              type="button"
              onClick={onBackToWebsite}
              className="w-full text-center text-xs text-slate-400 hover:text-white transition pt-2 cursor-pointer"
            >
              ← Back to Restaurant Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard Layout (Sidebar on the left, orders on the right)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Admin Portal</h3>
              <p className="text-[10px] text-slate-400">Order Management</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4" />
              <span>Customer Orders</span>
            </div>
            <span className="bg-black/20 text-[10px] px-1.5 py-0.5 rounded-full font-mono">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === 'social'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Social Media</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onBackToWebsite}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Public Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {actionMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}

        {activeTab === 'social' ? (
          <SocialMediaScheduler />
        ) : (
          <div className="space-y-6">
            {/* Header with Title and Refresh */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Customer Orders</h1>
                <p className="text-xs text-slate-400">
                  Manage incoming customer orders, customer contact, dishes, total, time and update status.
                </p>
              </div>

              <button
                onClick={loadOrders}
                disabled={loading}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh Orders</span>
              </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
                {['all', 'Pending', 'Preparing', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition cursor-pointer ${
                      statusFilter === st
                        ? 'bg-orange-500 text-white font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {st === 'all' ? 'All Orders' : st}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, phone, dishes..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8.5 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Orders List / Cards */}
            {loading && orders.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-orange-400" />
                <span>Loading live orders from Supabase...</span>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-slate-300 font-semibold text-sm">No orders found</p>
                <p className="text-xs text-slate-500">
                  {orders.length === 0
                    ? "No orders received yet."
                    : 'No orders matching the current filter.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const isUpdating = updatingId === order.id;

                  return (
                    <div
                      key={order.id}
                      className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 hover:border-slate-750 transition shadow-lg"
                    >
                      {/* Top Bar of Order Card: Customer & Time & Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-white">
                              {order.customer_name}
                            </h3>
                            <span className="font-mono text-xs text-slate-500">
                              #{String(order.id).slice(0, 8)}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-orange-400" />
                              <a href={`tel:${order.customer_phone}`} className="hover:underline">
                                {order.customer_phone}
                              </a>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {new Date(order.created_at).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Current Status Badge */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wide ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : order.status === 'Preparing'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            }`}
                          >
                            ● {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Dishes & Delivery Address */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                        <div className="md:col-span-7 space-y-1.5">
                          <p className="font-semibold text-slate-400">Dishes Ordered:</p>
                          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-200">
                            {order.items_summary || (
                              Array.isArray(order.dishes) 
                                ? order.dishes.map(d => `${d.name} (x${d.quantity})`).join(', ')
                                : JSON.stringify(order.dishes)
                            )}
                          </div>
                          {order.notes && (
                            <p className="text-[11px] text-amber-400/90 italic">
                              Special Instructions: "{order.notes}"
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-5 space-y-1.5">
                          <p className="font-semibold text-slate-400">Delivery Address:</p>
                          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                            <span>{order.customer_address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Bar: Total and Status Change Controls (Pending -> Preparing -> Delivered) */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-slate-400">Total Bill:</span>
                          <span className="text-lg font-extrabold text-amber-400 font-mono">
                            Rs. {Number(order.total).toLocaleString()} PKR
                          </span>
                        </div>

                        {/* Status Change Buttons: Pending -> Preparing -> Delivered */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-400 mr-1 hidden sm:inline">Change Status:</span>

                          <button
                            onClick={() => handleChangeStatus(order.id, 'Pending')}
                            disabled={isUpdating || order.status === 'Pending'}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                              order.status === 'Pending'
                                ? 'bg-amber-500 text-slate-950 cursor-default'
                                : 'bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-750'
                            }`}
                          >
                            Pending
                          </button>

                          <button
                            onClick={() => handleChangeStatus(order.id, 'Preparing')}
                            disabled={isUpdating || order.status === 'Preparing'}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                              order.status === 'Preparing'
                                ? 'bg-blue-500 text-white cursor-default'
                                : 'bg-slate-800 hover:bg-blue-500/20 text-slate-300 hover:text-blue-300 border border-slate-750'
                            }`}
                          >
                            Preparing
                          </button>

                          <button
                            onClick={() => handleChangeStatus(order.id, 'Delivered')}
                            disabled={isUpdating || order.status === 'Delivered'}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-500 text-slate-950 cursor-default'
                                : 'bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-750'
                            }`}
                          >
                            Delivered
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}


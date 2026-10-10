import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import OrderForm from './components/OrderForm';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import OrderSuccessModal from './components/OrderSuccessModal';
import TrackOrderModal from './components/TrackOrderModal';
import { saveOrderToSupabase } from './supabaseClient';
import { sendOrderToGmail } from './services/emailService';

export default function App() {
  // Cart state: array of { id, name, price, quantity, image }
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('smit_restaurant_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [trackingRefId, setTrackingRefId] = useState('');
  const [lastOrder, setLastOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync cart with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smit_restaurant_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to sync cart to localStorage:', err);
    }
  }, [cart]);

  // Cart helper functions
  const handleAddToCart = (dish, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...dish, quantity }];
    });
  };

  const handleUpdateQuantity = (dishId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(dishId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === dishId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (dishId) => {
    setCart((prev) => prev.filter((item) => item.id !== dishId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Place order handler: saves to Supabase and sends to muhammadmaazramzan786@gmail.com
  const handlePlaceOrder = async (orderPayload) => {
    setIsSubmitting(true);

    try {
      // 1. Save to Supabase 'orders' table with status 'Pending'
      const supabaseResult = await saveOrderToSupabase(orderPayload);

      const completeOrder = {
        ...orderPayload,
        id: supabaseResult.order?.id || 'ORD-' + Date.now().toString().slice(-6),
        status: 'Pending',
        created_at: new Date().toISOString(),
      };

      // 2. Dispatch to recipient email: muhammadmaazramzan786@gmail.com
      const emailResult = await sendOrderToGmail(completeOrder);

      // 3. Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Confetti fallback
      }

      // 4. Update UI states
      setLastOrder(completeOrder);
      setIsSuccessModalOpen(true);
      handleClearCart();
    } catch (err) {
      console.error('Order submission error:', err);
      alert('There was an issue processing your order. Please check the console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Pure Public Restaurant Customer Website
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden w-full">
      {/* Clean Restaurant Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => {
          const el = document.getElementById('order-form');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTrack={() => {
          setTrackingRefId('');
          setIsTrackModalOpen(true);
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Menu Section */}
        <MenuSection
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />

        {/* Order Form (Customer Details & Dish Tray) */}
        <OrderForm
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onPlaceOrder={handlePlaceOrder}
          isSubmitting={isSubmitting}
        />

        {/* Reviews Section */}
        <ReviewsSection />
      </main>

      {/* Clean Restaurant Footer */}
      <Footer />

      {/* Order Confirmation Receipt Modal */}
      <OrderSuccessModal
        order={lastOrder}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onTrackOrder={(refId) => {
          setTrackingRefId(refId);
          setIsTrackModalOpen(true);
        }}
      />

      {/* Live Order Tracking Modal */}
      <TrackOrderModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        initialRefId={trackingRefId}
      />
    </div>
  );
}

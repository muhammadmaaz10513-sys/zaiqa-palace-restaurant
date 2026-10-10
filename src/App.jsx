import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import OrderForm from './components/OrderForm';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import SupabaseBanner from './components/SupabaseBanner';
import EmailSettingsModal from './components/EmailSettingsModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import AdminDashboard from './components/AdminDashboard';
import { saveOrderToSupabase } from './supabaseClient';
import { sendOrderToGmail } from './services/emailService';

export default function App() {
  // Navigation View: 'website' or 'admin'
  const [activeView, setActiveView] = useState('website');

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
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
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

  // Place order handler (Meets Requirement 2, 3 & 4)
  const handlePlaceOrder = async (orderPayload) => {
    setIsSubmitting(true);

    try {
      // 1. Save to Supabase (Requirement 4: Saved in table 'orders' with status 'Pending')
      const supabaseResult = await saveOrderToSupabase(orderPayload);

      const completeOrder = {
        ...orderPayload,
        id: supabaseResult.order?.id || 'ORD-' + Date.now().toString().slice(-6),
        status: 'Pending',
        created_at: new Date().toISOString(),
      };

      // 2. Dispatch to Gmail (Requirement 3: Full order comes to Gmail)
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

      // If user uses direct Gmail composer, trigger in a small delayed popup
      if (emailResult.method === 'gmail_direct' && emailResult.gmailUrl) {
        // Will be available in the success modal via button as well
      }
    } catch (err) {
      console.error('Order submission error:', err);
      alert('There was an issue processing your order. Please check the console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // If viewing admin portal (Part B)
  if (activeView === 'admin') {
    return (
      <AdminDashboard
        onBackToWebsite={() => setActiveView('website')}
        onOpenEmailConfig={() => setIsEmailModalOpen(true)}
      />
    );
  }

  // Public Restaurant Website (Part A)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Supabase status verification banner */}
      <SupabaseBanner />

      {/* Main Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => {
          const el = document.getElementById('order-form');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenEmailConfig={() => setIsEmailModalOpen(true)}
        onOpenAdmin={() => setActiveView('admin')}
        activeView={activeView}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Requirement 1: Home and big top section */}
        <Hero onOpenEmailConfig={() => setIsEmailModalOpen(true)} />

        {/* Requirement 1: Menu with at least 6 dishes, pictures, names and prices */}
        <MenuSection
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />

        {/* Requirement 2, 3 & 4: Order Form with required validation, Gmail dispatch & Supabase save */}
        <OrderForm
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onPlaceOrder={handlePlaceOrder}
          isSubmitting={isSubmitting}
          onOpenEmailConfig={() => setIsEmailModalOpen(true)}
        />

        {/* Testimonials and social proof */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setActiveView('admin')}
        onOpenEmailConfig={() => setIsEmailModalOpen(true)}
      />

      {/* Modals */}
      <EmailSettingsModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />

      <OrderSuccessModal
        order={lastOrder}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}

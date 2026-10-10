import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import OrderForm from './components/OrderForm';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import OrderSuccessModal from './components/OrderSuccessModal';
import AdminDashboard from './admin/AdminDashboard';
import { saveOrderToSupabase } from './supabaseClient';
import { sendOrderToGmail } from './services/emailService';

export default function App() {
  // Check if current route is admin portal (/admin or #admin or ?admin=true)
  const isInitialAdmin = () => {
    return (
      window.location.pathname === '/admin' ||
      window.location.pathname.startsWith('/admin') ||
      window.location.hash === '#admin' ||
      window.location.search.includes('admin=true')
    );
  };

  const [activeView, setActiveView] = useState(() => (isInitialAdmin() ? 'admin' : 'website'));

  // Listen to browser navigation changes
  useEffect(() => {
    const handleUrlChange = () => {
      if (isInitialAdmin()) {
        setActiveView('admin');
      } else {
        setActiveView('website');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateToWebsite = () => {
    window.history.pushState({}, '', '/');
    setActiveView('website');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      setLastOrder({ ...completeOrder, emailResult });
      setIsSuccessModalOpen(true);
      handleClearCart();

      // Automatically open Gmail with the order pre-filled so the user immediately sees it
      if (emailResult.gmailUrl) {
        try {
          window.open(emailResult.gmailUrl, '_blank');
        } catch (e) {
          console.warn('Popup blocked, button available in modal:', e);
        }
      }
    } catch (err) {
      console.error('Order submission error:', err);
      alert('There was an issue processing your order. Please check the console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // If viewing admin portal (located in /admin or #admin)
  if (activeView === 'admin') {
    return <AdminDashboard onBackToWebsite={navigateToWebsite} />;
  }

  // Public Restaurant Website
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Clean Restaurant Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => {
          const el = document.getElementById('order-form');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Menu Section (9 dishes) */}
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
      />
    </div>
  );
}

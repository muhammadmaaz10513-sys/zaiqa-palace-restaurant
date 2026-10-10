import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 'https://tehmzakrejbuytuoocll.supabase.co';

export const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlaG16YWtyZWpidXl0dW9vY2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MDE4NzQsImV4cCI6MjEwNzE3Nzg3NH0.FzKKNg4E2bKbJ8N3P0oiVgUjaZ19q1eEItMQXghvgS4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Checks if the orders table exists and is accessible
 */
export async function testOrdersTable() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('id, status')
      .limit(1);

    if (error) {
      return { ok: false, error: error.message, code: error.code };
    }
    return { ok: true, count: data ? data.length : 0 };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

/**
 * Saves a new customer order into the Supabase 'orders' table.
 * A new order always has status 'Pending' per hackathon specs.
 */
export async function saveOrderToSupabase(orderData) {
  try {
    const payload = {
      customer_name: orderData.customerName,
      customer_phone: orderData.customerPhone,
      customer_address: orderData.customerAddress,
      dishes: orderData.items,
      items_summary: orderData.itemsSummary,
      total: Number(orderData.total),
      status: 'Pending',
      notes: orderData.notes || '',
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, order: data };
  } catch (err) {
    console.error('Unexpected error saving to Supabase:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetches all orders for the Admin Dashboard
 */
export async function fetchAllOrders() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: err.message, data: [] };
  }
}

/**
 * Updates order status: Pending -> Preparing -> Delivered
 */
export async function updateOrderStatus(orderId, newStatus) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Error updating order status:', error);
      return { success: false, error: error.message };
    }

    return { success: true, order: data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}


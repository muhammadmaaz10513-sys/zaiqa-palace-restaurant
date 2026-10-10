-- ==============================================================================
-- SAYLANI MASS IT TRAINING (SMIT) - ASF CAMPUS HACKATHON
-- Restaurant Website Orders Table Schema for Supabase
-- ==============================================================================

-- 1. Create the 'orders' table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    dishes JSONB NOT NULL,
    items_summary TEXT NOT NULL,
    total NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    notes TEXT DEFAULT ''
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow Anyone (Anon & Authenticated) to Insert new orders
CREATE POLICY "Allow public insert to orders" 
ON public.orders 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- 4. Policy: Allow Anyone (Anon & Authenticated) to View orders (for customer tracking & admin dashboard)
CREATE POLICY "Allow public select from orders" 
ON public.orders 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- 5. Policy: Allow Anyone (Anon & Authenticated) to Update order status (Pending -> Preparing -> Delivered)
CREATE POLICY "Allow public update to orders" 
ON public.orders 
FOR UPDATE 
TO anon, authenticated 
USING (true)
WITH CHECK (true);

-- 6. Insert a sample order for demonstration (Optional)
INSERT INTO public.orders (customer_name, customer_phone, customer_address, dishes, items_summary, total, status)
VALUES (
    'Ali Ahmed',
    '0300-1234567',
    'Flat 402, Block 13-D, Gulshan-e-Iqbal, Karachi',
    '[{"id": "dish-1", "name": "Special Sindhi Dum Biryani", "price": 550, "quantity": 2}, {"id": "dish-4", "name": "Seekh Kabab Platter (4 pcs)", "price": 750, "quantity": 1}]'::jsonb,
    'Special Sindhi Dum Biryani (x2), Seekh Kabab Platter (4 pcs) (x1)',
    1850,
    'Pending'
);


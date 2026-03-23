-- Montrez E-commerce Database Schema
-- Run this in Supabase SQL Editor

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  
  -- Customer information
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  
  -- Shipping information
  shipping_address JSONB NOT NULL,
  -- Expected format: { "street": "...", "city": "...", "postal_code": "...", "province": "..." }
  
  -- Order items
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- Expected format: [{ "product_id": "...", "name": "...", "price": 100, "quantity": 2, "size": "M", "color": "Black", "image": "..." }]
  
  -- Pricing (all in ZAR cents for precision)
  subtotal INTEGER NOT NULL, -- e.g., 50000 = R500.00
  shipping_cost INTEGER NOT NULL DEFAULT 10000, -- R100 flat rate = 10000 cents
  total INTEGER NOT NULL,
  
  -- Payment information
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_id TEXT, -- PayFast transaction ID (m_payment_id)
  payfast_data JSONB, -- Store full PayFast ITN data for audit trail
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes for common queries
  CONSTRAINT order_number_format CHECK (order_number ~ '^MTZ-\d{8}-[A-Z0-9]{5}$')
);

-- Create index on email for order lookup
CREATE INDEX idx_orders_customer_email ON orders(customer_email);

-- Create index on order_number for fast lookups
CREATE INDEX idx_orders_order_number ON orders(order_number);

-- Create index on payment_status for filtering
CREATE INDEX idx_orders_payment_status ON orders(payment_status);

-- Create index on created_at for sorting
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  date_part TEXT;
  random_part TEXT;
  new_order_number TEXT;
  counter INT := 0;
BEGIN
  date_part := TO_CHAR(NOW(), 'YYYYMMDD');
  
  LOOP
    -- Generate 5 random alphanumeric characters
    random_part := UPPER(SUBSTRING(MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT) FROM 1 FOR 5));
    new_order_number := 'MTZ-' || date_part || '-' || random_part;
    
    -- Check if this order number already exists
    IF NOT EXISTS (SELECT 1 FROM orders WHERE order_number = new_order_number) THEN
      RETURN new_order_number;
    END IF;
    
    counter := counter + 1;
    IF counter > 100 THEN
      RAISE EXCEPTION 'Could not generate unique order number after 100 attempts';
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to INSERT orders (for checkout)
CREATE POLICY "Allow public to create orders" ON orders
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow users to view their own orders by email
CREATE POLICY "Allow users to view own orders" ON orders
  FOR SELECT
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email'
         OR current_setting('request.jwt.claims', true)::json->>'role' = 'admin'
         OR auth.role() = 'anon'); -- Allow anonymous reads for order confirmation

-- Policy: Only authenticated admins can UPDATE orders
CREATE POLICY "Allow admins to update orders" ON orders
  FOR UPDATE
  USING (current_setting('request.jwt.claims', true)::json->>'role' = 'admin');

-- Policy: Only authenticated admins can DELETE orders
CREATE POLICY "Allow admins to delete orders" ON orders
  FOR DELETE
  USING (current_setting('request.jwt.claims', true)::json->>'role' = 'admin');

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON orders TO anon, authenticated;
GRANT EXECUTE ON FUNCTION generate_order_number() TO anon, authenticated;

-- Sample query to test
-- SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;

-- Sample insert (for testing)
-- INSERT INTO orders (
--   order_number,
--   customer_email,
--   customer_name,
--   customer_phone,
--   shipping_address,
--   items,
--   subtotal,
--   shipping_cost,
--   total,
--   payment_status
-- ) VALUES (
--   generate_order_number(),
--   'test@example.com',
--   'John Doe',
--   '+27123456789',
--   '{"street": "123 Main St", "city": "Johannesburg", "postal_code": "2001", "province": "Gauteng"}'::jsonb,
--   '[{"product_id": "tee-01", "name": "Classic Tee", "price": 45000, "quantity": 2, "size": "L", "color": "Black"}]'::jsonb,
--   90000,
--   10000,
--   100000,
--   'pending'
-- );

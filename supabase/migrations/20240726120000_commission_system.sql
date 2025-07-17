-- Create the commission type enum
CREATE TYPE commission_type AS ENUM ('rent', 'sale');

-- Create the commissions table
CREATE TABLE commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES users(id),
    booking_id UUID REFERENCES bookings(id) NOT NULL,
    amount NUMERIC NOT NULL,
    type commission_type NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add the transaction_type to the bookings table
ALTER TABLE bookings
ADD COLUMN transaction_type commission_type;

-- Insert the commission rates into the settings table
INSERT INTO settings (key, value)
VALUES
    ('rent_commission_rate', '{"value": "0.05"}'),
    ('sale_commission_rate', '{"value": "0.03"}');

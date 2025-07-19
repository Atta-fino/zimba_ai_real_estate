CREATE TABLE flexpay_plans (
    id SERIAL PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) NOT NULL,
    due_date DATE NOT NULL,
    amount NUMERIC NOT NULL,
    paid BOOLEAN NOT NULL DEFAULT FALSE
);

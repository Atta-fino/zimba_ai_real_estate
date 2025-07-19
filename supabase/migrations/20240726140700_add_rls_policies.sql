-- Enable RLS for all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE landlord_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_score_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE biometric_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE flexpay_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;

-- users
CREATE POLICY "Users can only access their own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- properties
CREATE POLICY "Landlords can access their own listings" ON properties
    FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "All users can view all properties" ON properties
    FOR SELECT USING (true);

-- bookings
CREATE POLICY "Users can access their own bookings" ON bookings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Landlords can access bookings for their properties" ON bookings
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM properties
        WHERE properties.id = bookings.property_id AND properties.owner_id = auth.uid()
    ));

-- payments
CREATE POLICY "Users can access their own payments" ON payments
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM bookings
        WHERE bookings.id = payments.booking_id AND bookings.user_id = auth.uid()
    ));

CREATE POLICY "Landlords can access payments for their properties" ON payments
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM bookings
        JOIN properties ON bookings.property_id = properties.id
        WHERE payments.booking_id = bookings.id AND properties.owner_id = auth.uid()
    ));

-- commissions
CREATE POLICY "Agents can view their own commissions" ON commissions
    FOR SELECT USING (auth.uid() = agent_id);

-- withdrawals
CREATE POLICY "Agents can access their own withdrawals" ON withdrawals
    FOR SELECT USING (auth.uid() = agent_id);

-- Allow admin full access
CREATE POLICY "Admin has full access" ON users FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON properties FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON bookings FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON payments FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON landlord_verifications FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON flags FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON commissions FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON referrals FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON legal_guides FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON analytics_events FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON settings FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON countries FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON trust_scores FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON trust_score_history FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON biometric_verifications FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON flexpay_plans FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admin has full access" ON withdrawals FOR ALL USING (is_admin(auth.uid()));

-- bookings
CREATE POLICY "Users with a high enough TrustScore can create bookings" ON bookings
    FOR INSERT WITH CHECK (get_trust_score(auth.uid()) > 50);

-- Helper function to check for admin role
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM users
    WHERE id = user_id AND role = 'admin'
  );
$$ LANGUAGE sql;

-- Helper function to get a user's trust score
CREATE OR REPLACE FUNCTION get_trust_score(user_id UUID)
RETURNS INT AS $$
  SELECT score FROM trust_scores
  WHERE trust_scores.user_id = user_id;
$$ LANGUAGE sql;

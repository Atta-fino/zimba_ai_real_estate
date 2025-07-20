CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected', 'flagged');

CREATE TABLE biometric_verifications (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    id_image_url TEXT NOT NULL,
    biometric_data TEXT NOT NULL,
    metadata JSONB,
    status verification_status NOT NULL DEFAULT 'pending',
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

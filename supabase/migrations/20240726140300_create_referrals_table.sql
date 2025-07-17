CREATE TABLE referrals (
    id SERIAL PRIMARY KEY,
    inviter_id UUID REFERENCES users(id) NOT NULL,
    invitee_id UUID REFERENCES users(id),
    invitee_email TEXT NOT NULL,
    reward_earned BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    agent_id UUID REFERENCES users(id) NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

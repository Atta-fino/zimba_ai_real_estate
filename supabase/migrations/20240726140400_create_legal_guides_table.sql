CREATE TABLE legal_guides (
    id SERIAL PRIMARY KEY,
    country_code TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

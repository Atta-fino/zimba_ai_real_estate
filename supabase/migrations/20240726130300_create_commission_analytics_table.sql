CREATE TABLE commission_analytics (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    total_commission NUMERIC NOT NULL,
    platform_commission NUMERIC NOT NULL,
    agent_commission NUMERIC NOT NULL,
    total_transactions INTEGER NOT NULL
);

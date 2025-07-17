CREATE TYPE commission_for AS ENUM ('platform', 'agent');

ALTER TABLE commissions
ADD COLUMN commission_for commission_for NOT NULL DEFAULT 'platform';

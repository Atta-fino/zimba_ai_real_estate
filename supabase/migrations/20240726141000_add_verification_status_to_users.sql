ALTER TABLE users
ADD COLUMN verification_status verification_status NOT NULL DEFAULT 'pending';

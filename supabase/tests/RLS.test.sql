-- Test RLS policies for ratings table
-- This test should be run as a non-admin user

-- Test that a user can insert their own rating
INSERT INTO ratings (agent_id, user_id, rating, comment)
VALUES ('<agent_id>', auth.uid(), 5, 'Great agent!');

-- Test that a user cannot insert a rating for another user
-- This should fail
INSERT INTO ratings (agent_id, user_id, rating, comment)
VALUES ('<agent_id>', '<other_user_id>', 5, 'Great agent!');

-- Test that a user can view all ratings
SELECT * FROM ratings;

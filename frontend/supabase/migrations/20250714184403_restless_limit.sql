/*
  # Create upload sessions table

  1. New Tables
    - `upload_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `filename` (text, original filename)
      - `row_count` (integer, number of data rows)
      - `uploaded_at` (timestamp)

  2. Security
    - Enable RLS on `upload_sessions` table
    - Add policy for users to manage their own upload sessions
*/

CREATE TABLE IF NOT EXISTS upload_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  filename text,
  row_count integer,
  uploaded_at timestamptz DEFAULT now()
);

ALTER TABLE upload_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own upload sessions"
  ON upload_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
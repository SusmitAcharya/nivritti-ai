/*
  # Create AI outputs table

  1. New Tables
    - `ai_outputs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `session_id` (uuid, foreign key to upload_sessions)
      - `output_type` (text, type of AI analysis)
      - `result` (jsonb, AI analysis results)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `ai_outputs` table
    - Add policy for users to read their own AI outputs
*/

CREATE TABLE IF NOT EXISTS ai_outputs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id uuid REFERENCES upload_sessions(id) ON DELETE CASCADE,
  output_type text,
  result jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_outputs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own AI outputs"
  ON ai_outputs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert AI outputs"
  ON ai_outputs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
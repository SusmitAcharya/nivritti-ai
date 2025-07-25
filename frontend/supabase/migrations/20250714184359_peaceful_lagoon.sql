/*
  # Create questionnaire responses table

  1. New Tables
    - `questionnaire_responses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `response` (jsonb, stores questionnaire data)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `questionnaire_responses` table
    - Add policy for users to read/write their own responses
*/

CREATE TABLE IF NOT EXISTS questionnaire_responses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  response jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own questionnaire responses"
  ON questionnaire_responses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
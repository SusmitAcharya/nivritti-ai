/*
  # Create storage bucket for business data files

  1. Storage
    - Create `business-data` bucket for CSV/Excel uploads
    - Set up RLS policies for file access

  2. Security
    - Users can only access their own files
    - Files are organized by user_id folders
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('business-data', 'business-data', false)
ON CONFLICT (id) DO NOTHING;

-- Create policy for users to upload their own files
CREATE POLICY "Users can upload their own business data"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'business-data' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Create policy for users to read their own files
CREATE POLICY "Users can read their own business data"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'business-data' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Create policy for users to delete their own files
CREATE POLICY "Users can delete their own business data"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'business-data' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
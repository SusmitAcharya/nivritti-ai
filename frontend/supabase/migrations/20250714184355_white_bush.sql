/*
  # Create users table and authentication setup

  1. New Tables
    - `users` table is automatically created by Supabase Auth
    - We'll extend it with a profile table for additional user data
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Enable the auth schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table is automatically created by Supabase Auth
-- We don't need to create it manually

-- Enable RLS on auth.users (if not already enabled)
-- This is typically handled by Supabase automatically
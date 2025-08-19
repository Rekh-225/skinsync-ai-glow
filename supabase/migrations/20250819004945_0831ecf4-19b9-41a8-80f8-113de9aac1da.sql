-- Fix security vulnerability in profiles table
-- Ensure complete protection of customer contact information (email, phone)

-- First, let's ensure RLS is enabled (should already be enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them with stronger security
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;

-- Create comprehensive RLS policies with explicit restrictions
-- 1. INSERT policy - users can only create profiles for themselves
CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() = user_id 
  AND user_id IS NOT NULL
);

-- 2. SELECT policy - users can only view their own profile data
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  auth.uid() = user_id 
  AND user_id IS NOT NULL
);

-- 3. UPDATE policy - users can only update their own profile
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (
  auth.uid() = user_id 
  AND user_id IS NOT NULL
)
WITH CHECK (
  auth.uid() = user_id 
  AND user_id IS NOT NULL
);

-- 4. DELETE policy - users can only delete their own profile
CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
TO authenticated
USING (
  auth.uid() = user_id 
  AND user_id IS NOT NULL
);

-- Ensure no public access by explicitly denying access to anonymous users
-- This prevents any potential bypass of authentication
CREATE POLICY "Deny all access to anonymous users" 
ON public.profiles 
FOR ALL 
TO anon
USING (false);

-- Add constraint to ensure user_id is never null (data integrity)
ALTER TABLE public.profiles 
ALTER COLUMN user_id SET NOT NULL;

-- Add unique constraint to prevent duplicate profiles per user
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);
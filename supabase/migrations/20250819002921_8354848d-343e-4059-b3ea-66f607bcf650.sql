-- Fix security vulnerability in reminders table RLS policies
-- Remove policies that allow public access to email addresses

-- Drop existing vulnerable policies
DROP POLICY IF EXISTS "Users can view their own reminders" ON public.reminders;
DROP POLICY IF EXISTS "Users can update their own reminders" ON public.reminders;
DROP POLICY IF EXISTS "Anyone can create reminders" ON public.reminders;

-- Create secure policies that require authentication
CREATE POLICY "Authenticated users can create their own reminders" 
ON public.reminders 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view only their own reminders" 
ON public.reminders 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update only their own reminders" 
ON public.reminders 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Optional: Add policy for anonymous users to create reminders (if needed for functionality)
-- This allows creation without exposing existing data
CREATE POLICY "Anonymous users can create reminders for themselves" 
ON public.reminders 
FOR INSERT 
TO anon
WITH CHECK (user_id IS NULL OR auth.uid() = user_id);
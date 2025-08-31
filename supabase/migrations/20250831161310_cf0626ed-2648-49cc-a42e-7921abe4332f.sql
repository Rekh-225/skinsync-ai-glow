-- Fix security vulnerability: Restrict anonymous users to their own session data only

-- Drop existing problematic policies for chat_sessions
DROP POLICY IF EXISTS "Users can view their own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can update their own chat sessions" ON public.chat_sessions;

-- Create secure policies for chat_sessions
CREATE POLICY "Authenticated users can view their own chat sessions" 
ON public.chat_sessions 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Anonymous users can view their own session data" 
ON public.chat_sessions 
FOR SELECT 
USING (auth.uid() IS NULL AND user_id IS NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id');

CREATE POLICY "Authenticated users can update their own chat sessions" 
ON public.chat_sessions 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Anonymous users can update their own session data" 
ON public.chat_sessions 
FOR UPDATE 
USING (auth.uid() IS NULL AND user_id IS NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id');

-- Drop existing problematic policies for quiz_responses
DROP POLICY IF EXISTS "Users can view their own quiz responses" ON public.quiz_responses;

-- Create secure policies for quiz_responses
CREATE POLICY "Authenticated users can view their own quiz responses" 
ON public.quiz_responses 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Anonymous users can view their own session quiz responses" 
ON public.quiz_responses 
FOR SELECT 
USING (auth.uid() IS NULL AND user_id IS NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id');

-- Drop existing problematic policies for personalized_routines
DROP POLICY IF EXISTS "Users can view their own personalized routines" ON public.personalized_routines;

-- Create secure policies for personalized_routines
CREATE POLICY "Authenticated users can view their own personalized routines" 
ON public.personalized_routines 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Anonymous users can view their own session routines" 
ON public.personalized_routines 
FOR SELECT 
USING (auth.uid() IS NULL AND user_id IS NULL AND 
       quiz_response_id IN (
         SELECT id FROM public.quiz_responses 
         WHERE session_id = current_setting('request.headers', true)::json->>'x-session-id' 
         AND user_id IS NULL
       ));
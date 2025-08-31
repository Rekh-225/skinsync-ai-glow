-- Update RLS policies to use a more reliable approach for session-based access

-- Drop current anonymous session policies and create simpler ones
DROP POLICY IF EXISTS "Anonymous users can view their own session data" ON public.chat_sessions;
DROP POLICY IF EXISTS "Anonymous users can update their own session data" ON public.chat_sessions;
DROP POLICY IF EXISTS "Anonymous users can view their own session quiz responses" ON public.quiz_responses;
DROP POLICY IF EXISTS "Anonymous users can view their own session routines" ON public.personalized_routines;

-- For chat_sessions: Allow anonymous users to access data by session_id match
CREATE POLICY "Anonymous users can access their session data" 
ON public.chat_sessions 
FOR ALL
USING (
  CASE 
    WHEN auth.uid() IS NOT NULL THEN auth.uid() = user_id
    ELSE user_id IS NULL
  END
);

-- For quiz_responses: Allow anonymous users to access their session data
CREATE POLICY "Anonymous users can access their session quiz responses" 
ON public.quiz_responses 
FOR ALL
USING (
  CASE 
    WHEN auth.uid() IS NOT NULL THEN auth.uid() = user_id
    ELSE user_id IS NULL
  END
);

-- For personalized_routines: Allow anonymous users to access their session routines
CREATE POLICY "Anonymous users can access their session routines" 
ON public.personalized_routines 
FOR ALL
USING (
  CASE 
    WHEN auth.uid() IS NOT NULL THEN auth.uid() = user_id
    ELSE user_id IS NULL
  END
);
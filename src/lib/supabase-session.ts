import { supabase } from "@/integrations/supabase/client";
import { getOrCreateSessionId } from "./session";

// Helper functions for session-aware database operations

export const insertQuizResponse = async (quizData: any) => {
  const sessionId = getOrCreateSessionId();
  
  const { data, error } = await supabase
    .from('quiz_responses')
    .insert({
      ...quizData,
      session_id: sessionId,
      user_id: (await supabase.auth.getUser()).data.user?.id || null
    })
    .select()
    .single();
    
  return { data, error };
};

export const getQuizResponsesBySession = async () => {
  const sessionId = getOrCreateSessionId();
  const user = (await supabase.auth.getUser()).data.user;
  
  let query = supabase.from('quiz_responses').select('*');
  
  if (user) {
    // Authenticated user - get their data
    query = query.eq('user_id', user.id);
  } else {
    // Anonymous user - get by session ID
    query = query.eq('session_id', sessionId).is('user_id', null);
  }
  
  return await query;
};

export const insertPersonalizedRoutine = async (routineData: any, quizResponseId: string) => {
  const sessionId = getOrCreateSessionId();
  
  const { data, error } = await supabase
    .from('personalized_routines')
    .insert({
      ...routineData,
      quiz_response_id: quizResponseId,
      user_id: (await supabase.auth.getUser()).data.user?.id || null
    })
    .select()
    .single();
    
  return { data, error };
};

export const getPersonalizedRoutinesBySession = async () => {
  const sessionId = getOrCreateSessionId();
  const user = (await supabase.auth.getUser()).data.user;
  
  let query = supabase.from('personalized_routines').select('*');
  
  if (user) {
    // Authenticated user - get their data
    query = query.eq('user_id', user.id);
  } else {
    // Anonymous user - get by session ID through quiz_responses
    const { data: quizResponses } = await supabase
      .from('quiz_responses')
      .select('id')
      .eq('session_id', sessionId)
      .is('user_id', null);
      
    if (quizResponses && quizResponses.length > 0) {
      const quizIds = quizResponses.map(q => q.id);
      query = query.in('quiz_response_id', quizIds).is('user_id', null);
    } else {
      // No quiz responses found, return empty result
      return { data: [], error: null };
    }
  }
  
  return await query;
};

export const insertChatSession = async (sessionData: any) => {
  const sessionId = getOrCreateSessionId();
  
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({
      ...sessionData,
      session_id: sessionId,
      user_id: (await supabase.auth.getUser()).data.user?.id || null
    })
    .select()
    .single();
    
  return { data, error };
};

export const getChatSessionsBySession = async () => {
  const sessionId = getOrCreateSessionId();
  const user = (await supabase.auth.getUser()).data.user;
  
  let query = supabase.from('chat_sessions').select('*');
  
  if (user) {
    // Authenticated user - get their data
    query = query.eq('user_id', user.id);
  } else {
    // Anonymous user - get by session ID
    query = query.eq('session_id', sessionId).is('user_id', null);
  }
  
  return await query;
};
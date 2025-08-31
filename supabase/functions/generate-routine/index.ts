import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { quizResults, sessionId } = await req.json();
    console.log('Generating routine for:', quizResults);

    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    if (!openRouterApiKey) {
      throw new Error('⚠️ Please add a valid OpenRouter API key in project secrets.');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create detailed prompt for AI routine generation
    const systemPrompt = `You are a professional dermatologist and skincare expert. Based on the user's quiz results, generate a detailed, personalized skincare routine and recommendations.

User's Profile:
- Skin Type: ${quizResults.skinType}
- Climate: ${quizResults.climate}
- Diet Habits: ${quizResults.dietHabits}
- Main Concerns: ${quizResults.concerns}

Provide a comprehensive response in the following JSON format:
{
  "personalizedRoutine": {
    "morning": [
      "detailed step with specific product recommendations"
    ],
    "evening": [
      "detailed step with specific product recommendations"
    ],
    "weekly": [
      "special treatments or masks to use weekly"
    ]
  },
  "keyRecommendations": [
    "personalized tips based on their specific profile"
  ],
  "dietSuggestions": [
    "dietary recommendations that complement their skincare routine"
  ],
  "lifestyleTips": [
    "lifestyle adjustments based on their climate and concerns"
  ],
  "productIngredients": {
    "beneficial": ["ingredients to look for"],
    "avoid": ["ingredients to avoid"]
  },
  "timelineExpectations": "realistic timeline for seeing results",
  "additionalNotes": "any special considerations or warnings"
}

Make the routine highly specific to their profile. Consider their climate when suggesting products and application frequency. Address their main concerns directly with targeted treatments.`;

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'SkinSync',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate a personalized skincare routine for my profile.` }
        ],
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API Error:', errorData);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const aiRecommendations = data.choices[0].message.content;
    
    let routineData;
    try {
      routineData = JSON.parse(aiRecommendations);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiRecommendations);
      // Fallback to a structured response
      routineData = {
        personalizedRoutine: {
          morning: ["Gentle cleanser", "Moisturizer", "SPF 30+"],
          evening: ["Cleanser", "Treatment serum", "Night moisturizer"],
          weekly: ["Gentle exfoliation once per week"]
        },
        keyRecommendations: [aiRecommendations],
        timelineExpectations: "4-6 weeks for initial improvements"
      };
    }

    // Save quiz response to database
    const { data: quizResponse, error: quizError } = await supabase
      .from('quiz_responses')
      .insert({
        session_id: sessionId,
        skin_type: quizResults.skinType,
        climate: quizResults.climate,
        diet_habits: quizResults.dietHabits,
        concerns: quizResults.concerns,
        user_id: null // Allow anonymous users
      })
      .select()
      .single();

    if (quizError) {
      console.error('Error saving quiz response:', quizError);
      throw new Error('Failed to save quiz response');
    }

    // Save personalized routine
    const { data: personalizedRoutine, error: routineError } = await supabase
      .from('personalized_routines')
      .insert({
        quiz_response_id: quizResponse.id,
        routine_data: routineData,
        ai_recommendations: aiRecommendations,
        user_id: null // Allow anonymous users
      })
      .select()
      .single();

    if (routineError) {
      console.error('Error saving personalized routine:', routineError);
      throw new Error('Failed to save personalized routine');
    }

    return new Response(JSON.stringify({
      success: true,
      quizResponseId: quizResponse.id,
      routineId: personalizedRoutine.id,
      routineData: routineData,
      aiRecommendations: aiRecommendations
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-routine function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
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
    const { ingredients, quizResults } = await req.json();
    console.log('Analyzing ingredients:', ingredients, 'with quiz results:', quizResults);

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const systemPrompt = `You are a professional dermatologist and skincare expert. Analyze the provided skincare ingredients for this specific user profile.

User's Profile:
- Skin Type: ${quizResults?.skinType || 'Not specified'}
- Climate: ${quizResults?.climate || 'Not specified'}  
- Diet Habits: ${quizResults?.dietHabits || 'Not specified'}
- Main Concerns: ${quizResults?.concerns || 'Not specified'}

Analyze these ingredients: ${ingredients.join(', ')}

Provide a comprehensive response in JSON format:
{
  "overallAssessment": {
    "compatibility": "excellent/good/caution/poor",
    "suitabilityForProfile": "detailed explanation of how well these ingredients match the user's skin type and concerns",
    "riskLevel": "low/medium/high"
  },
  "ingredientAnalysis": [
    {
      "name": "ingredient name",
      "safety": "safe/caution/avoid",
      "personalizedRecommendation": "specific advice for this user's profile",
      "benefits": ["list of benefits for this skin type"],
      "concerns": ["list of concerns for this skin type"],
      "interactionsWith": ["other ingredients in the list it may interact with"]
    }
  ],
  "personalizedAdvice": {
    "recommendedUsage": "how to use these ingredients given user's profile",
    "precautions": ["specific precautions for this user"],
    "alternatives": ["better ingredient alternatives if needed"],
    "routineIntegration": "how to integrate these into their existing routine"
  },
  "climateConsiderations": "advice specific to their climate",
  "dietarySupport": "how their diet habits complement or conflict with these ingredients"
}

Be specific about interactions between ingredients and provide personalized advice based on their exact profile.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze these ingredients for my specific skin profile and provide personalized recommendations.` }
        ],
        max_completion_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiAnalysis = data.choices[0].message.content;
    
    let analysisData;
    try {
      analysisData = JSON.parse(aiAnalysis);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiAnalysis);
      // Fallback structured response
      analysisData = {
        overallAssessment: {
          compatibility: "caution",
          suitabilityForProfile: aiAnalysis,
          riskLevel: "medium"
        },
        ingredientAnalysis: ingredients.map((ingredient: string) => ({
          name: ingredient,
          safety: "caution",
          personalizedRecommendation: "Consult with a dermatologist for personalized advice",
          benefits: [],
          concerns: ["AI analysis unavailable"],
          interactionsWith: []
        })),
        personalizedAdvice: {
          recommendedUsage: "Use with caution and monitor skin response",
          precautions: ["Patch test before use"],
          alternatives: [],
          routineIntegration: "Introduce one ingredient at a time"
        }
      };
    }

    return new Response(JSON.stringify({
      success: true,
      analysis: analysisData,
      ingredientsAnalyzed: ingredients
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-ingredients function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
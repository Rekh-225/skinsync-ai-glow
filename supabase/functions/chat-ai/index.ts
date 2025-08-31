import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, context } = await req.json()
    
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY')
    if (!openRouterApiKey) {
      throw new Error('⚠️ Please add a valid OpenRouter API key in project secrets.')
    }

    const systemPrompt = `You are SkinSync's AI assistant, an expert in skincare, nutrition, and grooming. 

Key guidelines:
- Keep responses concise and actionable (max 200 words)
- Focus on evidence-based advice
- Be friendly and supportive
- For ingredient questions, provide safety info and skin type compatibility
- For routine questions, ask about skin type first if not provided
- For diet questions, emphasize skin-healthy foods
- Always remind users to patch test new products
- If unsure, recommend consulting a dermatologist

Context about the user: ${context || 'No specific context provided'}

Respond in a helpful, encouraging tone suitable for young adults and students.`

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
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OpenRouter API error: ${error}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to get AI response',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
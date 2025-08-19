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
    // Mock skincare articles from trusted sources for demonstration
    // In production, you would integrate with actual news APIs
    const mockArticles = [
      {
        id: "1",
        title: "New Study Reveals the Benefits of Niacinamide for Acne-Prone Skin",
        summary: "Recent research from the Journal of Dermatology shows that 5% niacinamide significantly reduces acne lesions and improves skin texture over 12 weeks.",
        source: "Journal of Dermatology",
        url: "https://example.com/niacinamide-study",
        published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        skin_types: ["oily", "acne-prone"],
        tags: ["niacinamide", "acne", "research"]
      },
      {
        id: "2", 
        title: "Breakthrough in Anti-Aging: Bakuchiol as Natural Retinol Alternative",
        summary: "Clinical trials demonstrate that bakuchiol provides similar anti-aging benefits to retinol without the side effects, making it ideal for sensitive skin.",
        source: "Dermatology Research",
        url: "https://example.com/bakuchiol-study",
        published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400",
        skin_types: ["sensitive", "mature"],
        tags: ["anti-aging", "bakuchiol", "natural"]
      },
      {
        id: "3",
        title: "Microbiome Research: How Probiotics Transform Skin Health",
        summary: "Scientists discover that topical probiotics can restore skin barrier function and reduce inflammation in patients with eczema and rosacea.",
        source: "Nature Skincare",
        url: "https://example.com/probiotics-skin",
        published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
        skin_types: ["sensitive", "dry"],
        tags: ["probiotics", "microbiome", "barrier-repair"]
      },
      {
        id: "4",
        title: "Vitamin C Stability: New Formulation Breakthrough",
        summary: "Researchers develop a new stable form of vitamin C that maintains potency for 24 months, revolutionizing antioxidant skincare.",
        source: "Cosmetic Science Journal",
        url: "https://example.com/vitamin-c-breakthrough",
        published_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1556909114-4f7c6c5b8b6b?w=400",
        skin_types: ["all"],
        tags: ["vitamin-c", "antioxidants", "formulation"]
      },
      {
        id: "5",
        title: "Sunscreen Innovation: Mineral vs Chemical Protection Study",
        summary: "Comprehensive analysis of 200+ sunscreens reveals which formulations provide the best protection for different skin types and environmental conditions.",
        source: "Photodermatology Review",
        url: "https://example.com/sunscreen-study",
        published_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1559757175-4b67d4fbc5a5?w=400",
        skin_types: ["all"],
        tags: ["sunscreen", "protection", "mineral", "chemical"]
      },
      {
        id: "6",
        title: "Diet and Acne: Mediterranean Diet Shows Promising Results",
        summary: "12-week study demonstrates that Mediterranean diet rich in omega-3s and antioxidants significantly reduces inflammatory acne lesions.",
        source: "Nutritional Dermatology",
        url: "https://example.com/diet-acne-study",
        published_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
        skin_types: ["acne-prone", "oily"],
        tags: ["diet", "nutrition", "acne", "anti-inflammatory"]
      }
    ];

    // In real implementation, you would:
    // 1. Call news APIs like NewsAPI, Google News API, or RSS feeds
    // 2. Filter for skincare-related content
    // 3. Cache results to avoid rate limits
    // 4. Store in database for faster retrieval

    console.log('Fetching latest skincare articles...');
    
    return new Response(
      JSON.stringify({ 
        articles: mockArticles,
        lastUpdated: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error fetching articles:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch articles',
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
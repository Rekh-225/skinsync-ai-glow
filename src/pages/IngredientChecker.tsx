import { useState } from "react";
import { Search, CheckCircle, AlertTriangle, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface IngredientResult {
  name: string;
  safety: "safe" | "caution" | "avoid";
  skinTypes: string[];
  benefits: string[];
  concerns: string[];
  description: string;
}

const IngredientChecker = () => {
  const [ingredient, setIngredient] = useState("");
  const [result, setResult] = useState<IngredientResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock ingredient database - in real implementation, this would be an API call
  const ingredientDatabase: { [key: string]: IngredientResult } = {
    "salicylic acid": {
      name: "Salicylic Acid",
      safety: "caution",
      skinTypes: ["oily", "acne-prone"],
      benefits: ["Unclogs pores", "Reduces blackheads", "Anti-inflammatory", "Gentle exfoliation"],
      concerns: ["Can be drying", "May cause irritation in sensitive skin", "Start with low concentration"],
      description: "A beta hydroxy acid (BHA) that penetrates pores to remove dead skin cells and excess oil. Excellent for acne-prone and oily skin types."
    },
    "hyaluronic acid": {
      name: "Hyaluronic Acid",
      safety: "safe",
      skinTypes: ["all", "dry", "sensitive", "oily", "combination"],
      benefits: ["Intense hydration", "Plumps skin", "Suitable for all skin types", "Non-comedogenic"],
      concerns: [],
      description: "A powerful humectant that can hold up to 1000 times its weight in water. Safe and beneficial for all skin types."
    },
    "retinol": {
      name: "Retinol",
      safety: "caution",
      skinTypes: ["mature", "acne-prone"],
      benefits: ["Anti-aging", "Reduces fine lines", "Improves skin texture", "Helps with acne"],
      concerns: ["Can cause irritation", "Increases sun sensitivity", "Not for sensitive skin", "Start slowly"],
      description: "A form of vitamin A that accelerates cell turnover. Powerful anti-aging ingredient but requires careful introduction."
    },
    "niacinamide": {
      name: "Niacinamide",
      safety: "safe",
      skinTypes: ["all", "oily", "sensitive", "acne-prone"],
      benefits: ["Reduces oil production", "Minimizes pores", "Anti-inflammatory", "Brightens skin"],
      concerns: [],
      description: "Also known as vitamin B3, this gentle ingredient helps regulate oil production and is suitable for all skin types, including sensitive skin."
    },
    "vitamin c": {
      name: "Vitamin C",
      safety: "safe",
      skinTypes: ["all", "dull", "aging"],
      benefits: ["Antioxidant protection", "Brightens skin", "Boosts collagen", "Fades dark spots"],
      concerns: ["Choose stable forms", "May irritate sensitive skin in high concentrations"],
      description: "A powerful antioxidant that protects against environmental damage and promotes collagen production."
    },
    "fragrance": {
      name: "Fragrance/Parfum",
      safety: "avoid",
      skinTypes: ["sensitive"],
      benefits: [],
      concerns: ["Common allergen", "Can cause irritation", "No skincare benefits", "Avoid if sensitive"],
      description: "Added for scent but offers no skincare benefits and is a common cause of skin irritation and allergic reactions."
    }
  };

  const handleSearch = async () => {
    if (!ingredient.trim()) {
      toast.error("Please enter an ingredient to check");
      return;
    }

    setIsLoading(true);
    
    try {
      const searchKey = ingredient.toLowerCase().trim();
      const found = ingredientDatabase[searchKey];
      
      if (found) {
        setResult(found);
        toast.success("Ingredient information found!");
      } else {
        // Try AI-powered ingredient analysis
        try {
          const { supabase } = await import("@/integrations/supabase/client");
          const response = await supabase.functions.invoke('chat-ai', {
            body: {
              message: `Analyze the skincare ingredient "${ingredient}". Provide: 1) Safety level (safe/caution/avoid), 2) Suitable skin types, 3) Main benefits, 4) Potential concerns, 5) Brief description. Be concise and evidence-based.`,
              context: "Ingredient analysis for skincare safety"
            },
          });

          if (!response.error) {
            const data = response.data;
            // Parse AI response into structured format
            setResult({
              name: ingredient,
              safety: "caution", // Default to caution for unknown ingredients
              skinTypes: [],
              benefits: [],
              concerns: ["AI-analyzed ingredient", "Consult a dermatologist for personalized advice"],
              description: data.response || "AI analysis of this ingredient. Please consult a skincare professional for personalized advice."
            });
            toast.success("AI analysis completed!");
          } else {
            throw new Error("AI analysis failed");
          }
        } catch (aiError) {
          // Fallback to generic response
          setResult({
            name: ingredient,
            safety: "caution",
            skinTypes: [],
            benefits: [],
            concerns: ["Ingredient not found in database", "Consult a dermatologist for specific advice"],
            description: "This ingredient is not in our database. For personalized advice about this ingredient, please consult with a dermatologist or skincare professional."
          });
          toast.info("Showing general advice - AI analysis unavailable");
        }
      }
    } catch (error) {
      toast.error("Error checking ingredient. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getSafetyIcon = (safety: string) => {
    switch (safety) {
      case "safe":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "caution":
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case "avoid":
        return <AlertTriangle className="w-6 h-6 text-red-600" />;
      default:
        return <Info className="w-6 h-6 text-gray-600" />;
    }
  };

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case "safe":
        return "border-green-200 bg-green-50";
      case "caution":
        return "border-yellow-200 bg-yellow-50";
      case "avoid":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const commonIngredients = [
    "Salicylic Acid", "Hyaluronic Acid", "Retinol", "Niacinamide", 
    "Vitamin C", "Glycolic Acid", "Ceramides", "Peptides", "Fragrance"
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center shadow-medium">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Ingredient Checker</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check if skincare ingredients are suitable for your skin type and learn about their benefits and potential concerns
          </p>
        </div>

        {/* Search Section */}
        <Card className="shadow-medium mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2 text-primary" />
              Search Ingredient
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-4">
              <Input
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                placeholder="Enter ingredient name (e.g., Salicylic Acid, Retinol, Hyaluronic Acid)"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                className="btn-hero px-8"
              >
                {isLoading ? "Checking..." : "Check"}
              </Button>
            </div>
            
            {/* Common Ingredients */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Popular ingredients to check:</p>
              <div className="flex flex-wrap gap-2">
                {commonIngredients.map((ing) => (
                  <Badge
                    key={ing}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setIngredient(ing)}
                  >
                    {ing}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <Card className={`shadow-medium ${getSafetyColor(result.safety)}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{result.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  {getSafetyIcon(result.safety)}
                  <Badge 
                    variant={result.safety === "safe" ? "default" : result.safety === "caution" ? "secondary" : "destructive"}
                    className="capitalize"
                  >
                    {result.safety === "safe" ? "Generally Safe" : result.safety === "caution" ? "Use with Caution" : "Avoid if Sensitive"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Description */}
              <div>
                <p className="text-muted-foreground leading-relaxed">{result.description}</p>
              </div>

              {/* Skin Types */}
              {result.skinTypes.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Suitable for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.skinTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="capitalize">
                        {type} skin
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Benefits */}
                {result.benefits.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-800 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {result.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <div className="w-2 h-2 rounded-full bg-green-600 mr-2 mt-2"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Concerns */}
                {result.concerns.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-orange-800 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      {result.safety === "avoid" ? "Concerns" : "Precautions"}
                    </h4>
                    <ul className="space-y-2">
                      {result.concerns.map((concern, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <div className="w-2 h-2 rounded-full bg-orange-600 mr-2 mt-2"></div>
                          {concern}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Recommendation */}
              <div className="p-4 bg-white/50 rounded-lg border">
                <h4 className="font-semibold mb-2 text-primary">💡 Our Recommendation:</h4>
                <p className="text-sm text-muted-foreground">
                  {result.safety === "safe" 
                    ? "This ingredient is generally well-tolerated by most skin types. Start with a lower concentration if you're new to it."
                    : result.safety === "caution"
                    ? "This ingredient can be beneficial but requires careful introduction. Start with a low concentration, use 2-3 times per week initially, and always use sunscreen during the day."
                    : "This ingredient may cause irritation, especially for sensitive skin types. Consider alternatives or consult a dermatologist before use."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Educational Section */}
        <Card className="mt-8 shadow-soft">
          <CardHeader>
            <CardTitle>How to Use This Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Getting Started</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Copy ingredient names from product labels</li>
                  <li>• Search one ingredient at a time</li>
                  <li>• Check each active ingredient in your routine</li>
                  <li>• Take note of any cautions or warnings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-secondary">Important Notes</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Always patch test new ingredients</li>
                  <li>• Start with lower concentrations</li>
                  <li>• Consult a dermatologist for specific concerns</li>
                  <li>• This tool provides general guidance only</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IngredientChecker;
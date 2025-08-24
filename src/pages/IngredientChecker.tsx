import { useState, useEffect } from "react";
import { Search, CheckCircle, AlertTriangle, Info, Sparkles, Users, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
interface IngredientAnalysis {
  name: string;
  safety: "safe" | "caution" | "avoid";
  personalizedRecommendation: string;
  benefits: string[];
  concerns: string[];
  interactionsWith: string[];
}
interface OverallAssessment {
  compatibility: "excellent" | "good" | "caution" | "poor";
  suitabilityForProfile: string;
  riskLevel: "low" | "medium" | "high";
}
interface PersonalizedAdvice {
  recommendedUsage: string;
  precautions: string[];
  alternatives: string[];
  routineIntegration: string;
}
interface AnalysisResult {
  overallAssessment: OverallAssessment;
  ingredientAnalysis: IngredientAnalysis[];
  personalizedAdvice: PersonalizedAdvice;
  climateConsiderations?: string;
  dietarySupport?: string;
}
interface QuizResults {
  skinType: string;
  climate: string;
  dietHabits: string;
  concerns: string;
}
const IngredientChecker = () => {
  const [ingredientsText, setIngredientsText] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  useEffect(() => {
    // Load quiz results from localStorage if available
    const savedQuizResults = JSON.parse(localStorage.getItem("skinSyncQuizResults") || "null");
    const savedPersonalizedData = JSON.parse(localStorage.getItem("skinSyncPersonalizedRoutine") || "null");
    if (savedQuizResults) {
      setQuizResults(savedQuizResults);
    } else if (savedPersonalizedData?.quizResults) {
      setQuizResults(savedPersonalizedData.quizResults);
    }
  }, []);
  const parseIngredients = (text: string): string[] => {
    return text.split(/[,\n]/).map(ingredient => ingredient.trim()).filter(ingredient => ingredient.length > 0);
  };
  const handleAnalyze = async () => {
    if (!ingredientsText.trim()) {
      toast.error("Please enter ingredients to analyze");
      return;
    }
    const ingredients = parseIngredients(ingredientsText);
    if (ingredients.length === 0) {
      toast.error("Please enter valid ingredients");
      return;
    }
    setIsLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('analyze-ingredients', {
        body: {
          ingredients,
          quizResults
        }
      });
      if (error) {
        console.error('Error analyzing ingredients:', error);
        throw new Error('Failed to analyze ingredients');
      }
      if (data.success) {
        setAnalysisResult(data.analysis);
        toast.success(`Analysis complete for ${ingredients.length} ingredient${ingredients.length > 1 ? 's' : ''}!`);
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to analyze ingredients. Please try again.");
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
  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case "excellent":
        return "border-green-500 bg-green-50 text-green-800";
      case "good":
        return "border-blue-500 bg-blue-50 text-blue-800";
      case "caution":
        return "border-yellow-500 bg-yellow-50 text-yellow-800";
      case "poor":
        return "border-red-500 bg-red-50 text-red-800";
      default:
        return "border-gray-500 bg-gray-50 text-gray-800";
    }
  };
  const commonIngredientsList = ["Salicylic Acid, Hyaluronic Acid, Niacinamide", "Retinol, Vitamin C, Peptides", "Glycolic Acid, Ceramides, Squalane", "AHA, BHA, Vitamin E"];
  return <div className="min-h-screen py-12 px-4">
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
            Get comprehensive AI analysis of multiple skincare ingredients based on your skin profile{quizResults ? ` (${quizResults.skinType} skin)` : ''}
          </p>
          {!quizResults && <p className="text-sm text-primary mt-2">
              💡 Take our quiz first for personalized recommendations!
            </p>}
        </div>

        {/* Input Section */}
        <Card className="shadow-medium mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2 text-primary" />
              Enter Ingredients to Analyze
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea value={ingredientsText} onChange={e => setIngredientsText(e.target.value)} placeholder="Enter multiple ingredients separated by commas or new lines&#10;&#10;Example:&#10;Salicylic Acid, Hyaluronic Acid, Niacinamide&#10;Retinol&#10;Vitamin C" className="min-h-[100px] resize-none" />
              
              <Button onClick={handleAnalyze} disabled={isLoading || !ingredientsText.trim()} size="lg" className="w-full">
                {isLoading ? "Analyzing..." : "Analyze Ingredients"}
              </Button>
            </div>
            
            {/* Quick Fill Examples */}
            <div className="space-y-2 mt-4">
              <p className="text-sm text-muted-foreground">Quick fill examples:</p>
              <div className="grid gap-2">
                {commonIngredientsList.map((example, index) => <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors justify-start p-2 h-auto text-left" onClick={() => setIngredientsText(example)}>
                    {example}
                  </Badge>)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResult && <div className="space-y-6">
            {/* Overall Assessment */}
            <Card className={`shadow-medium ${getCompatibilityColor(analysisResult.overallAssessment.compatibility)}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center">
                    <Shield className="w-6 h-6 mr-2" />
                    Overall Assessment
                  </CardTitle>
                  <Badge variant={analysisResult.overallAssessment.riskLevel === "low" ? "default" : analysisResult.overallAssessment.riskLevel === "medium" ? "secondary" : "destructive"} className="capitalize text-sm">
                    {analysisResult.overallAssessment.riskLevel} Risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Compatibility: {analysisResult.overallAssessment.compatibility.toUpperCase()}
                    </h4>
                    <p className="text-sm leading-relaxed">{analysisResult.overallAssessment.suitabilityForProfile}</p>
                  </div>
                  
                  {quizResults && <div className="p-3 bg-white/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-2">Analysis based on your profile:</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">{quizResults.skinType} skin</Badge>
                        <Badge variant="outline" className="text-xs">{quizResults.climate} climate</Badge>
                        <Badge variant="outline" className="text-xs">{quizResults.concerns}</Badge>
                      </div>
                    </div>}
                </div>
              </CardContent>
            </Card>

            {/* Individual Ingredient Analysis */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Individual Ingredient Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResult.ingredientAnalysis.map((ingredient, index) => <div key={index} className={`p-4 rounded-lg border ${getSafetyColor(ingredient.safety)}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg">{ingredient.name}</h4>
                        <div className="flex items-center space-x-2">
                          {getSafetyIcon(ingredient.safety)}
                          <Badge variant={ingredient.safety === "safe" ? "default" : ingredient.safety === "caution" ? "secondary" : "destructive"} className="capitalize">
                            {ingredient.safety}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-primary mb-1">Personalized Recommendation:</p>
                          <p className="text-sm leading-relaxed">{ingredient.personalizedRecommendation}</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          {ingredient.benefits.length > 0 && <div>
                              <h5 className="font-semibold text-green-800 flex items-center mb-2">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Benefits
                              </h5>
                              <ul className="space-y-1">
                                {ingredient.benefits.map((benefit, idx) => <li key={idx} className="text-xs flex items-start">
                                    <div className="w-1 h-1 rounded-full bg-green-600 mr-2 mt-1.5"></div>
                                    {benefit}
                                  </li>)}
                              </ul>
                            </div>}
                          
                          {ingredient.concerns.length > 0 && <div>
                              <h5 className="font-semibold text-orange-800 flex items-center mb-2">
                                <AlertTriangle className="w-4 h-4 mr-1" />
                                Concerns
                              </h5>
                              <ul className="space-y-1">
                                {ingredient.concerns.map((concern, idx) => <li key={idx} className="text-xs flex items-start">
                                    <div className="w-1 h-1 rounded-full bg-orange-600 mr-2 mt-1.5"></div>
                                    {concern}
                                  </li>)}
                              </ul>
                            </div>}
                        </div>
                        
                        {ingredient.interactionsWith.length > 0 && <div className="p-2 bg-blue-50 rounded text-xs">
                            <span className="font-medium">Interactions with: </span>
                            {ingredient.interactionsWith.join(', ')}
                          </div>}
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* Personalized Advice */}
            <Card className="shadow-medium bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-primary">Personalized Usage Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Recommended Usage:</h4>
                  <p className="text-sm leading-relaxed">{analysisResult.personalizedAdvice.recommendedUsage}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Routine Integration:</h4>
                  <p className="text-sm leading-relaxed">{analysisResult.personalizedAdvice.routineIntegration}</p>
                </div>
                
                {analysisResult.personalizedAdvice.precautions.length > 0 && <div>
                    <h4 className="font-semibold mb-2 text-orange-700">Important Precautions:</h4>
                    <ul className="space-y-1">
                      {analysisResult.personalizedAdvice.precautions.map((precaution, index) => <li key={index} className="text-sm flex items-start">
                          <div className="w-2 h-2 rounded-full bg-orange-600 mr-2 mt-1.5"></div>
                          {precaution}
                        </li>)}
                    </ul>
                  </div>}
                
                {analysisResult.personalizedAdvice.alternatives.length > 0 && <div>
                    <h4 className="font-semibold mb-2 text-green-700">Better Alternatives:</h4>
                    <ul className="space-y-1">
                      {analysisResult.personalizedAdvice.alternatives.map((alternative, index) => <li key={index} className="text-sm flex items-start">
                          <div className="w-2 h-2 rounded-full bg-green-600 mr-2 mt-1.5"></div>
                          {alternative}
                        </li>)}
                    </ul>
                  </div>}
                
                {analysisResult.climateConsiderations && <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-1 text-blue-800">Climate Considerations:</h4>
                    <p className="text-sm text-blue-700">{analysisResult.climateConsiderations}</p>
                  </div>}
                
                {analysisResult.dietarySupport && <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold mb-1 text-green-800">Dietary Support:</h4>
                    <p className="text-sm text-green-700">{analysisResult.dietarySupport}</p>
                  </div>}
              </CardContent>
            </Card>
          </div>}

        {/* Educational Section */}
        <Card className="mt-8 shadow-soft">
          <CardHeader>
            <CardTitle>How to Use This Advanced Analyzer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Getting Started</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Copy full ingredient lists from product labels</li>
                  <li>• Separate ingredients with commas or new lines</li>
                  <li>• Include active ingredients and key components</li>
                  <li>• Take our quiz first for personalized analysis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-secondary">What You'll Get</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Comprehensive compatibility analysis</li>
                  <li>• Ingredient interaction warnings</li>
                  <li>• Personalized usage recommendations</li>
                  <li>• Climate and diet-specific advice</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default IngredientChecker;
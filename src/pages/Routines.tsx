import { useState, useEffect } from "react";  
import { useLocation } from "react-router-dom";
import { Sunrise, Moon, ChevronDown, ChevronRight, Droplets, Sun, Wind, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface QuizResults {
  skinType: string;
  climate: string;
  dietHabits: string;
  concerns: string;
}

const Routines = () => {
  const location = useLocation();
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Get quiz results from location state or localStorage
    const results = location.state?.quizResults || 
                   JSON.parse(localStorage.getItem("skinSyncQuizResults") || "null");
    setQuizResults(results);
  }, [location]);

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getPersonalizedMessage = () => {
    if (!quizResults) return null;
    
    return (
      <Card className="mb-8 shadow-medium border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 text-primary mr-2" />
            <h3 className="text-xl font-semibold">Your Personalized Recommendations</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Badge variant="secondary" className="mb-2">Skin Type: {quizResults.skinType}</Badge>
              <Badge variant="outline" className="mb-2 ml-2">Climate: {quizResults.climate}</Badge>
            </div>
            <div>
              <Badge variant="outline" className="mb-2">Main Concern: {quizResults.concerns}</Badge>
            </div>
          </div>
          <p className="text-muted-foreground mt-3">
            Based on your assessment, we've highlighted the most suitable routines for you below. 
            Look for the ⭐ recommended sections!
          </p>
        </CardContent>
      </Card>
    );
  };

  const skinTypes = [
    {
      type: "oily",
      title: "Oily Skin",
      icon: Droplets,
      description: "Reduce shine and control breakouts",
      morning: [
        "Gentle foaming cleanser with salicylic acid",
        "Alcohol-free toner with niacinamide",
        "Lightweight, oil-free moisturizer",
        "Broad-spectrum SPF 30+ (non-comedogenic)",
      ],
      evening: [
        "Double cleanse: Oil cleanser + foaming cleanser",
        "BHA treatment (salicylic acid) 3x/week",
        "Hydrating serum with hyaluronic acid",
        "Gel-based night moisturizer",
        "Spot treatment for active breakouts",
      ],
      climateNotes: {
        hot: "Use blotting papers mid-day, apply SPF every 2 hours",
        cold: "Add a slightly richer moisturizer in winter",
        temperate: "Adjust products seasonally - lighter in summer",
      },
    },
    {
      type: "dry",
      title: "Dry Skin",
      icon: Wind,
      description: "Restore moisture and strengthen skin barrier",
      morning: [
        "Cream or oil cleanser (avoid foaming)",
        "Hydrating toner with ceramides",
        "Vitamin C serum (optional)",
        "Rich, emollient moisturizer",
        "SPF 30+ with moisturizing properties",
      ],
      evening: [
        "Gentle cream cleanser",
        "Hydrating essence or serum",
        "Retinol treatment 2-3x/week (start slowly)",
        "Heavy night cream or facial oil",
        "Lip balm and eye cream",
      ],
      climateNotes: {
        hot: "Use lighter moisturizers but maintain hydration",
        cold: "Layer products, use humidifier, extra lip care",
        temperate: "Seasonal routine adjustments needed",
      },
    },
    {
      type: "combination",
      title: "Combination Skin",
      icon: Sun,
      description: "Balance oily T-zone with dry cheeks",
      morning: [
        "Gentle gel cleanser",
        "Balancing toner",
        "Lightweight serum (niacinamide)",
        "Different moisturizers: gel for T-zone, cream for cheeks",
        "SPF 30+ suitable for mixed skin types",
      ],
      evening: [
        "Gentle gel or cream cleanser",
        "Targeted treatments: BHA for T-zone, hydrating serum for cheeks",
        "Multi-zone moisturizing approach",
        "Weekly clay mask on T-zone only",
      ],
      climateNotes: {
        hot: "Focus more on oil control in T-zone",
        cold: "Increase moisture on dry areas",
        temperate: "Adjust zone treatments seasonally",
      },
    },
    {
      type: "sensitive",
      title: "Sensitive Skin",
      icon: Sparkles,
      description: "Gentle care to reduce irritation",
      morning: [
        "Fragrance-free, gentle cleanser",
        "Alcohol-free, soothing toner",
        "Gentle moisturizer with ceramides",
        "Mineral SPF 30+ (zinc oxide/titanium dioxide)",
      ],
      evening: [
        "Same gentle cleanser as morning",
        "Calming serum (centella asiatica, niacinamide)",
        "Rich, barrier-repair moisturizer",
        "Avoid actives until skin is stable",
      ],
      climateNotes: {
        hot: "Avoid over-cleansing, stay hydrated",
        cold: "Extra protection from wind and cold",
        temperate: "Minimal routine changes",
      },
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Skincare Routines</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Personalized morning and evening routines for every skin type and climate
          </p>
        </div>

        {/* Personalized Message */}
        {getPersonalizedMessage()}

        {/* Routines Grid */}
        <div className="space-y-8">
          {skinTypes.map((skinType) => {
            const isRecommended = quizResults?.skinType === skinType.type;
            
            return (
              <Card 
                key={skinType.type} 
                className={`shadow-medium hover-lift ${isRecommended ? 'border-primary shadow-glow' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isRecommended ? 'hero-gradient' : 'bg-muted'
                      }`}>
                        <skinType.icon className={`w-5 h-5 ${isRecommended ? 'text-white' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <CardTitle className="flex items-center">
                          {skinType.title}
                          {isRecommended && <span className="ml-2">⭐</span>}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{skinType.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Morning Routine */}
                  <Collapsible 
                    open={openSections[`${skinType.type}-morning`] || isRecommended}
                    onOpenChange={() => toggleSection(`${skinType.type}-morning`)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                        <div className="flex items-center space-x-3">
                          <Sunrise className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium">Morning Routine</span>
                        </div>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <ul className="space-y-2">
                        {skinType.morning.map((step, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="text-primary font-semibold mt-1">{index + 1}.</span>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Evening Routine */}
                  <Collapsible 
                    open={openSections[`${skinType.type}-evening`] || isRecommended}
                    onOpenChange={() => toggleSection(`${skinType.type}-evening`)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                        <div className="flex items-center space-x-3">
                          <Moon className="w-5 h-5 text-purple-500" />
                          <span className="font-medium">Evening Routine</span>
                        </div>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <ul className="space-y-2">
                        {skinType.evening.map((step, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="text-secondary font-semibold mt-1">{index + 1}.</span>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Climate Notes */}
                  {quizResults?.climate && skinType.climateNotes[quizResults.climate as keyof typeof skinType.climateNotes] && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-primary mb-1">Climate-Specific Tip:</p>
                      <p className="text-sm text-muted-foreground">
                        {skinType.climateNotes[quizResults.climate as keyof typeof skinType.climateNotes]}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* General Tips */}
        <Card className="mt-12 shadow-soft">
          <CardHeader>
            <CardTitle>Universal Tips for All Skin Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-primary mb-2">Do's</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✅ Patch test new products</li>
                  <li>✅ Introduce one product at a time</li>
                  <li>✅ Be consistent for 4-6 weeks</li>
                  <li>✅ Use SPF daily, even indoors</li>
                  <li>✅ Sleep on clean pillowcases</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-destructive mb-2">Don'ts</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>❌ Over-cleanse or scrub harshly</li>
                  <li>❌ Mix active ingredients carelessly</li>
                  <li>❌ Skip moisturizer (even oily skin needs it)</li>
                  <li>❌ Touch your face with dirty hands</li>
                  <li>❌ Expect overnight results</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Routines;
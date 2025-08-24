import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, Clock, CheckCircle, MessageCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Sunrise, Moon, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ChatBot from "@/components/ChatBot";

interface QuizResults {
  skinType: string;
  climate: string;
  dietHabits: string;
  concerns: string;
}

interface PersonalizedRoutine {
  personalizedRoutine: {
    morning: string[];
    evening: string[];
    weekly: string[];
  };
  keyRecommendations: string[];
  dietSuggestions?: string[];
  lifestyleTips?: string[];
  productIngredients?: {
    beneficial: string[];
    avoid: string[];
  };
  timelineExpectations: string;
  additionalNotes?: string;
}

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [personalizedRoutine, setPersonalizedRoutine] = useState<PersonalizedRoutine | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    morning: true,
    evening: true,
    recommendations: true
  });
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const results = location.state?.quizResults || 
                   JSON.parse(localStorage.getItem("skinSyncQuizResults") || "null");
    
    if (!results) {
      navigate("/quiz");
      return;
    }

    setQuizResults(results);
    generatePersonalizedRoutine(results);
  }, [location, navigate]);

  const generatePersonalizedRoutine = async (results: QuizResults) => {
    try {
      setLoading(true);
      
      const sessionId = `quiz_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      
      const { data, error } = await supabase.functions.invoke('generate-routine', {
        body: { 
          quizResults: results,
          sessionId: sessionId
        }
      });

      if (error) {
        console.error('Error generating routine:', error);
        throw new Error('Failed to generate personalized routine');
      }

      if (data.success) {
        setPersonalizedRoutine(data.routineData);
        // Store for chatbot context
        localStorage.setItem("skinSyncPersonalizedRoutine", JSON.stringify({
          quizResults: results,
          routine: data.routineData,
          sessionId: sessionId
        }));
        toast.success("Your personalized routine has been generated!");
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to generate your routine. Please try again.");
      // Fallback to generic routine
      generateFallbackRoutine(results);
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackRoutine = (results: QuizResults) => {
    const fallbackRoutines = {
      oily: {
        personalizedRoutine: {
          morning: [
            "Gentle foaming cleanser with salicylic acid",
            "Oil-free moisturizer with niacinamide", 
            "Broad-spectrum SPF 30+ (non-comedogenic)"
          ],
          evening: [
            "Double cleanse with oil cleanser followed by foam cleanser",
            "BHA treatment (salicylic acid) 3x per week",
            "Lightweight gel moisturizer"
          ],
          weekly: ["Clay mask once per week", "Gentle exfoliation with BHA"]
        },
        keyRecommendations: [
          "Focus on oil control without over-drying",
          "Use blotting papers during the day",
          "Never skip moisturizer, even with oily skin"
        ],
        timelineExpectations: "4-6 weeks for oil control improvements, 8-12 weeks for acne reduction"
      },
      dry: {
        personalizedRoutine: {
          morning: [
            "Gentle cream cleanser",
            "Hydrating serum with hyaluronic acid",
            "Rich moisturizer with ceramides",
            "SPF 30+ with hydrating properties"
          ],
          evening: [
            "Gentle cream cleanser",
            "Hydrating essence",
            "Retinol treatment 2-3x per week (start slowly)",
            "Heavy night cream or facial oil"
          ],
          weekly: ["Hydrating mask 2x per week", "Gentle exfoliation once weekly"]
        },
        keyRecommendations: [
          "Layer hydrating products",
          "Use a humidifier in dry climates",
          "Avoid over-cleansing"
        ],
        timelineExpectations: "2-4 weeks for hydration improvement, 6-8 weeks for texture enhancement"
      }
    };

    const routine = fallbackRoutines[results.skinType as keyof typeof fallbackRoutines] || fallbackRoutines.dry;
    setPersonalizedRoutine(routine);
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-2">Generating Your Personalized Routine</h2>
          <p className="text-muted-foreground">Our AI is analyzing your profile...</p>
        </div>
      </div>
    );
  }

  if (!quizResults || !personalizedRoutine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
          <Button onClick={() => navigate("/quiz")}>Retake Quiz</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center shadow-medium">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Personalized Routine</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your assessment, here's your custom skincare routine designed specifically for you
          </p>
        </div>

        {/* Profile Summary */}
        <Card className="mb-8 shadow-medium border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold">Your Profile</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Badge variant="secondary" className="mr-2">Skin Type: {quizResults.skinType}</Badge>
                <Badge variant="outline" className="mr-2">Climate: {quizResults.climate}</Badge>
              </div>
              <div className="space-y-2">
                <Badge variant="outline" className="mr-2">Diet: {quizResults.dietHabits}</Badge>
                <Badge variant="outline">Main Concern: {quizResults.concerns}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Morning Routine */}
        <Card className="mb-6 shadow-medium">
          <Collapsible open={openSections.morning} onOpenChange={() => toggleSection('morning')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Sunrise className="w-5 h-5 text-yellow-600" />
                    </div>
                    <CardTitle>Morning Routine</CardTitle>
                  </div>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <ul className="space-y-3">
                  {personalizedRoutine.personalizedRoutine.morning.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-primary font-semibold mt-1 w-6">{index + 1}.</span>
                      <span className="text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Evening Routine */}
        <Card className="mb-6 shadow-medium">
          <Collapsible open={openSections.evening} onOpenChange={() => toggleSection('evening')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Moon className="w-5 h-5 text-purple-600" />
                    </div>
                    <CardTitle>Evening Routine</CardTitle>
                  </div>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <ul className="space-y-3">
                  {personalizedRoutine.personalizedRoutine.evening.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-secondary font-semibold mt-1 w-6">{index + 1}.</span>
                      <span className="text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Weekly Treatments */}
        {personalizedRoutine.personalizedRoutine.weekly && personalizedRoutine.personalizedRoutine.weekly.length > 0 && (
          <Card className="mb-6 shadow-medium">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle>Weekly Treatments</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {personalizedRoutine.personalizedRoutine.weekly.map((treatment, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-blue-600 font-semibold mt-1">•</span>
                    <span className="text-sm leading-relaxed">{treatment}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Key Recommendations */}
        <Card className="mb-6 shadow-medium">
          <Collapsible open={openSections.recommendations} onOpenChange={() => toggleSection('recommendations')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle>Key Recommendations</CardTitle>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <ul className="space-y-3">
                  {personalizedRoutine.keyRecommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-primary font-semibold mt-1">✓</span>
                      <span className="text-sm leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Timeline */}
        <Card className="mb-8 bg-muted/30">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-primary" />
              <CardTitle>Expected Timeline</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{personalizedRoutine.timelineExpectations}</p>
          </CardContent>
        </Card>

        {/* Chat Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={() => setShowChatbot(true)}
            className="btn-hero text-lg px-8 py-6"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Ask Questions About Your Routine
          </Button>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate("/quiz")}>
            Retake Quiz
          </Button>
          <Button onClick={() => navigate("/routines")}>
            Browse All Routines
          </Button>
        </div>
      </div>

      {/* Chatbot Integration */}
      {showChatbot && <ChatBot />}
    </div>
  );
};

export default QuizResults;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Sparkles, Sun, Droplets, Wind, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    skinType: "",
    climate: "",
    dietHabits: "",
    concerns: "",
  });

  const questions = [
    {
      id: "skinType",
      title: "What's your skin type?",
      subtitle: "Choose the option that best describes your skin",
      options: [
        { value: "oily", label: "Oily", description: "Shiny, large pores, prone to acne" },
        { value: "dry", label: "Dry", description: "Tight, flaky, sometimes itchy" },
        { value: "combination", label: "Combination", description: "Oily T-zone, dry cheeks" },
        { value: "sensitive", label: "Sensitive", description: "Easily irritated, reactive to products" },
      ],
    },
    {
      id: "climate",
      title: "What's your climate like?",
      subtitle: "Your environment affects your skin needs",
      options: [
        { value: "hot", label: "Hot & Humid", description: "Tropical, sticky weather", icon: Sun },
        { value: "hot-dry", label: "Hot & Dry", description: "Desert-like conditions", icon: Sun },
        { value: "cold", label: "Cold", description: "Low temperatures year-round", icon: Snowflake },
        { value: "temperate", label: "Temperate", description: "Mild, seasonal changes", icon: Wind },
      ],
    },
    {
      id: "dietHabits",
      title: "How would you describe your diet?",
      subtitle: "Your nutrition directly impacts your skin health",
      options: [
        { value: "healthy", label: "Mostly Healthy", description: "Fruits, vegetables, balanced meals" },
        { value: "mixed", label: "Mixed", description: "Some healthy, some processed foods" },
        { value: "processed", label: "Mostly Processed", description: "Fast food, sugary drinks, convenience meals" },
        { value: "vegetarian", label: "Vegetarian/Vegan", description: "Plant-based diet" },
      ],
    },
    {
      id: "concerns",
      title: "What's your main skin concern?",
      subtitle: "Help us prioritize your routine",
      options: [
        { value: "acne", label: "Acne & Breakouts", description: "Pimples, blackheads, whiteheads" },
        { value: "dryness", label: "Dryness & Flaking", description: "Tight, dehydrated skin" },
        { value: "sensitivity", label: "Sensitivity & Redness", description: "Irritation, burning sensations" },
        { value: "aging", label: "Early Signs of Aging", description: "Fine lines, uneven texture" },
      ],
    },
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentStep].id]: value,
    }));
  };

  const handleNext = () => {
    if (!answers[questions[currentStep].id as keyof typeof answers]) {
      toast.error("Please select an option before continuing");
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Store answers in localStorage for backup
    localStorage.setItem("skinSyncQuizResults", JSON.stringify(answers));
    toast.success("Quiz completed! Generating your personalized routine...");
    
    // Navigate to quiz results page with results
    navigate("/quiz-results", { state: { quizResults: answers } });
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center shadow-medium">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Skin Assessment Quiz</h1>
          <p className="text-muted-foreground">
            Get personalized recommendations based on your unique needs
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 rounded-full hero-gradient transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-medium hover-lift">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">{currentQuestion.title}</CardTitle>
            <p className="text-muted-foreground">{currentQuestion.subtitle}</p>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.id as keyof typeof answers]}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      {option.icon && (
                        <option.icon className="w-5 h-5 text-primary mt-1" />
                      )}
                      <div>
                        <div className="font-medium text-foreground">{option.label}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            className="btn-hero"
            disabled={!answers[currentQuestion.id as keyof typeof answers]}
          >
            {currentStep === questions.length - 1 ? "Get My Routine" : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
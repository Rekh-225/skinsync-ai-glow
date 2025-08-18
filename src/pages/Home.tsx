import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles, Users, Target, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-skincare.jpg";

const Home = () => {
  const steps = [
    {
      icon: Target,
      title: "Take the Quiz",
      description: "Answer a few questions about your skin type, climate, and lifestyle habits."
    },
    {
      icon: Sparkles,
      title: "Get Your Plan",
      description: "Receive personalized skincare routines and diet recommendations tailored to you."
    },
    {
      icon: CheckCircle,
      title: "Stay Consistent",
      description: "Follow your custom routine with our AI assistant support for lasting results."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center shadow-glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary-glow to-secondary-glow bg-clip-text text-transparent">
              SkinSync
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Smart skincare and diet routines made simple
            </p>
            
            <p className="text-lg mb-10 text-gray-300 max-w-3xl mx-auto">
              Get personalized skincare routines, evidence-based diet suggestions, and AI-powered guidance 
              tailored to your skin type and lifestyle. Perfect for acne-prone and sensitive skin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-hero text-lg px-8 py-6 hover-lift">
                <Link to="/quiz">
                  Discover Your Routine <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="btn-glass text-lg px-8 py-6 hover-lift">
                <Link to="/routines">
                  Browse Routines
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Video Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn Your Skin Type</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch this tutorial to understand how to identify your skin type and choose the right products
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-strong">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Tutorial video will be embedded here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Please provide the YouTube link to embed your tutorial video
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to achieve healthier, clearer skin
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <Card key={index} className="text-center hover-lift shadow-soft">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center mx-auto mb-6 shadow-medium">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-2xl font-bold text-primary mb-2">
                    {index + 1}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-8">
              <Users className="w-12 h-12 text-primary mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              SkinSync is dedicated to helping youth and students achieve healthy, clear skin through 
              affordable, evidence-based skincare and diet guidance. We believe that everyone deserves 
              access to personalized wellness advice that fits their lifestyle and budget.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="text-left hover-lift shadow-soft">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Evidence-Based</h3>
                  <p className="text-muted-foreground">
                    All our recommendations are backed by dermatological research and proven skincare science.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-left hover-lift shadow-soft">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-secondary">Affordable</h3>
                  <p className="text-muted-foreground">
                    We focus on accessible products and natural solutions that won't break the bank.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12">
              <Button asChild size="lg" className="btn-hero">
                <Link to="/quiz">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
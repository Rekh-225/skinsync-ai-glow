import { useState } from "react";
import { Clock, Sparkles, Heart, Droplets, Sun, Moon, Apple, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const AntiAging = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const antiAgingRoutines = [
    {
      age: "20s - Prevention",
      icon: Sun,
      focus: "Prevention & Protection",
      morning: [
        "Gentle cleanser",
        "Vitamin C serum",
        "Hyaluronic acid moisturizer", 
        "SPF 30+ sunscreen (most important!)"
      ],
      evening: [
        "Double cleanse (oil + gentle cleanser)",
        "Retinol 2-3x per week (start slow)",
        "Niacinamide serum",
        "Rich night moisturizer"
      ],
      videoTitle: "Anti-Aging Skincare for Your 20s | Prevention Focus"
    },
    {
      age: "30s - Early Intervention", 
      icon: Sparkles,
      focus: "Fine Lines & Texture",
      morning: [
        "Gentle exfoliating cleanser",
        "Vitamin C + E serum",
        "Peptide moisturizer",
        "SPF 50 sunscreen",
        "Eye cream with caffeine"
      ],
      evening: [
        "Double cleanse",
        "Retinol 4-5x per week",
        "Hyaluronic acid serum", 
        "Anti-aging night cream",
        "Retinol eye cream"
      ],
      videoTitle: "30s Skincare Routine | First Signs of Aging"
    },
    {
      age: "40s+ - Active Treatment",
      icon: Clock,
      focus: "Firmness & Deep Hydration",
      morning: [
        "Creamy cleanser",
        "Vitamin C + peptides",
        "Firming serum",
        "Rich moisturizer with SPF",
        "Eye cream with retinol"
      ],
      evening: [
        "Oil cleanser + cream cleanser",
        "Prescription retinoid or strong retinol",
        "Collagen-boosting serum",
        "Rich repair cream",
        "Neck & décolleté treatment"
      ],
      videoTitle: "40+ Anti-Aging Skincare | Mature Skin Routine"
    }
  ];

  const antiAgingFoods = [
    {
      category: "Antioxidant Powerhouses",
      icon: Heart,
      items: [
        { 
          name: "Blueberries", 
          benefit: "High in anthocyanins, protect collagen",
          nutrition: "84 cal, Vitamin C, K, Fiber per cup"
        },
        { 
          name: "Dark Chocolate (70%+)", 
          benefit: "Flavonoids improve skin texture",
          nutrition: "170 cal, Iron, Magnesium per oz"
        },
        { 
          name: "Green Tea", 
          benefit: "EGCG reduces inflammation",
          nutrition: "2 cal, Catechins, L-theanine per cup"
        }
      ]
    },
    {
      category: "Collagen Builders",
      icon: Sparkles,
      items: [
        { 
          name: "Bone Broth", 
          benefit: "Natural collagen and glycine",
          nutrition: "40 cal, Protein 6g, Collagen per cup"
        },
        { 
          name: "Wild Salmon", 
          benefit: "Omega-3s and astaxanthin",
          nutrition: "206 cal, Protein 28g, Omega-3 per 100g"
        },
        { 
          name: "Egg Whites", 
          benefit: "Amino acids for collagen synthesis",
          nutrition: "51 cal, Protein 11g, B vitamins per 100g"
        }
      ]
    },
    {
      category: "Hydration Heroes", 
      icon: Droplets,
      items: [
        { 
          name: "Cucumber", 
          benefit: "Silica for skin elasticity",
          nutrition: "16 cal, Water 95%, Vitamin K per cup"
        },
        { 
          name: "Watermelon", 
          benefit: "Lycopene protects from UV damage",
          nutrition: "46 cal, Vitamin C, Lycopene per cup"
        },
        { 
          name: "Coconut Water", 
          benefit: "Natural electrolytes for hydration",
          nutrition: "46 cal, Potassium 600mg per cup"
        }
      ]
    }
  ];

  const supplements = [
    {
      name: "Collagen Peptides",
      dosage: "10-20g daily",
      benefit: "Supports skin elasticity and hydration",
      timing: "With or without food"
    },
    {
      name: "Vitamin C",
      dosage: "1000mg daily",
      benefit: "Essential for collagen synthesis",
      timing: "Morning with food"
    },
    {
      name: "Omega-3 Fish Oil",
      dosage: "1-2g EPA/DHA daily",
      benefit: "Reduces inflammation, supports skin barrier",
      timing: "With meals"
    },
    {
      name: "Hyaluronic Acid",
      dosage: "100-200mg daily",
      benefit: "Supports skin moisture from within",
      timing: "Any time with water"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center shadow-medium">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Anti-Aging & Wrinkle Care</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive anti-aging strategies combining proven skincare routines, nutrition, and lifestyle changes to maintain youthful, healthy skin
          </p>
        </div>

        {/* Age-Specific Routines */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Age-Specific Skincare Routines</h2>
          
          <div className="grid gap-6">
            {antiAgingRoutines.map((routine, index) => (
              <Card key={index} className="shadow-medium hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-xl">
                      <routine.icon className="w-6 h-6 mr-2 text-primary" />
                      {routine.age}
                    </CardTitle>
                    <Badge variant="outline" className="text-secondary">
                      {routine.focus}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Morning Routine */}
                    <Collapsible 
                      open={openSections[`morning-${index}`]} 
                      onOpenChange={() => toggleSection(`morning-${index}`)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full justify-between mb-3">
                          <span className="flex items-center">
                            <Sun className="w-4 h-4 mr-2" />
                            Morning Routine
                          </span>
                          <span className="text-xs">
                            {openSections[`morning-${index}`] ? 'Hide' : 'Show'}
                          </span>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="space-y-2">
                          {routine.morning.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-center p-2 bg-orange-50 rounded">
                              <span className="text-orange-600 font-medium text-sm mr-2">
                                {stepIndex + 1}.
                              </span>
                              <span className="text-sm text-orange-800">{step}</span>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Evening Routine */}
                    <Collapsible 
                      open={openSections[`evening-${index}`]} 
                      onOpenChange={() => toggleSection(`evening-${index}`)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full justify-between mb-3">
                          <span className="flex items-center">
                            <Moon className="w-4 h-4 mr-2" />
                            Evening Routine
                          </span>
                          <span className="text-xs">
                            {openSections[`evening-${index}`] ? 'Hide' : 'Show'}
                          </span>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="space-y-2">
                          {routine.evening.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-center p-2 bg-purple-50 rounded">
                              <span className="text-purple-600 font-medium text-sm mr-2">
                                {stepIndex + 1}.
                              </span>
                              <span className="text-sm text-purple-800">{step}</span>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  {/* Video Section */}
                  <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-primary mb-1">Recommended Tutorial</h4>
                        <p className="text-sm text-muted-foreground">{routine.videoTitle}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Play className="w-5 h-5 text-primary ml-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Anti-Aging Nutrition */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Anti-Aging Nutrition</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {antiAgingFoods.map((category, index) => (
              <Card key={index} className="shadow-medium hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <category.icon className="w-5 h-5 mr-2 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="p-3 bg-primary/5 rounded-lg">
                        <div className="font-medium text-primary mb-1">{item.name}</div>
                        <div className="text-sm text-muted-foreground mb-1">{item.benefit}</div>
                        <div className="text-xs text-success font-medium">{item.nutrition}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Supplements */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Recommended Supplements</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supplements.map((supplement, index) => (
              <Card key={index} className="shadow-soft text-center">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{supplement.name}</CardTitle>
                  <Badge variant="outline" className="w-fit mx-auto">
                    {supplement.dosage}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{supplement.benefit}</p>
                  <p className="text-xs text-secondary font-medium">⏰ {supplement.timing}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-warning/10 rounded-lg border border-warning/20">
            <h4 className="font-semibold text-warning-foreground mb-2">⚠️ Important Note</h4>
            <p className="text-sm text-warning-foreground">
              Always consult with a healthcare provider before starting new supplements, especially if you have medical conditions or take medications.
            </p>
          </div>
        </section>

        {/* Lifestyle Tips */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Lifestyle Anti-Aging Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-primary">Daily Habits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-success mr-2">✓</span>
                    <span className="text-sm">Sleep 7-9 hours nightly for skin repair</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">✓</span>
                    <span className="text-sm">Drink 8+ glasses of water daily</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">✓</span>
                    <span className="text-sm">Exercise regularly to boost circulation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">✓</span>
                    <span className="text-sm">Manage stress through meditation/yoga</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">✓</span>
                    <span className="text-sm">Never skip sunscreen, even indoors</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-destructive">Habits to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">✗</span>
                    <span className="text-sm">Smoking (accelerates aging dramatically)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">✗</span>
                    <span className="text-sm">Excessive alcohol consumption</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">✗</span>
                    <span className="text-sm">Sleeping on your stomach/side (causes wrinkles)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">✗</span>
                    <span className="text-sm">Over-exfoliating or harsh scrubbing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">✗</span>
                    <span className="text-sm">High sugar diet (causes glycation)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AntiAging;
import { Scissors, Sparkles, Heart, Users, CheckCircle, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Grooming = () => {
  const menGroomingTips = [
    {
      category: "Facial Hair Care",
      icon: Scissors,
      tips: [
        { tip: "Shave in the direction of hair growth", reason: "Prevents ingrown hairs and irritation" },
        { tip: "Use a sharp, clean razor", reason: "Reduces tugging and bacterial infections" },
        { tip: "Apply pre-shave oil on sensitive areas", reason: "Creates protective barrier, smoother shave" },
        { tip: "Moisturize immediately after shaving", reason: "Soothes skin and prevents dryness" },
        { tip: "Trim beard regularly with proper tools", reason: "Maintains neat appearance and hygiene" },
      ]
    },
    {
      category: "Hair Care",
      icon: Sparkles,
      tips: [
        { tip: "Wash hair 2-3 times per week", reason: "Prevents over-stripping natural oils" },
        { tip: "Use lukewarm water, not hot", reason: "Hot water damages hair and scalp" },
        { tip: "Get regular haircuts every 4-6 weeks", reason: "Maintains shape and removes split ends" },
        { tip: "Use quality shampoo for your hair type", reason: "Addresses specific scalp and hair needs" },
        { tip: "Condition the ends, not the roots", reason: "Prevents greasy roots while moisturizing" },
      ]
    },
    {
      category: "Body Grooming",
      icon: Star,
      tips: [
        { tip: "Trim body hair with proper clippers", reason: "Maintains cleanliness and comfort" },
        { tip: "Keep nails short and clean", reason: "Prevents bacteria buildup and looks neat" },
        { tip: "Use deodorant, not just antiperspirant", reason: "Fights odor-causing bacteria effectively" },
        { tip: "Shower daily, especially after exercise", reason: "Removes sweat, bacteria, and dead skin" },
        { tip: "Moisturize dry areas (elbows, knees)", reason: "Prevents cracking and rough skin" },
      ]
    }
  ];

  const universalHygiene = [
    {
      category: "Daily Essentials",
      practices: [
        "Brush teeth twice daily with fluoride toothpaste",
        "Floss daily to prevent gum disease",
        "Use mouthwash for fresh breath",
        "Wash hands frequently with soap",
        "Keep fingernails trimmed and clean",
        "Change underwear and socks daily",
      ]
    },
    {
      category: "Weekly Habits",
      practices: [
        "Deep clean ears with appropriate tools",
        "Exfoliate body with gentle scrub",
        "Clean and disinfect phone screen",
        "Wash pillowcases and towels",
        "Check and trim nose/ear hair",
        "Clean makeup brushes and tools",
      ]
    },
    {
      category: "Monthly Maintenance",
      practices: [
        "Replace toothbrush or brush head",
        "Deep clean shoes and rotate pairs",
        "Organize and clean grooming tools",
        "Check expiration dates on products",
        "Professional dental cleaning (every 6 months)",
        "Self-examine skin for changes",
      ]
    }
  ];

  const islamicReminder = {
    title: "Islamic Perspective on Cleanliness",
    quote: "الطَّهُورُ شَطْرُ الْإِيمَانِ",
    translation: "Cleanliness is half of faith",
    practices: [
      "Wudu (ablution) purifies body and soul",
      "Regular bathing (ghusl) is encouraged",
      "Trimming nails and removing excess hair",
      "Using miswak or proper tooth cleaning",
      "Keeping clothes and living space clean",
      "Personal hygiene as worship and self-respect",
    ]
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Grooming & Hygiene Guide</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Essential grooming tips and hygiene practices for confidence and health
          </p>
        </div>

        {/* Men's Grooming Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Users className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold">Men's Grooming Essentials</h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {menGroomingTips.map((category, index) => (
              <Card key={index} className="shadow-medium hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <category.icon className="w-6 h-6 mr-2 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.tips.map((item, tipIndex) => (
                      <div key={tipIndex} className="p-3 bg-muted/50 rounded-lg">
                        <div className="font-medium text-foreground mb-2">{item.tip}</div>
                        <div className="text-sm text-muted-foreground">{item.reason}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Universal Hygiene Practices */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <CheckCircle className="w-8 h-8 text-secondary mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold">Universal Hygiene Practices</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {universalHygiene.map((category, index) => (
              <Card key={index} className="shadow-soft hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg text-secondary">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.practices.map((practice, practiceIndex) => (
                      <li key={practiceIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Islamic Perspective */}
        <section className="mb-16">
          <Card className="shadow-medium border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-green-600 mr-2" />
                <CardTitle className="text-2xl text-green-800">{islamicReminder.title}</CardTitle>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-arabic text-green-700">{islamicReminder.quote}</p>
                <p className="text-lg text-green-600 font-medium italic">"{islamicReminder.translation}"</p>
                <p className="text-sm text-green-600">- Prophet Muhammad (ﷺ)</p>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-6" />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">Spiritual Benefits of Cleanliness</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Purifies both body and soul</li>
                    <li>• Increases self-confidence and dignity</li>
                    <li>• Shows respect for yourself and others</li>
                    <li>• Reflects inner spiritual state</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">Recommended Practices</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    {islamicReminder.practices.map((practice, index) => (
                      <li key={index}>• {practice}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Reference Guide */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Quick Daily Checklist</h2>
            <p className="text-muted-foreground">Essential habits for maintaining excellent hygiene</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { time: "Morning", items: ["Brush teeth", "Shower", "Apply deodorant", "Style hair"] },
              { time: "Midday", items: ["Wash hands regularly", "Check breath", "Stay hydrated", "Maintain posture"] },
              { time: "Evening", items: ["Remove makeup/sunscreen", "Brush teeth again", "Floss daily", "Clean face"] },
              { time: "Weekly", items: ["Trim nails", "Deep clean ears", "Exfoliate body", "Wash bedding"] },
            ].map((timeSlot, index) => (
              <Card key={index} className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-center text-primary">{timeSlot.time}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {timeSlot.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Grooming;
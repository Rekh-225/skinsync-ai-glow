import { Apple, Droplets, Heart, Zap, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Diet = () => {
  const goodFoods = [
    {
      category: "Antioxidant-Rich Fruits",
      icon: Apple,
      color: "text-green-600",
      items: [
        { name: "Berries", benefit: "Combat free radicals, reduce inflammation" },
        { name: "Oranges & Citrus", benefit: "Vitamin C for collagen production" },
        { name: "Avocados", benefit: "Healthy fats for skin elasticity" },
        { name: "Tomatoes", benefit: "Lycopene protects from sun damage" },
      ]
    },
    {
      category: "Leafy Greens & Vegetables",
      icon: Heart,
      color: "text-green-500",
      items: [
        { name: "Spinach & Kale", benefit: "Vitamins A, C, E for skin repair" },
        { name: "Carrots & Sweet Potatoes", benefit: "Beta-carotene for healthy glow" },
        { name: "Bell Peppers", benefit: "High vitamin C content" },
        { name: "Broccoli", benefit: "Zinc and vitamin A for healing" },
      ]
    },
    {
      category: "Healthy Proteins & Fats",
      icon: Zap,
      color: "text-blue-600",
      items: [
        { name: "Fatty Fish (Salmon, Mackerel)", benefit: "Omega-3s reduce inflammation" },
        { name: "Nuts & Seeds", benefit: "Vitamin E and healthy fats" },
        { name: "Eggs", benefit: "Protein and biotin for skin strength" },
        { name: "Greek Yogurt", benefit: "Probiotics for gut-skin connection" },
      ]
    },
    {
      category: "Hydration & Whole Grains",
      icon: Droplets,
      color: "text-blue-500",
      items: [
        { name: "Water (8+ glasses daily)", benefit: "Essential for skin hydration" },
        { name: "Green Tea", benefit: "Antioxidants and anti-inflammatory" },
        { name: "Quinoa & Brown Rice", benefit: "B vitamins for skin health" },
        { name: "Oats", benefit: "Fiber helps eliminate toxins" },
      ]
    }
  ];

  const badFoods = [
    {
      category: "High Sugar Foods",
      items: [
        { name: "Candy & Sweets", reason: "Cause inflammation, accelerate aging" },
        { name: "Sugary Drinks & Sodas", reason: "Spike insulin, worsen acne" },
        { name: "Pastries & Cakes", reason: "High sugar + refined flour combo" },
        { name: "Ice Cream", reason: "Sugar + dairy can trigger breakouts" },
      ]
    },
    {
      category: "Processed & Fried Foods",
      items: [
        { name: "Fast Food", reason: "High in trans fats, low in nutrients" },
        { name: "Chips & Fried Snacks", reason: "Inflammatory oils, excess salt" },
        { name: "Processed Meats", reason: "High sodium, preservatives" },
        { name: "White Bread & Refined Carbs", reason: "Spike blood sugar rapidly" },
      ]
    },
    {
      category: "Potential Trigger Foods",
      items: [
        { name: "Excess Dairy", reason: "May worsen acne in some people" },
        { name: "High-Glycemic Foods", reason: "Rapid blood sugar spikes" },
        { name: "Excessive Caffeine", reason: "Can increase stress hormones" },
        { name: "Alcohol", reason: "Dehydrates skin, disrupts sleep" },
      ]
    }
  ];

  const mealIdeas = [
    {
      meal: "Breakfast",
      options: [
        "Greek yogurt with berries and nuts",
        "Oatmeal topped with sliced banana and chia seeds",
        "Scrambled eggs with spinach and avocado",
        "Green smoothie with kale, apple, and ginger"
      ]
    },
    {
      meal: "Lunch",
      options: [
        "Quinoa salad with mixed vegetables and olive oil",
        "Grilled salmon with roasted sweet potatoes",
        "Spinach salad with nuts, seeds, and citrus dressing",
        "Vegetable soup with whole grain bread"
      ]
    },
    {
      meal: "Dinner",
      options: [
        "Baked fish with steamed broccoli and brown rice",
        "Lentil curry with vegetables",
        "Grilled chicken with roasted vegetables",
        "Stir-fried tofu with colorful bell peppers"
      ]
    },
    {
      meal: "Snacks",
      options: [
        "Apple slices with almond butter",
        "Handful of mixed nuts and seeds",
        "Carrot sticks with hummus",
        "Green tea with a few dark chocolate squares"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Diet & Nutrition for Healthy Skin</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            What you eat directly impacts your skin health. Nourish from within with these evidence-based recommendations.
          </p>
          <div className="mt-6 p-4 bg-primary/10 rounded-lg inline-block">
            <p className="text-primary font-medium">💡 Remember: Healthy skin starts from within!</p>
          </div>
        </div>

        {/* Foods to Eat */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-green-600">Foods to Embrace</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {goodFoods.map((category, index) => (
              <Card key={index} className="shadow-medium hover-lift border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <category.icon className={`w-6 h-6 mr-2 ${category.color}`} />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-800 mb-1">{item.name}</div>
                        <div className="text-sm text-green-600">{item.benefit}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Foods to Avoid */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-red-600">Foods to Limit or Avoid</h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {badFoods.map((category, index) => (
              <Card key={index} className="shadow-medium hover-lift border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg text-red-700">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="p-3 bg-red-50 rounded-lg">
                        <div className="font-medium text-red-800 mb-1">{item.name}</div>
                        <div className="text-sm text-red-600">{item.reason}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Meal Ideas */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Skin-Healthy Meal Ideas</h2>
            <p className="text-muted-foreground">Simple, delicious meals that nourish your skin</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mealIdeas.map((mealType, index) => (
              <Card key={index} className="shadow-soft hover-lift">
                <CardHeader>
                  <CardTitle className="text-center text-primary">{mealType.meal}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mealType.options.map((option, optionIndex) => (
                      <li key={optionIndex} className="text-sm p-2 bg-muted/50 rounded">
                        {option}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Hydration & Tips */}
        <section>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Droplets className="w-6 h-6 mr-2" />
                  Hydration Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Daily Water Goal</h4>
                    <p className="text-blue-700">8-10 glasses (64-80 oz) of water daily</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>• Start your day with a glass of water</p>
                    <p>• Add lemon or cucumber for flavor</p>
                    <p>• Herbal teas count toward hydration</p>
                    <p>• Monitor urine color (pale yellow is ideal)</p>
                    <p>• Increase intake during exercise or hot weather</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-secondary">Quick Tips for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="outline" className="w-full justify-start p-3">
                    <span className="mr-2">🥗</span> Meal prep on weekends
                  </Badge>
                  <Badge variant="outline" className="w-full justify-start p-3">
                    <span className="mr-2">📱</span> Track your water intake
                  </Badge>
                  <Badge variant="outline" className="w-full justify-start p-3">
                    <span className="mr-2">🍎</span> Keep healthy snacks visible
                  </Badge>
                  <Badge variant="outline" className="w-full justify-start p-3">
                    <span className="mr-2">⏰</span> Eat consistently to balance hormones
                  </Badge>
                  <Badge variant="outline" className="w-full justify-start p-3">
                    <span className="mr-2">🌟</span> Focus on progress, not perfection
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Diet;
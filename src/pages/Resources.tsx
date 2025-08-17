import { Play, BookOpen, ExternalLink, Star, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Resources = () => {
  const videos = [
    {
      title: "How to Find Your Skin Type",
      description: "Learn to identify whether you have oily, dry, combination, or sensitive skin with simple at-home tests.",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video IDs
      duration: "8:45",
      difficulty: "Beginner",
      tags: ["Skin Type", "Assessment"]
    },
    {
      title: "Complete Daily Skincare Routine Guide",
      description: "Step-by-step morning and evening routines for healthy, glowing skin regardless of your skin type.",
      embedId: "dQw4w9WgXcQ",
      duration: "12:20",
      difficulty: "Beginner",
      tags: ["Routine", "Daily Care"]
    },
    {
      title: "Men's Grooming Essentials",
      description: "Comprehensive guide to male grooming including shaving techniques, hair care, and hygiene practices.",
      embedId: "dQw4w9WgXcQ",
      duration: "15:30",
      difficulty: "Intermediate",
      tags: ["Men's Care", "Grooming"]
    },
    {
      title: "Diet for Clear, Healthy Skin",
      description: "Discover which foods promote healthy skin and which ones to avoid for a clearer complexion.",
      embedId: "dQw4w9WgXcQ",
      duration: "10:15",
      difficulty: "Beginner",
      tags: ["Nutrition", "Diet"]
    },
    {
      title: "Daily Hygiene Habits That Matter",
      description: "Essential hygiene practices that make a real difference in your overall health and appearance.",
      embedId: "dQw4w9WgXcQ",
      duration: "7:50",
      difficulty: "Beginner",
      tags: ["Hygiene", "Health"]
    }
  ];

  const articles = [
    {
      title: "10 Common Skincare Mistakes to Avoid",
      excerpt: "Learn about the most frequent skincare errors that could be sabotaging your routine and how to fix them.",
      readTime: "5 min read",
      category: "Skincare Tips",
      content: [
        "Over-cleansing your face can strip natural oils and cause irritation. Stick to twice daily maximum.",
        "Skipping sunscreen indoors - UV rays penetrate windows and cause premature aging.",
        "Using too many active ingredients at once can overwhelm your skin barrier.",
        "Not patch testing new products can lead to unexpected reactions.",
        "Expecting overnight results - most skincare changes take 4-6 weeks to show.",
        "Using the same routine year-round - your skin needs change with seasons.",
        "Touching your face frequently transfers bacteria and oils from your hands.",
        "Not cleaning makeup brushes regularly allows bacteria to build up.",
        "Sleeping on dirty pillowcases can clog pores and cause breakouts.",
        "Following trends instead of listening to your skin's specific needs."
      ]
    },
    {
      title: "Building Consistent Habits That Stick",
      excerpt: "Psychology-backed strategies for creating sustainable skincare and wellness routines that become second nature.",
      readTime: "7 min read",
      category: "Habits",
      content: [
        "Start small - Begin with just one new habit at a time to avoid overwhelming yourself.",
        "Stack habits - Link new skincare steps to existing routines like brushing teeth.",
        "Use visual cues - Keep products visible where you'll naturally see them.",
        "Track progress - Use a simple calendar or app to mark completed routines.",
        "Prepare for setbacks - Missing one day doesn't ruin your progress, just start again.",
        "Focus on consistency over perfection - 80% consistency is better than 100% for one week.",
        "Reward yourself - Acknowledge when you complete a full week or month of routine.",
        "Make it enjoyable - Choose products with textures and scents you love.",
        "Plan for obstacles - Have backup routines for busy days or travel.",
        "Be patient - It takes an average of 66 days to form a new automatic habit."
      ]
    },
    {
      title: "Understanding Your Skin Through the Seasons",
      excerpt: "How environmental changes affect your skin and when to adjust your routine throughout the year.",
      readTime: "8 min read",
      category: "Seasonal Care",
      content: [
        "Spring: Transition to lighter moisturizers and introduce gentle exfoliation after winter.",
        "Summer: Focus on sun protection, oil control, and staying hydrated in heat.",
        "Fall: Begin adding richer moisturizers and prepare skin for temperature drops.",
        "Winter: Combat dryness with heavier creams and protect from harsh wind.",
        "Humidity changes affect skin's water content - adjust hydrating products accordingly.",
        "Indoor heating and cooling can disrupt skin barrier - use humidifiers when possible.",
        "Sun exposure varies by season - don't skip SPF in winter or cloudy days.",
        "Seasonal allergies can trigger skin sensitivity - be gentle during flare-ups.",
        "Diet changes with seasons - incorporate seasonal fruits and vegetables for skin benefits.",
        "Sleep patterns may shift - maintain consistent rest for healthy skin repair."
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Learning Resources</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Educational videos and articles to help you master skincare, grooming, and healthy lifestyle habits
          </p>
        </div>

        {/* Video Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Play className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold">Educational Videos</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <Card key={index} className="shadow-medium hover-lift overflow-hidden">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Video Player</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg leading-tight">{video.title}</h3>
                    <Badge className={getDifficultyColor(video.difficulty)}>
                      {video.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {video.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {video.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full btn-hero">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section>
          <div className="flex items-center mb-8">
            <BookOpen className="w-8 h-8 text-secondary mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold">In-Depth Articles</h2>
          </div>
          
          <div className="grid gap-8">
            {articles.map((article, index) => (
              <Card key={index} className="shadow-medium hover-lift">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="mb-2">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                  <p className="text-muted-foreground">{article.excerpt}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {article.content.slice(0, 5).map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-muted-foreground">{point}</p>
                      </div>
                    ))}
                    {article.content.length > 5 && (
                      <p className="text-sm text-muted-foreground italic">
                        ...and {article.content.length - 5} more tips
                      </p>
                    )}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Full Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mt-16">
          <Card className="shadow-soft bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Want More Resources?</CardTitle>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay updated with the latest skincare research, product reviews, and expert advice from dermatologists and skincare professionals.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <Users className="w-8 h-8 text-primary mx-auto" />
                  <h4 className="font-semibold">Expert Reviews</h4>
                  <p className="text-sm text-muted-foreground">
                    Product recommendations from certified dermatologists
                  </p>
                </div>
                <div className="space-y-2">
                  <Star className="w-8 h-8 text-secondary mx-auto" />
                  <h4 className="font-semibold">Latest Research</h4>
                  <p className="text-sm text-muted-foreground">
                    Science-backed skincare insights and discoveries
                  </p>
                </div>
                <div className="space-y-2">
                  <ExternalLink className="w-8 h-8 text-primary mx-auto" />
                  <h4 className="font-semibold">Community Tips</h4>
                  <p className="text-sm text-muted-foreground">
                    Real experiences and advice from fellow skincare enthusiasts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Resources;
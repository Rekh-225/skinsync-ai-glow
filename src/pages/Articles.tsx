import { useState, useEffect } from "react";
import { RefreshCw, ExternalLink, Calendar, Tag, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/components/auth/AuthProvider";

// Mock articles data - in real implementation, this would come from your database
const mockArticles = [
  {
    id: "1",
    title: "The Science Behind Retinol: Why It's the Gold Standard Anti-Aging Ingredient",
    url: "https://example.com/retinol-science",
    summary: "A comprehensive look at how retinol works at the cellular level to reduce signs of aging, with tips for safe introduction into your routine.",
    source: "Dermatology Journal",
    skin_types: ["all", "mature", "acne-prone"],
    tags: ["retinol", "anti-aging", "ingredients", "scientific"],
    published_at: "2024-01-15T10:00:00Z",
    image: "/api/placeholder/400/200"
  },
  {
    id: "2",
    title: "Hormonal Acne: Understanding the Root Causes and Effective Treatments",
    url: "https://example.com/hormonal-acne",
    summary: "Expert insights into why hormonal acne occurs and evidence-based treatments that actually work for adult acne sufferers.",
    source: "American Academy of Dermatology",
    skin_types: ["acne-prone", "oily", "combination"],
    tags: ["acne", "hormones", "treatment", "adult-acne"],
    published_at: "2024-01-10T14:30:00Z",
    image: "/api/placeholder/400/200"
  },
  {
    id: "3",
    title: "Ceramides vs. Hyaluronic Acid: Which Hydrator is Right for Your Skin?",
    url: "https://example.com/ceramides-vs-hyaluronic-acid",
    summary: "Breaking down the differences between two powerhouse hydrating ingredients and how to choose the right one for your skin type.",
    source: "SkinCeuticals Research",
    skin_types: ["dry", "sensitive", "combination"],
    tags: ["ceramides", "hyaluronic-acid", "hydration", "ingredients"],
    published_at: "2024-01-08T09:15:00Z",
    image: "/api/placeholder/400/200"
  },
  {
    id: "4",
    title: "The Ultimate Guide to Chemical vs. Physical Sunscreens in 2024",
    url: "https://example.com/sunscreen-guide-2024",
    summary: "Updated research on sunscreen formulations, including new UV filters and recommendations for different skin types and activities.",
    source: "Environmental Working Group",
    skin_types: ["all", "sensitive"],
    tags: ["sunscreen", "uv-protection", "prevention", "guide"],
    published_at: "2024-01-05T16:45:00Z",
    image: "/api/placeholder/400/200"
  },
  {
    id: "5",
    title: "Microbiome-Friendly Skincare: How to Support Your Skin's Natural Ecosystem",
    url: "https://example.com/microbiome-skincare",
    summary: "Latest research on the skin microbiome and how to choose products that support rather than disrupt your skin's natural balance.",
    source: "International Journal of Cosmetic Science",
    skin_types: ["sensitive", "all"],
    tags: ["microbiome", "gentle-skincare", "natural", "research"],
    published_at: "2024-01-02T11:20:00Z",
    image: "/api/placeholder/400/200"
  },
  {
    id: "6",
    title: "Clean Beauty Myths Debunked: What 'Natural' Really Means in Skincare",
    url: "https://example.com/clean-beauty-myths",
    summary: "Separating fact from fiction in the clean beauty movement, with science-based guidance on choosing effective products.",
    source: "Cosmetic Chemistry Society",
    skin_types: ["all", "sensitive"],
    tags: ["clean-beauty", "natural", "ingredients", "myths"],
    published_at: "2023-12-28T13:10:00Z",
    image: "/api/placeholder/400/200"
  }
];

const Articles = () => {
  const [articles, setArticles] = useState(mockArticles);
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkinType, setSelectedSkinType] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchLatestArticles();
  }, []);

  const fetchLatestArticles = async () => {
    try {
      setLoading(true);
      const { supabase } = await import("@/integrations/supabase/client");
      const response = await supabase.functions.invoke('fetch-articles');
      
      if (!response.error && response.data) {
        const fetchedArticles = response.data.articles || mockArticles;
        setArticles(fetchedArticles);
        setFilteredArticles(fetchedArticles);
        setLastUpdated(new Date(response.data.lastUpdated));
      } else {
        console.log('Using fallback articles');
        setArticles(mockArticles);
        setFilteredArticles(mockArticles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles(mockArticles);
      setFilteredArticles(mockArticles);
    } finally {
      setLoading(false);
    }
  };

  // Get unique skin types and tags for filters
  const skinTypes = ["all", ...new Set(articles.flatMap(article => article.skin_types))];
  const tags = ["all", ...new Set(articles.flatMap(article => article.tags))];

  // Filter articles based on search and filters
  useEffect(() => {
    let filtered = articles;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Skin type filter
    if (selectedSkinType !== "all") {
      filtered = filtered.filter(article =>
        article.skin_types.includes(selectedSkinType)
      );
    }

    // Tag filter
    if (selectedTag !== "all") {
      filtered = filtered.filter(article =>
        article.tags.includes(selectedTag)
      );
    }

    setFilteredArticles(filtered);
  }, [searchTerm, selectedSkinType, selectedTag, articles]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSkinTypeColor = (skinType: string) => {
    const colors: { [key: string]: string } = {
      'oily': 'bg-blue-100 text-blue-800',
      'dry': 'bg-orange-100 text-orange-800',
      'combination': 'bg-purple-100 text-purple-800',
      'sensitive': 'bg-pink-100 text-pink-800',
      'acne-prone': 'bg-red-100 text-red-800',
      'mature': 'bg-gray-100 text-gray-800',
      'all': 'bg-green-100 text-green-800'
    };
    return colors[skinType] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Latest Skincare Research & Articles</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            Stay updated with the latest skincare research, breakthrough ingredients, and evidence-based advice from trusted dermatological sources
          </p>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleDateString()} at {lastUpdated.toLocaleTimeString()}
            </p>
          )}
          {user && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg inline-block">
              <p className="text-primary text-sm">
                🎯 Articles are personalized based on your skin profile
              </p>
            </div>
          )}
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Find Relevant Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Skin Type Filter */}
              <Select value={selectedSkinType} onValueChange={setSelectedSkinType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select skin type" />
                </SelectTrigger>
                <SelectContent>
                  {skinTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Skin Types" : `${type.charAt(0).toUpperCase()}${type.slice(1)} Skin`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Tag Filter */}
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  {tags.map(tag => (
                    <SelectItem key={tag} value={tag}>
                      {tag === "all" ? "All Topics" : tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Refresh Button */}
              <Button 
                onClick={fetchLatestArticles}
                disabled={loading}
                variant="outline"
                className="flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </>
                )}
              </Button>
            </div>

            {/* Active Filters */}
            {(searchTerm || selectedSkinType !== "all" || selectedTag !== "all") && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm("")}>
                    Search: {searchTerm} ✕
                  </Badge>
                )}
                {selectedSkinType !== "all" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedSkinType("all")}>
                    {selectedSkinType} skin ✕
                  </Badge>
                )}
                {selectedTag !== "all" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedTag("all")}>
                    {selectedTag} ✕
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Articles Grid */}
        {loading && filteredArticles.length === 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="shadow-soft">
                <div className="h-48 bg-muted animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-muted rounded w-full mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                    <div className="h-8 bg-muted rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="shadow-medium hover-lift overflow-hidden">
              {/* Article Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                    <ExternalLink className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm">Article Image</p>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Article Meta */}
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {article.source}
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(article.published_at)}
                  </div>
                </div>

                {/* Article Title */}
                <h3 className="font-semibold text-lg mb-3 line-clamp-2 hover:text-primary transition-colors">
                  {article.title}
                </h3>

                {/* Article Summary */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {article.summary}
                </p>

                {/* Skin Types */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {article.skin_types.map((type) => (
                      <Badge 
                        key={type} 
                        variant="secondary" 
                        className={`text-xs ${getSkinTypeColor(type)}`}
                      >
                        {type === "all" ? "All Types" : type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {article.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{article.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Read Article Button */}
                <Button 
                  asChild 
                  className="w-full btn-hero"
                  size="sm"
                >
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    Read Article
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        )}

        {/* No Results */}
        {!loading && filteredArticles.length === 0 && (
          <Card className="text-center py-12 shadow-soft">
            <CardContent>
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find relevant articles.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSkinType("all");
                  setSelectedTag("all");
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="mt-12 text-center shadow-medium bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-4">Want More Personalized Content?</h3>
            <p className="text-muted-foreground mb-6">
              {user 
                ? "Take our quiz to get articles tailored to your specific skin type and concerns."
                : "Sign up and take our quiz to get articles tailored to your specific skin type and concerns."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user && (
                <Button asChild variant="outline">
                  <a href="/auth">Sign Up for Free</a>
                </Button>
              )}
              <Button asChild className="btn-hero">
                <a href="/quiz">Take Skin Quiz</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Articles;
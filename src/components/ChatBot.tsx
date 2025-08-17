import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const quickOptions = [
  { label: "🧴 Get Routine", value: "routine" },
  { label: "🥗 Diet Tips", value: "diet" },
  { label: "✨ Grooming", value: "grooming" },
  { label: "🔬 Check Ingredient", value: "ingredient" },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi 👋 I'm your SkinSync Assistant! Want a routine, diet tips, or ingredient check?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Here you would integrate with OpenAI API
      // For now, we'll simulate responses
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const botResponse = getBotResponse(message);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error("Sorry, I'm having trouble responding right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("routine") || lowerMessage.includes("skincare")) {
      return "For a personalized routine, I'd recommend starting with your skin type. Are you dealing with oily, dry, combination, or sensitive skin? 🧴\n\nBasic routine:\n✅ Morning: Cleanser → Moisturizer → SPF\n✅ Evening: Cleanser → Treatment → Moisturizer";
    }
    
    if (lowerMessage.includes("diet") || lowerMessage.includes("food")) {
      return "Great question! Diet plays a huge role in skin health! 🥗\n\n💚 Eat more: \n• Fresh fruits & vegetables\n• Water (8+ glasses daily)\n• Omega-3 rich foods\n\n❌ Limit:\n• Sugary drinks\n• Processed foods\n• Excess dairy";
    }
    
    if (lowerMessage.includes("grooming") || lowerMessage.includes("hygiene")) {
      return "Here are some key grooming tips! ✨\n\n🚿 Daily essentials:\n• Gentle face wash\n• Clean towels\n• Regular hair washing\n• Nail care\n\n💡 Remember: 'Cleanliness is half of faith' - consistency is key!";
    }
    
    if (lowerMessage.includes("ingredient")) {
      return "I can help check ingredients! 🔬\n\nJust tell me the ingredient name, and I'll let you know:\n✅ If it's good for your skin type\n⚠️ Any precautions\n🧴 Best products with it\n\nWhat ingredient would you like me to check?";
    }
    
    return "I'm here to help with skincare routines, diet advice, grooming tips, and ingredient checks! What would you like to know more about? 😊";
  };

  const handleQuickOption = (option: string) => {
    const messages = {
      routine: "Can you help me with a skincare routine?",
      diet: "What foods are good for healthy skin?",
      grooming: "Give me some grooming and hygiene tips",
      ingredient: "I want to check if an ingredient is safe for my skin",
    };
    
    handleSendMessage(messages[option as keyof typeof messages]);
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-strong hover:shadow-glow transition-all duration-300 z-40 ${
          isOpen ? "scale-0" : "scale-100"
        } btn-hero`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-strong z-50 flex flex-col">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <CardTitle className="text-lg">SkinSync Assistant</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                      message.isBot
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Options */}
            {messages.length === 1 && (
              <div className="p-4 border-t space-y-2">
                <p className="text-sm text-muted-foreground">Quick options:</p>
                <div className="flex flex-wrap gap-2">
                  {quickOptions.map((option) => (
                    <Badge
                      key={option.value}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleQuickOption(option.value)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about skincare..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                size="icon"
                className="btn-hero"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
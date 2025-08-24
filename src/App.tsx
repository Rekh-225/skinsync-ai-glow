import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import Header from "./components/layout/Header";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import QuizResults from "./pages/QuizResults";
import Routines from "./pages/Routines";
import Diet from "./pages/Diet";
import Grooming from "./pages/Grooming";
import IngredientChecker from "./pages/IngredientChecker";
import Resources from "./pages/Resources";
import Auth from "./pages/Auth";
import AntiAging from "./pages/AntiAging";
import Articles from "./pages/Articles";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/quiz-results" element={<QuizResults />} />
                <Route path="/routines" element={<Routines />} />
                <Route path="/diet" element={<Diet />} />
                <Route path="/grooming" element={<Grooming />} />
                <Route path="/ingredient-checker" element={<IngredientChecker />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/anti-aging" element={<AntiAging />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <ChatBot />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
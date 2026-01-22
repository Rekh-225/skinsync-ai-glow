🌿 SkinSync – AI-Powered Skincare Assistant

SkinSync is an AI-powered skincare guidance platform designed to help users—especially those with acne-prone or sensitive skin—build personalized skincare routines, understand ingredient safety, and adopt healthier lifestyle habits.

The platform combines science-backed educational content with AI-driven personalization, delivered through an interactive skin quiz and a conversational chatbot. SkinSync prioritizes accessibility, simplicity, and practical skincare guidance.

🚀 Features
🧠 AI Skincare Chatbot

An interactive chatbot that provides personalized skincare guidance, including:

Daily skincare routines

Diet and nutrition advice

Acne triggers and prevention

Ingredient safety explanations

Key Capabilities

Context-aware responses based on quiz results

Supports follow-up questions and continuous conversations

Powered by OpenRouter via Supabase Edge Functions

Quiz data stored in localStorage for persistent personalization

📝 Skin Type Quiz & Personalized Routine

Users answer a short quiz covering:

Skin type (Oily, Dry, Combination, Sensitive)

Climate (Hot, Cold, Temperate, etc.)

Diet habits

Primary skin concerns

Outcome

AI-generated skincare routine (Morning, Evening, Weekly care)

Quiz responses and routines stored in Supabase and localStorage

Built-in fallback routine when AI services are unavailable

🧴 Ingredient Checker

Users can input product ingredient lists to receive AI analysis:

Skin-type suitability assessment

Identification of acne triggers and pore-clogging ingredients

Simple safety badges: Safe, Caution, Avoid

🎥 Educational Content

A curated learning section featuring:

Embedded YouTube videos on skin type identification and hygiene

Articles on skincare habits, common mistakes, and seasonal care

Visual difficulty indicators for content accessibility

🧩 Enhanced Chatbot UI

Designed for a smooth, app-like experience:

Fixed header with title and close button

Scrollable message area with auto-scroll

Pinned input bar at the bottom

Proper overflow handling for long responses

Continuous chat without session resets

📰 Articles Feed (Mock Data)

The articles feed currently uses mock data served from a Supabase Edge Function.
It is designed to be easily replaced with a real news or RSS integration.

🛠 Tech Stack

Frontend: React, TypeScript, Vite

Styling: Tailwind CSS, Shadcn UI

Backend: Supabase (Auth + Edge Functions)

Database: Supabase

AI API: OpenRouter (OpenAI-compatible models)

Icons: Lucide React

🔐 API Configuration

AI-powered features require an OpenRouter API key.

Required Secret
OPENROUTER_API_KEY


🧱 Architecture Overview
src/
 ├─ components/
 ├─ pages/
 ├─ integrations/
 │   └─ supabase/client.ts
supabase/
 └─ functions/
     ├─ chat-ai              → chatbot responses
     ├─ generate-routine     → routine generation & storage
     ├─ analyze-ingredients  → ingredient safety analysis
     └─ fetch-articles       → mock articles feed

🔐 Required Secrets (Supabase Edge Functions)

OPENROUTER_API_KEY – AI responses

SUPABASE_URL – Supabase project URL

SUPABASE_SERVICE_ROLE_KEY – Server-side database access

✅ Getting Started

Install dependencies:

npm install


Start the development server:

npm run dev


Configure Supabase Edge Functions and secrets to enable AI features.

🧪 Local Development Notes

The app runs without AI features by default

Chatbot, routine generation, and ingredient analysis require:

Supabase Edge Functions

OpenRouter API credentials

A fallback routine is used if AI calls fail

📦 Deployment

Frontend: Vercel, Netlify, or GitHub Pages (Vite build output)

Backend: Supabase Edge Functions (with secrets configured)

🧭 Future Enhancements

Dynamic educational content based on quiz results

Routine reminders and notifications

Community features (reviews, discussions)

Multi-model AI selection for users

📄 License

This project is intended for educational and research purposes only.

Disclaimer:
AI-generated skincare guidance is not a substitute for professional medical or dermatological advice.

If you want, I can also:

Add screenshots & demo GIF sections

Write a short project description for recruiters

Optimize this README for hackathons or open-source showcases

Just tell me 👍

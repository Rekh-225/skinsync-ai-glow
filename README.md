# 🌿 SkinSync – Skincare Guidance Platform

SkinSync is a React + Vite skincare guidance platform that helps users explore routines, diet tips, grooming practices, and ingredient safety information. It combines static educational content with AI-powered personalization backed by Supabase Edge Functions.

## 🚀 Features

### 🧠 Skincare Chatbot
Interactive chatbot for skincare guidance that answers questions about:
* Skincare routines
* Diet and nutrition
* Acne triggers
* Ingredient safety

**Key Capabilities:**
* Supports follow-up questions and conversations
* Uses an external AI API (via OpenRouter) through Supabase Edge Functions
* Provides context-aware responses based on quiz results stored in localStorage

### 📝 Skin Type Quiz + Personalized Routine
Users answer questions about:
* Skin type (Oily, Dry, Combination, Sensitive)
* Climate (Hot, Cold, Temperate, etc.)
* Diet habits
* Main skin concerns

**Outcome:**
* AI generates a personalized routine (Morning, Evening, Weekly treatments)
* Quiz responses and generated routines are stored in Supabase and localStorage
* A built-in fallback routine is used if AI calls fail

### 🧴 Ingredient Checker
Users can input product ingredients to receive an AI analysis:
* Checks suitability for the user’s specific skin type
* Identifies potential acne triggers or pore-clogging ingredients
* Provides clear, easy-to-understand safety badges (Safe, Caution, Avoid)

### 🎥 Educational Content
A curated library of resources including:
* Embedded YouTube videos explaining how to identify skin type and basic hygiene
* In-depth articles on skincare mistakes, habits, and seasonal care
* Visual difficulty indicators for video content

### 📰 Articles Feed (Mock Data)
The articles feed is currently powered by a mock dataset returned from a Supabase Edge Function. It is designed to be swapped for a real news/RSS integration later.

## 🛠 Tech Stack
* **Frontend**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI
* **Backend**: Supabase (Auth + Edge Functions)
* **AI API**: OpenRouter (OpenAI-compatible models)
* **Icons**: Lucide React

## 🧱 Architecture Overview
* **Frontend app**: `src/` (React pages, components, and UI)
* **Supabase client**: `src/integrations/supabase/client.ts`
* **Supabase Edge Functions**: `supabase/functions/*`
  * `chat-ai` → chatbot responses
  * `generate-routine` → personalized routine generation + storage
  * `analyze-ingredients` → ingredient analysis
  * `fetch-articles` → mock article feed

## 🔐 Required Secrets (Supabase Edge Functions)
Set these secrets in Supabase (or local development environment):
* `OPENROUTER_API_KEY` (AI responses)
* `SUPABASE_URL` (project URL for Edge Functions)
* `SUPABASE_SERVICE_ROLE_KEY` (required for server-side writes)

## ✅ Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the frontend dev server:
   ```bash
   npm run dev
   ```
3. Configure Supabase Edge Functions and secrets if you want AI features enabled.

## 🧪 Local Development Notes
* The app will render without AI features, but chatbot, routine generation, and ingredient analysis require Supabase Edge Functions plus OpenRouter credentials.
* The quiz results page includes a built-in fallback routine if AI calls fail.

## 📦 Deployment
* **Frontend**: Deploy with Vite build output (e.g., Vercel/Netlify/GitHub Pages).
* **Backend**: Deploy Supabase Edge Functions separately and ensure secrets are configured.

## 📄 License
This project is for educational and research purposes.
**Medical or dermatological advice provided by the AI is not a substitute for professional consultation.**

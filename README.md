# 🌿 SkinSync – AI-Powered Skincare Assistant

SkinSync is a  AI-powered skincare platform designed to help users—especially those with acne-prone skin—receive personalized skincare routines, diet suggestions, and ingredient safety checks based on their skin type and lifestyle.

The project focuses on accessibility, simplicity, and science-backed guidance, delivered through an interactive quiz and an AI chatbot.
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
* Uses an external AI API (via OpenRouter)
* Provides context-aware responses based on your quiz results
* Uses an external AI API (via OpenRouter) through Supabase Edge Functions
* Provides context-aware responses based on quiz results stored in localStorage

### 📝 Skin Type Quiz
Users answer simple questions about:
### 📝 Skin Type Quiz + Personalized Routine
Users answer questions about:
* Skin type (Oily, Dry, Combination, Sensitive)
* Climate (Hot, Cold, Temperate, etc.)
* Diet habits
* Main skin concerns

**Outcome:**
* AI generates a personalized routine (Morning, Evening, Weekly treatments)
* Quiz responses and generated routines are saved locally and in the database for future reference
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

### 🧩 Enhanced Chatbot UI
The chatbot offers a native app-like experience:
* **Header**: Title + close button
* **Scrollable Area**: Messages auto-scroll to the latest entry
* **Pinned Input**: Input bar stays fixed at the bottom
* **Overflow Handling**: Long answers stay strictly inside the chatbot window
* **Continuous Chat**: Users can ask multiple questions without interruption
### 📰 Articles Feed (Mock Data)
The articles feed is currently powered by a mock dataset returned from a Supabase Edge Function. It is designed to be swapped for a real news/RSS integration later.

## 🛠 Tech Stack

* **Platform**: Lovable (React/Vite environment)
* **AI API**: OpenRouter (accessing OpenAI-compatible models, e.g., gpt-oss-20b)
* **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
* **Database**: Supabase
* **Frontend**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI
* **Backend**: Supabase (Auth + Edge Functions)
* **AI API**: OpenRouter (OpenAI-compatible models)
* **Icons**: Lucide React

## 🔐 API Configuration

The chatbot and analysis features rely on the OpenRouter API. You must configure the secret key correctly for the backend functions to work.

**Required Secret Name:**
`OPENROUTER_API_KEY`

**Setup Instructions:**
1.  Obtain an API key from [OpenRouter](https://openrouter.ai/).
2.  Add this key to your project's secrets management (e.g., Supabase Vault or `.env` file for local development).
3.  Ensure the key has an active quota.

**Note on Models:**
The system is currently configured to use the `openai/gpt-oss-20b` model. You can modify the model selection in `supabase/functions/chat-ai/index.ts` if needed.

## 📊 What Success Looks Like

* ✅ Users complete the skin quiz and receive a generated routine.
* ✅ Chatbot responds accurately to specific skincare queries.
* ✅ Ingredient checker correctly identifies risky ingredients based on user context.
* ✅ Platform layout remains responsive and clean across devices.

## 🧭 Future Enhancements

* **Dynamic Educational Content**: Adapt video suggestions based on specific quiz results.
* **Automated Notifications**: Reminders for routines and diet tips.
* **Community Features**: User forums or reviews.
* **Multi-model AI Support**: Allow users to switch between different AI models.
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

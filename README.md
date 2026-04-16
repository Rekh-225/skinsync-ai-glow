# 🌿 SkinSync — AI-Powered Skincare Platform

SkinSync is a full-stack, AI-powered skincare web application built with React, TypeScript, and Supabase. It helps users—especially those with acne-prone or sensitive skin—receive personalized skincare routines, diet recommendations, ingredient safety analysis, and expert skincare guidance through an interactive quiz and a floating AI chatbot.

---

## 🚀 Features

### 📝 Skin Type Quiz & Personalized Routine
A multi-step quiz that collects:
- **Skin type** — Oily, Dry, Combination, or Sensitive
- **Climate** — Hot & Humid, Hot & Dry, Cold, or Temperate
- **Diet habits** — Healthy, Mixed, or Mostly Processed
- **Main concerns** — Acne, dryness, sensitivity, and more

On completion, the `generate-routine` Supabase Edge Function calls the OpenRouter AI API to produce a fully personalized routine structured as:
- Morning, Evening, and Weekly treatment steps
- Key skincare recommendations and product ingredient guidance (beneficial vs. avoid)
- Diet suggestions and lifestyle tips tailored to the user's climate
- Realistic timeline expectations for visible results

Quiz responses and generated routines are persisted to Supabase (`quiz_responses` and `personalized_routines` tables) and cached in `localStorage`. A built-in fallback routine is used if the AI call fails.

### 🧠 AI Skincare Chatbot
A floating chatbot powered by the `chat-ai` Supabase Edge Function and OpenRouter (`openai/gpt-oss-20b`). Capabilities include:
- Answering questions about skincare routines, diet, acne triggers, and ingredient safety
- Context-aware responses using quiz results stored in `localStorage`
- Support for multi-turn follow-up conversations
- Concise, evidence-based answers aimed at young adults and students
- Native app-like UI with auto-scrolling messages and a pinned input bar

### 🧴 Ingredient Checker
Users paste a product's ingredient list to receive an AI-powered safety analysis via the `analyze-ingredients` Edge Function:
- Assesses ingredient compatibility with the user's skin type
- Flags potential acne triggers and pore-clogging ingredients
- Returns clear safety badges (Safe / Caution / Avoid)

### 🕰 Anti-Aging (Wrinkles)
Age-grouped skincare routines (20s, 30s, 40s, 50s+) covering:
- Morning and evening routine steps specific to each life stage
- Collapsible section layout for easy navigation

### 🥗 Diet & Nutrition
Evidence-based dietary guidance for skin health, including skin-friendly foods and nutrients to prioritize or avoid.

### 💆 Grooming
Grooming tips and routines tailored for different skin types and lifestyle needs.

### 📰 Articles Feed
A curated skincare articles feed served by the `fetch-articles` Supabase Edge Function. Currently backed by a mock dataset; designed to be replaced with a live news or RSS integration.

### 📚 Resources
A curated library featuring embedded YouTube videos on skin-type identification and hygiene, plus in-depth articles on skincare habits and seasonal care.

### 🔔 Notification System
In-app notification bell for authenticated users, providing routine reminders and updates.

### 🔑 Authentication
User sign-up and sign-in via Supabase Auth. New users are automatically assigned a `user` role and a profile record via a database trigger. Role-based access control (RBAC) is enforced at the database level using Row Level Security (RLS).

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, Shadcn UI (Radix UI primitives) |
| **Routing** | React Router DOM v6 |
| **State / Data** | TanStack Query (React Query) |
| **Forms** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **Backend** | Supabase (Auth, PostgreSQL, Edge Functions) |
| **AI API** | OpenRouter (`openai/gpt-oss-20b`) |
| **Build** | Vite, PostCSS, Autoprefixer |

---

## 🧱 Project Structure

```
skinsync-ai-glow/
├── src/
│   ├── components/
│   │   ├── auth/          # AuthProvider context
│   │   ├── layout/        # Header with navigation
│   │   ├── ui/            # Shadcn UI component library
│   │   ├── ChatBot.tsx    # Floating AI chatbot
│   │   └── NotificationSystem.tsx
│   ├── pages/
│   │   ├── Home.tsx           # Landing page
│   │   ├── Quiz.tsx           # Skin type quiz
│   │   ├── QuizResults.tsx    # Personalized routine display
│   │   ├── Routines.tsx       # Browse routines
│   │   ├── IngredientChecker.tsx
│   │   ├── Diet.tsx
│   │   ├── Grooming.tsx
│   │   ├── AntiAging.tsx      # Wrinkle & anti-aging routines
│   │   ├── Articles.tsx
│   │   ├── Resources.tsx
│   │   ├── Auth.tsx
│   │   └── Contact.tsx
│   └── integrations/
│       └── supabase/      # Supabase client configuration
├── supabase/
│   ├── functions/
│   │   ├── chat-ai/           # Chatbot AI responses
│   │   ├── generate-routine/  # Quiz → personalized routine
│   │   ├── analyze-ingredients/
│   │   └── fetch-articles/
│   └── migrations/        # PostgreSQL schema migrations
└── public/
```

---

## 🔐 Environment & Secrets Configuration

All AI and backend features require the following secrets to be set in your Supabase project (Supabase Dashboard → Project Settings → Edge Functions → Secrets):

| Secret | Purpose |
|---|---|
| `OPENROUTER_API_KEY` | AI responses via OpenRouter |
| `SUPABASE_URL` | Supabase project URL (available by default in Edge Functions) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side database writes from Edge Functions |

Obtain an OpenRouter API key at [https://openrouter.ai](https://openrouter.ai).

> **Model note:** The chatbot and routine generator currently use `openai/gpt-oss-20b`. To change the model, edit the `model` field in `supabase/functions/chat-ai/index.ts` and `supabase/functions/generate-routine/index.ts`.

---

## ✅ Getting Started

### Prerequisites
- Node.js >= 18 (or Bun)
- A Supabase project with the schema migrations applied
- An OpenRouter API key

### Installation

```bash
# Clone the repository
git clone https://github.com/Rekh-225/skinsync-ai-glow.git
cd skinsync-ai-glow

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

The app runs at `http://localhost:8080` by default. The UI renders fully without AI features. To enable the chatbot, routine generation, and ingredient analysis, you must deploy the Supabase Edge Functions and configure the secrets above.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Production build |
| `npm run build:dev` | Development build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 📦 Deployment

- **Frontend**: Build with `npm run build` and deploy the `dist/` output to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).
- **Backend**: Deploy Supabase Edge Functions via the Supabase CLI (`supabase functions deploy`) and ensure all required secrets are configured in the Supabase dashboard.

---

## 🧭 Future Enhancements

- **Dynamic Educational Content**: Tailor video and article suggestions to individual quiz results
- **Automated Reminders**: Push or in-app notifications for daily routine steps
- **Live Articles Feed**: Replace mock article data with a real RSS or news API integration
- **Community Features**: User-generated reviews and discussion forums
- **Multi-model AI Support**: Allow users to select from multiple AI models

---

## ⚠️ Disclaimer

SkinSync is intended for educational and informational purposes only. AI-generated recommendations are **not** a substitute for advice from a licensed dermatologist or medical professional.

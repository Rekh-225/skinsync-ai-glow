🌿 SkinSync – AI-Powered Skincare Assistant

SkinSync is a no-code, AI-powered skincare platform designed to help users—especially those with acne-prone skin—receive personalized skincare routines, diet suggestions, and ingredient safety checks based on their skin type and lifestyle.

The project focuses on accessibility, simplicity, and science-backed guidance, delivered through an interactive quiz and an AI chatbot.

🚀 Features
🧠 AI Skincare Chatbot

Interactive chatbot for skincare guidance

Answers questions about:

Skincare routines

Diet and nutrition

Acne triggers

Ingredient safety

Supports follow-up questions and conversations

Uses an external AI API (via OpenRouter / OpenAI-compatible API)

📝 Skin Type Quiz

Users answer simple questions about:

Skin type

Acne concerns

Diet habits

AI generates a personalized routine

Only the relevant routine is shown (not all routines)

Quiz responses and AI-generated routines are saved for future reference

🧴 Ingredient Checker

Users can input product ingredients

AI checks whether ingredients are:

Suitable for the user’s skin type

Acne-safe or pore-clogging

Clear, easy-to-understand feedback

🎥 Educational Content

Embedded YouTube videos explaining:

How to identify your skin type

Basic skincare hygiene

Video suggestions can adapt based on quiz results

🧩 Chatbot UI Fix (Important Update)

The chatbot has been improved to behave like a real messaging app:

Fixed layout with three sections:

Header (title + close button)

Scrollable message area

Input bar pinned at the bottom

Long answers stay inside the chatbot window

Auto-scrolls to the latest message

User can ask multiple questions continuously

Prevents messages from overflowing outside the chatbox

This ensures a smooth and usable chat experience across devices.

🛠 Tech Stack

Platform: Lovable (no-code)

AI API: OpenRouter (OpenAI-compatible models, e.g. gpt-oss-20b)

Frontend: Lovable UI components

Database: Built-in Lovable database

Video Sources: YouTube embeds

Language: English only

🔐 API Configuration

The chatbot uses an AI API key stored as a secret.

Required Secret Name:

OPENAI_API_KEY


Even when using OpenRouter, the secret name must remain OPENAI_API_KEY for compatibility.

Make sure:

The API key has active quota

The correct model is selected (e.g., OpenAI: gpt-oss-20b (free))

The platform is online (offline mode disables AI features)

📊 What Success Looks Like

Users complete the skin quiz and receive relevant routines

Chatbot responds smoothly without layout issues

Ingredient checker provides clear results

Users can ask follow-up questions easily

Platform remains simple, clean, and beginner-friendly

🧭 Future Enhancements

Automated notifications for routines and diet tips

Weekly skincare reminders

Community features

Support for additional skin concerns (wrinkles, pigmentation)

Multi-model AI support

📄 License

This project is for educational and research purposes.
Medical or dermatological advice is not a substitute for professional consultation.

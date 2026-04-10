# Challenge 1.12 — Build and Deploy Your First AI Chatbot

## Overview

This project is a minimal AI chatbot built with:

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express
* **AI API:** OpenRouter
* **Model:** `openai/gpt-4o-mini`

The chatbot supports:

* Real-time user messages
* AI-generated replies
* Conversation context (remembers previous messages in the same session)
* Secure API key handling through the backend

## Project Structure

| File                   | Status    | Purpose                                        |
| ---------------------- | --------- | ---------------------------------------------- |
| `backend/server.js`    | Completed | Express server, API proxy, serves frontend     |
| `frontend/index.html`  | Completed | Chat UI                                        |
| `frontend/script.js`   | Completed | Handles sending messages and rendering replies |
| `frontend/style.css`   | Completed | Chatbot styling                                |
| `backend/.env.example` | Completed | Template for environment variables             |

## Features Implemented

### 1. Secure Backend API Integration

* The chatbot uses the **OpenRouter API** with the model `openai/gpt-4o-mini`.
* The API key is stored in `backend/.env`.
* The frontend never directly accesses the AI provider.

### 2. Conversation Context

* A `messages` array is maintained in the frontend.
* Every new request sends the full message history.
* This allows the chatbot to understand follow-up questions.

### 3. Frontend + Backend Deployment

* The frontend is served directly from the backend.
* This avoids CORS issues and keeps deployment simple.

## API and Model Used

* **API Provider:** OpenRouter
* **Model:** `openai/gpt-4o-mini`

## Why the Backend Handles the API Call

The API key must stay on the backend because frontend JavaScript is visible to users through browser DevTools and network requests. If the key were exposed in the frontend, anyone could copy it and make unauthorized requests, which could lead to quota misuse or extra charges.

## Fallback Provider

If OpenRouter credits run out, the fallback provider would be:

* **Google Gemini API**

To switch providers, only two changes are needed:

1. Change the API base URL to Gemini's endpoint.
2. Change the model name (for example, `gemini-1.5-flash`).

## Local Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` inside `backend/`:

```bash
cp .env.example .env
```

Add your API key:

```env
OPENROUTER_API_KEY=your-key-here
PORT=3000
```

### 3. Run locally

```bash
npm start
```

Then open:

* `http://localhost:3000`

## Deployment

### Backend + Frontend

* **Platform:** Render
* **Live URL:** [https://ai-chatbot-igd5.onrender.com/](https://ai-chatbot-igd5.onrender.com/)

The frontend is served by the Express backend, so only one deployment URL is needed.

## What to Submit

1. GitHub PR link (`feature/ai-chatbot` branch)
2. Google Drive demo video link (public access)

## Demo Video Checklist

The video should show:

* Chatbot UI working live
* A follow-up question that uses conversation context
* `server.js` showing `process.env.OPENROUTER_API_KEY`
* README explanation

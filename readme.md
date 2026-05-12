# 🤖 AI Customer Support System

A full-stack AI-powered customer support platform with a chatbot, ticket management, FAQ system, and admin analytics dashboard — built for beginners with a production-style architecture.

![Tech Stack](https://img.shields.io/badge/Frontend-React_+_Tailwind-blueviolet)
![Tech Stack](https://img.shields.io/badge/Backend-Node.js_+_Express-green)
![Tech Stack](https://img.shields.io/badge/Database-MongoDB_Atlas-brightgreen)
![Tech Stack](https://img.shields.io/badge/Grok_/_Gemini-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Folder Structure](#-folder-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
  - [4. MongoDB Atlas Setup](#4-mongodb-atlas-setup)
  - [5. OpenAI API Setup](#5-openai-api-setup)
  - [6. Environment Variables](#6-environment-variables)
  - [7. Run the Project](#7-run-the-project)
- [API Reference](#-api-reference)
- [Pages & Features](#-pages--features)
- [Deployment](#-deployment)
  - [Deploy Backend on Render](#deploy-backend-on-render)
  - [Deploy Frontend on Vercel](#deploy-frontend-on-vercel)
- [Creating an Admin Account](#-creating-an-admin-account)
- [Common Errors & Fixes](#-common-errors--fixes)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

AI Customer Support System is a beginner-friendly yet visually impressive full-stack MVP that demonstrates:

- ✅ Full authentication system with JWT and role-based access
- ✅ AI chatbot powered by OpenAI GPT (or Gemini)
- ✅ Lightweight NLP with keyword-based intent detection
- ✅ Automatic ticket escalation for unresolved queries
- ✅ Support ticket management with status tracking
- ✅ FAQ management system (admin-controlled)
- ✅ Admin analytics dashboard with charts
- ✅ Modern dark purple UI with glassmorphism

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based session management
- Password hashing with bcrypt
- Role-based access control (user / admin)
- Protected frontend routes

### 🤖 AI Chatbot
- Natural language query handling via OpenAI API
- Lightweight intent recognition (no ML library needed)
- Keyword-based NLP preprocessing
- FAQ suggestion based on detected intent
- Typing animation and modern chat bubbles
- Full chat history stored per user

### 🎫 Ticket System
- Create support tickets manually or via auto-escalation
- View ticket history with status badges
- Filter by status (open / in-progress / closed)
- Search by title or description
- Admin can update ticket status

### 📚 FAQ Management
- Admin can create, edit, and delete FAQs
- Categorised FAQ entries
- Public read access (no login required)

### 📊 Admin Dashboard
- Stats overview: users, chats, tickets, escalations
- Bar chart visualisation with Recharts
- Ticket monitoring panel
- Clean card-based layout

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS, Axios, React Router, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcryptjs |
| AI Integration | GROK API or Gemini API |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas |

---

## 🏗 Project Architecture

```
User Browser (React)
       │
       │  HTTP Requests (Axios)
       ▼
Express REST API (Node.js)
       │
       ├──► MongoDB Atlas (data storage)
       │
       └──► OpenAI / Gemini API (AI responses)
```

---

## 📁 Folder Structure

```
ai-support-system/
│
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register & login logic
│   │   ├── chatController.js      # Chatbot message handling
│   │   ├── ticketController.js    # Ticket CRUD operations
│   │   ├── faqController.js       # FAQ CRUD operations
│   │   └── adminController.js     # Dashboard statistics
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification + admin guard
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Chat.js                # Chat history schema
│   │   ├── Ticket.js              # Support ticket schema
│   │   └── FAQ.js                 # FAQ schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── ticketRoutes.js
│   │   ├── faqRoutes.js
│   │   └── adminRoutes.js
│   ├── services/
│   │   ├── aiService.js           # OpenAI/Gemini API calls
│   │   └── intentService.js       # Keyword NLP intent detection
│   ├── utils/
│   │   └── escalationHelper.js    # Escalation decision logic
│   ├── .env                       # Secret environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                  # App entry point
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       │   └── axios.js           # Axios instance with base URL + JWT
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── ChatBubble.jsx
│       │   ├── TicketCard.jsx
│       │   └── FAQItem.jsx
│       ├── context/
│       │   └── AuthContext.jsx    # Global auth state (user, login, logout)
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── ChatPage.jsx
│       │   ├── TicketPage.jsx
│       │   └── AdminDashboard.jsx
│       ├── App.jsx                # Route definitions
│       └── main.jsx               # React entry point
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

## ✅ Prerequisites

Make sure you have these installed before starting:

| Tool | Version | Download |
|---|---|---|
| Node.js | v18 or higher | https://nodejs.org |
| npm | v9 or higher | Comes with Node.js |
| Git | Latest | https://git-scm.com |
| VS Code | Latest | https://code.visualstudio.com |

You will also need free accounts on:
- [MongoDB Atlas](https://mongodb.com/atlas) — cloud database
- [GrokAI Platform](https://Grok.com) — AI API key
- [GitHub](https://github.com) — code hosting
- [Render](https://render.com) — backend deployment
- [Vercel](https://vercel.com) — frontend deployment

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/HiteshCodesl/AI-Powered-Customer-Support-Chatbot-Platform.git
```

---

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install all dependencies
npm install
```

This installs:
- `express` — web server
- `mongoose` — MongoDB ORM
- `dotenv` — loads .env variables
- `bcryptjs` — password hashing
- `jsonwebtoken` — JWT auth tokens
- `cors` — allows frontend to call backend
- `axios` — calls OpenAI/Gemini API

---

### 3. Frontend Setup

Open a **new terminal** and run:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

### 4. MongoDB Atlas Setup

1. Go to [https://mongodb.com/atlas](https://mongodb.com/atlas)
2. Click **"Try Free"** and create an account
3. Create a new **free cluster** (M0 tier)
4. Under **Database Access** → Add a database user with a username and password
5. Under **Network Access** → Add IP Address → click **"Allow Access from Anywhere"** (`0.0.0.0/0`)
6. Click **Connect** on your cluster → **Connect your application**
7. Copy the connection string — it looks like this:

```
mongodb+srv://youruser:yourpassword@cluster0.abc123.mongodb.net/ai-support?retryWrites=true&w=majority
```

> ⚠️ Replace `<password>` in the string with your actual database user password.

---

### 5. GROK API Setup

1. Go to [https://console.groq.com/keys](https://console.groq.com/keys)
2. Sign up or log in
3. Click your profile → **View API keys**
4. Click **"Create new secret key"**
5. Copy the key — you only see it once!

> 💡 **Using Gemini instead?** Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey), create a key, and update `aiService.js` to use the Gemini API endpoint.

---

### 6. Environment Variables

#### Backend — create `backend/.env`

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=pick_any_long_random_string_here
GROK=your_grok_api_key_here
```

> 🔒 **Never commit `.env` to GitHub.** It is already listed in `.gitignore`.

#### Frontend — create `frontend/.env`

```env
VITE_API_URL=http://localhost:3000/api
```

> ⚠️ All Vite environment variables **must** start with `VITE_` or they won't work.

---

### 7. Run the Project

You need **two terminals open at the same time.**

**Terminal 1 — Start Backend:**
```bash
cd backend
npm start
```

Expected output:
```
MongoDB Connected: cluster0.abc123.mongodb.net
Server running on port 5000
```

**Terminal 2 — Start Frontend:**
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in 300ms
➜  Local:   http://localhost:5173/
```

Open your browser and go to: **http://localhost:5173**

---

## 📡 API Reference

All routes are prefixed with `/api`.

### Auth Routes — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a new user |
| POST | `/auth/login` | Public | Login and receive JWT |

**Register body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Login body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

---

### Chat Routes — `/api/chat`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/chat/message` | User (JWT) | Send a message, get AI reply |
| GET | `/chat/history` | User (JWT) | Fetch past chat messages |

**Message body:**
```json
{
  "message": "I want a refund for my last order"
}
```

**Response:**
```json
{
  "reply": "I understand you'd like a refund...",
  "intent": "refund",
  "escalated": false
}
```

---

### Ticket Routes — `/api/tickets`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/tickets` | User (JWT) | Create a new ticket |
| GET | `/tickets/mine` | User (JWT) | Get current user's tickets |
| GET | `/tickets/all` | Admin only | Get all tickets |
| PATCH | `/tickets/:id` | Admin only | Update ticket status |

---

### FAQ Routes — `/api/faqs`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/faqs` | Public | Get all FAQs |
| POST | `/faqs` | Admin only | Create a FAQ |
| PUT | `/faqs/:id` | Admin only | Update a FAQ |
| DELETE | `/faqs/:id` | Admin only | Delete a FAQ |

---

### Admin Routes — `/api/admin`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/admin/stats` | Admin only | Get dashboard statistics |

---

## 📱 Pages & Features

| Route | Page | Access |
|---|---|---|
| `/` | Landing Page | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/chat` | AI Chatbot | Logged-in users |
| `/tickets` | Ticket Dashboard | Logged-in users |
| `/admin` | Admin Dashboard | Admin role only |

---

## 🌐 Deployment

### Deploy Backend on Render

1. Push your project to GitHub
2. Go to [https://render.com](https://render.com) and sign up
3. Click **New** → **Web Service**
4. Connect your GitHub repository
5. Configure the service:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Node
6. Click **Advanced** → Add environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_key
   ```
7. Click **Create Web Service**
8. Wait 2–3 minutes — copy your Render URL (e.g. `https://ai-support-api.onrender.com`)

---

### Deploy Frontend on Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign up
2. Click **Add New Project** → Import your GitHub repo
3. Set the **Root Directory** to `frontend`
4. Under **Environment Variables**, add:
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com/api
   ```
5. Click **Deploy**
6. Your app is live at `https://your-project.vercel.app`

> ⚠️ Make sure to update the frontend `.env` with the real Render URL before deploying — not localhost.

---

## 🛡 Creating an Admin Account

By default, all registered users get the `user` role. To create an admin:

**Option 1 — MongoDB Atlas UI:**
1. Open MongoDB Atlas → Browse Collections → `users`
2. Find your user document
3. Change `"role": "user"` to `"role": "admin"`
4. Save

**Option 2 — Via code (one-time script):**
```js
// Run this once from your backend folder: node makeAdmin.js
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await mongoose.connection.collection('users').updateOne(
    { email: 'your-email@example.com' },
    { $set: { role: 'admin' } }
  );
  console.log('User promoted to admin');
  process.exit();
});
```

---

## 🐛 Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `Cannot GET /api/...` | Backend not running | Run `node server.js` in `/backend` |
| `MongoDB connection failed` | Wrong MONGO_URI | Check `.env`, confirm Atlas IP whitelist |
| `401 Unauthorized` | Missing or expired token | Log out and log back in |
| `403 Forbidden` | Not an admin | Update your role in MongoDB Atlas |
| `VITE_ variables undefined` | Wrong variable name | All frontend env vars must start with `VITE_` |
| `CORS error` | Backend not allowing frontend | Confirm `cors()` is in `server.js` before routes |
| `OpenAI 429 error` | Rate limit / no credits | Check your OpenAI billing dashboard |
| `Tailwind classes not applying` | Content paths wrong | Check `tailwind.config.js` content array |
| Port already in use | Another process on port 5000 | Run `npx kill-port 5000` |

---

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add: your feature description"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it.

---

## 🙏 Acknowledgements

- [OpenAI](https://openai.com) for the GPT API
- [MongoDB Atlas](https://mongodb.com/atlas) for free cloud database hosting
- [Render](https://render.com) and [Vercel](https://vercel.com) for free deployment tiers
- [Tailwind CSS](https://tailwindcss.com) for the utility-first styling system
- [Recharts](https://recharts.org) for the dashboard charts

---


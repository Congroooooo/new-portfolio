# 🌟 Nicko Balmes - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, featuring an AI-powered chatbot assistant.

## ✨ Features

- 🎨 Modern UI with smooth animations
- 📱 Fully responsive design
- 🌓 Dark mode support
- 🤖 AI Chatbot assistant powered by Google Gemini
- ⚡ Fast performance with Vite
- 🎯 SEO optimized
- 🔒 Secure API implementation

## 🤖 AI Chatbot Feature

This portfolio includes an intelligent chatbot that can answer questions about Nicko's skills, projects, and experience.

**Quick Setup:**

1. Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
3. Run the full application:
   ```bash
   npm run dev:full
   ```

📚 **For detailed documentation**, see [AI_CHATBOT_README.md](./AI_CHATBOT_README.md)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- A Gemini API key (for chatbot feature)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd new-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your Gemini API key.

4. **Run the development server**

   **Option A: Run frontend + backend together (Recommended)**

   ```bash
   npm run dev:full
   ```

   **Option B: Run separately**

   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📝 Available Scripts

| Script                 | Description                                |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Start Vite dev server (frontend only)      |
| `npm run server`       | Start Express backend server               |
| `npm run dev:full`     | Run both frontend and backend concurrently |
| `npm run build`        | Build frontend for production              |
| `npm run build:server` | Compile backend TypeScript                 |
| `npm run preview`      | Preview production build                   |
| `npm run lint`         | Run ESLint                                 |
| `npm run lint:fix`     | Fix ESLint errors                          |
| `npm run format`       | Format code with Prettier                  |

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite 6
- **Animations**: Anime.js
- **Icons**: Lucide React

### Backend

- **Runtime**: Node.js
- **Framework**: Express 5
- **Language**: TypeScript
- **AI**: Google Generative AI (Gemini)

### Development Tools

- ESLint for code linting
- Prettier for code formatting
- tsx for running TypeScript in Node
- nodemon for auto-restart
- concurrently for running multiple processes

## 📁 Project Structure

```
new-portfolio/
├── server/                    # Backend API
│   ├── index.ts              # Express server
│   └── routes/
│       └── chat.ts           # Chat endpoint
│
├── src/
│   ├── components/           # Reusable components
│   │   ├── effects/         # Visual effects
│   │   ├── icons/           # Icon components
│   │   ├── layout/          # Layout components
│   │   └── ui/              # UI components (Chatbot)
│   │
│   ├── features/            # Feature sections
│   │   ├── hero/           # Hero section
│   │   ├── about/          # About section
│   │   ├── skills/         # Skills section
│   │   ├── projects/       # Projects section
│   │   ├── events/         # Events section
│   │   ├── certificates/   # Certificates section
│   │   └── conclusion/     # Conclusion section
│   │
│   ├── data/               # Static data
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript types
│   └── config/             # Configuration files
│
├── public/                 # Static assets
├── .env                    # Environment variables
├── .env.example           # Example environment file
└── package.json           # Dependencies and scripts
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Important**: Never commit your `.env` file to version control!

## 🚀 Deployment

### ✨ Deploy to Vercel (Recommended - One-Click Deploy)

This project is **fully configured for Vercel** with serverless functions!

**Quick Deploy:**
1. Push to GitHub
2. Import to Vercel
3. Add `GEMINI_API_KEY` in environment variables
4. Deploy!

📚 **See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete step-by-step instructions**

### Build for Production

```bash
# Build frontend
npm run build

# Build backend (for traditional server deployment)
npm run build:server
```

### Other Deployment Options

1. **Vercel (Recommended)**
   - ✅ Serverless functions ready (`api/` folder)
   - ✅ Auto-deployment from GitHub
   - ✅ Built-in HTTPS and CDN

2. **Vercel/Netlify (Frontend) + Railway/Render (Backend)**
   - Deploy frontend to Vercel/Netlify
   - Deploy backend to Railway/Render
   - Update CORS settings with production URLs

3. **Single Server Deployment**
   - Build both frontend and backend
   - Serve frontend static files with Express
   - Run backend on same server

## 🔒 Security

- ✅ API keys stored in environment variables
- ✅ No sensitive data exposed to frontend
- ✅ Rate limiting on API endpoints
- ✅ Input validation and sanitization
- ✅ CORS configuration for production
- ✅ Error handling without data leaks

## 🐛 Troubleshooting

**Chatbot not working?**

1. Check that `.env` file exists with valid `GEMINI_API_KEY`
2. Ensure backend server is running on port 3001
3. Check browser console for errors
4. See [AI_CHATBOT_README.md](./AI_CHATBOT_README.md) for detailed troubleshooting

**Port already in use?**

- Change `PORT` in `.env` file
- Update Vite proxy configuration in `vite.config.ts`

## 📚 Documentation

- [AI Chatbot Feature](./AI_CHATBOT_README.md) - Detailed chatbot documentation
- [Component Architecture](./src/components/README.md) - Component structure
- [Data Management](./src/data/README.md) - Data files and types

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Nicko Balmes**

- Portfolio: [Your portfolio URL]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)

---

⭐ If you found this project helpful, please give it a star!

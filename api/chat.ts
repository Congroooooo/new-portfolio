import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ============================================
// GEMINI API CONFIGURATION
// ============================================

const SYSTEM_CONTEXT = `
You are the official AI assistant for Nicko Balmes' portfolio website.

Your job is to professionally represent Nicko to recruiters, clients, and collaborators.

Name: Nicko Balmes
Title: Junior Frontend Developer | UI/UX Designer
Education: 4th Year BS Computer Science Student (STI College Lucena)
Location: Mauban, Quezon, Philippines

Professional Summary:
Nicko is a frontend-focused developer and UI/UX designer with 2+ years of experience building responsive, user-centered web applications. He specializes in React-based applications, UX research, wireframing, prototyping, and scalable component-driven interfaces. He has led full-stack projects and collaborated in hackathons and academic teams.

He is passionate about:
- Creating intuitive user experiences
- Optimizing workflows
- Designing scalable interfaces
- Building impactful digital solutions

====================================================
TECHNICAL SKILLS
====================================================

Frontend:
HTML, CSS, JavaScript, TypeScript, React, Next.js, Vite, Tailwind CSS

Backend:
PHP, Node.js

Databases:
MongoDB, MySQL

Tools & DevOps:
Git, GitHub, Docker, WordPress, Jira, Notion

Programming Languages:
Python, Java

Design & UX:
Figma, Wireframing, Prototyping, Visual Design, User Flow Creation, UI Component Design, Interaction Design

Professional Skills:
Problem-Solving, Debugging, Responsive Web Design, Version Control, Team Collaboration, Agile Workflow

====================================================
PROJECT EXPERIENCE
====================================================

PAMO - Web-Based Inventory & Ordering System (Lead Developer | Full Stack)
- Led end-to-end design and development.
- Digitized manual processes to improve transaction efficiency.
- Designed high-fidelity UI in Figma.
- Built frontend with HTML, CSS, JavaScript.
- Developed backend APIs using PHP & MySQL.
- Coordinated cross-functional team collaboration.

Alertify - Real-Time Earthquake Alert System (Hackathon Project)
- Built emergency-optimized UI using React, Vite, Tailwind.
- Integrated real-time USGS API.
- Focused on rapid information visibility for crisis response.

Work Hive - Job Tracking Web App
- Built interactive dashboard for tracking job applications.
- Implemented reminders and notification system.

Nails By Kheley - Full-Stack E-commerce Platform
- Built admin inventory dashboard, customer ordering system.
- Designed responsive UI/UX in Figma from scratch.
- Integrated secure online payment gateway.
- Delivered complete digital presence for local business.

====================================================
HACKATHON PARTICIPATION & AWARDS
====================================================

- 🏆 1st Place - DLSU Open_IT Hackathon (Nov 2024)
- 🥈 2nd Place - DLSU Open_IT Hackathon (July 2024)
- 🎖️  Top 5 Finalist - FEU TechFest Webathon (Aug 2024)
- 🎖️  Top 3 Finalist - PLM Tech Symposium Hackathon (Nov 2024)

====================================================
CERTIFICATIONS
====================================================

- ICT Code Camp Certificate (Jan 2024) - Dev Connect Communities
- Best In Thesis Award (Oct 2023) - Computer Science
- SQL Essential Certificate (Feb 2023) - LinkedIn Learning
- Certificate of Achievement (Oct 2020) - HTML, CSS Specialization

====================================================
RESPONSE GUIDELINES
====================================================

1. Keep responses professional yet conversational.
2. For technical questions, be specific (mention React, TypeScript, Tailwind, Figma, etc.).
3. When asked about experience, cite real projects (PAMO, Alertify, Nails By Kheley, Work Hive).
4. Highlight problem-solving and collaboration skills.
5. For design questions, emphasize UI/UX skills and Figma expertise.
6. If asked about availability, say Nicko is open to internships, junior roles, and freelance projects.
7. For contact, direct them to the portfolio's contact section or social links.
8. NEVER make up information not listed here.
9. If you don't know something, acknowledge it and suggest reaching out directly.

Be helpful, accurate, and always represent Nicko in the best professional light.
`;

// ============================================
// SERVERLESS FUNCTION HANDLER
// ============================================

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are accepted',
    });
  }

  try {
    // Validate API key
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY not found in environment variables');
      return res.status(500).json({
        error: 'Configuration error',
        message: 'AI service is not properly configured',
      });
    }

    if (GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(500).json({
        error: 'Configuration error',
        message: 'Please configure your Gemini API key',
      });
    }

    // Parse request body
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Message is required and must be a non-empty string',
      });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Build chat history with system context
    const chatHistory = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_CONTEXT }],
      },
      {
        role: 'model',
        parts: [
          {
            text: "Understood! I'm Nicko Balmes' AI assistant. I'll professionally represent his skills, experience, and projects to help visitors learn more about him. How can I help you today?",
          },
        ],
      },
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
    ];

    // Start chat session
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(message.trim());
    const aiResponse = result.response.text();

    // Return success response
    return res.status(200).json({
      message: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('❌ Chat API Error:', error);

    // Handle specific error types
    if (error.message?.includes('API key')) {
      return res.status(500).json({
        error: 'Configuration error',
        message: 'AI service is not properly configured',
        details: error.message,
      });
    }

    if (error.message?.includes('quota') || error.message?.includes('limit')) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.',
      });
    }

    // Generic error response
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process your request. Please try again.',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}

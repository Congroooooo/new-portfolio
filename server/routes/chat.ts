import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// ============================================
// GEMINI API CONFIGURATION
// ============================================

// Lazy initialization of Gemini AI
let genAI: GoogleGenerativeAI | null = null;

function getGeminiClient() {
  if (!genAI) {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    console.log(
      '🔑 API Key loaded:',
      GEMINI_API_KEY ? `${GEMINI_API_KEY.substring(0, 10)}...` : 'NOT FOUND'
    );

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    if (GEMINI_API_KEY === 'your_gemini_api_key_here') {
      throw new Error(
        'Please replace the placeholder API key with your actual Gemini API key'
      );
    }

    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    console.log('✅ GoogleGenerativeAI client created');
  }
  return genAI;
}

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

Bayanimo - Gamified Project Management App
- Designed collaboration-focused UI.
- Implemented gamification rewards & progress tracking.

PrepTalk AI - AI-Powered Interview Preparation Platform
- Built responsive UI using React + Tailwind.
- Designed persona-based interview simulations.
- Focused on clean UX and AI interaction flow.

NailsByKheley - Booking & Business Website
- Developed responsive booking interface.
- Improved client online engagement.
- Applied consistent branding and usability improvements.

STI GWA Calculator
- Built simple and effective academic calculator using React.

- Champion - OpeniT Hackathon (Nov 2025)
- 2nd Place - FEU Create & Conquer Hackathon
- Finalist (Top 8) - FEU Create & Conquer
- Best in Working Prototype - FEU Hackathon
- Best in Database Management System - NailsByKheley Project
- Participant - DLSU Hacker Cup 2025
- Participant - Inventi Hackathon

1. Only answer questions related to Nicko Balmes, his skills, projects, education, or experience.
2. If asked unrelated topics, politely redirect to portfolio-related discussion.
3. Be professional, confident, and concise.
4. When explaining skills, provide examples from his projects.
5. When asked why someone should hire him, highlight:
   - Leadership in PAMO project
   - Hackathon achievements
   - Strong React + UI/UX background
6. When listing items, use simple line breaks instead of bullet points or asterisks.
7. Do not fabricate information.
8. If unsure about something not listed above, say:
   "That information is not available in Nicko's portfolio."
9. If asked about salary expectations or salary range:
- Do NOT provide a specific number or range.
- Respond professionally and positively.
- Politely express openness to discussion.
- Encourage them to reach out via email for a detailed conversation.
- Keep the tone confident, flexible, and negotiation-friendly.

Always maintain a professional tone suitable for recruiters.
Format responses in plain text without markdown symbols like * or ** for better readability in chat.
`;

// ============================================
// RATE LIMITING (Simple in-memory)
// ============================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count++;
  return true;
}

// ============================================
// TEXT FORMATTING HELPER
// ============================================

/**
 * Clean markdown formatting from AI response for better chat display
 */
function cleanMarkdownForChat(text: string): string {
  return (
    text
      // Remove bold/italic markers
      .replace(/\*\*\*/g, '') // ***text***
      .replace(/\*\*/g, '') // **text**
      .replace(/\*/g, '') // *text*
      .replace(/__/g, '') // __text__
      .replace(/_/g, '') // _text_
      // Clean up extra spaces that might be left
      .replace(/\s+/g, ' ')
      .trim()
  );
}

// ============================================
// CHAT ENDPOINT
// ============================================

router.post('/', async (req, res) => {
  try {
    console.log('📨 Received chat request');

    // Rate limiting
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        error: 'Too many requests',
        message: 'Please wait a moment before sending another message',
      });
    }

    // Validate request body
    const { message, conversationHistory } = req.body;
    console.log('📝 Message:', message);

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Message is required and must be a string',
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Message is too long (max 1000 characters)',
      });
    }

    // Get Gemini client (lazy initialization)
    console.log('🔧 Initializing Gemini client...');
    const client = getGeminiClient();
    const model = client.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });
    console.log('✅ Gemini client initialized');

    // Build conversation history with system context
    let prompt = SYSTEM_CONTEXT + '\n\n';

    // Add conversation history if provided
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      conversationHistory.forEach((msg: any) => {
        if (msg.role === 'user') {
          prompt += `User: ${msg.content}\n`;
        } else if (msg.role === 'assistant') {
          prompt += `Assistant: ${msg.content}\n`;
        }
      });
    }

    // Add current message
    prompt += `User: ${message}\nAssistant:`;

    // Call Gemini API
    console.log('🤖 Calling Gemini API...');
    const result = await model.generateContent(prompt);
    console.log('✅ Received response from Gemini');

    const response = result.response;
    const aiMessage = response.text();

    // Clean markdown formatting for better chat display
    const cleanedMessage = cleanMarkdownForChat(aiMessage);

    // Return clean response
    console.log('✅ Sending response to client');
    res.json({
      message: cleanedMessage,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    // Log detailed error for debugging
    console.error('❌ Gemini API Error Details:');
    console.error('Error message:', error.message);
    console.error('Error type:', error.constructor.name);
    console.error('Full error:', error);

    // Handle specific error cases
    if (
      error.message?.includes('API key') ||
      error.message?.includes('API_KEY')
    ) {
      return res.status(500).json({
        error: 'Configuration error',
        message: 'AI service is not properly configured',
        details:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }

    if (
      error.message?.includes('quota') ||
      error.message?.includes('RESOURCE_EXHAUSTED')
    ) {
      return res.status(503).json({
        error: 'Service unavailable',
        message: 'AI service quota exceeded. Please try again later.',
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'AI service error',
      message: 'Failed to process your message. Please try again.',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

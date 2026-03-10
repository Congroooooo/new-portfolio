import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ============================================
// GEMINI API CONFIGURATION
// ============================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set');
}

const FALLBACK_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
];

function isQuotaError(error: any): boolean {
  const errorMsg = error.message?.toLowerCase() || '';
  const errorString = String(error).toLowerCase();

  return (
    errorMsg.includes('quota') ||
    errorMsg.includes('resource_exhausted') ||
    errorMsg.includes('rate limit') ||
    errorMsg.includes('429') ||
    errorMsg.includes('403') ||
    errorString.includes('quota') ||
    errorString.includes('resource_exhausted')
  );
}

/**
 * Attempts to generate content with automatic model fallback
 * Tries each model in FALLBACK_MODELS until success or all fail
 * Returns both the generated text and the model name that was used
 */
async function generateWithFallback(
  genAI: GoogleGenerativeAI,
  prompt: string
): Promise<{ text: string; model: string }> {
  let lastError: any;

  for (let i = 0; i < FALLBACK_MODELS.length; i++) {
    const modelName = FALLBACK_MODELS[i];

    try {
      if (i > 0) {
        console.log(`🔄 Attempting fallback model: ${modelName}`);
      } else {
        console.log(`🤖 Attempting primary model: ${modelName}`);
      }

      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      console.log(`✅ Successfully generated response using: ${modelName}`);
      return { text, model: modelName };
    } catch (error: any) {
      console.error(`❌ Model ${modelName} failed:`, error.message);
      lastError = error;

      // Only try next model if this was a quota/rate limit error
      if (!isQuotaError(error)) {
        console.log('⚠️  Error is not quota-related, not attempting fallback');
        throw error; // Throw immediately for non-quota errors
      }

      // If this was the last model, throw the error
      if (i === FALLBACK_MODELS.length - 1) {
        console.error('❌ All fallback models exhausted');
        throw error;
      }

      console.log('⏭️  Quota error detected, trying next model...');
    }
  }

  // Should never reach here, but TypeScript needs it
  throw lastError || new Error('All models failed');
}

const SYSTEM_CONTEXT = `
You are Nicko Balmes speaking directly to visitors on your portfolio website.

Respond as if the visitor is talking to you personally. Do not refer to yourself as an AI assistant. Speak in the first person using "I", "my", and "me". Your goal is to professionally represent yourself to recruiters, clients, collaborators, and other visitors.

Name: Nicko Balmes
Title: Junior Frontend Developer | UI/UX Designer
Education: Graduated BS Computer Science Student (STI College Lucena)
Location: Mauban, Quezon, Philippines

I am a frontend-focused developer and UI/UX designer with 2+ years of experience building responsive, user-centered web applications. I specialize in React-based applications, UX research, wireframing, prototyping, and scalable component-driven interfaces.

I have experience leading full-stack projects and collaborating in hackathons and academic teams.

I am passionate about:

* Creating intuitive user experiences
* Optimizing workflows
* Designing scalable interfaces
* Building impactful digital solutions

Frontend:
HTML, CSS, JavaScript, TypeScript, React, Angular, Next.js, Vite, Tailwind CSS

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

PAMO — Web-Based Inventory & Ordering System (Lead Developer | Full Stack)

* I led the end-to-end design and development.
* I helped digitize manual processes to improve transaction efficiency.
* I designed the high-fidelity UI in Figma.
* I built the frontend using HTML, CSS, and JavaScript.
* I developed backend APIs using PHP and MySQL.
* I coordinated collaboration between team members.

Alertify — Real-Time Earthquake Alert System (Hackathon Project)

* I helped build an emergency-optimized UI using React, Vite, and Tailwind.
* I integrated real-time earthquake data from the USGS API.
* The goal was to make critical information highly visible during emergencies.

Work Hive — Job Tracking Web App

* I built an interactive dashboard for tracking job applications.
* I implemented reminders and notification features to help users manage their applications.

Nails By Kheley — Full-Stack E-commerce Platform

* I designed the UI/UX from scratch in Figma.
* I built the admin inventory dashboard and customer ordering system.
* I integrated a secure online payment gateway.
* I helped a local business establish a full digital presence.

🏆 1st Place — DLSU Open_IT Hackathon (Nov 2024)
🥈 2nd Place — DLSU Open_IT Hackathon (July 2024)
🎖 Top 5 Finalist — FEU TechFest Webathon (Aug 2024)
🎖 Top 3 Finalist — PLM Tech Symposium Hackathon (Nov 2024)

ICT Code Camp Certificate (Jan 2024) — Dev Connect Communities
Best In Thesis Award (Oct 2023) — Computer Science
SQL Essential Certificate (Feb 2023) — LinkedIn Learning
Certificate of Achievement (Oct 2020) — HTML & CSS Specialization

1. Always speak in the first person as Nicko.
2. Keep responses professional, friendly, and conversational.
3. When discussing technical topics, mention relevant technologies such as React, TypeScript, Tailwind, or Figma when appropriate.
4. When asked about experience, refer to my real projects (PAMO, Alertify, Nails By Kheley, Work Hive).
5. Highlight my problem-solving ability, collaboration experience, and UI/UX design thinking.
6. If someone asks about work opportunities, say that I am open to internships, junior developer roles, freelance work, and collaborations.
7. For contact inquiries, encourage visitors to reach out through the portfolio contact section or social links.
8. Never invent information that is not listed here.
9. If you are unsure about something, politely suggest contacting me directly.

Your responses should feel like the visitor is talking directly with Nicko Balmes.
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

  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  try {
    console.log('📨 Received chat request');

    // Rate limiting
    const clientIp =
      req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    const ip = Array.isArray(clientIp) ? clientIp[0] : clientIp;

    if (!checkRateLimit(ip)) {
      return res.status(429).json({
        error: 'Too many requests',
        message: 'Please wait a moment before sending another message',
      });
    }

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
    console.log('📝 Message:', message);

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Message is required and must be a non-empty string',
      });
    }

    // Initialize Gemini AI
    console.log('🔧 Initializing Gemini client...');
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    console.log('✅ Gemini client initialized');

    // Build conversation prompt with system context
    let prompt = SYSTEM_CONTEXT + '\n\n';

    // Add conversation history if provided
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      conversationHistory.forEach((msg: { role: string; content: string }) => {
        if (msg.role === 'user') {
          prompt += `User: ${msg.content}\n`;
        } else if (msg.role === 'assistant') {
          prompt += `Assistant: ${msg.content}\n`;
        }
      });
    }

    // Add current message
    prompt += `User: ${message.trim()}\nAssistant:`;

    // Call Gemini API with automatic fallback
    console.log('🤖 Calling Gemini API with multi-model fallback...');
    const { text: aiResponse, model: usedModel } = await generateWithFallback(
      genAI,
      prompt
    );
    console.log('✅ Received response from Gemini');

    // Clean markdown formatting for better chat display
    const cleanedMessage = cleanMarkdownForChat(aiResponse);

    // Log conversation details with model used
    console.log('\n' + '='.repeat(60));
    console.log('📊 CONVERSATION LOG');
    console.log('='.repeat(60));
    console.log(`👤 User: ${message.trim()}`);
    console.log(`🤖 AI Model: ${usedModel}`);
    console.log(
      `💬 Response: ${cleanedMessage.substring(0, 100)}${cleanedMessage.length > 100 ? '...' : ''}`
    );
    console.log('='.repeat(60) + '\n');

    // Return clean response
    console.log('✅ Sending response to client');
    return res.status(200).json({
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
    return res.status(500).json({
      error: 'AI service error',
      message: 'Failed to process your message. Please try again.',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}

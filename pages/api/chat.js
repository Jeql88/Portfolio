import { GoogleGenerativeAI } from '@google/generative-ai';
import { rateLimit } from '@/lib/rate-limit';
import { SYSTEM_PROMPT } from '@/lib/knowledge-base';

const MAX_INPUT_CHARS = 500;
const MAX_HISTORY = 10;
const MODEL = 'gemini-2.5-flash';

const INJECTION_PATTERNS = [
  /ignore (all |the )?(previous|prior|above) (instructions|prompts|rules)/i,
  /disregard (all |the )?(previous|prior|above)/i,
  /system prompt/i,
  /reveal (your|the) (instructions|prompt|rules)/i,
  /you are now/i,
  /pretend (you are|to be)/i,
  /act as (a |an )/i,
  /\bDAN\b/i,
  /jailbreak/i,
  /developer mode/i,
];

const REFUSAL =
  "I can only answer questions about Josh's professional background. Try asking about his projects, skills, or experience.";

function sanitize(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/[​-‏‪-‮⁦-⁩]/g, '')
    .replace(/[\u{E0000}-\u{E007F}]/gu, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim();
}

function isInjection(text) {
  return INJECTION_PATTERNS.some((p) => p.test(text));
}

function getClientKey(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = getClientKey(req);
  const limit = rateLimit(key);
  res.setHeader('X-RateLimit-Remaining', String(limit.remaining));
  if (!limit.allowed) {
    res.setHeader('Retry-After', String(limit.retryAfterSeconds));
    return res
      .status(429)
      .json({ error: `Rate limit exceeded. Try again in ${limit.retryAfterSeconds}s.` });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY.' });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array.' });
  }

  const last = messages[messages.length - 1];
  const lastText = sanitize(last?.content);
  if (!lastText) return res.status(400).json({ error: 'Empty message.' });
  if (lastText.length > MAX_INPUT_CHARS) {
    return res.status(400).json({ error: `Message exceeds ${MAX_INPUT_CHARS} characters.` });
  }

  if (isInjection(lastText)) {
    return res.status(200).json({ reply: REFUSAL });
  }

  const history = messages
    .slice(-MAX_HISTORY, -1)
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: sanitize(m.content).slice(0, MAX_INPUT_CHARS) }],
    }))
    .filter((m) => m.parts[0].text);

  while (history.length && history[0].role !== 'user') history.shift();

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.4,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastText);
    const reply = result.response.text();
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Gemini error:', err);
    return res.status(502).json({ error: 'The model is unavailable right now. Please try again.' });
  }
}

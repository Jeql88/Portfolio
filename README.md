# Josh Edward Lui — Portfolio

Personal portfolio site built with **Next.js 14**, **shadcn/ui**, and **Tailwind CSS**, featuring a **RAG-style AI assistant** powered by Google Gemini that answers questions about my background.

## Stack

- **Framework:** Next.js (Pages Router) + React 18
- **UI:** shadcn/ui primitives (Radix + Tailwind), Lucide icons, slate + sky theme
- **Chatbot:** Google Gemini 2.0 Flash via `@google/generative-ai`, no vector DB (knowledge base stuffed into system prompt), in-memory rate limiting + prompt-injection guardrails
- **Notifications:** Sonner toasts
- **Analytics:** Vercel Analytics (free tier)

## Local development

```bash
npm install
cp .env.example .env.local   # add your GEMINI_API_KEY + RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

To regenerate the social-preview image after editing the tagline:

```bash
node scripts/generate-og.mjs   # writes public/og-image.png
```

To regenerate the browser-tab favicon and iOS home-screen icon:

```bash
node scripts/generate-favicon.mjs   # writes public/icon.svg + apple-touch-icon.png + favicon-32.png
```

Get a free Gemini API key at https://aistudio.google.com/apikey (1,500 req/day free tier).

Build for production:

```bash
npm run build
npm run start
```

## Project structure

```
.
├── components/
│   ├── ui/              # shadcn primitives (button, card, badge, …)
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Experience.jsx
│   ├── Education.jsx
│   ├── Certifications.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── Chatbot.jsx      # floating RAG assistant
├── data/                # single source of truth — edit here
│   ├── profile.js
│   ├── skills.js
│   ├── projects.js
│   ├── experience.js
│   ├── education.js
│   └── certifications.js
├── lib/
│   ├── utils.js         # cn() helper
│   ├── rate-limit.js    # in-memory token bucket
│   └── knowledge-base.js# builds the chatbot system prompt
├── pages/
│   ├── api/chat.js      # Gemini-backed chat endpoint with guardrails
│   ├── _app.jsx
│   ├── _document.jsx
│   └── index.jsx
├── public/
│   ├── images/          # project screenshots, etc.
│   └── Lui_Resume_2026.pdf
└── styles/
    └── globals.css
```

## Chatbot guardrails

`pages/api/chat.js` enforces:

- **Rate limit** — 10 requests / 5 min per client IP (in-memory)
- **Input cap** — 500 characters
- **History cap** — last 10 messages
- **Prompt-injection patterns** — refuses "ignore previous", "system prompt", "jailbreak", etc.
- **Sanitization** — strips zero-width chars, unicode tag chars, and control chars
- **System prompt** — instructs Gemini to refuse off-topic questions and never reveal instructions

## Contact form (Resend) + spam protection

`pages/api/contact.js` sends through Resend with three layers of protection:

- **Honeypot field** — a hidden `company` input. Bots auto-fill it, humans never see it. Server returns 200 OK but never sends the email.
- **Minimum dwell time** — submissions under 2 seconds after page mount are silently dropped (bots are instant).
- **Rate limit** — 6 requests/min per IP (shared bucket with the chatbot).

For testing, the form sends from `onboarding@resend.dev` to my Gmail. No domain setup needed.

### Custom from-address (optional, after you own a domain)

1. Buy a domain (Namecheap, Cloudflare, etc.) — typically ~$10/year.
2. In Resend dashboard → Domains → Add Domain → paste in 3 DNS records (SPF/DKIM/return-path) at your registrar.
3. Once verified (a few minutes), set `RESEND_FROM=Portfolio <hi@yourdomain.com>` in `.env.local` and Vercel env vars.

No code change needed — `pages/api/contact.js` already reads `process.env.RESEND_FROM` with a fallback.

## Deploying to Vercel (later)

1. Push the repo to GitHub.
2. Go to https://vercel.com → New Project → import the GitHub repo.
3. Framework auto-detects as Next.js — keep defaults.
4. Project Settings → Environment Variables → add for Production, Preview, and Development:
   - `GEMINI_API_KEY`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://josh-portfolio.vercel.app` or your custom domain)
5. Deploy. Vercel returns a `*.vercel.app` URL.

## Editing content

All copy lives in `data/*.js`. Update those files and the entire site (and chatbot knowledge base) updates automatically.

## Known follow-ups

- **LinkedIn URL** — `data/profile.js` uses a placeholder (`https://www.linkedin.com/in/josh-edward-lui`); replace with the real one.
- **Project repo/live links** — every project in `data/projects.js` has `repoUrl: null` / `liveUrl: null`. Fill these in to enable the Code/Live buttons (they render as disabled until then).
- **Project screenshots** — only the Collaborative Drawing project ships with images (`/public/images/whiteboard1.png`). Others use a gradient placeholder until images are added.
- **OG image** — drop a 1200×630 PNG at `public/og-image.png` for social previews.

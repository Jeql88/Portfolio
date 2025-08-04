# Copilot Instructions for AI Agents

## Project Overview

- **Purpose:** Modern, responsive personal portfolio website.
- **Tech Stack:** Next.js, Tailwind CSS, Framer Motion, EmailJS.
- **Architecture:**
  - Component-based React layout.
  - Pages in `/pages`, reusable components in `/components` (flat structure).
  - Styling via Tailwind utility classes only (no inline styles unless necessary).
  - Animations handled with Framer Motion.
  - Contact form submits via EmailJS using uncontrolled components and `useRef`.

## Key Conventions

- **Component Naming:** PascalCase (e.g., `Hero.jsx`, `ContactForm.jsx`).
- **File Structure:**
  - Place all page routes in `/pages`.
  - Place all reusable components in `/components` (no deep nesting).
- **Styling:**
  - Use Tailwind CSS utility classes exclusively.
  - Avoid custom CSS or inline styles unless absolutely required.
- **Animations:**
  - Use Framer Motion for entrance and section transitions.
  - Example: Animate section fade-in on scroll using `motion.div`.
- **Forms:**
  - Use uncontrolled components with `useRef` for form fields.
  - Handle form submission via EmailJS.

## Developer Workflows

- **Build:** Use `npm run build` to create a production build.
- **Develop:** Use `npm run dev` to start the local development server.
- **Test:** (Add test instructions here if/when tests are present.)
- **Debug:** Use browser devtools and Next.js error overlays.

## Integration Points

- **EmailJS:** Used for contact form submissions. API keys/config should be managed securely (not hardcoded).
- **Framer Motion:** Used for all major UI/section animations.

## Examples

- **Component Example:**
  - `components/Hero.jsx` for hero section.
  - `components/ContactForm.jsx` for contact form logic and EmailJS integration.
- **Page Example:**
  - `pages/index.jsx` for main landing page.

## Additional Notes

- Follow the conventions above for all new components/pages.
- Reference existing components for structure and style.
- Keep the codebase clean and consistent with the established patterns.

---

_If any conventions or workflows are unclear, please request clarification or examples from the user._

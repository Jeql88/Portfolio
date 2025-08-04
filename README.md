# Portfolio Website

This is a modern, responsive personal portfolio website built with Next.js, Tailwind CSS, Framer Motion, and EmailJS.

## Project Overview

- **Purpose:** Showcase personal projects and skills in a visually appealing manner.
- **Tech Stack:**
  - **Next.js:** A React framework for server-side rendering and static site generation.
  - **Tailwind CSS:** A utility-first CSS framework for styling.
  - **Framer Motion:** A library for animations in React applications.
  - **EmailJS:** A service for sending emails directly from the client-side.

## File Structure

The project follows a component-based architecture with the following structure:

```
portfolio
├── components
│   ├── ContactForm.jsx
│   ├── Hero.jsx
│   └── Navbar.jsx
├── pages
│   ├── _app.jsx
│   ├── _document.jsx
│   └── index.jsx
├── public
│   └── favicon.ico
├── styles
│   └── globals.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` to view the portfolio.

4. **Build for Production:**
   ```bash
   npm run build
   ```

## Features

- **Responsive Design:** The portfolio is designed to be fully responsive across devices.
- **Animations:** Smooth transitions and animations using Framer Motion.
- **Contact Form:** A functional contact form that integrates with EmailJS for submissions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
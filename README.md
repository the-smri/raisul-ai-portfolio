# High-End Modern Personal Portfolio

A sleek, responsive, and highly animated portfolio built with Vanilla JS, HTML, and modern CSS on top of Vite. The design language is inspired by soft UI, figma sites, and glassmorphism.

## Features

- **Design System:** Dark navy theme `#0B0F19`, custom purple gradients, glassmorphic cards (`rgba(255,255,255,0.05)` background with blurred backdrops), and modern typopgraphy (Google Font Outfit).
- **Responsive Layout:** CSS custom properties, grid layouts, and flexbox ensuring scaling from desktop down to mobile.
- **Scroll Animations:** Utilizes Motion One (`motion`) for performant hardware-accelerated scroll reveals.
- **Interactions:** Custom typing cursor animation, responsive mobile menu, sticky navbar, and dark/light mode toggles.

## Setup Instructions

This project uses **Vite** for incredibly fast local development.

1. **Install Dependencies**
   Open your terminal in the project root directory and run:
   ```bash
   npm install
   ```
2. **Start the Development Server**

   ```bash
   npm run dev
   ```

   This will start a local server, usually at `http://localhost:5173`. Open this URL in your browser to view the portfolio.

3. **Build for Production**
   When you are ready to deploy your site to platforms like Vercel, Netlify, or GitHub Pages:
   ```bash
   npm run build
   ```
   This will generate a highly optimized bundle in the `/dist` directory.

## Project Structure

- `index.html`: The core semantic HTML layout containing all the requested sections.
- `style.css`: All the CSS geometry, variables, theme toggles, and base styling.
- `main.js`: Interaction logic (Lucide icons, typing animations, mode toggle, layout triggers) and Motion One configuration.

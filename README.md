# Full-Stack Exam Prep

A production-ready React + Vite conversion of the original single-file exam preparation portal. It preserves the interactive syllabus chart, Gemini-powered tutoring features, tabs, code review actions, study planner, and environment checklist.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Chart.js + react-chartjs-2
- Framer Motion
- Backend AI proxy via `VITE_API_BASE_URL`

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Add your Gemini API key to `.env`:

```bash
VITE_API_BASE_URL=https://interviewprep-backend-etik.onrender.com
```

The visual hero is built natively with React, Tailwind, and Framer Motion. No Spline key or embed is required.

For stronger reasoning, you can switch the model to:

```bash
VITE_API_BASE_URL=https://your-backend-service.onrender.com
```

`gemini-2.5-flash` is better for speed and cost. `gemini-2.5-pro` is better for deeper reasoning, but it is typically slower and more expensive.

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Build production assets
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── SyllabusChart.jsx
│   ├── SyllabusDetails.jsx
│   ├── AIQuestionGenerator.jsx
│   ├── CodeReviewPanel.jsx
│   ├── ConceptDemystifier.jsx
│   ├── StudyPlanner.jsx
│   ├── LogisticsChecklist.jsx
│   ├── Tabs.jsx
│   ├── LoadingSpinner.jsx
│   └── ui/
├── data/
│   ├── syllabusData.js
│   └── logisticsData.js
├── hooks/
│   ├── useGemini.js
│   └── useLocalStorage.js
├── context/
│   ├── PrepContext.jsx
│   ├── PrepContextCore.js
│   └── usePrep.js
├── layouts/
│   └── AppLayout.jsx
├── pages/
│   ├── AIToolsPage.jsx
│   ├── ChecklistPage.jsx
│   ├── MaterialsPage.jsx
│   ├── QuestionBankPage.jsx
│   ├── StudyFocusPage.jsx
│   └── SyllabusPage.jsx
├── routes/
│   └── AppRouter.jsx
├── services/
│   └── geminiService.js
├── utils/
│   └── cn.js
├── App.jsx
├── main.jsx
└── index.css
```

## Routes

```text
/study-focus
/question-bank
/materials
/syllabus
/ai-tools
/checklist
```

`App.jsx` only mounts `HashRouter`, the shared `PrepProvider`, and `AppRouter`. Feature sections live in dedicated page components. `HashRouter` is used so the routed app deploys cleanly on GitHub Pages without server-side rewrite rules.

## GitHub Actions Secrets

For the GitHub Pages workflow in [.github/workflows/deploy.yml](/C:/Users/admin/Documents/Practics-website/.github/workflows/deploy.yml), add:

- Repository variable: `VITE_API_BASE_URL`
  Example: `gemini-2.5-flash` or `gemini-2.5-pro`

Important:

- `GITHUB_TOKEN` is already provided automatically by GitHub Actions for deployment. You do not need to create it manually.
- `VITE_` variables are bundled into the frontend. That means the Gemini key is exposed in the deployed client app.
- For a real production-secure setup, move Gemini requests to a backend and keep the API key server-side only.

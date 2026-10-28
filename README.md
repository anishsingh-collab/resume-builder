# ResumeBuilder — Engineering LaTeX Workstation & ATS Evaluator

A high-performance, full-stack developer workstation designed to convert structured career credentials into ATS-compliant, compile-ready LaTeX resumes in real-time. Features automated LLM bullet point enhancement, dual-mode algorithmic ATS scoring against job descriptions, and a synchronized split-screen document canvas.

---

## Key Features

- **Split-Screen Reactive Workstation:** Full-width two-column layout providing real-time document mirroring on a physical A4 paper canvas as you type.
- **Deterministic LaTeX Compilation Engine:** Server-side document compiler built with **Handlebars (`hbs`)**, featuring automated character escaping (`&`, `%`, `$`, `_`, `#`) to eliminate LaTeX compilation syntax errors.
- **Dual Industry-Standard Templates:**
  - `Template 01: Classic Tech` — Inspired by Jake's Resume standard format with horizontal rules and single-column ATS layout.
  - `Template 02: Bold Compact` — Dense tabular skill matrix layout optimized for maximum content density.
- **Dual-Mode ATS Evaluator:**
  - **Job Description Mode:** Compares candidate resumes against real employer job postings, computing keyword match rates and identifying missing requirements.
  - **Generic Mode:** Benchmarks candidate profiles against modern software engineering entry-level ATS criteria across 4 dimensions: *Quantifiable Impact*, *Technical Depth*, *Action Verbs*, and *Structural Completeness*.
- **Iterative AI Feedback Loop:** Powered by **Google Gemini (`gemini-3.6-flash`)**, analyzing bullet point vagueness with follow-up critique prompts before generating measurable, impact-driven bullet points.
- **Local-First & Privacy-Focused:** Automated background persistence via browser `localStorage` ensuring zero accidental data loss. No user accounts, tracking cookies, or remote databases.
- **One-Click Demo Profile:** Single-click sample profile loader to immediately inspect, test, and audit the platform.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Orchestration:** [Google Gen AI SDK](https://www.npmjs.com/package/@google/generative-ai) (`gemini-3.6-flash`)
- **Document Templating:** [Handlebars.js](https://handlebarsjs.com/)
- **UI Primitives & Icons:** [Lucide React](https://lucide.dev/), [React Select](https://react-select.com/)

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/resume-builder.git
cd resume-builder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/)).*

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

```bash
npm run build
npm run start
```

---

## License

Distributed under the [MIT License](LICENSE).

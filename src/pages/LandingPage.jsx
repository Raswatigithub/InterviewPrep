// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion,
  //  AnimatePresence 
  } from 'framer-motion';
import { 
  ArrowRight, 
  BookOpenCheck, 
  Sparkles, 
  Target, 
  TimerReset, 
  // Calendar, 
  // Terminal, 
  // Activity, 
  // Flame, 
  // CheckSquare, 
  // ArrowUpRight, 
  Award, 
  // Check,
} from 'lucide-react';

// Tech stacks support list
const techStacks = [
  { name: 'React', color: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/20' },
  { name: 'Node.js', color: 'text-green-400 bg-green-950/40 border-green-500/20' },
  { name: 'Python', color: 'text-yellow-400 bg-yellow-950/40 border-yellow-500/20' },
  { name: 'Django', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/20' },
  { name: 'Java', color: 'text-orange-400 bg-orange-950/40 border-orange-500/20' },
  { name: 'Spring Boot', color: 'text-lime-400 bg-lime-950/40 border-lime-500/20' },
  { name: 'PostgreSQL', color: 'text-blue-400 bg-blue-950/40 border-blue-500/20' },
  { name: 'TypeScript', color: 'text-sky-400 bg-sky-950/40 border-sky-500/20' }
];

const highlights = [
  {
    icon: Target,
    title: 'Focused study paths',
    text: 'Tailor every single mock session by framework, difficulty levels, and specific question types.',
  },
  {
    icon: Sparkles,
    title: 'AI interview material',
    text: 'Instantly generate high-fidelity question banks, practice exercises, and study summaries.',
  },
  {
    icon: TimerReset,
    title: 'Time-aware planning',
    text: 'Translate your target exam date and hours into an optimized revision timeline with built-in refreshers.',
  },
];

const stats = [
  { value: '8+', label: 'Tech Stacks' },
  { value: '4+', label: 'AI Study Modes' },
  { value: '100%', label: 'Ready Checked' },
];

// Mock generator data for Sandbox
// const sandboxGeneratorData = {
//   reactNode: {
//     title: "Implement a robust JWT-based authentication system with Refresh Tokens in Express.js.",
//     code: `// Express.js Refresh Token Middleware
// app.post('/api/refresh', (req, res) => {
//   const { refreshToken } = req.body;
//   if (!refreshToken) return res.sendStatus(401);
  
//   jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     const accessToken = generateAccessToken({ name: user.name });
//     res.json({ accessToken });
//   });
// });`,
//     review: "💡 Architectural Tip: Store Refresh Tokens in HttpOnly secure cookies and implement token rotation on each request to mitigate standard cross-site scripting (XSS) hijacking vectors.",
//     lang: "javascript"
//   },
//   pythonDjango: {
//     title: "Optimize a Django database QuerySet suffering from N+1 query overhead in related fields.",
//     code: `# Django N+1 query optimization using select_related
// # Before: logs = Book.objects.all() (Fires query per author)

// # Optimized: Retrieving related authors in a single JOIN query
// books = Book.objects.select_related('author').prefetch_related('tags').all()
// for book in books:
//     print(book.author.name) # Fired efficiently!`,
//     review: "💡 Architectural Tip: Use select_related for single-value foreign keys and prefetch_related for multi-value relations (many-to-many) to minimize round-trip network lag.",
//     lang: "python"
//   },
//   javaSpring: {
//     title: "Implement optimistic locking and database concurrency control in Spring Boot using Hibernate.",
//     code: `// JPA Entity Concurrency Control
// @Entity
// public class Product {
//     @Id @GeneratedValue
//     private Long id;
//     private String name;
//     private Double price;
    
//     @Version
//     private Long version; // Tracked automatically by Hibernate
// }`,
//     review: "💡 Architectural Tip: The @Version annotation tells Spring Data to check record versions before committing updates, throwing OptimisticLockingFailureException if stale.",
//     lang: "java"
//   }
// };

export default function LandingPage() {
  

  return (
    <main className="min-h-screen overflow-hidden bg-[color:var(--page-bg-dark)] font-sans text-stone-200">
      
      {/* Decorative Radial Glows & Grid Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 w-[70%] h-[70%] rounded-full bg-gradient-to-br from-teal-500/25 to-indigo-500/0 blur-[140px]" />
        <div className="absolute -right-1/4 -top-1/4 w-[75%] h-[75%] rounded-full bg-gradient-to-bl from-indigo-500/20 to-teal-500/0 blur-[150px]" />
        <div className="absolute left-[20%] bottom-0 w-[60%] h-[60%] rounded-full bg-gradient-to-t from-teal-600/10 to-transparent blur-[160px]" />
        
        {/* Fine-grid mesh backdrop */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,var(--grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid)_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <header className="flex items-center justify-between border-b border-white/5 bg-slate-950/40 backdrop-blur-md rounded-2xl px-6 py-4 mt-2">
          <Link className="inline-flex items-center gap-3" to="/study-focus">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25 transition-transform hover:scale-105">
              <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
                Interview Prep AI
              </span>
              <span className="block text-xs text-stone-400">Exam Command Center</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link className="hidden text-sm font-semibold text-stone-400 transition hover:text-white sm:inline-flex" to="/materials">
              Study Materials
            </Link>
            <Link className="hidden text-sm font-semibold text-stone-400 transition hover:text-white sm:inline-flex" to="/syllabus">
              Syllabus Tracking
            </Link>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 text-slate-950 px-4 py-2.5 text-xs font-bold transition duration-200 hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/20 active:scale-95"
              to="/study-focus"
            >
              Enter Workspace
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="text-center pt-20 pb-16 lg:pt-28 lg:pb-24">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-teal-400" />
            Your Intelligent Prepping Assistant
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight"
          >
            Build your ultimate<br />
            <span className="bg-gradient-to-r from-teal-300 via-emerald-200 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              exam prep workspace
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-400 sm:text-lg sm:leading-loose"
          >
            Select your syllabus stack, auto-generate high-quality interview question banks, construct customized revision schedules, and evaluate your solutions in an AI-powered split workspace.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-teal-500 text-slate-950 px-8 py-3 text-sm font-extrabold transition-all duration-200 hover:bg-teal-400 hover:shadow-xl hover:shadow-teal-500/20 active:scale-95"
              to="/study-focus"
            >
              Start Study Session
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold transition hover:bg-white/10 hover:border-white/20 active:scale-95"
              to="/materials"
            >
              Explore AI Tools
              <Sparkles className="h-4 w-4 text-teal-400" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto border-t border-white/5 pt-10"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl font-black text-white bg-gradient-to-r from-teal-200 to-indigo-300 bg-clip-text text-transparent">{stat.value}</span>
                <span className="text-xs text-stone-500 uppercase tracking-widest mt-1.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* TECH CLOUD */}
        <section className="mb-24 px-4 py-6 rounded-3xl bg-slate-950/20 border border-white/5 backdrop-blur-sm max-w-5xl mx-auto overflow-hidden">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-stone-500 mb-5">
            Supported Tech stacks & Syllabus Areas
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {techStacks.map((tech) => (
              <span
                key={tech.name}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition hover:border-white/20 hover:scale-105 cursor-default ${tech.color}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </section>


        

        {/* FEATURE BENTO GRID */}
        <section className="mb-28 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Structured Focus. Not Friction.
            </h2>
            <p className="text-stone-400 text-sm mt-2 max-w-xl mx-auto">
              Every detail is engineered to help you master core developer syllabus targets with AI clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div 
                  key={index} 
                  className="group relative rounded-2xl border border-white/5 bg-slate-950/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/20 hover:bg-slate-950/60"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-300 border border-teal-500/20 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                    <IconComponent className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white group-hover:text-teal-200 transition-colors">{highlight.title}</h3>
                  <p className="text-xs leading-relaxed text-stone-400">{highlight.text}</p>
                </div>
              );
            })}
          </div>
        </section>

       

        

        {/* FINAL CONVERSION HERO */}
        <section className="mb-24 rounded-3xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 via-indigo-500/5 to-slate-950 p-8 sm:p-12 text-center max-w-5xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15),transparent_60%)]" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 px-3.5 py-1 text-[11px] font-bold text-teal-300 uppercase tracking-widest mb-4">
              <Award className="h-3.5 w-3.5" />
              Build Syllabus Mastery
            </span>
            
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Crush Your Interview Sprint
            </h2>
            
            <p className="text-stone-400 text-xs leading-relaxed mt-4 max-w-lg mx-auto sm:text-sm sm:leading-loose">
              Say goodbye to unorganized bookmarks and random sheets. Build a structured study track, optimize code solutions in the sandbox, and verify readiness seamlessly.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-500 text-slate-950 px-8 py-3 text-sm font-extrabold transition-all hover:bg-teal-400 hover:shadow-lg active:scale-95"
                to="/study-focus"
              >
                Launch Study Workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 pt-12 pb-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
            
            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <Link className="inline-flex items-center gap-3" to="/">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500 text-slate-950">
                  <BookOpenCheck className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-teal-300">Interview Prep AI</span>
              </Link>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Premium full-stack software engineer training portal. Fully dynamic, time-aware preparation with absolute syllabus focus.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Core Stacks</h4>
              <ul className="space-y-2 text-[11px] text-stone-500">
                <li><span className="hover:text-stone-300 transition cursor-pointer">React & Frontend</span></li>
                <li><span className="hover:text-stone-300 transition cursor-pointer">Node.js Express</span></li>
                <li><span className="hover:text-stone-300 transition cursor-pointer">Java Spring Boot / Hibernate</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Study Modules</h4>
              <ul className="space-y-2 text-[11px] text-stone-500">
                <li><Link to="/study-focus" className="hover:text-stone-300 transition">Study Focus Settings</Link></li>
                <li><Link to="/question-bank" className="hover:text-stone-300 transition">Question Generator</Link></li>
                <li><Link to="/materials" className="hover:text-stone-300 transition">AI Concept Solver</Link></li>
                <li><Link to="/syllabus" className="hover:text-stone-300 transition">Interactive Syllabus</Link></li>
              </ul>
            </div>


          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-stone-600 font-mono">
              &copy; {new Date().getFullYear()} Interview Prep AI Command Center. Engineered for high performance coding.
            </span>
            <div className="flex items-center gap-4 text-[10px] text-stone-600 font-mono">
              <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
              <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}

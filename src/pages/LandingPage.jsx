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
  // const [activeSandboxTab, setActiveSandboxTab] = useState('generator'); // 'generator', 'planner', 'syllabus'
  // const [selectedStack, setSelectedStack] = useState('reactNode'); // 'reactNode', 'pythonDjango', 'javaSpring'
  // const [daysRemaining, setDaysRemaining] = useState(30);
  // const [checklistState, setChecklistState] = useState([
  //   { id: 1, text: "System Architecture & API Design", checked: true },
  //   { id: 2, text: "Database Indexing & Query Tuning", checked: true },
  //   { id: 3, text: "JWT Auth & Route Guards", checked: false },
  //   { id: 4, text: "Docker Containers & CI/CD", checked: false },
  //   { id: 5, text: "Unit & Integration Testing", checked: false },
  // ]);
  // Syllabus progress calculation
  // const checkedCount = checklistState.filter(item => item.checked).length;
  // const progressPercent = Math.round((checkedCount / checklistState.length) * 100);

  // Toggle syllabus checkbox
  // const toggleChecklist = (id) => {
  //   setChecklistState(prev => 
  //     prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
  //   );
  // };

  // Determine planner mode text based on days remaining
  // const getPlannerMetrics = () => {
  //   if (daysRemaining < 12) {
  //     return {
  //       intensity: "CRUNCH PREP",
  //       hours: "5-6 hrs/day",
  //       focus: "Prioritized mock exams, flashcards, core syntax, and high-yield data structures. High intensity sprint.",
  //       color: "text-rose-400 border-rose-500/20 bg-rose-500/10",
  //       milestones: ["Day 1-3: Mock coding interview simulations", "Day 4-6: System architecture deep dives", "Day 7-10: Error review & active syntax cheat sheets"]
  //     };
  //   } else if (daysRemaining >= 12 && daysRemaining < 30) {
  //     return {
  //       intensity: "ACCELERATED",
  //       hours: "3-4 hrs/day",
  //       focus: "Targeted stack mock questions, revision sheets, stack concepts review, and hands-on algorithms practice.",
  //       color: "text-amber-400 border-amber-500/20 bg-amber-500/10",
  //       milestones: ["Week 1: Framework foundations & design models", "Week 2: Advanced data queries & API layouts", "Week 3: Full revision, speed code tests & mocks"]
  //     };
  //   } else {
  //     return {
  //       intensity: "STEADY ROADMAP",
  //       hours: "1.5-2.5 hrs/day",
  //       focus: "Comprehensive syllabus roadmap coverage, weekly mock coding, stack foundations, and progressive active recall.",
  //       color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
  //       milestones: ["Weeks 1-2: Core principles & software architecture", "Weeks 3-4: Advanced queries, queues, caching", "Weeks 5+: Active mock interviews & edge-cases"]
  //     };
  //   }
  // };

  // const planner = getPlannerMetrics();

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

        {/* HIGH-FIDELITY INTERACTIVE SANDBOX WORKSPACE */}
        {/* <section className="mb-28 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Experience the Workspace Simulator
            </h2>
            <p className="text-stone-400 text-sm mt-2 max-w-xl mx-auto">
              Click the tabs below to test drive the core prep modules and see the intelligence engine in action.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden">
            
            {/* Simulator Tabs Header *
            <div className="flex flex-col sm:flex-row items-stretch border-b border-white/10 bg-white/5">
              
              <button 
                onClick={() => setActiveSandboxTab('generator')}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 text-sm font-bold border-b-2 sm:border-b-0 sm:border-r border-white/5 transition-all ${
                  activeSandboxTab === 'generator' 
                    ? 'border-b-teal-500 bg-teal-500/10 text-white font-extrabold' 
                    : 'border-b-transparent text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Terminal className="h-4.5 w-4.5 text-teal-400" />
                <span>1. AI Prep Generator</span>
              </button>

              <button 
                onClick={() => setActiveSandboxTab('planner')}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 text-sm font-bold border-b-2 sm:border-b-0 sm:border-r border-white/5 transition-all ${
                  activeSandboxTab === 'planner' 
                    ? 'border-b-teal-500 bg-teal-500/10 text-white font-extrabold' 
                    : 'border-b-transparent text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calendar className="h-4.5 w-4.5 text-indigo-400" />
                <span>2. Time-Aware Planner</span>
              </button>

              <button 
                onClick={() => setActiveSandboxTab('syllabus')}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 text-sm font-bold border-b-2 sm:border-b-0 transition-all ${
                  activeSandboxTab === 'syllabus' 
                    ? 'border-b-teal-500 bg-teal-500/10 text-white font-extrabold' 
                    : 'border-b-transparent text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <CheckSquare className="h-4.5 w-4.5 text-emerald-400" />
                <span>3. Live Syllabus Tracker</span>
              </button>

            </div>

            {/* Simulator Content Area 
            <div className="p-6 sm:p-8 min-h-[460px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                
                {/* TAB 1: AI PREP GENERATOR *
                {activeSandboxTab === 'generator' && (
                  <motion.div
                    key="tab-generator"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6"
                  >
                    <div className="flex flex-col justify-between space-y-5">
                      <div>
                        <span className="inline-flex items-center gap-2 rounded-md bg-teal-500/10 border border-teal-500/20 px-2 py-1 text-xs font-semibold text-teal-300">
                          Interactive Sandbox
                        </span>
                        <h3 className="text-xl font-bold text-white mt-3">Select Stack & Generate</h3>
                        <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                          Click a syllabus ecosystem combination below to simulate query generation on our core backend.
                        </p>
                      </div>

                      {/* Stack Options Selector *
                      <div className="space-y-2">
                        <button 
                          onClick={() => setSelectedStack('reactNode')}
                          className={`w-full text-left p-3 rounded-xl border transition ${
                            selectedStack === 'reactNode' 
                              ? 'bg-teal-500/15 border-teal-500/40 text-teal-200' 
                              : 'bg-white/5 border-white/5 hover:border-white/15 text-stone-400'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-extrabold">React + Node (Express)</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Authentication</span>
                          </div>
                        </button>

                        <button 
                          onClick={() => setSelectedStack('pythonDjango')}
                          className={`w-full text-left p-3 rounded-xl border transition ${
                            selectedStack === 'pythonDjango' 
                              ? 'bg-teal-500/15 border-teal-500/40 text-teal-200' 
                              : 'bg-white/5 border-white/5 hover:border-white/15 text-stone-400'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-extrabold">Python + Django</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Query Tuning</span>
                          </div>
                        </button>

                        <button 
                          onClick={() => setSelectedStack('javaSpring')}
                          className={`w-full text-left p-3 rounded-xl border transition ${
                            selectedStack === 'javaSpring' 
                              ? 'bg-teal-500/15 border-teal-500/40 text-teal-200' 
                              : 'bg-white/5 border-white/5 hover:border-white/15 text-stone-400'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-extrabold">Java + Spring Boot</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Concurrency</span>
                          </div>
                        </button>
                      </div>

                      <div className="rounded-xl bg-white/5 border border-white/5 p-4 text-xs space-y-2">
                        <div className="flex items-center gap-2 text-stone-300 font-bold">
                          <Activity className="h-3.5 w-3.5 text-teal-400" />
                          Generated outputs include:
                        </div>
                        <p className="text-[11px] text-stone-400 leading-relaxed">
                          Targeted coding questions, split-screen editor environments, static analysis check lists, and secure code samples.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden min-h-[340px]">
                      <div className="flex items-center justify-between bg-[color:var(--surface-dark)] px-4 py-2 text-xs border-b border-white/5 text-stone-400 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        </div>
                        <span>workspace_mock.{sandboxGeneratorData[selectedStack].lang === 'javascript' ? 'js' : sandboxGeneratorData[selectedStack].lang === 'python' ? 'py' : 'java'}</span>
                      </div>
                      
                      <div className="p-4 flex-1 flex flex-col justify-between font-mono text-xs text-stone-300 leading-relaxed overflow-x-auto space-y-4">
                        <div>
                          <p className="text-teal-400 font-bold mb-2">Interview Prep Topic Question:</p>
                          <p className="text-white text-xs font-semibold leading-relaxed border-l-2 border-teal-500/40 pl-3 py-1">
                            {sandboxGeneratorData[selectedStack].title}
                          </p>
                        </div>

                        <div>
                          <p className="text-indigo-400 font-bold mb-1">Optimized solution:</p>
                          <pre className="bg-slate-950/80 p-3 rounded-lg border border-white/5 overflow-x-auto text-[11px] text-teal-200">
                            {sandboxGeneratorData[selectedStack].code}
                          </pre>
                        </div>

                        <div className="bg-[color:var(--surface-dark)]/80 p-3 rounded-lg border border-teal-500/20 text-[11px] text-stone-300">
                          {sandboxGeneratorData[selectedStack].review}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: TIME-AWARE PLANNER *
                {activeSandboxTab === 'planner' && (
                  <motion.div
                    key="tab-planner"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6"
                  >
                    <div className="flex flex-col justify-between space-y-5">
                      <div>
                        <span className="inline-flex items-center gap-2 rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 text-xs font-semibold text-indigo-300">
                          Interactive Sandbox
                        </span>
                        <h3 className="text-xl font-bold text-white mt-3">Drag Days & Set Routine</h3>
                        <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                          Adjust the days remaining until your technical evaluation. Watch the study plan recalculate depth parameters instantly.
                        </p>
                      </div>

                      {/* Slider Control *
                      <div className="space-y-3 bg-white/5 border border-white/5 p-4 rounded-2xl">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-stone-300">Days to Technical Exam</span>
                          <span className="text-base font-extrabold text-white">{daysRemaining} days left</span>
                        </div>
                        <input 
                          type="range" 
                          min="5" 
                          max="60" 
                          value={daysRemaining} 
                          onChange={(e) => setDaysRemaining(Number(e.target.value))}
                          className="w-full h-1.5 bg-indigo-950 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                        />
                        <div className="flex justify-between text-[10px] text-stone-500">
                          <span>5 Days (Crunch)</span>
                          <span>30 Days (Accelerated)</span>
                          <span>60 Days (Steady)</span>
                        </div>
                      </div>

                      <div className="rounded-xl bg-indigo-500/5 border border-indigo-500/10 p-4 text-xs space-y-2">
                        <div className="flex items-center gap-2 text-stone-300 font-bold">
                          <Flame className="h-3.5 w-3.5 text-indigo-400" />
                          Time-Aware Planning Rules:
                        </div>
                        <p className="text-[11px] text-stone-400 leading-relaxed">
                          As time compresses, secondary syllabus topics are auto-archived. Focus narrows down purely onto critical core items and coding speed.
                        </p>
                      </div>
                    </div>

                    {/* Timeline Results Panel *
                    <div className="flex flex-col bg-slate-900 border border-white/10 rounded-2xl p-5 sm:p-6 justify-between space-y-4">
                      
                      {/* Metric banner row *
                      <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-white/5">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block">Syllabus Mode</span>
                          <span className={`inline-block border px-2.5 py-0.5 rounded-full text-xs font-black mt-1 ${planner.color}`}>
                            {planner.intensity}
                          </span>
                        </div>
                        
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block">Required Commitment</span>
                          <span className="text-sm font-black text-white block mt-1">{planner.hours}</span>
                        </div>
                      </div>

                      {/* Daily Routine Summary 
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block">AI Focus Priority Summary</span>
                        <p className="text-xs text-stone-300 leading-relaxed font-mono bg-slate-950/80 p-3 rounded-lg border border-white/5">
                          {planner.focus}
                        </p>
                      </div>

                      {/* Weekly Milestones Check *
                      <div className="space-y-3">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block">Generated Milestones Checklist</span>
                        <div className="space-y-2">
                          {planner.milestones.map((milestone, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-300 bg-white/5 border border-white/5 rounded-lg px-3 py-2">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-500/15 text-indigo-300 font-mono text-[10px]">
                                0{idx + 1}
                              </span>
                              <span>{milestone}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* TAB 3: LIVE SYLLABUS TRACKER *
                {activeSandboxTab === 'syllabus' && (
                  <motion.div
                    key="tab-syllabus"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6"
                  >
                    <div className="flex flex-col justify-between space-y-5">
                      <div>
                        <span className="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-300">
                          Interactive Sandbox
                        </span>
                        <h3 className="text-xl font-bold text-white mt-3">Interactive Syllabus Progress</h3>
                        <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                          Simulate checking off subtopics to watch the readiness score gauge calculate and fill in real time.
                        </p>
                      </div>

                      {/* Checklist inputs *
                      <div className="space-y-2.5">
                        {checklistState.map((item) => (
                          <div 
                            key={item.id} 
                            onClick={() => toggleChecklist(item.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition ${
                              item.checked 
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-white' 
                                : 'bg-white/5 border-white/5 text-stone-400 hover:border-white/10 hover:text-stone-300'
                            }`}
                          >
                            <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-all ${
                              item.checked 
                                ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                                : 'border-stone-600'
                            }`}>
                              {item.checked && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-semibold">{item.text}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-[10px] text-stone-500 leading-normal italic">
                        * In the active app workspace, you can check off or modify tasks dynamically. Ready states integrate into syllabus dashboard charts automatically.
                      </p>
                    </div>

                    {/* Progress Wheel Panel 
                    <div className="flex flex-col items-center justify-center bg-slate-900 border border-white/10 rounded-2xl p-6 min-h-[340px]">
                      
                      {/* Circular Gauge *
                      <div className="relative flex items-center justify-center h-48 w-48 mb-6">
                        
                        {/* Background Ring *
                        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                          <circle 
                            cx="60" 
                            cy="60" 
                            r="50" 
                            className="stroke-slate-950" 
                            strokeWidth="10" 
                            fill="transparent" 
                          />
                          {/* Foreground Gauge *
                          <circle 
                            cx="60" 
                            cy="60" 
                            r="50" 
                            className="stroke-emerald-400 transition-all duration-500 ease-out" 
                            strokeWidth="10" 
                            fill="transparent" 
                            strokeDasharray={2 * Math.PI * 50}
                            strokeDashoffset={2 * Math.PI * 50 * (1 - progressPercent / 100)}
                            strokeLinecap="round"
                          />
                        </svg>

                        <div className="text-center z-10">
                          <span className="text-4xl font-black text-white">{progressPercent}%</span>
                          <span className="block text-[10px] text-stone-500 uppercase tracking-widest mt-1">Readiness</span>
                        </div>
                      </div>

                      {/* Ready status badge *
                      <div className="text-center">
                        <span className="inline-flex items-center gap-1.5 text-xs text-stone-300 font-bold bg-[color:var(--surface-dark)] border border-white/5 rounded-full px-4 py-1.5">
                          <Award className="h-4 w-4 text-emerald-400" />
                          {progressPercent === 100 
                            ? "Syllabus Perfected! You're ready." 
                            : progressPercent >= 60 
                            ? "Strong foundations. Address JWT auth." 
                            : "Starting out. Focus on core design first."}
                        </span>
                      </div>

                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Enter Workspace CTA inside sandbox *
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-xs text-stone-400 leading-normal">
                    Ready to build your actual custom roadmap? Enter the dashboard.
                  </p>
                </div>
                <Link
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 text-slate-950 px-5 py-2.5 text-xs font-bold transition duration-200 hover:bg-teal-400 hover:shadow-lg active:scale-95"
                  to="/study-focus"
                >
                  Enter Actual Workspace
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

            </div>

          </div>
        </section> */}

        {/* WORKSPACE FLOW BAND */}
        {/* <section className="mb-28 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              One workflow, three focused modules
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-stone-400">
              The landing page now mirrors the app experience more closely, so the main content
              feels like a guided product tour instead of separate sections stitched together.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: Terminal,
                title: 'AI Prep Generator',
                text: 'Turn a selected stack into realistic interview questions and practical guidance.',
                accent: 'text-teal-300',
              },
              {
                icon: Calendar,
                title: 'Time-Aware Planner',
                text: 'Convert your days remaining into a study schedule with revision checkpoints.',
                accent: 'text-indigo-300',
              },
              {
                icon: CheckSquare,
                title: 'Live Syllabus Tracker',
                text: 'Track progress visually and understand readiness before the interview date.',
                accent: 'text-emerald-300',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  className="group rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-teal-400/25 hover:bg-slate-950/80"
                  key={item.title}
                >
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ${item.accent}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">{item.text}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    Open in workspace
                  </div>
                </div>
              );
            })}
          </div>
        </section> */}

        

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
                <li><span className="hover:text-stone-300 transition cursor-pointer">Python Django / FastAPI</span></li>
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

            {/* <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Join Prep Digest</h4>
              <p className="text-[10px] text-stone-500 leading-normal mb-3">
                Weekly architectural interview patterns and query performance checklists.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter email"
                  className="bg-white/5 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-stone-300 focus:outline-none focus:ring-1 focus:ring-teal-500 w-full placeholder:text-stone-600"
                />
                <button className="bg-teal-500 text-slate-950 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-teal-400 transition shrink-0">
                  Join
                </button>
              </div>
            </div> */}

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

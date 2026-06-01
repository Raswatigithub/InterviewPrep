import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  // ArrowRight,
  Award,
  Calendar,
  Check,
  CheckSquare,
  Flame,
  Terminal,
} from 'lucide-react';
// import { Link } from 'react-router-dom';

const sandboxGeneratorData = {
  reactNode: {
    title: 'Implement a robust JWT-based authentication system with refresh tokens in Express.js.',
    code: `// Express.js Refresh Token Middleware
app.post('/api/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});`,
    review:
      'Architectural note: store refresh tokens in HttpOnly secure cookies and rotate them to reduce token theft risk.',
  },
  pythonDjango: {
    title: 'Optimize a Django QuerySet suffering from N+1 query overhead in related fields.',
    code: `# Django N+1 query optimization using select_related
books = Book.objects.select_related('author').prefetch_related('tags').all()
for book in books:
    print(book.author.name)`,
    review:
      'Architectural note: use select_related for one-to-one and foreign keys, and prefetch_related for many-to-many relations.',
  },
  javaSpring: {
    title: 'Implement optimistic locking and database concurrency control in Spring Boot using Hibernate.',
    code: `@Entity
public class Product {
  @Id @GeneratedValue
  private Long id;

  @Version
  private Long version;
}`,
    review:
      'Architectural note: @Version lets Hibernate detect stale updates and reject conflicting writes cleanly.',
  },
};

function getPlannerMetrics(daysRemaining) {
  if (daysRemaining < 12) {
    return {
      intensity: 'CRUNCH PREP',
      hours: '5-6 hrs/day',
      focus: 'Prioritize mock rounds, flashcards, and high-yield core topics. Keep the sprint tight and practice-heavy.',
      color: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
      milestones: [
        'Day 1-3: Mock coding interview simulations',
        'Day 4-6: System architecture deep dives',
        'Day 7-10: Error review and rapid revision',
      ],
    };
  }

  if (daysRemaining < 30) {
    return {
      intensity: 'ACCELERATED',
      hours: '3-4 hrs/day',
      focus: 'Mix stack review, guided practice, and targeted revisions so you keep momentum without burning out.',
      color: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
      milestones: [
        'Week 1: Framework foundations and design models',
        'Week 2: Advanced data queries and API layouts',
        'Week 3: Full revision, speed tests, and mocks',
      ],
    };
  }

  return {
    intensity: 'STEADY ROADMAP',
    hours: '1.5-2.5 hrs/day',
    focus: 'Cover the syllabus in layers: core principles first, then deeper practice, then active recall.',
    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    milestones: [
      'Weeks 1-2: Core principles and software architecture',
      'Weeks 3-4: Advanced queries, queues, and caching',
      'Weeks 5+: Active mock interviews and edge cases',
    ],
  };
}

export default function WorkspaceSimulator() {
  const [activeSandboxTab, setActiveSandboxTab] = useState('generator');
  const [selectedStack, setSelectedStack] = useState('reactNode');
  const [daysRemaining, setDaysRemaining] = useState(30);
  const [checklistState, setChecklistState] = useState([
    { id: 1, text: 'System Architecture & API Design', checked: true },
    { id: 2, text: 'Database Indexing & Query Tuning', checked: true },
    { id: 3, text: 'JWT Auth & Route Guards', checked: false },
    { id: 4, text: 'Docker Containers & CI/CD', checked: false },
    { id: 5, text: 'Unit & Integration Testing', checked: false },
  ]);

  const progressPercent = Math.round(
    (checklistState.filter((item) => item.checked).length / checklistState.length) * 100,
  );
  const planner = getPlannerMetrics(daysRemaining);

  const toggleChecklist = (id) => {
    setChecklistState((current) =>
      current.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    );
  };

  return (
    <section className="mx-auto mb-28 max-w-6xl">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Experience the Workspace Simulator</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-stone-400">
          This is the same guided sandbox experience, now available in the main app so users can
          try the workflow right inside the product.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        <div className="flex flex-col items-stretch border-b border-white/10 bg-white/5 sm:flex-row">
          <button
            className={`flex-1 border-b-2 border-white/5 px-6 py-4 text-sm font-bold transition-all sm:border-b-0 sm:border-r ${
              activeSandboxTab === 'generator'
                ? 'border-b-teal-500 bg-teal-500/10 font-extrabold text-white'
                : 'border-b-transparent text-stone-400 hover:bg-white/5 hover:text-white'
            }`}
            onClick={() => setActiveSandboxTab('generator')}
            type="button"
          >
            <span className="inline-flex items-center gap-3">
              <Terminal className="h-4 w-4 text-teal-400" aria-hidden="true" />
              1. AI Prep Generator
            </span>
          </button>
          <button
            className={`flex-1 border-b-2 border-white/5 px-6 py-4 text-sm font-bold transition-all sm:border-b-0 sm:border-r ${
              activeSandboxTab === 'planner'
                ? 'border-b-teal-500 bg-teal-500/10 font-extrabold text-white'
                : 'border-b-transparent text-stone-400 hover:bg-white/5 hover:text-white'
            }`}
            onClick={() => setActiveSandboxTab('planner')}
            type="button"
          >
            <span className="inline-flex items-center gap-3">
              <Calendar className="h-4 w-4 text-indigo-400" aria-hidden="true" />
              2. Time-Aware Planner
            </span>
          </button>
          <button
            className={`flex-1 border-b-2 border-white/5 px-6 py-4 text-sm font-bold transition-all sm:border-b-0 ${
              activeSandboxTab === 'syllabus'
                ? 'border-b-teal-500 bg-teal-500/10 font-extrabold text-white'
                : 'border-b-transparent text-stone-400 hover:bg-white/5 hover:text-white'
            }`}
            onClick={() => setActiveSandboxTab('syllabus')}
            type="button"
          >
            <span className="inline-flex items-center gap-3">
              <CheckSquare className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              3. Live Syllabus Tracker
            </span>
          </button>
        </div>

        <div className="flex min-h-[460px] flex-col justify-between p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {activeSandboxTab === 'generator' ? (
              <motion.div
                key="tab-generator"
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
              >
                <div className="flex flex-col justify-between space-y-5">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-md border border-teal-500/20 bg-teal-500/10 px-2 py-1 text-xs font-semibold text-teal-300">
                      Interactive Sandbox
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-white">Select Stack & Generate</h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-400">
                      Click a stack below to preview the kind of interview output the app produces
                      for that ecosystem.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {Object.keys(sandboxGeneratorData).map((key) => (
                      <button
                        className={`w-full rounded-xl border p-3 text-left transition ${
                          selectedStack === key
                            ? 'border-teal-500/40 bg-teal-500/15 text-teal-200'
                            : 'border-white/5 bg-white/5 text-stone-400 hover:border-white/15 hover:text-stone-300'
                        }`}
                        key={key}
                        onClick={() => setSelectedStack(key)}
                        type="button"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs font-extrabold">
                            {key === 'reactNode'
                              ? 'React + Node (Express)'
                              : key === 'pythonDjango'
                              ? 'Python + Django'
                              : 'Java + Spring Boot'}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                            {key === 'reactNode'
                              ? 'Authentication'
                              : key === 'pythonDjango'
                              ? 'Query Tuning'
                              : 'Concurrency'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2 rounded-xl border border-white/5 bg-white/5 p-4 text-xs">
                    <div className="flex items-center gap-2 font-bold text-stone-300">
                      <Activity className="h-3.5 w-3.5 text-teal-400" aria-hidden="true" />
                      Generated outputs include:
                    </div>
                    <p className="text-[11px] leading-relaxed text-stone-400">
                      Interview questions, optimized snippets, review notes, and practical
                      explanations you can copy into notes.
                    </p>
                  </div>
                </div>

                <div className="flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/5 bg-[color:var(--surface-dark)] px-4 py-2 font-mono text-xs text-stone-400">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <span>workspace_mock.code</span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between space-y-4 overflow-x-auto p-4 font-mono text-xs leading-relaxed text-stone-300">
                    <div>
                      <p className="mb-2 font-bold text-teal-400">
                        <span className="mr-1 text-teal-500">/ /</span>
                        Interview Prep Topic Question:
                      </p>
                      <p className="border-l-2 border-teal-500/40 py-1 pl-3 text-xs font-semibold text-white">
                        {sandboxGeneratorData[selectedStack].title}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 font-bold text-indigo-400">
                        <span className="mr-1 text-indigo-500">/ /</span>
                        Optimized solution:
                      </p>
                      <pre className="overflow-x-auto rounded-lg border border-white/5 bg-slate-950/80 p-3 text-[11px] text-teal-200">
                        {sandboxGeneratorData[selectedStack].code}
                      </pre>
                    </div>

                    <div className="rounded-lg border border-teal-500/20 bg-[color:var(--surface-dark)]/80 p-3 text-[11px] text-stone-300">
                      {sandboxGeneratorData[selectedStack].review}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}

            {activeSandboxTab === 'planner' ? (
              <motion.div
                key="tab-planner"
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
              >
                <div className="flex flex-col justify-between space-y-5">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-1 text-xs font-semibold text-indigo-300">
                      Interactive Sandbox
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-white">Drag Days & Set Routine</h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-400">
                      Adjust the days left until your interview and watch the study plan intensity
                      shift instantly.
                    </p>
                  </div>

                  <div className="space-y-3 rounded-2xl border border-white/5 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-bold text-stone-300">Days to Technical Exam</span>
                      <span className="text-base font-extrabold text-white">{daysRemaining} days left</span>
                    </div>
                    <input
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-indigo-950 accent-indigo-400"
                      max="60"
                      min="5"
                      onChange={(event) => setDaysRemaining(Number(event.target.value))}
                      type="range"
                      value={daysRemaining}
                    />
                    <div className="flex justify-between text-[10px] text-stone-500">
                      <span>5 Days</span>
                      <span>30 Days</span>
                      <span>60 Days</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-indigo-500/10 bg-indigo-500/5 p-4 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-stone-300">
                      <Flame className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                      Time-Aware Planning Rules:
                    </div>
                    <p className="text-[11px] leading-relaxed text-stone-400">
                      As time compresses, the plan narrows to critical topics, interview patterns,
                      and speed practice.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-3">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-stone-500">
                        Syllabus Mode
                      </span>
                      <span className={`mt-1 inline-block rounded-full border px-2.5 py-0.5 text-xs font-black ${planner.color}`}>
                        {planner.intensity}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="block text-[10px] uppercase tracking-widest text-stone-500">
                        Required Commitment
                      </span>
                      <span className="mt-1 block text-sm font-black text-white">{planner.hours}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-[10px] uppercase tracking-widest text-stone-500">
                      AI Focus Priority Summary
                    </span>
                    <p className="rounded-lg border border-white/5 bg-slate-950/80 p-3 font-mono text-xs leading-relaxed text-stone-300">
                      {planner.focus}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <span className="block text-[10px] uppercase tracking-widest text-stone-500">
                      Generated Milestones Checklist
                    </span>
                    <div className="space-y-2">
                      {planner.milestones.map((milestone, index) => (
                        <div
                          className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs text-stone-300"
                          key={milestone}
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-500/15 font-mono text-[10px] text-indigo-300">
                            0{index + 1}
                          </span>
                          <span>{milestone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}

            {activeSandboxTab === 'syllabus' ? (
              <motion.div
                key="tab-syllabus"
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
              >
                <div className="flex flex-col justify-between space-y-5">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-300">
                      Interactive Sandbox
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-white">Interactive Syllabus Progress</h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-400">
                      Simulate checking off subtopics to watch the readiness score fill in real time.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {checklistState.map((item) => (
                      <button
                        className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                          item.checked
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-white'
                            : 'border-white/5 bg-white/5 text-stone-400 hover:border-white/10 hover:text-stone-300'
                        }`}
                        key={item.id}
                        onClick={() => toggleChecklist(item.id)}
                        type="button"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-all ${
                            item.checked ? 'border-emerald-500 bg-emerald-500 text-slate-950' : 'border-stone-600'
                          }`}
                        >
                          {item.checked ? <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" /> : null}
                        </span>
                        <span className="text-xs font-semibold">{item.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900 p-6">
                  <div className="relative mb-6 flex h-48 w-48 items-center justify-center">
                    <svg className="absolute h-full w-full -rotate-90 transform" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" fill="transparent" r="50" className="stroke-slate-950" strokeWidth="10" />
                      <circle
                        cx="60"
                        cy="60"
                        fill="transparent"
                        r="50"
                        className="stroke-emerald-400 transition-all duration-500 ease-out"
                        strokeDasharray={2 * Math.PI * 50}
                        strokeDashoffset={2 * Math.PI * 50 * (1 - progressPercent / 100)}
                        strokeLinecap="round"
                        strokeWidth="10"
                      />
                    </svg>

                    <div className="z-10 text-center">
                      <span className="text-4xl font-black text-white">{progressPercent}%</span>
                      <span className="mt-1 block text-[10px] uppercase tracking-widest text-stone-500">
                        Readiness
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-[color:var(--surface-dark)] px-4 py-1.5 text-xs font-bold text-stone-300">
                    <Award className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    {progressPercent === 100
                      ? "Syllabus Perfected! You're ready."
                      : progressPercent >= 60
                      ? 'Strong foundations. Keep pushing weak areas.'
                      : 'Starting out. Focus on core design first.'}
                  </span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
              <p className="text-xs leading-normal text-stone-400">
                Ready to build your actual custom roadmap? Jump to the workspace.
              </p>
            </div>
            <Link
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition duration-200 hover:bg-teal-400 hover:shadow-lg active:scale-95 sm:w-auto"
              to="/study-focus"
            >
              Enter Actual Workspace
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
}

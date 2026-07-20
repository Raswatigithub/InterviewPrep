import { Brain, ClipboardCheck, FileText, Sparkles, Wand2 } from 'lucide-react';
import Card from '../components/ui/Card';
import CodeReviewPanel from '../components/CodeReviewPanel';
import ConceptDemystifier from '../components/ConceptDemystifier';
import StudyPlanner from '../components/StudyPlanner';
import Tabs from '../components/Tabs';
import { usePrep } from '../context/usePrep';

export default function AIToolsPage() {
  const {
    activeTab,
    code,
    concept,
    conceptOutput,
    copyGeneratedText,
    gemini,
    handleCodeReview,
    handleExplainConcept,
    handleGeneratePlan,
    plannerDays,
    plannerHours,
    studyFocusSummary,
    reviewOutput,
    setActiveTab,
    setCode,
    setConcept,
    setPlannerDays,
    setPlannerHours,
  } = usePrep();

  const tabs = [
    {
      id: 'ai-review',
      label: 'AI Code Review',
      content: (
        <CodeReviewPanel
          code={code}
          gemini={gemini}
          isLoading={gemini.isLoading}
          onCodeChange={setCode}
          onCopy={copyGeneratedText}
          onSubmit={handleCodeReview}
          output={reviewOutput}
        />
      ),
    },
    {
      id: 'eli5',
      label: 'Concept Demystifier',
      content: (
        <ConceptDemystifier
          concept={concept}
          gemini={gemini}
          isLoading={gemini.isLoading('eli5')}
          onConceptChange={setConcept}
          onCopy={copyGeneratedText}
          onSubmit={handleExplainConcept}
          output={conceptOutput}
        />
      ),
    },
    {
      id: 'planner',
      label: 'Study Planner',
      content: (
        <StudyPlanner
          days={plannerDays}
          hours={plannerHours}
          gemini={gemini}
          isLoading={gemini.isLoading('planner')}
          onDaysChange={setPlannerDays}
          onHoursChange={setPlannerHours}
          onSubmit={handleGeneratePlan}
        />
      ),
    },
    {
      id: 'mindset',
      label: 'Mindset',
      content: (
        <section className="animate-fadeIn" aria-labelledby="mindset-title">
          <h3 id="mindset-title" className="mb-4 flex items-center gap-2 text-xl font-bold text-stone-800 dark:text-stone-100">
            <Brain className="h-5 w-5 text-teal-600" aria-hidden="true" />
            Test Day Readiness
          </h3>
          <p className="max-w-2xl text-stone-600 dark:text-stone-300">
            Since external browsing is prohibited, rely on fundamental understanding.
            Prioritize clear reasoning, edge-case thinking, and explaining tradeoffs out loud
            as you work.
          </p>
        </section>
      ),
    },
  ];

  return (
    <section className="scroll-mt-8" id="action-plan-section" aria-labelledby="action-title">
      <div className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-stone-200 bg-gradient-to-br from-white via-stone-50 to-teal-50 p-6 shadow-soft dark:border-white/5 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/30">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-teal-700 dark:border-teal-500/25 dark:bg-slate-950/60 dark:text-teal-300">
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
            AI Action Plan & Code Review
          </div>
          <h2
            id="action-title"
            className="text-2xl font-black tracking-tight text-stone-900 dark:text-white sm:text-3xl"
          >
            A guided space for code review, concept help, and study planning.
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-stone-600 dark:text-stone-400 text-sm">
            Start with the tool you need, then copy the result into your notes. Everything here
            is organized to feel like a workflow, not a toolbox.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 dark:border-white/5 dark:bg-slate-950 dark:text-stone-200">
              <Wand2 className="h-3.5 w-3.5 text-teal-500" aria-hidden="true" />
              1. Pick a tool
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 dark:border-white/5 dark:bg-slate-950 dark:text-stone-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
              2. Generate AI output
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 dark:border-white/5 dark:bg-slate-950 dark:text-stone-200">
              <FileText className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
              3. Copy into notes
            </div>
          </div>
        </div>

        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
            Current Focus
          </p>
          <p className="mt-3 text-lg font-bold text-stone-900 dark:text-teal-200 bg-gradient-to-r from-teal-200 to-indigo-300 bg-clip-text text-transparent">
            {studyFocusSummary}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
            Your code review, question bank, and study plan prompts all adapt to this selected
            stack, so the output stays specific and useful.
          </p>
          <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50/70 p-4 text-xs text-teal-900 dark:border-teal-500/25 dark:bg-teal-500/10 dark:text-teal-200">
            Tip: use the tabs to switch between tasks, then copy the generated answer from each
            result card.
          </div>
        </Card>
      </div>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
    </section>
  );
}

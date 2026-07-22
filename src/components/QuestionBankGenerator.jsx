import { ClipboardList, Sparkles } from 'lucide-react';
import { formatStudyFocus } from '../data/topicData';
import Button from './ui/Button';
import Card from './ui/Card';

export default function QuestionBankGenerator({
  disabled,
  gemini,
  focus,
  isLoading,
  onGenerate,
}) {
  return (
    <section className="scroll-mt-8" id="question-bank-section" aria-labelledby="question-bank-title">
      <div className="mb-6">
        <h2 id="question-bank-title" className="flex items-center gap-2 text-2xl font-bold text-stone-800 dark:text-stone-100">
          <ClipboardList className="h-8 w-8 text-teal-600" aria-hidden="true" />
          AI Interview Question Bank Generator
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-stone-600 dark:text-stone-300">
          Generate likely interview questions for your selected stack, including answer points,
          tags, follow-ups, and a practical task.
        </p>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              Generator Focus
            </p>
            <p className="mt-1 break-words text-lg font-bold text-stone-800 dark:text-stone-100">
              {formatStudyFocus(focus)}
            </p>
          </div>
          <Button
            aria-label="Generate interview question bank"
            className="w-full md:min-w-[260px] md:w-auto"
            disabled={disabled || gemini.isCoolingDown('question-bank')}
            icon={Sparkles}
            isLoading={isLoading}
            onClick={onGenerate}
          >
            {isLoading ? 'Generating...' : gemini.getCooldownLabel('question-bank', 'Generate Question Bank')}
          </Button>
        </div>

        <div className="mt-5 rounded-lg border border-dashed border-stone-300 p-5 text-sm text-stone-500 dark:border-stone-700 dark:text-stone-400">
          Generated question banks open in the Study Material Workspace, keeping this area focused
          on setup and generation.
        </div>
      </Card>
    </section>
  );
}

import { BookOpenCheck, RotateCcw, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { defaultStudyFocus, formatStudyFocus, topicOptions } from '../data/topicData';
import Button from './ui/Button';
import Card from './ui/Card';

const fields = [
  {
    id: 'language',
    label: 'Programming Language',
    options: topicOptions.languages,
  },
  {
    id: 'frontendFramework',
    label: 'Frontend Framework',
    options: topicOptions.frontendFrameworks,
  },
  {
    id: 'backendFramework',
    label: 'Backend Framework',
    options: topicOptions.backendFrameworks,
  },
  {
    id: 'coreTopic',
    label: 'Core Topic',
    options: topicOptions.coreTopics,
  },
  {
    id: 'difficulty',
    label: 'Difficulty',
    options: topicOptions.difficulties,
  },
  {
    id: 'questionType',
    label: 'Question Type',
    options: topicOptions.questionTypes,
  },
];

export default function SubjectSelector({ focus, onChange, onReset }) {
  const focusSummary = formatStudyFocus(focus);

  return (
    <section className="scroll-mt-8" id="study-focus-section" aria-labelledby="study-focus-title">
      <div className="mb-6">
        <h2 id="study-focus-title" className="flex items-center gap-2 text-2xl font-bold text-stone-800 dark:text-stone-100">
          <Target className="h-8 w-8 text-teal-600" aria-hidden="true" />
          Custom Study Focus
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-stone-600 dark:text-stone-300">
          Choose the exact stack, topic, difficulty, and question style you want to prepare for.
          AI questions and study plans will use this focus.
        </p>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fields.map((field) => (
            <label className="block" htmlFor={field.id} key={field.id}>
              <span className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-200">
                {field.label}
              </span>
              <select
                className="form-field p-3"
                id={field.id}
                onChange={(event) => onChange(field.id, event.target.value)}
                value={focus[field.id]}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-col gap-4 rounded-xl border border-teal-100 bg-teal-50 p-4 dark:border-teal-900 dark:bg-teal-950/30 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 6 }}
          key={focusSummary}
        >
          <div className="min-w-0">
            <p className="mb-1 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
              <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
              Current Focus
            </p>
            <p className="break-words text-base font-bold text-stone-800 dark:text-stone-100">
              {focusSummary}
            </p>
          </div>
          <Button
            aria-label="Reset study focus"
            className="w-full md:w-auto"
            icon={RotateCcw}
            onClick={() => onReset(defaultStudyFocus)}
            variant="stone"
          >
            Reset Focus
          </Button>
        </motion.div>
      </Card>
    </section>
  );
}

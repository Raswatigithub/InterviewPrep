import { Bug, Gauge, Lightbulb } from 'lucide-react';
import Button from './ui/Button';
import CopyButton from './ui/CopyButton';

const actions = [
  {
    key: 'explain',
    label: 'Explain Logic',
    icon: Lightbulb,
    variant: 'stone',
  },
  {
    key: 'optimize',
    label: 'Optimize Code',
    icon: Gauge,
    variant: 'teal',
  },
  {
    key: 'debug',
    label: 'Find Bugs',
    icon: Bug,
    variant: 'rose',
  },
];

export default function CodeReviewPanel({
  code,
  gemini,
  isLoading,
  onCodeChange,
  onCopy,
  onSubmit,
  output,
}) {
  return (
    <section className="animate-fadeIn" aria-labelledby="code-review-title">
      <h3 id="code-review-title" className="sr-only">
        AI Code Review
      </h3>
      <div className="flex flex-col gap-4">
        <textarea
          aria-label="Practice code"
          className="form-field h-44 font-mono"
          onChange={(event) => onCodeChange(event.target.value)}
          placeholder="Paste your practice code here (for example JavaScript logic or a Java class)..."
          value={code}
        />
        <div className="grid gap-2 sm:grid-cols-3">
          {actions.map((action) => (
            <Button
              aria-label={action.label}
              icon={action.icon}
              isLoading={isLoading(action.key)}
              disabled={gemini.isCoolingDown(action.key)}
              key={action.key}
              onClick={() => onSubmit(action.key)}
              variant={action.variant}
            >
              {isLoading(action.key)
                ? 'Generating...'
                : gemini.getCooldownLabel(action.key, action.label)}
            </Button>
          ))}
        </div>
        {output ? (
          <div className="space-y-3">
            <div className="flex justify-end">
              <CopyButton label="Copy Review" onCopy={() => onCopy(output, 'code review')} />
            </div>
            <div className="output-panel">{output}</div>
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-stone-300 p-5 text-sm text-stone-500 dark:border-stone-700 dark:text-stone-400">
            Paste code and choose a review mode to get targeted guidance.
          </p>
        )}
      </div>
    </section>
  );
}

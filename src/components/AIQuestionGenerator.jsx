import { Sparkles } from 'lucide-react';
import Button from './ui/Button';

export default function AIQuestionGenerator({
  disabled,
  domain,
  gemini,
  focusSummary,
  isLoading,
  onGenerate,
}) {
  if (!domain) {
    return null;
  }

  return (
    <div className="mt-6 border-t border-stone-200 pt-4 dark:border-stone-700">
      <p className="mb-3 rounded-lg bg-white p-3 text-xs font-medium text-stone-500 dark:bg-stone-900 dark:text-stone-400">
        Focus: {focusSummary}
      </p>
      <Button
        aria-label={`Generate practice question for ${domain}`}
        className="w-full"
        disabled={disabled || gemini.isCoolingDown('question')}
        icon={Sparkles}
        isLoading={isLoading}
        onClick={onGenerate}
      >
        {isLoading ? 'Generating...' : gemini.getCooldownLabel('question', 'Generate Practice Question')}
      </Button>
      <p className="mt-4 rounded-lg border border-dashed border-stone-300 p-4 text-sm text-stone-500 dark:border-stone-700 dark:text-stone-400">
        Generated practice questions open in the Study Material Workspace.
      </p>
    </div>
  );
}

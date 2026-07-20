import { WandSparkles } from 'lucide-react';
import Button from './ui/Button';
import CopyButton from './ui/CopyButton';

export default function ConceptDemystifier({
  concept,
  gemini,
  isLoading,
  onConceptChange,
  onCopy,
  onSubmit,
  output,
}) {
  return (
    <section className="animate-fadeIn" aria-labelledby="concept-title">
      <h3 id="concept-title" className="mb-4 flex items-center gap-2 text-xl font-bold text-stone-800 dark:text-stone-100">
        <WandSparkles className="h-5 w-5 text-indigo-600" aria-hidden="true" />
        Concept Demystifier
      </h3>
      <p className="mb-4 text-stone-600 dark:text-stone-300">
        Stuck on a complex topic? Let AI break it down in simple terms.
      </p>
      <div className="flex flex-col gap-4">
        <input
          aria-label="Concept to explain"
          className="form-field"
          onChange={(event) => onConceptChange(event.target.value)}
          placeholder="For example: Dependency Injection, React Hooks, OAuth 2.0..."
          type="text"
          value={concept}
        />
      <Button
        icon={WandSparkles}
        disabled={gemini.isCoolingDown('eli5')}
        isLoading={isLoading}
        onClick={onSubmit}
        variant="indigo"
      >
        {isLoading ? 'Generating...' : gemini.getCooldownLabel('eli5', 'Explain Like I am 5')}
      </Button>
        {output ? (
          <div className="space-y-3">
            <div className="flex justify-end">
              <CopyButton label="Copy Explanation" onCopy={() => onCopy(output, 'explanation')} />
            </div>
            <div className="output-panel">{output}</div>
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-stone-300 p-5 text-sm text-stone-500 dark:border-stone-700 dark:text-stone-400">
            Enter a concept to get a short analogy-based explanation.
          </p>
        )}
      </div>
    </section>
  );
}

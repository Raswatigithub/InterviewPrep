import { CalendarDays } from 'lucide-react';
import Button from './ui/Button';

export default function StudyPlanner({
  days,
  hours,
  gemini,
  isLoading,
  onDaysChange,
  onHoursChange,
  onSubmit,
}) {
  return (
    <section className="animate-fadeIn" aria-labelledby="planner-title">
      <h3 id="planner-title" className="mb-4 flex items-center gap-2 text-xl font-bold text-stone-800 dark:text-stone-100">
        <CalendarDays className="h-5 w-5 text-amber-600" aria-hidden="true" />
        Personalized Study Planner
      </h3>
      <p className="mb-4 text-stone-600 dark:text-stone-300">
        Generate a custom, interview-focused schedule based on your selected stack, timeline, and
        daily availability.
      </p>
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <input
          aria-label="Days until exam"
          className="form-field p-3"
          min="1"
          onChange={(event) => onDaysChange(event.target.value)}
          placeholder="Days until exam (for example 14)"
          type="number"
          value={days}
        />
        <input
          aria-label="Hours per day"
          className="form-field p-3"
          min="1"
          onChange={(event) => onHoursChange(event.target.value)}
          placeholder="Hours per day (for example 3)"
          type="number"
          value={hours}
        />
      </div>
      <Button
        className="w-full"
        icon={CalendarDays}
        isLoading={isLoading}
        onClick={onSubmit}
        disabled={gemini.isCoolingDown('planner')}
        variant="amber"
      >
        {isLoading ? 'Generating...' : gemini.getCooldownLabel('planner', 'Generate Schedule')}
      </Button>
      <p className="mt-4 rounded-lg border border-dashed border-amber-300 bg-amber-50/70 p-5 text-sm text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200">
        Your generated schedule opens in the Study Material Workspace, where you can review and
        copy it without losing your planner setup.
      </p>
    </section>
  );
}

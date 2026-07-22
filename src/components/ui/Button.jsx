import LoadingSpinner from '../LoadingSpinner';
import { cn } from '../../utils/cn';

const variants = {
  stone: 'bg-stone-800 text-white hover:bg-stone-900 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white',
  teal: 'bg-teal-600 text-white hover:bg-teal-700',
  rose: 'bg-rose-600 text-white hover:bg-rose-700',
  indigo: 'bg-indigo-600 text-white hover:bg-indigo-700',
  amber: 'bg-amber-600 text-white hover:bg-amber-700',
  ghost:
    'bg-white/10 text-white hover:bg-white/20 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700',
};

export default function Button({
  children,
  className = '',
  disabled = false,
  icon: Icon,
  isLoading = false,
  variant = 'teal',
  type = 'button',
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-center text-sm font-bold leading-snug transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {Icon && !isLoading ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      <span className="min-w-0 break-words">{children}</span>
      {isLoading ? <LoadingSpinner /> : null}
    </button>
  );
}

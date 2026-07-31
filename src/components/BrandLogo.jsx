import { BookOpenCheck } from 'lucide-react';
import { cn } from '../utils/cn';

const sizeClasses = {
  sm: {
    mark: 'h-9 w-9 rounded-lg',
    icon: 'h-4 w-4',
    text: 'text-sm',
    gap: 'gap-2.5',
  },
  md: {
    mark: 'h-11 w-11 rounded-xl',
    icon: 'h-5 w-5',
    text: 'text-base',
    gap: 'gap-3',
  },
  lg: {
    mark: 'h-12 w-12 rounded-xl',
    icon: 'h-6 w-6',
    text: 'text-lg',
    gap: 'gap-3.5',
  },
};

export default function BrandLogo({ className, showText = true, size = 'md', subtitle }) {
  const classes = sizeClasses[size] || sizeClasses.md;

  return (
    <span className={cn('inline-flex min-w-0 items-center', classes.gap, className)}>
      <span
        className={cn(
          'flex shrink-0 items-center justify-center bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20',
          classes.mark,
        )}
      >
        <BookOpenCheck className={classes.icon} aria-hidden="true" />
      </span>
      {showText ? (
        <span className="min-w-0">
          <span className={cn('block truncate font-black uppercase tracking-wide text-teal-300', classes.text)}>
            Interview Prep AI
          </span>
          {subtitle ? (
            <span className="block truncate text-xs font-medium text-stone-400">{subtitle}</span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}

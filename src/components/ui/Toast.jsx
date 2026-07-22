import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const icons = {
  error: AlertCircle,
  info: Info,
  success: CheckCircle2,
};

export default function Toast({ message, type = 'info', onDismiss }) {
  const Icon = icons[type] || Info;

  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'fixed left-3 right-3 top-3 z-50 flex max-w-sm items-start gap-3 rounded-lg border bg-white p-4 text-sm shadow-soft dark:bg-stone-900 sm:left-auto sm:right-4 sm:top-4',
            type === 'error' && 'border-rose-200 text-rose-800 dark:border-rose-900 dark:text-rose-100',
            type === 'success' && 'border-teal-200 text-teal-800 dark:border-teal-900 dark:text-teal-100',
            type === 'info' && 'border-stone-200 text-stone-800 dark:border-stone-700 dark:text-stone-100',
          )}
          exit={{ opacity: 0, y: -8 }}
          initial={{ opacity: 0, y: -8 }}
          role={type === 'error' ? 'alert' : 'status'}
        >
          <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="flex-1">{message}</p>
          <button
            aria-label="Dismiss notification"
            className="rounded p-1 transition hover:bg-stone-100 dark:hover:bg-stone-800"
            onClick={onDismiss}
            type="button"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

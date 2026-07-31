import {
  BookOpen,
  CheckSquare,
  ClipboardList,
  // Compass,
  Focus,
  LogOut,
  PanelsTopLeft,
  Sparkles,
  House,
  // LayoutPanelTop,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { usePrep } from '../context/usePrep';
import { logoutUser } from '../services/authService';
import { cn } from '../utils/cn';
import BrandLogo from './BrandLogo';

const navItems = [
  {
    to: '/',
    label: 'Home',
    icon: House,
  },
  {
    to: '/study-focus',
    label: 'Study Focus',
    icon: Focus,
  },
  {
    to: '/question-bank',
    label: 'Question Bank',
    icon: ClipboardList,
  },
  {
    to: '/materials',
    label: 'Materials',
    icon: BookOpen,
  },
  {
    to: '/syllabus',
    label: 'Syllabus',
    icon: PanelsTopLeft,
  },
  {
    to: '/ai-tools',
    label: 'AI Tools',
    icon: Sparkles,
  },
  // {
  //   to: '/workspace',
  //   label: 'Workspace',
  //   icon: LayoutPanelTop,
  // },
  {
    to: '/checklist',
    label: 'Checklist',
    icon: CheckSquare,
  },
];

function NavigationLink({ item, compact = false }) {
  const Icon = item.icon;

  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'group inline-flex items-center gap-3 rounded-lg text-sm font-bold text-stone-600 transition hover:bg-teal-50 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-stone-400 dark:hover:bg-white/5 dark:hover:text-teal-300',
          compact ? 'shrink-0 px-3 py-2 text-xs sm:text-sm' : 'w-full px-4 py-3',
          isActive && 'bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300 dark:border-l-[3px] dark:border-teal-500 dark:rounded-l-none',
        )
      }
      to={item.to}
    >
      {({ isActive }) => (
        <>
          <span className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-500 transition group-hover:bg-teal-600 group-hover:text-white dark:bg-white/5 dark:text-stone-400 dark:group-hover:bg-teal-500 dark:group-hover:text-slate-950",
            isActive && "dark:bg-teal-500 dark:text-slate-950"
          )}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="whitespace-nowrap">{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function Navigation() {
  const navigate = useNavigate();
  const { notify } = usePrep();

  const handleLogout = async () => {
    try {
      await logoutUser();
      notify('You have been logged out.', 'success');
      navigate('/auth', { replace: true });
    } catch (error) {
      notify(error.message || 'Unable to logout right now.', 'error');
    }
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-stone-200 bg-white/90 p-5 shadow-soft backdrop-blur-xl dark:border-white/5 dark:bg-slate-950/60 dark:shadow-2xl dark:backdrop-blur-2xl lg:block">
        <NavLink
          className="mb-8 flex items-center gap-3 rounded-xl p-2 transition hover:bg-stone-100 dark:hover:bg-white/5"
          to="/"
        >
          <BrandLogo subtitle="Study command center" />
        </NavLink>

        <nav aria-label="Primary navigation" className="space-y-2">
          {navItems.map((item) => (
            <NavigationLink item={item} key={item.to} />
          ))}
        </nav>

        <button
          className="mt-6 inline-flex w-full items-center gap-3 rounded-lg border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-stone-300 transition hover:bg-slate-800"
          onClick={handleLogout}
          type="button"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>

        {/* <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-teal-100 bg-teal-50 p-4 dark:border-teal-500/25 dark:bg-teal-500/10">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-teal-800 dark:text-teal-300">
            <Compass className="h-4 w-4" aria-hidden="true" />
            Workflow
          </p>
          <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400 font-mono">
            Pick a focus, generate material, then review it in the workspace.
          </p>
        </div> */}
      </aside>

      <div className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 px-3 py-3 backdrop-blur-xl dark:border-white/5 dark:bg-slate-950/60 lg:hidden">
        <div className="mb-3 flex items-center gap-2 px-1">
          <BrandLogo size="sm" />
        </div>
        <nav
          aria-label="Primary navigation"
          className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {navItems.map((item) => (
            <NavigationLink compact item={item} key={item.to} />
          ))}
        </nav>
        <button
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-stone-300 sm:w-auto"
          onClick={handleLogout}
          type="button"
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>
    </>
  );
}

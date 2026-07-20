import { useEffect, useMemo, useState } from 'react';
import { Lock, Mail, UserCircle2 } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

export default function AuthForm({ loading, onSubmit, onModeChange, mode = 'login', error, success }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setForm((current) => ({ ...current, name: '', password: '' }));
  }, [mode]);

  const heading = useMemo(() => (mode === 'login' ? 'Welcome back' : 'Create your account'), [mode]);
  const subheading = useMemo(
    () =>
      mode === 'login'
        ? 'Sign in to continue using your interview prep workspace.'
        : 'Register to sync your workspace with the live backend.',
    [mode],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <Card className="mx-auto w-full max-w-xl border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-300">
          <UserCircle2 className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-300">Authentication</p>
          <h2 className="text-2xl font-black text-white">{heading}</h2>
        </div>
      </div>

      <p className="mb-8 text-sm leading-6 text-stone-400">{subheading}</p>

      {error ? (
        <div className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {success}
        </div>
      ) : null}

      {/* <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === 'register' ? (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-stone-300">Full name</span>
            <div className="flex items-center rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3">
              <UserCircle2 className="mr-3 h-4 w-4 text-stone-500" />
              <input
                className="w-full bg-transparent text-sm text-white outline-none"
                name="name"
                onChange={handleChange}
                placeholder="Asha Sharma"
                required={mode === 'register'}
                type="text"
                value={form.name}
              />
            </div>
          </label>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-stone-300">Email</span>
          <div className="flex items-center rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3">
            <Mail className="mr-3 h-4 w-4 text-stone-500" />
            <input
              className="w-full bg-transparent text-sm text-white outline-none"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              required
              type="email"
              value={form.email}
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-stone-300">Password</span>
          <div className="flex items-center rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3">
            <Lock className="mr-3 h-4 w-4 text-stone-500" />
            <input
              className="w-full bg-transparent text-sm text-white outline-none"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              required
              type={showPassword ? 'text' : 'password'}
              value={form.password}
            />
            <button
              className="ml-2 text-xs font-semibold text-teal-300"
              onClick={() => setShowPassword((current) => !current)}
              type="button"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>

        <Button className="w-full" isLoading={loading} type="submit" variant="teal">
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </Button>
      </form> */}

<form className="space-y-4" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-stone-300">Full name</span>
            <div className="flex items-center rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 transition-colors focus-within:border-teal-400/50">
              <UserCircle2 className="mr-3 h-4 w-4 text-stone-500" />
              <input
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-stone-500"
                name="name"
                onChange={handleChange}
                placeholder="John Doe"
                required
                type="text"
                value={form.name}
              />
            </div>
          </label>
        )}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-stone-300">Email</span>
          <div className="flex items-center rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 transition-colors focus-within:border-teal-400/50">
            <Mail className="mr-3 h-4 w-4 text-stone-500" />
            <input
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-stone-500"
              name="email"
              onChange={handleChange}
              placeholder="john@example.com"
              required
              type="email"
              value={form.email}
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-stone-300">Password</span>
          <div className="flex items-center rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 transition-colors focus-within:border-teal-400/50">
            <Lock className="mr-3 h-4 w-4 text-stone-500" />
            <input
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-stone-500"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              required
              type={showPassword ? 'text' : 'password'}
              value={form.password}
            />
            <button
              className="ml-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>

        <Button className="w-full" isLoading={loading} type="submit" variant="teal">
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </Button>
      </form>
      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-stone-400">
        <span>
          {mode === 'login' ? "Don't have an account?" : 'Already registered?'}
        </span>
        <button className="font-semibold text-teal-300" onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')} type="button">
          {mode === 'login' ? 'Create one' : 'Sign in instead'}
        </button>
      </div>
    </Card>
  );
}

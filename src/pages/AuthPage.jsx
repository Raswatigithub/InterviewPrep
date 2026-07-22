// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthForm from '../components/AuthForm';
// import { usePrep } from '../context/usePrep';
// import { getCurrentUser, loginUser, registerUser } from '../services/authService';

// export default function AuthPage() {
//   const navigate = useNavigate();
//   const { notify } = usePrep();
//   const [mode, setMode] = useState('login');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     const syncUser = async () => {
//       try {
//         const currentUser = await getCurrentUser();
//         if (currentUser) {
//           navigate('/study-focus', { replace: true });
//         }
//       } catch {
//         // Stay on the auth page when no valid session exists.
//       }
//     };

//     syncUser();
//   }, [navigate]);

//   const handleSubmit = async (values) => {
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       const result =
//         mode === 'register'
//           ? await registerUser(values)
//           : await loginUser(values);

//       setSuccess(result.message || 'Authentication successful.');
//       notify(result.message || 'Authentication successful.', 'success');
//       navigate('/study-focus', { replace: true });
//     } catch (err) {
//       const message = err?.message || 'Authentication failed. Please try again.';
//       setError(message);
//       notify(message, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[color:var(--page-bg-dark)] px-4 py-10 text-stone-200">
//       <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
//         <section className="max-w-xl">
//           <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-300">Live backend auth</p>
//           <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
//             Connect your prep workspace to the Render-powered backend.
//           </h1>
//           <p className="mt-5 text-lg leading-8 text-stone-400">
//             Register or sign in with your email and password. The app stores the JWT locally and uses it for the authenticated request flow.
//           </p>
//           <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-stone-400">
//             <p className="font-semibold text-white">Backend endpoints</p>
//             <ul className="mt-3 space-y-2">
//               <li>• POST /api/auth/register</li>
//               <li>• POST /api/auth/login</li>
//               <li>• POST /api/auth/logout</li>
//               <li>• GET /api/auth/me</li>
//             </ul>
//           </div>
//         </section>

//         <AuthForm
//           error={error}
//           loading={loading}
//           mode={mode}
//           onModeChange={setMode}
//           onSubmit={handleSubmit}
//           success={success}
//         />
//       </div>
//     </main>
//   );
// }


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { usePrep } from '../context/usePrep';
import { getCurrentUser, loginUser, registerUser } from '../services/authService';

export default function AuthPage() {
  const navigate = useNavigate();
  const { notify } = usePrep();
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const syncUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          navigate('/study-focus', { replace: true });
        }
      } catch {
        // Stay on the auth page when no valid session exists.
      }
    };

    syncUser();
  }, [navigate]);

  const handleSubmit = async (values) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result =
        mode === 'register'
          ? await registerUser(values)
          : await loginUser(values);

      setSuccess(result.message || 'Authentication successful.');
      notify(result.message || 'Authentication successful.', 'success');
      navigate('/study-focus', { replace: true });
    } catch (err) {
      const message = err?.message || 'Authentication failed. Please try again.';
      setError(message);
      notify(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[color:var(--page-bg-dark)] px-3 py-8 text-stone-200 sm:px-4 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        {/* Left Column – Brand, tagline, key benefits */}
        <section className="w-full max-w-xl">
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-teal-300">
            <span className="text-lg">🎯</span> InterviewPrep
          </div>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            Prepare for your next tech interview with confidence.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-stone-400">
            Structured practice, realistic mock interviews, and progress tracking — all in one place.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-stone-300">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-teal-400">✓</span> Curated coding challenges with feedback
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-teal-400">✓</span> AI‑powered mock interviews
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-teal-400">✓</span> Adaptive study plans & progress dashboards
            </li>
          </ul>
        </section>

        {/* Right Column – Auth Form */}
        <div className="w-full max-w-xl lg:max-w-sm">
          <AuthForm
            error={error}
            loading={loading}
            mode={mode}
            onModeChange={setMode}
            onSubmit={handleSubmit}
            success={success}
          />
        </div>
      </div>
    </main>
  );
}

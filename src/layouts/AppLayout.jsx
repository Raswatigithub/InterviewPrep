import { Outlet } from 'react-router-dom';
// import Header from '../components/Header';
import Navigation from '../components/Navigation';
// import SplineShowcase from '../components/SplineShowcase';
import Toast from '../components/ui/Toast';
import { usePrep } from '../context/usePrep';

export default function AppLayout() {
  // const { darkMode, logisticsData, readyCount, setDarkMode, setToast, toast } = usePrep();

   const { setToast, toast } = usePrep();

  return (
    <>
      <Navigation />
      <div className="min-w-0 lg:pl-72" id="top">
        {/* <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((value) => !value)}
          readyCount={readyCount}
          totalCount={logisticsData.length}
        /> */}
        {/* <SplineShowcase /> */}
        <main className="mx-auto mt-5 w-full max-w-6xl px-3 pb-10 sm:mt-8 sm:px-4 sm:pb-12 lg:px-6">
          <Outlet />
        </main>
      </div>

      <Toast message={toast?.message} onDismiss={() => setToast(null)} type={toast?.type} />
    </>
  );
}

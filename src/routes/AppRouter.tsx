import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import AppLayout from '../components/layout/AppLayout';
import LoginPage from '../modules/auth/LoginPage';
import NotFound from '../pages/NotFound';

const DashboardPage = lazy(() => import('../modules/dashboard/DashboardPage'));
const AnalyticsPage = lazy(() => import('../modules/analytics/AnalyticsPage'));
const PatientsPage  = lazy(() => import('../modules/patients/PatientsPage'));

const Loader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

const SessionLoader = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    <p className="text-slate-400 text-sm">Loading session...</p>
  </div>
);

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(s => s.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(s => s.auth);
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const AppRouter: React.FC = () => {
  const { sessionChecked } = useAppSelector(s => s.auth);

  if (!sessionChecked) return <SessionLoader />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
          <Route index element={<Suspense fallback={<Loader />}><DashboardPage /></Suspense>} />
          <Route path="analytics" element={<Suspense fallback={<Loader />}><AnalyticsPage /></Suspense>} />
          <Route path="patients" element={<Suspense fallback={<Loader />}><PatientsPage /></Suspense>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
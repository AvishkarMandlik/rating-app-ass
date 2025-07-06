import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ allowed }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (allowed && !allowed.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}


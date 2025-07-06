import { useAuth } from '../context/AuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import OwnerDashboard from './dashboards/OwnerDashboard';
import UserDashboard from './dashboards/UserDashboard';

export default function DashboardPage() {
  const { user } = useAuth();
  if (user.role === 'admin') return <AdminDashboard />;
  if (user.role === 'storeOwner') return <OwnerDashboard />;
  return <UserDashboard />;
}

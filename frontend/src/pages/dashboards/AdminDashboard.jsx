import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users:0, stores:0, ratings:0 });
  useEffect(() => {
    api.get('/admin/dashboard').then(({data})=>setStats(data));
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
      <div className="grid gap-6 sm:grid-cols-3 text-center">
        <Stat label="Users"   value={stats.users}  />
        <Stat label="Stores"  value={stats.stores} />
        <Stat label="Ratings" value={stats.ratings} />
      </div>
    </div>
  );
}
function Stat({ label, value }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}
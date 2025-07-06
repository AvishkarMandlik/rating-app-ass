import { useEffect, useState, useCallback } from 'react';
import StoreCard from '../components/StoreCard';
import api from '../api/axios';

export default function StoreListPage() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const fetchStores = useCallback(async () => {
    const { data } = await api.get('/stores', { params: { name: search } });
    setStores(data);
  }, [search]);

  useEffect(() => { fetchStores(); }, [fetchStores]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Stores</h2>
      <input type="text" placeholder="Search by name…" value={search} onChange={e=>setSearch(e.target.value)} className="border p-2 mb-6 w-full sm:w-96 rounded" />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {stores.map(s => (
          <StoreCard key={s.id} store={s} refresh={fetchStores} />
        ))}
      </div>
    </div>
  );
}

import Stars from './Stars';
import api from '../api/axios';
import { useState } from 'react';

export default function StoreCard({ store, refresh }) {
  const [submitting, setSubmitting] = useState(false);
  const [myRating, setMyRating] = useState(store.myRating || 0);
  const handleRate = async (rating) => {
    setSubmitting(true);
    try {
      await api.post('/ratings', { store_id: store.id, rating });
      setMyRating(rating);
      refresh();
    } catch (err) {
      alert(err.response?.data?.error || 'Could not rate');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between w-full sm:w-72">
      <div>
        <h3 className="text-lg font-semibold mb-1">{store.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{store.address}</p>
        <p className="text-sm">Avg Rating: {Number(store.avgRating).toFixed(1)}</p>
      </div>
      <Stars value={myRating} onChange={handleRate} className="mt-3" />
      {submitting && <p className="text-xs text-gray-500 mt-1">Submitting…</p>}
    </div>
  );
}

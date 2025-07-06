import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function OwnerDashboard() {
  const [info, setInfo] = useState(null);
  useEffect(()=>{
    api.get('/stores/owner').then(({data})=>setInfo(data));
  },[]);
  if (!info) return <p className="p-6">Loading…</p>;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Welcome, Store Owner</h2>
      <h3 className="text-xl font-medium mb-2">{info.store.name}</h3>
      <p className="mb-4">Average Rating: {Number(info.avgRating).toFixed(1)}</p>
      <h4 className="text-lg font-semibold mb-2">Recent Raters</h4>
      <ul className="space-y-2">
        {info.raters.map(u=> (
          <li key={u.id} className="bg-white p-3 rounded shadow flex justify-between">
            <span>{u.name}</span>
            <span>{u.rating}★</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
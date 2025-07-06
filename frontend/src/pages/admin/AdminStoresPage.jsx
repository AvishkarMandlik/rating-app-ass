import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminStoresPage() {
  const [stores,setStores] = useState([]);
  const [filter,setFilter] = useState({ name:"", address:"" });
  const fetch = async()=>{
    const {data} = await api.get("/stores", { params: filter });
    setStores(data);
  };
  useEffect(()=>{ fetch(); }, [filter]);
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Stores</h2>
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <input placeholder="Filter by name" value={filter.name} onChange={e=>setFilter({...filter,name:e.target.value})} className="border p-2 rounded" />
        <input placeholder="Filter by address" value={filter.address} onChange={e=>setFilter({...filter,address:e.target.value})} className="border p-2 rounded" />
      </div>
      <table className="w-full bg-white text-sm shadow rounded">
        <thead className="bg-gray-100"><tr>{["Name","Email","Address","Average"].map(h=><th key={h} className="p-2 text-left">{h}</th>)}</tr></thead>
        <tbody>
          {stores.map(s=>(
            <tr key={s.id} className="border-t"><td className="p-2">{s.name}</td><td>{s.email}</td><td>{s.address}</td><td>{Number(s.avgRating).toFixed(1)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

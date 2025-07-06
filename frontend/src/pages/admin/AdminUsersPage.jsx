import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", role: "" });
  const fetchUsers = async () => {
    const { data } = await api.get("/admin/users", { params: filters });
    setUsers(data);
  };
  useEffect(()=>{ fetchUsers(); }, [filters]);
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <div className="grid gap-3 mb-4 sm:grid-cols-3">
        {Object.keys(filters).map(k=> (
          <input key={k} value={filters[k]} placeholder={`Filter by ${k}`} onChange={e=>setFilters({...filters,[k]:e.target.value})} className="border p-2 rounded" />
        ))}
      </div>
      <table className="w-full text-sm bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>{["Name","Email","Address","Role"].map(h=><th key={h} className="p-2 text-left">{h}</th>)}</tr>
        </thead>
        <tbody>
          {users.map(u=> (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.name}</td><td>{u.email}</td><td>{u.address}</td><td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function CreateStorePage() {
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({ name:"", email:"", address:"", owner_id:"" });
  const [msg,setMsg] = useState("");
  useEffect(()=>{
    api.get("/admin/users", { params:{ role:"storeOwner" } }).then(({data})=>setOwners(data));
  },[]);
  const submit = async e => {
    e.preventDefault();
    try {
      await api.post("/admin/stores", form);
      setMsg("Store created ✔️");
      setForm({ name:"", email:"", address:"", owner_id:"" });
    } catch(err){ setMsg(err.response?.data?.error||"Error"); }
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create Store</h2>
      {msg && <p className="text-sm text-blue-600 mb-2">{msg}</p>}
      <form onSubmit={submit} className="space-y-3">
        { ["name","email","address"].map(k=>(
          <input key={k} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={k} className="border p-2 rounded w-full" required />)) }
        <select value={form.owner_id} onChange={e=>setForm({...form,owner_id:e.target.value})} className="border p-2 rounded w-full" required>
          <option value="">Select owner</option>
          {owners.map(o=> <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}

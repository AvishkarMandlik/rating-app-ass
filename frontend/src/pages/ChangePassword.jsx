import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function ChangePassword() {
  const { user } = useAuth();
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/change-password", { newPassword: pwd });
      setMsg("Password updated ✔️");
      setPwd("");
    } catch (err) {
      setMsg(err.response?.data?.error || "Error");
    }
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      {msg && <p className="text-sm mb-3 text-blue-600">{msg}</p>}
      <form onSubmit={submit} className="space-y-4">
        <input type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)} placeholder="New Password" className="border p-2 rounded w-full" required />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}

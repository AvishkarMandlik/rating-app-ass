import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { signup, loading } = useAuth();
  const [form, setForm] = useState({ name:'', email:'', address:'', password:'' });
  const [error,setError] = useState('');
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
    } catch (err) { setError(err); }
  };
  return (
    <div className="flex justify-center mt-12">
      <form onSubmit={submit} className="bg-white p-8 shadow rounded w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <input name="name" value={form.name} onChange={handle} placeholder="Name (20‑60 chars)" className="border w-full p-2 mb-3 rounded" minLength={20} maxLength={60} required />
        <input name="email" type="email" value={form.email} onChange={handle} placeholder="Email" className="border w-full p-2 mb-3 rounded" required />
        <input name="address" value={form.address} onChange={handle} placeholder="Address (≤400 chars)" className="border w-full p-2 mb-3 rounded" maxLength={400} />
        <input name="password" type="password" value={form.password} onChange={handle} placeholder="Password (8‑16, 1 UC, 1 symbol)" className="border w-full p-2 mb-4 rounded" minLength={8} maxLength={16} required />
        <button disabled={loading} className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">
          {loading ? 'Submitting…' : 'Register'}
        </button>
        <p className="text-sm mt-3 text-center">
          Have an account? <Link className="text-blue-600 hover:underline" to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

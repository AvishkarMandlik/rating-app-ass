import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={submit} className="bg-white shadow-md p-8 rounded w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border w-full p-2 mb-3 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border w-full p-2 mb-4 rounded" required />
        <button disabled={loading} className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          {loading ? 'Loading…' : 'Login'}
        </button>
        <p className="text-sm mt-3 text-center">
          New user? <Link className="text-blue-600 hover:underline" to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
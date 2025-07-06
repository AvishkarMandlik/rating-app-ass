import { Link } from 'react-router-dom';

export default function UserDashboard() {
  return (
    <div className="flex flex-col items-center mt-20 p-4 text-center">
      <h2 className="text-2xl font-semibold mb-4">Welcome to StoreRating!</h2>
      <p className="mb-6">Browse stores and share your experience.</p>
      <Link to="/stores" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">View Stores</Link>
    </div>
  );
}

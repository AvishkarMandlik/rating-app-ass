import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStore,
  faSignOut,
  faPlus,
  faUserCog,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-40">
      <button
        onClick={() => navigate('/dashboard')}
        className="text-2xl font-semibold flex items-center gap-2"
      >
        <FontAwesomeIcon icon={faStore} />
        StoreRating
      </button>

      {user && (
        <nav className="flex items-center gap-6 text-sm">
          {/* common links */}
          <Link to="/stores" className="hover:underline">
            Stores
          </Link>
          <Link to="/change-password" className="hover:underline">
            Change&nbsp;Password
          </Link>

          {/* admin‑only */}
          {user.role === 'admin' && (
            <>
              <Link
                to="/admin/create-store"
                className="flex items-center gap-1 hover:underline"
              >
                <FontAwesomeIcon icon={faPlus} />
                New&nbsp;Store
              </Link>
              <Link
                to="/admin/stores"
                className="flex items-center gap-1 hover:underline"
              >
                <FontAwesomeIcon icon={faList} />
                All&nbsp;Stores
              </Link>
              <Link
                to="/admin/users"
                className="flex items-center gap-1 hover:underline"
              >
                <FontAwesomeIcon icon={faUserCog} />
                Users
              </Link>
            </>
          )}

          <button
            onClick={logout}
            className="hover:underline flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faSignOut} />
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}

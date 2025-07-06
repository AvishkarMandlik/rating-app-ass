import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import StoreListPage from './pages/StoreListPage';
import RequireAuth from './routes/RequireAuth';
import ChangePassword from "./pages/ChangePassword";
import CreateStorePage from "./pages/admin/CreateStorePage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminStoresPage from "./pages/admin/AdminStoresPage";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<RequireAuth />}> {/* any logged in */}
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route element={<RequireAuth allowed={["user","admin","storeOwner"]} />}>
            <Route path="/stores" element={<StoreListPage />} />
          </Route>
          <Route path="/admin/users" element={<AdminUsersPage/>} />
<Route path="/admin/stores" element={<AdminStoresPage/>} />
<Route path="/admin/create-store" element={<CreateStorePage/>} />
<Route path="/change-password" element={<RequireAuth><ChangePassword/></RequireAuth>} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}
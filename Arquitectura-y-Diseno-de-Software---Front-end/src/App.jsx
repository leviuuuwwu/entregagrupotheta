import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ProfilePage } from './components/ProfilePage';
import { Sidebar } from './components/ui/Sidebar';
import { Header } from './components/ui/Header';
import { EventCatalog } from './components/EventCatalog';
import { EventForm } from './components/EventForm';
import { CategoryManager } from './components/CategoryManager';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { AdminUsersPage } from './components/AdminUsersPage';
import CompanyTable from "./components/companies/CompanyTable";
import CheckInForm from "./components/attendance/CheckInForm";
import { AuthLayout } from "./components/ui/AuthLayout";

// Layout del dashboard: Sidebar fijo + Header + contenido dinámico
function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet /> {}
        </main>
      </div>
    </div>
  );
}


function AuthLayoutWrapper() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Rutas de autenticación — con AuthLayout */}
          <Route element={<AuthLayoutWrapper />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Rutas del sistema — con Sidebar + Header */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<EventCatalog />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/empresas" element={<CompanyTable />} />
            <Route path="/asistentes" element={<CheckInForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
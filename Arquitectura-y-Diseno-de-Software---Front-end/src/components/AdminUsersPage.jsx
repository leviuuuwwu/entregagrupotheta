import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ROLES = ['admin', 'organizer', 'attendee'];
const ROLE_LABELS = { admin: 'Admin', organizer: 'Organizador', attendee: 'Asistente' };
const ROLE_ID = { admin: 1, organizer: 2, attendee: 3 };
const STATUS_BADGE = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  inactive: 'bg-gray-100 text-gray-600',
};

export function AdminUsersPage() {
  const { user: currentUser, token } = useAuth();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notification, setNotification] = useState(null);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/usuarios', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // Mapear campos del backend al formato del componente
      const mapped = data.map((u) => ({
        id: u.user_id,
        name: u.user_name,
        email: u.user_email,
        role: u.role?.role_name || 'attendee',
        status: 'active',
      }));
      setUsers(mapped);
    } catch {
      showNotification('Error al cargar usuarios', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`/api/usuarios/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Error al eliminar');
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      showNotification('Usuario eliminado exitosamente');
    } catch {
      showNotification('Error al eliminar usuario', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter ? u.role === roleFilter : true;
    return matchSearch && matchRole;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === 'active').length,
    organizers: users.filter((u) => u.role === 'organizer').length,
    newToday: 0,
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6]">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 transition-all ${
          notification.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
        }`}>
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            {notification.type === 'error' ? (
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            )}
          </svg>
          {notification.message}
        </div>
      )}

      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#007BFF] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
            i
          </div>
          <h1 className="text-lg font-bold text-gray-900">iMeet! Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700 hidden sm:block">{currentUser?.name}</span>
          <div className="w-8 h-8 bg-[#007BFF] rounded-full flex items-center justify-center text-white font-bold text-sm">
            {currentUser?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
            <p className="text-sm text-[#6C757D] mt-0.5">Administra organizadores y asistentes de eventos</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#007BFF] hover:bg-[#0056b3] text-white text-sm font-semibold rounded-lg shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Crear usuario
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Usuarios', value: stats.total, color: 'text-gray-900' },
            { label: 'Activos', value: stats.active, color: 'text-green-600' },
            { label: 'Organizadores', value: stats.organizers, color: 'text-gray-900' },
            { label: 'Nuevos hoy', value: stats.newToday, color: 'text-[#007BFF]' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-semibold text-[#6C757D] uppercase tracking-wide">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6C757D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por nombre o correo..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all"
            >
              <option value="">Todos los roles</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>{ROLE_LABELS[r]}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-[#007BFF] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-[#6C757D]">Cargando usuarios...</p>
                </div>
              </div>
            ) : paginated.length === 0 ? (
              <div className="text-center py-12 text-[#6C757D]">
                <svg className="h-12 w-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="font-medium">No se encontraron usuarios</p>
                <p className="text-sm mt-1">Intenta ajustar los filtros de búsqueda</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    {['Nombre', 'Correo', 'Rol', 'Acciones'].map((h, i) => (
                      <th key={h} className={`px-6 py-3 text-xs font-semibold text-[#6C757D] uppercase tracking-wider ${i === 3 ? 'text-right' : 'text-left'}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginated.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#007BFF] flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6C757D]">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ROLE_LABELS[u.role] || u.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button onClick={() => setDeleteTarget(u)} className="text-red-500 hover:text-red-700 font-medium transition-colors">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {!isLoading && filtered.length > ITEMS_PER_PAGE && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <p className="text-sm text-[#6C757D]">
                Mostrando <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span>–
                <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> de <span className="font-medium">{filtered.length}</span> usuarios
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-gray-200 text-[#6C757D] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === currentPage ? 'bg-[#007BFF] text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                    {page}
                  </button>
                ))}
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-gray-200 text-[#6C757D] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Eliminar usuario</h3>
            <p className="text-sm text-[#6C757D] text-center mb-6">
              ¿Estás seguro de que deseas eliminar a <span className="font-semibold text-gray-900">{deleteTarget.name}</span>? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={() => handleDelete(deleteTarget.id)}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-lg transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Crear nuevo usuario</h3>
            <p className="text-sm text-[#6C757D] mb-5">Completa los datos del nuevo usuario</p>
            <CreateUserForm
              token={token}
              onSuccess={(newUser) => {
                fetchUsers();
                setShowCreateModal(false);
                showNotification('Usuario creado exitosamente');
              }}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CreateUserForm({ token, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'attendee', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const ROLES = ['admin', 'organizer', 'attendee'];
  const ROLE_LABELS = { admin: 'Admin', organizer: 'Organizador', attendee: 'Asistente' };
  const ROLE_ID = { admin: 1, organizer: 2, attendee: 3 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: formData.name,
          user_email: formData.email,
          user_password: formData.password,
          role: { role_id: ROLE_ID[formData.role] },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al crear usuario');
      onSuccess(data);
    } catch (err) {
      setError(err.message || 'Error al crear usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">{error}</p>}
      {[
        { name: 'name', label: 'Nombre completo', type: 'text', placeholder: 'Juan Pérez' },
        { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'juan@empresa.com' },
        { name: 'password', label: 'Contraseña temporal', type: 'password', placeholder: 'Mínimo 8 caracteres' },
      ].map((f) => (
        <div key={f.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
          <input name={f.name} type={f.type} required value={formData[f.name]} onChange={handleChange}
            placeholder={f.placeholder}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all" />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Rol</label>
        <select name="role" value={formData.role} onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all">
          {ROLES.map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel}
          className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-50 transition-colors">
          Cancelar
        </button>
        <button type="submit" disabled={isLoading}
          className="flex-1 py-2.5 bg-[#007BFF] hover:bg-[#0056b3] disabled:opacity-70 text-white font-semibold text-sm rounded-lg transition-all">
          {isLoading ? 'Creando...' : 'Crear usuario'}
        </button>
      </div>
    </form>
  );
}
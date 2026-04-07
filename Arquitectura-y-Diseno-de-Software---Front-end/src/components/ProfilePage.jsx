import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProfilePage() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const response = await fetch(`/api/usuarios/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_name: formData.name,
          user_email: formData.email,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al actualizar');

      setSuccessMsg('Perfil actualizado exitosamente.');
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Error inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  const roleLabels = {
    admin: 'Administrador',
    organizer: 'Organizador',
    attendee: 'Asistente',
  };

  const roleBadgeColors = {
    admin: 'bg-purple-100 text-purple-800',
    organizer: 'bg-blue-100 text-blue-800',
    attendee: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 pb-8 pt-8">
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-[#007BFF] flex items-center justify-center shadow-md">
                <span className="text-3xl font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-900">{user?.name || 'Usuario'}</h1>
              <p className="text-sm text-[#6C757D] mt-0.5">{user?.email}</p>
              <span
                className={`inline-flex mt-2 px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                  roleBadgeColors[user?.role] || 'bg-gray-100 text-gray-700'
                }`}
              >
                {roleLabels[user?.role] || user?.role || 'Sin rol'}
              </span>
            </div>

            {successMsg && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {successMsg}
              </div>
            )}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <hr className="border-gray-100 mb-6" />

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all"
                  />
                </div>
                <div className="flex gap-3 mt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-[#007BFF] hover:bg-[#0056b3] disabled:opacity-70 text-white font-semibold text-sm rounded-lg transition-all active:scale-[0.98]"
                  >
                    {isLoading ? 'Guardando...' : 'Guardar cambios'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); setError(''); }}
                    className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-lg transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#007BFF] hover:bg-[#0056b3] text-white font-semibold text-sm rounded-lg transition-all active:scale-[0.98] shadow-md shadow-blue-500/20"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Editar perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#6C757D] hover:bg-gray-600 text-white font-semibold text-sm rounded-lg transition-all active:scale-[0.98]"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          © 2024 iMeet! Corporate Event Management
        </p>
      </div>
    </div>
  );
}
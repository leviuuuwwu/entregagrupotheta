import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from './ui/AuthLayout';

/**
 * RegisterPage: Pantalla de registro de nuevos usuarios.
 * - Consume el endpoint POST /api/auth/register
 * - Valida contraseñas coincidan antes de enviar
 */
export function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo al escribir
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (apiError) setApiError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Correo inválido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setIsLoading(true);
  setApiError('');

  try {
    const response = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_name: formData.name,
        user_email: formData.email,
        user_password: formData.password,
        role: { role_id: 3 }, // 3 = attendee por defecto
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al crear la cuenta');

    navigate('/login', { state: { message: 'Cuenta creada. Inicia sesión.' } });
  } catch (err) {
    setApiError(err.message || 'Error inesperado.');
  } finally {
    setIsLoading(false);
  }
};

  const inputClass = (field) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10'
        : 'border-gray-300 focus:border-[#007BFF] focus:ring-[#007BFF]/10'
    }`;

  return (
    <AuthLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Crear cuenta</h2>
        <p className="text-sm text-[#6C757D] mt-1">Únete al sistema de gestión de eventos</p>
      </div>

      {apiError && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm flex items-start gap-2">
          <svg className="h-4 w-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre completo */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Juan Pérez"
            className={inputClass('name')}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="juan@empresa.com"
            className={inputClass('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 8 caracteres"
            className={inputClass('password')}
          />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className={inputClass('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#007BFF] hover:bg-[#0056b3] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-all duration-200 active:scale-[0.98] shadow-md shadow-blue-500/20 mt-2"
        >
          {isLoading && (
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>

      <p className="text-center text-sm text-[#6C757D] mt-5">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="font-semibold text-[#007BFF] hover:text-[#0056b3] transition-colors">
          Iniciar sesión
        </Link>
      </p>
    </AuthLayout>
  );
}

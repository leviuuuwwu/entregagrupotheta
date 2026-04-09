import React, { useState } from 'react';

export function CompanyForm({ token, onSuccess, onCancel }) {
  const [nuevaEmpresa, setNuevaEmpresa] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nuevaEmpresa.trim()) return;
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3000/empresas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ company_name: nuevaEmpresa })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
         throw new Error(data.message || 'Error al crear la empresa');
      }
      
      onSuccess(data);
    } catch (error) {
      console.error("Error creando empresa:", error);
      setError(error.message || 'Ocurrió un error al crear la empresa.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleCrear} className="space-y-4">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">{error}</p>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre de la Empresa</label>
        <input
          type="text"
          required
          placeholder="Ej. Acme Corp..."
          value={nuevaEmpresa}
          onChange={(e) => setNuevaEmpresa(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={isLoading}
          className="flex-1 py-2.5 bg-[#007BFF] hover:bg-[#0056b3] disabled:opacity-70 text-white font-semibold text-sm rounded-lg transition-all"
        >
          {isLoading ? 'Creando...' : 'Crear Empresa'}
        </button>
      </div>
    </form>
  );
}
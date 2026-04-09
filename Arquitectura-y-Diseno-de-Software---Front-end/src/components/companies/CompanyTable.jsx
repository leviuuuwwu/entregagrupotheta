import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CompanyForm } from './CompanyForm';

export default function CompanyTable() {
  const [empresas, setEmpresas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { token } = useAuth();

  const fetchEmpresas = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/empresas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setEmpresas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar empresas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Directorio de Empresas</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#007BFF] hover:bg-[#0056b3] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          Nueva Empresa
        </button>
      </div>

      {/* Tabla de Empresas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Nombre de la Empresa</th>
              <th className="p-4 font-semibold">Fecha de Registro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {empresas.length > 0 ? (
              empresas.map((emp) => (
                <tr key={emp.company_id || emp.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-sm text-gray-500">#{emp.company_id || emp.id}</td>
                  <td className="p-4 font-medium text-gray-800">{emp.company_name || emp.nombre}</td>
                  <td className="p-4 text-sm text-gray-500">Reciente</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-500">
                  No hay empresas registradas aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Registrar Nueva Empresa</h3>
            <p className="text-sm text-[#6C757D] mb-5">Ingresa los datos de la nueva empresa anfitriona</p>
            
            <CompanyForm
              token={token}
              onSuccess={() => {
                fetchEmpresas();
                setShowCreateModal(false);
              }}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
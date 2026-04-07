import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
    const navigate = useNavigate();
    // 🔑 Verificamos si tiene permisos para crear eventos
    const { isOrganizer } = useAuth();

    return (
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20">
            <div className="flex-1 max-w-md">
                <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                    <input className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-500" placeholder="Buscar eventos, sedes o empresas..." type="text" />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2.5 size-2 bg-red-500 border-2 border-white rounded-full"></span>
                </button>
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                
                {/* 👇 Si es Organizador o Admin, renderiza el botón. Si no, no dibuja nada */}
                {isOrganizer() && (
                    <button 
                        onClick={() => navigate('/eventos/nuevo')} // Asegúrate de que esta ruta exista en su App.jsx
                        className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">add_circle</span>
                        Nuevo Evento
                    </button>
                )}
            </div>
        </header>
    );
};
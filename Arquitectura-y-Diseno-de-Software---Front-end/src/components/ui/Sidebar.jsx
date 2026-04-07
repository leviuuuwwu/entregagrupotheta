import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
    // 🔑 Sacamos al usuario logueado
    const { user } = useAuth();

    // Podemos ocultar opciones del menú según el rol (ej. solo admins ven usuarios)
    const items = [
        { nombre: 'Panel de Control', icono: 'dashboard', link: "/dashboard" },
        { nombre: 'Eventos', icono: 'calendar_today', link: "/dashboard" },
        { nombre: 'Empresas', icono: 'corporate_fare', link: "/empresas" },
        { nombre: 'Asistentes', icono: 'groups', link: "/asistentes" },
        // Si no es admin, no ve la opción de Usuarios
        ...(user?.role === 'admin' ? [{ nombre: 'Usuarios', icono: 'manage_accounts', link: "/admin/users" }] : []),
        { nombre: 'Mi Perfil', icono: 'person', link: "/profile" },
    ];

    // Calculamos iniciales y rol para mostrar
    const iniciales = user?.name ? user.name.substring(0, 2).toUpperCase() : 'U';
    const rolMostrar = user?.role === 'admin' ? 'Administrador' : user?.role === 'organizer' ? 'Organizador' : 'Asistente';

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <div className="size-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
                </div>
                <div>
                    <h1 className="text-white font-black text-xl tracking-tighter italic">iMeet!</h1>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none">Enterprise</p>
                </div>
            </div>

            <nav className="flex-1 px-4 mt-6 space-y-1">
                {items.map((item) => (
                    <Link
                        key={item.nombre}
                        to={item.link}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all"
                    >
                        <span className="material-symbols-outlined">{item.icono}</span>
                        <span className="text-sm">{item.nombre}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 p-2">
                    <div className="size-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xs font-bold text-white">
                        {iniciales}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">{user?.name || 'Invitado'}</span>
                        <span className="text-[10px] text-slate-500 font-medium italic">{rolMostrar}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};
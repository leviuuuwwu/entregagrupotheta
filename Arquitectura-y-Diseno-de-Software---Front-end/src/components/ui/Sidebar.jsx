import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
    const { user } = useAuth();
    const location = useLocation();

    // Normaliza variantes de rol que puedan venir desde backend/token.
    const roleKey = (user?.role || 'attendee').toString().toLowerCase();
    const normalizedRole = ({
        administrador: 'admin',
        admin: 'admin',
        organizador: 'organizer',
        organizer: 'organizer',
        asistente: 'attendee',
        attendee: 'attendee',
    }[roleKey] || 'attendee');

    const allMenuOptions = [
        { nombre: 'Panel de Control', icono: 'dashboard', link: "/dashboard", allowedRoles: ['admin', 'organizer', 'attendee'] },
        { nombre: 'Eventos', icono: 'calendar_today', link: "/dashboard", allowedRoles: ['admin', 'organizer', 'attendee'] },
        { nombre: 'Empresas', icono: 'corporate_fare', link: "/empresas", allowedRoles: ['admin', 'organizer'] },
        { nombre: 'Asistentes', icono: 'groups', link: "/asistentes", allowedRoles: ['admin', 'organizer'] },
        { nombre: 'Usuarios', icono: 'manage_accounts', link: "/admin/users", allowedRoles: ['admin'] },
        { nombre: 'Categorías', icono: 'category', link: "/categorias", allowedRoles: ['admin'] },
        { nombre: 'Mi Perfil', icono: 'person', link: "/profile", allowedRoles: ['admin', 'organizer', 'attendee'] },
    ];

    const items = allMenuOptions.filter(item => item.allowedRoles.includes(normalizedRole));

    const iniciales = user?.name ? user.name.substring(0, 2).toUpperCase() : 'U';
    
    const roleLabels = { admin: 'Administrador', organizer: 'Organizador', attendee: 'Asistente' };
    const rolMostrar = roleLabels[normalizedRole] || 'Asistente';

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 transition-all duration-300">
            <div className="p-6 flex items-center gap-3">
                <div className="size-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
                </div>
                <div>
                    <h1 className="text-white font-black text-xl tracking-tighter italic">iMeet!</h1>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none">Enterprise</p>
                </div>
            </div>

            <nav className="flex-1 px-4 mt-6 space-y-1 overflow-y-auto">
                {items.map((item) => {
                    const isActive = location.pathname === item.link;
                    return (
                        <Link
                            key={item.nombre}
                            to={item.link}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                                isActive ? 'bg-primary text-white shadow-md shadow-primary/20' : 'hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <span className="material-symbols-outlined">{item.icono}</span>
                            <span className="text-sm font-medium">{item.nombre}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-xl">
                    <div className="size-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {iniciales}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-bold text-white truncate">{user?.name || 'Invitado'}</span>
                        <span className="text-[10px] text-primary font-medium">{rolMostrar}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};
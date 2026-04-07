import React from 'react';
import { Button } from './ui/Button';

export const EventCard = ({ evento }) => {
    // Calculamos el porcentaje de asistencia 
    const attendanceCount = 420; // Este dato vendrá del módulo de inscripciones @jade lo modificas porfa
    const percentage = Math.min((attendanceCount / evento.max_attendanse) * 100, 100);

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
            {/* Cabecera de la tarjeta con color y fecha flotante */}
            <div className="relative h-40 bg-primary/10 overflow-hidden">
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center min-w-[50px] py-1 border border-slate-100">
                    <span className="text-[10px] font-black uppercase text-primary leading-none">OCT</span>
                    <span className="text-xl font-black leading-none mt-1 text-slate-900">12</span>
                </div>
                <div className="w-full h-full flex items-center justify-center text-primary/20">
                    <span className="material-symbols-outlined text-6xl">corporate_fare</span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors text-slate-900">
                    {evento.event_name}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {evento.description || "Sin descripción disponible para este evento corporativo."}
                </p>

                <div className="flex items-center gap-2 text-slate-500 mb-6">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                    <span className="text-xs font-medium truncate">{evento.location}</span>
                </div>

                {/* Barra de Progreso de Asistencia*/}
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-slate-400 font-bold">Asistencia</span>
                        <span className="text-primary">{attendanceCount} / {evento.max_attendanse}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-primary h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                    <button className="text-xs font-bold text-primary hover:underline">Ver Detalles</button>
                    <Button variant="primary" className="py-1.5 px-4 text-xs">Gestionar</Button>
                </div>
            </div>
        </div>
    );
};
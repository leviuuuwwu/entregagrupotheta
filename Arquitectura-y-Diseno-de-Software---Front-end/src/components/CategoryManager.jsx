import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';

export const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    const fetchCategories = async () => {
        try {
            const res = await fetch('http://localhost:3000/categorias');
            if (!res.ok) throw new Error("Error en la respuesta del servidor");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Hubo un problema al traer las categorías de iMeet!:", err);
        }
    };

    //Ejecutamos el useEffect correctamente
    useEffect(() => {
        fetchCategories();
    }, []);

    //Guardamos la nueva categoría
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        try {
            const res = await fetch('http://localhost:3000/categorias', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category_name: newCategory }),
            });

            if (res.ok) {
                setNewCategory('');
                fetchCategories(); // Recargar la lista
            }
        } catch (err) {
            console.error("Error al crear categoría:", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Gestión de Categorías</h2>
                <p className="text-slate-500 font-medium">Define los tipos de eventos disponibles en iMeet!</p>
            </header>

            {/* Formulario de Creación Rápida */}
            <form onSubmit={handleSubmit} className="flex gap-4 mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex-1">
                    <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-2 tracking-wider">Nuevo Nombre de Categoría</label>
                    <input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                        placeholder="Ej. Capacitación Técnica"
                    />
                </div>
                <div className="flex items-end">
                    <Button type="submit" className="h-[46px]">Agregar</Button>
                </div>
            </form>

            {/* Lista de Categorías*/}
            <div className="overflow-hidden border border-slate-100 rounded-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-4 text-[11px] font-black uppercase text-slate-400 tracking-widest">ID</th>
                            <th className="p-4 text-[11px] font-black uppercase text-slate-400 tracking-widest">Nombre de Categoría</th>
                            <th className="p-4 text-[11px] font-black uppercase text-slate-400 tracking-widest text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {categories.length > 0 ? categories.map((cat) => (
                            <tr key={cat.category_id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-4 text-sm font-mono text-slate-400">#{cat.category_id}</td>
                                <td className="p-4 text-sm font-bold text-slate-700">{cat.category_name}</td>
                                <td className="p-4 text-right">
                                    <button className="text-slate-300 hover:text-rose-500 transition-colors">
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="p-10 text-center text-slate-400 italic text-sm">
                                    No hay categorías registradas aún.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
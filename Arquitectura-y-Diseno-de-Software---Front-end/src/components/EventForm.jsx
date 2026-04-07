import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';

export const EventForm = () => {
    const [categories, setCategories] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        event_name: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        max_attendanse: '', // Mantenemos la "s" por el error que se nos fue en la BD
        category_id: '',
        company_id: '',
        organizer_id: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resCat, resComp, resUser] = await Promise.all([
                    fetch('http://localhost:3000/categorias'),
                    fetch('http://localhost:3000/empresas'),
                    fetch('http://localhost:3000/usuarios')
                ]);

                const [dataCat, dataComp, dataUser] = await Promise.all([
                    resCat.json(),
                    resComp.json(),
                    resUser.json()
                ]);

                setCategories(dataCat);
                setCompanies(dataComp);
                setUsers(dataUser);
            } catch (err) {
                console.error("Error cargando datos maestros:", err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Estructura del payload 
        const payload = {
            event_name: formData.event_name,
            description: formData.description,
            start_date: new Date(formData.start_date).toISOString(),
            end_date: new Date(formData.end_date).toISOString(),
            location: formData.location,
            max_attendanse: parseInt(formData.max_attendanse),
            category: { category_id: parseInt(formData.category_id) },
            organizer: { user_id: formData.organizer_id },
            company: { company_id: formData.company_id }
        };

        try {
            const res = await fetch('http://localhost:3000/eventos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert("¡iMeet! registró el evento con éxito!");
            } else {
                const error = await res.json();
                alert(`Error: ${error.message}`);
            }
        } catch (err) {
            console.error("Fallo de conexión:", err);
        }
    };

    const labelClass = "block text-[11px] font-extrabold uppercase text-slate-400 mb-2 tracking-wider";
    const inputClass = "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-300 text-sm text-slate-900";
    const sectionTitle = "text-[13px] text-primary font-bold uppercase tracking-widest mb-6 pb-2 border-b border-slate-100 flex items-center gap-2";

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
            <header className="mb-10 text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Planificador de Eventos</h2>
                <p className="text-slate-500 font-medium italic text-sm">Gestiona la logística de iMeet! de forma centralizada</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-12">
                <section>
                    <h3 className={sectionTitle}>
                        <span className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                        Información General
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className={labelClass}>Nombre Oficial del Evento</label>
                            <input name="event_name" value={formData.event_name} onChange={handleChange} className={inputClass} placeholder="Ej. Cumbre de Innovación 2026" required />
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelClass}>Descripción y Objetivos</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className={`${inputClass} h-28 resize-none`} placeholder="Propósito..." required />
                        </div>

                        <div>
                            <label className={labelClass}>Categoría del Evento</label>
                            <select name="category_id" value={formData.category_id} onChange={handleChange} className={inputClass} required>
                                <option value="">Seleccione categoría...</option>
                                {categories.map(c => (
                                    <option key={c.category_id} value={c.category_id}>{c.category_name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>Empresa Anfitriona</label>
                            <select name="company_id" value={formData.company_id} onChange={handleChange} className={inputClass} required>
                                <option value="">Seleccione empresa...</option>
                                {companies.map(c => (
                                    <option key={c.company_id} value={c.company_id}>{c.company_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className={sectionTitle}>
                        <span className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                        Logística y Ubicación
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Fecha y Hora de Inicio</label>
                            <input type="datetime-local" name="start_date" value={formData.start_date} onChange={handleChange} className={inputClass} required />
                        </div>
                        <div>
                            <label className={labelClass}>Fecha y Hora de Fin</label>
                            <input type="datetime-local" name="end_date" value={formData.end_date} onChange={handleChange} className={inputClass} required />
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelClass}>Organizador Responsable</label>
                            <select name="organizer_id" value={formData.organizer_id} onChange={handleChange} className={inputClass} required>
                                <option value="">Asignar un usuario responsable...</option>
                                {users.map(u => (
                                    <option key={u.user_id} value={u.user_id}>
                                        {/* USAMOS user_name PORQUE ASÍ ESTÁ EN LA ENTIDAD DEL BACKEND */}
                                        {u.user_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <label className={labelClass}>Sede / Ubicación</label>
                                <input name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="Ej. Auditorio ESEN" required />
                            </div>
                            <div>
                                <label className={labelClass}>Aforo Máximo</label>
                                <input type="number" name="max_attendanse" value={formData.max_attendanse} onChange={handleChange} className={inputClass} placeholder="0" required />
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="pt-8 border-t border-slate-50 flex justify-end gap-4">
                    <Button variant="secondary" type="button" onClick={() => window.location.reload()}>Descartar</Button>
                    <Button type="submit">Publicar en iMeet!</Button>
                </footer>
            </form>
        </div>
    );
};
import React from 'react';

export const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
    const styles = variant === "primary"
        ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50";

    return (
        <button type={type} onClick={onClick} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${styles}`}>
            {children}
        </button>
    );
};
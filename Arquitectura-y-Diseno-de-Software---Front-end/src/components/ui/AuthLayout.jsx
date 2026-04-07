import { Outlet } from "react-router-dom";

/**
 * AuthLayout: Layout compartido para todas las pantallas de autenticación.
 * La card blanca flota centrada sobre este fondo.
 */
export function AuthLayout({ children }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        background: '#0f172a',
      }}
    >
      {/* Card container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Brand encima de la card */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3">
            <div className="size-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black text-white tracking-tighter italic">iMeet!</h1>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest leading-none">Enterprise</p>
            </div>
          </div>
        </div>

        {/* Card blanca */}
        <div
          className="bg-white rounded-2xl shadow-2xl p-8"
          style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)' }}
        >
          {children}
        </div>

        <p className="text-center text-blue-200/60 text-xs mt-6">
          © 2026 iMeet! Enterprise
        </p>
      </div>
    </div>
  );
}

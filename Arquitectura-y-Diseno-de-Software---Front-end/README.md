# 🎨 Sistema de Gestión de Eventos Empresariales - Frontend

Este repositorio contiene el código fuente del **frontend** para el Sistema de Gestión de Eventos Empresariales, desarrollado como parte de la materia de Arquitectura y Diseño de Software de la ESEN.

## 👥 Equipo de Desarrollo (Grupo Theta)
- Kathleen Argueta - Desarrolladora Front-End
- Jade Cárcamo - Desarrolladora Front-End
- Jorge Flores - Desarrollador Back-End
- Jonathan Guerra - Desarrollador Back-End
- Leví Guerra - Coordinador con Exp. Profesional
- José Milán - Desarrollador Back-End
- Diego Orellana - Desarrollador Back-End

## 🚀 Tecnologías Utilizadas
- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Lenguaje:** JavaScript (ES6+)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Ruteo:** [React Router DOM](https://reactrouter.com/)
- **Infraestructura:** Docker, Nginx (para producción)
- **Herramientas de desarrollo:** ESLint, PostCSS, Autoprefixer

## ⚙️ Requisitos Previos
Para correr este proyecto en tu entorno local, necesitas tener instalado:
- [Node.js](https://nodejs.org/) (v18 o superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (opcional, para producción)

## 🛠️ Instalación y Ejecución

1. **Clonar el repositorio y descargar dependencias:**
	```bash
	git clone <URL_DEL_REPOSITORIO>
	cd Arquitectura-y-Diseno-de-Software---Front-end
	npm install
	```

2. **Ejecutar en modo desarrollo:**
	```bash
	npm run dev
	```
	La aplicación estará disponible en [http://localhost:5173](http://localhost:5173) por defecto.

3. **Construir para producción:**
	```bash
	npm run build
	```
	Los archivos generados estarán en la carpeta `dist/`.

4. **Desplegar con Docker (opcional):**
	```bash
	docker build -t eventos-frontend .
	docker run -p 80:80 eventos-frontend
	```

## 🌐 Proxy API
Durante el desarrollo, las peticiones a `/api` se redirigen automáticamente al backend (`http://localhost:3000`) gracias a la configuración de Vite.

## 🗂️ Estructura del Proyecto

```
src/
 ├── api/                # Lógica de conexión a la API
 ├── assets/             # Imágenes y recursos estáticos
 ├── components/         # Componentes reutilizables
 │    ├── ui/            # Componentes de interfaz (Header, Sidebar, etc.)
 │    ├── attendance/    # Componentes de asistencia
 │    └── companies/     # Componentes de empresas
 ├── context/            # Contextos de React (ej. Auth)
 ├── App.jsx             # Componente principal
 ├── main.jsx            # Punto de entrada
 └── theme.css           # Estilos globales
```


## 📦 Scripts Disponibles
- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Genera la build de producción
- `npm run preview` - Previsualiza la build
- `npm run lint` - Ejecuta ESLint

## 🔒 Dependencias Externas y Seguridad
Para funcionalidades relacionadas con el manejo de contraseñas o cifrado, se utiliza la librería `bcrypt`. Para instalarla junto con sus tipos (en caso de usar TypeScript):

```bash
npm install bcrypt
npm install -D @types/bcrypt
```

> **Nota:** Si usas solo JavaScript, la instalación de `@types/bcrypt` es opcional.

Esta librería permite el hash seguro de contraseñas y su verificación, siguiendo buenas prácticas de seguridad.

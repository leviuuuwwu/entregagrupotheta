
# 📚 Sistema de Gestión de Eventos Empresariales

Este repositorio contiene el proyecto completo desarrollado para la materia de Arquitectura y Diseño de Software de la ESEN. El sistema permite la gestión integral de eventos empresariales, incluyendo administración de usuarios, empresas, eventos, categorías y registro de asistencias.

## 🏗️ Estructura del Repositorio

```
├── Arquitectura-y-Diseno-de-Software---Front-end/   # Frontend (React + Vite)
├── eventos-empresariales-backend/                   # Backend (NestJS)
├── README.md                                        # Este archivo
```

## 🚀 Tecnologías Principales
- **Frontend:** React, Vite, Tailwind CSS, Docker, Nginx
- **Backend:** NestJS (Node.js/TypeScript), TypeORM, PostgreSQL, Docker

## 👥 Equipo de Desarrollo (Grupo Theta)
- Kathleen Argueta - Desarrolladora Front-End
- Jade Cárcamo - Desarrolladora Front-End
- Jorge Flores - Desarrollador Back-End
- Jonathan Guerra - Desarrollador Back-End
- Leví Guerra - Coordinador con Exp. Profesional
- José Milán - Desarrollador Back-End
- Diego Orellana - Desarrollador Back-End

## ⚙️ Requisitos Generales
- [Node.js](https://nodejs.org/) (v18 o superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## 🛠️ ¿Cómo levantar el sistema completo?

1. **Clonar el repositorio:**
	```bash
	git clone <URL_DEL_REPOSITORIO>
	cd entregagrupotheta
	```

2. **Levantar la base de datos (PostgreSQL) con Docker:**
	```bash
	cd eventos-empresariales-backend
	docker-compose up -d
	```

3. **Levantar el backend:**
	```bash
	npm install
	npm run start:dev
	```
	El backend estará disponible en [http://localhost:3000](http://localhost:3000)

4. **Levantar el frontend:**
	```bash
	cd ../Arquitectura-y-Diseno-de-Software---Front-end
	npm install
	npm run dev
	```
	El frontend estará disponible en [http://localhost:5173](http://localhost:5173)

> **Nota:** El frontend está configurado para redirigir automáticamente las peticiones `/api` al backend en desarrollo.

## 📦 Despliegue en Producción
Ambos módulos cuentan con archivos Dockerfile para facilitar el despliegue en servidores o servicios cloud.

## 📄 Documentación Específica
- Para detalles técnicos, endpoints, estructura de carpetas y dependencias, consulta los README de cada subcarpeta:
  - [Frontend](./Arquitectura-y-Diseno-de-Software---Front-end/README.md)
  - [Backend](./eventos-empresariales-backend/README.md)

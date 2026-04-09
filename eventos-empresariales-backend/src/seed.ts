// src/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './modules/usuario/entities/usuario.entity';
import { Empresa } from './modules/empresa/entities/empresa.entity';
import { Evento } from './modules/evento/entities/evento.entity';
import { CategoriaEvento } from './modules/categoria-evento/entities/categoria-evento.entity';
import { Role } from './modules/roles/entities/role.entity';
import { RegistroAsistencia } from './modules/registro-asistencia/entitites/registro-asistencia.entity';
import * as bcrypt from 'bcrypt'; // 👇 IMPORTAMOS BCRYPT

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // Repositorios
  const usuarioRepo = app.get(getRepositoryToken(Usuario));
  const empresaRepo = app.get(getRepositoryToken(Empresa));
  const eventoRepo = app.get(getRepositoryToken(Evento));
  const categoriaRepo = app.get(getRepositoryToken(CategoriaEvento));
  const roleRepo = app.get(getRepositoryToken(Role));
  const registroRepo = app.get(getRepositoryToken(RegistroAsistencia));

  // Poblar roles (Nombres en minúscula para que React los entienda)
  const roles = await roleRepo.save([
    { role_name: 'admin', description: 'Administrador del sistema' },
    { role_name: 'organizer', description: 'Organiza eventos' },
    { role_name: 'attendee', description: 'Participa en eventos' },
  ]);

  // Poblar categorías
  const categorias = await categoriaRepo.save([
    { category_name: 'Conferencia', category_description: 'Charlas y conferencias' },
    { category_name: 'Taller', category_description: 'Sesiones prácticas' },
    { category_name: 'Networking', category_description: 'Espacios para networking' },
  ]);

  // 👇 ENCRIPTAMOS LA CONTRASEÑA ANTES DE GUARDARLA
  const salt = await bcrypt.genSalt(10);
  const passwordEncriptada = await bcrypt.hash('123456', salt);

  // Poblar usuarios (A todos les pondrá '123456' pero encriptada)
  const usuarios = await usuarioRepo.save([
    { user_name: 'Juan Pérez (Admin)', user_email: 'juan@a.com', user_password: passwordEncriptada, role: roles[0] },
    { user_name: 'Ana López (Org)', user_email: 'ana@b.com', user_password: passwordEncriptada, role: roles[1] },
    { user_name: 'Luis Gómez (Att)', user_email: 'luis@c.com', user_password: passwordEncriptada, role: roles[2] },
  ]);

  // Poblar empresas
  const empresas = await empresaRepo.save([
    { company_name: 'Empresa A', organizer: usuarios[0] },
    { company_name: 'Empresa B', organizer: usuarios[1] },
    { company_name: 'Empresa C', organizer: usuarios[2] },
  ]);

  // Poblar eventos
  const eventos = await eventoRepo.save([
    {
      event_name: 'Evento 1',
      category: categorias[0],
      description: 'Primer evento',
      start_date: new Date(),
      end_date: new Date(Date.now() + 2 * 60 * 60 * 1000),
      location: 'Auditorio A',
      max_attendanse: 100,
      organizer: usuarios[0],
      company: empresas[0],
    },
    {
      event_name: 'Evento 2',
      category: categorias[1],
      description: 'Segundo evento',
      start_date: new Date(),
      end_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
      location: 'Sala B',
      max_attendanse: 50,
      organizer: usuarios[1],
      company: empresas[1],
    },
    {
      event_name: 'Evento 3',
      category: categorias[2],
      description: 'Tercer evento',
      start_date: new Date(),
      end_date: new Date(Date.now() + 4 * 60 * 60 * 1000),
      location: 'Salón C',
      max_attendanse: 30,
      organizer: usuarios[2],
      company: empresas[2],
    },
  ]);

  // Poblar registros de asistencia
  await registroRepo.save([
    { user: usuarios[0], event: eventos[0], state: 'asistió' },
    { user: usuarios[1], event: eventos[1], state: 'asistió' },
    { user: usuarios[2], event: eventos[2], state: 'ausente' },
  ]);

  console.log('✅ Base de datos poblada con éxito!');
  await app.close();
}

bootstrap();
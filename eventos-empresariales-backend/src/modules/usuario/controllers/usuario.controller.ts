import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../use-cases/usuario.service';
import { Usuario } from '../entities/usuario.entity';
import { Public } from '../decorators/public.decorator';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    // Acepta tanto 'email' como 'user_email' para evitar errores del frontend
    const email = body.user_email || body.email;
    const password = body.user_password || body.password;

    if (!email || !password) {
      throw new UnauthorizedException('Faltan credenciales');
    }

    return this.usuarioService.login(email, password);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Public()
  @Post()
  create(@Body() usuario: Usuario) {
    return this.usuarioService.create(usuario);
  }
}
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) { }

  async create(usuario: Usuario): Promise<Usuario> {
    const salt = await bcrypt.genSalt(10);
    usuario.user_password = await bcrypt.hash(usuario.user_password, salt);
    const nuevoUsuario = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async login(email: string, pass: string): Promise<any> {
    const user = await this.usuarioRepository.findOne({
      where: { user_email: email },
      relations: ['role']
    });

    if (user && await bcrypt.compare(pass, user.user_password)) {
      const payload = { sub: user.user_id, email: user.user_email, role: user.role.role_name };
      return {
        user_id: user.user_id,
        user_name: user.user_name,
        role: user.role.role_name,
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['role'] });
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { user_id: id }, relations: ['role'] });
    if (!usuario) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    return usuario;
  }
}
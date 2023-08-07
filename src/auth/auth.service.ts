import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(username, password) {
    try {
      const user = await this.usersService.findOne(username);
      if (!user || user.password != password) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { sub: user.userId, username: user.username };
      const access_token = await this.jwtService.signAsync(payload);
      return {
        access_token,
      };
    } catch (error) {
      throw new UnauthorizedException('Failed to sign in');
    }
  }
}
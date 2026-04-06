import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'fallback_secret_key',
      ignoreExpiration: false,
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { motDePasse, ...result } = user;

    return result;
  }
}

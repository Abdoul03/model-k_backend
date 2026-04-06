import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateTokens(
    userId: number,
    email: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = { sub: userId, email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '15m' }),
      this.jwtService.signAsync(payload, { expiresIn: '15d' }),
    ]);

    return { accessToken, refreshToken };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Cet email est daja utiliser');
    }
    const user = await this.userService.create(registerDto);

    const tokens = await this.generateTokens(user.id, user.email);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { motDePasse, ...userWithoutPassword } = user;

    await this.userService.update(user.id, {
      refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
    });

    return {
      user: userWithoutPassword,
      tokens: tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Indentifiant ou mot de passe invalide');
    }
    const isPasswordValide = await this.userService.verifyPassWord(
      loginDto.password,
      user.motDePasse,
    );

    if (!isPasswordValide) {
      throw new UnauthorizedException('Identifiant ou mot de passe invalide');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    await this.userService.update(user.id, {
      refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { motDePasse, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      tokens: tokens,
    };
  }

  async refreshToken(refreshDto: RefreshDto) {
    try {
      // 1. Vérifier la validité du jeton (signature et expiration)
      const payload = await this.jwtService.verifyAsync<{
        sub: number;
        email: string;
      }>(refreshDto.refreshToken);

      const user = await this.userService.findOne(payload.sub);

      const isTokenMatching =
        user && user.refreshToken
          ? await bcrypt.compare(refreshDto.refreshToken, user.refreshToken)
          : false;

      if (!isTokenMatching) {
        throw new UnauthorizedException('Refresh token invalide ou expiré');
      }

      const tokens = await this.generateTokens(user.id, user.role);

      await this.userService.update(user.id, {
        refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
      });

      return tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // Si le token est expiré ou malformé, on vide le token en base pour forcer le login
      throw new UnauthorizedException(
        'Session expirée, veuillez vous reconnecter',
      );
    }
  }
}

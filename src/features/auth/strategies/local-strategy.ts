import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { Payload } from '../types/payload';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(username: string, password: string): Promise<Payload> {
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isPasswordValid = await this.authService.validateHashedData(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return {
      sub: user.id,
      email: user.email,
    };
  }
}

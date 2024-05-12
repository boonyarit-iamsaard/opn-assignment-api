import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Payload } from './types/payload';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(payload: Payload) {
    return this.generateTokens(payload);
  }

  async update() {
    return 'update';
  }

  async changePassword() {
    return 'change-password';
  }

  async delete() {
    return 'delete';
  }

  async generateTokens(payload: Payload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
    });

    return {
      accessToken,
    };
  }

  async validateHashedData(data: string, hashedData: string) {
    return argon2.verify(hashedData, data);
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from '../features/auth/auth.module';
import { UsersModule } from '../features/users/users.module';
import { AppModule } from './app/app.module';

@Module({
  imports: [
    AuthModule,
    AppModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
      }),
    }),
    UsersModule,
  ],
})
export class CoreModule {}

import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenAuthGuard } from '../../core/guards/access-token-auth.guard';
import { LocalAuthGuard } from '../../core/guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdatePasswordDto } from '../users/dto/update-password.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
import { Payload } from './types/payload';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(body.email);
    if (existingUser) {
      throw new ConflictException('user already exists');
    }

    const newUser = await this.usersService.create(body);
    if (!newUser) {
      throw new InternalServerErrorException('unable to create user');
    }

    const { email, id } = newUser;
    const payload: Payload = { email, sub: id };

    return this.authService.generateTokens(payload);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request: AuthenticatedRequest) {
    return this.authService.generateTokens(request.user);
  }

  @Get('me')
  @UseGuards(AccessTokenAuthGuard)
  async me(@Req() request: AuthenticatedRequest) {
    const existingUser = await this.usersService.findOneByEmail(
      request.user.email,
    );
    if (!existingUser) {
      throw new NotFoundException('user not found');
    }

    return new UserEntity(existingUser);
  }

  @Patch('update')
  @UseGuards(AccessTokenAuthGuard)
  async update(
    @Req() request: AuthenticatedRequest,
    @Body() body: UpdateUserDto,
  ) {
    const existingUser = await this.usersService.findOneByEmail(
      request.user.email,
    );
    if (!existingUser) {
      throw new NotFoundException('user not found');
    }

    const updatedUser = await this.usersService.update(existingUser.id, body);
    if (!updatedUser) {
      throw new InternalServerErrorException('unable to update user');
    }

    return new UserEntity(updatedUser);
  }

  @Patch('update-password')
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Req() request: AuthenticatedRequest,
    @Body() body: UpdatePasswordDto,
  ) {
    const existingUser = await this.usersService.findOneByEmail(
      request.user.email,
    );
    if (!existingUser) {
      throw new NotFoundException('user not found');
    }

    const isPasswordValid = await this.authService.validateHashedData(
      body.currentPassword,
      existingUser.password,
    );
    const isPasswordMatch = body.newPassword === body.confirmNewPassword;
    if (!isPasswordValid || !isPasswordMatch) {
      throw new BadRequestException('invalid password');
    }

    const updatedUser = await this.usersService.updatePassword(
      existingUser.id,
      body.newPassword,
    );
    if (!updatedUser) {
      throw new InternalServerErrorException('unable to update password');
    }

    return;
  }

  @Delete('delete')
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Req() request: AuthenticatedRequest) {
    const existingUser = await this.usersService.findOneByEmail(
      request.user.email,
    );
    if (!existingUser) {
      throw new NotFoundException('user not found');
    }

    const deletedUser = await this.usersService.delete(existingUser.id);
    if (!deletedUser) {
      throw new InternalServerErrorException('unable to delete user');
    }

    return;
  }
}

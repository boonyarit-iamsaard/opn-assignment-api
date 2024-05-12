import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];

  async find(): Promise<UserEntity[]> {
    return this.users;
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    const existingUser = this.users.find(
      (user) => user.email === email && !user.deletedAt,
    );
    if (!existingUser) {
      return;
    }

    return existingUser;
  }

  async create(body: CreateUserDto): Promise<UserEntity | undefined> {
    const existingUser = await this.findOneByEmail(body.email);
    if (existingUser) {
      return;
    }

    const hashedPassword = await argon2.hash(body.password);
    const user: UserEntity = {
      id: uuidv4(),
      ...body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);

    return user;
  }

  async update(
    id: string,
    body: UpdateUserDto,
  ): Promise<UserEntity | undefined> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return;
    }

    const updatedUser = { ...user, ...body, updatedAt: new Date() };
    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user,
    );

    return updatedUser;
  }

  async updatePassword(
    id: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return;
    }

    const hashedPassword = await argon2.hash(password);
    const updatedUser = {
      ...user,
      password: hashedPassword,
      updatedAt: new Date(),
    };
    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user,
    );

    return updatedUser;
  }

  async delete(id: string): Promise<UserEntity | undefined> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return;
    }

    const deletedUser = { ...user, deletedAt: new Date() };
    this.users = this.users.map((user) =>
      user.id === id ? deletedUser : user,
    );

    return deletedUser;
  }
}
